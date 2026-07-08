import jsPDF from "jspdf";

interface Payment {
  fullName: string;
  zone: string;
  amount: number;
  reference: string;
}

const formatNaira = (amount: number) => `NGN ${amount.toLocaleString("en-NG")}`;

// Converts an image at a given URL into a base64 data URL jsPDF can embed
const loadImageAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const downloadReceipt = async (payment: Payment) => {
  const date = new Date().toLocaleString("en-NG", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 55;
  const contentWidth = pageWidth - marginX * 2;

  const navy: [number, number, number] = [26, 45, 86]; // #1a2d56
  const green: [number, number, number] = [0, 160, 87]; // #00a057
  const gray: [number, number, number] = [120, 128, 140];
  const lightGray: [number, number, number] = [245, 246, 248];
  const dark: [number, number, number] = [30, 33, 40];

  // ===== Outer page border (subtle framing) =====
  doc.setDrawColor(230, 232, 236);
  doc.setLineWidth(1);
  doc.rect(24, 24, pageWidth - 48, pageHeight - 48);

  // ===== Header banner =====
  const bannerHeight = 110;
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageWidth, bannerHeight, "F");

  // Logo sits inside a white rounded badge so it stays visible on navy
  const badgeWidth = 70;
  const badgeHeight = 52;
  const badgeX = marginX;
  const badgeY = (bannerHeight - badgeHeight) / 2;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 10, 10, "F");

  let textStartX = marginX;

  try {
    const logoBase64 = await loadImageAsBase64("/logo.png");
    const logoPaddingX = 8;
    const logoPaddingY = 10;
    const logoWidth = badgeWidth - logoPaddingX * 2;
    const logoHeight = badgeHeight - logoPaddingY * 2;

    doc.addImage(
      logoBase64,
      "PNG",
      badgeX + logoPaddingX,
      badgeY + logoPaddingY,
      logoWidth,
      logoHeight,
    );
    textStartX = badgeX + badgeWidth + 16;
  } catch (err) {
    console.error("Logo failed to load, falling back to text-only header", err);
    doc.setFillColor(...navy);
    doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 10, 10, "F");
    textStartX = marginX;
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.text("So-track", textStartX, bannerHeight / 2 - 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(210, 216, 230);
  doc.text("Driving School & Training", textStartX, bannerHeight / 2 + 14);

  // Receipt label, right-aligned
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("RECEIPT", pageWidth - marginX, bannerHeight / 2, {
    align: "right",
  });

  let y = bannerHeight + 45;

  // ===== Status pill =====
doc.setFillColor(...green);
doc.circle(marginX + 18, y - 3, 3, "F");

doc.setTextColor(...green);
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("PAYMENT SUCCESSFUL", marginX + 26, y + 1);

  // Issued date, right-aligned
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Issued ${date}`, pageWidth - marginX, y + 1, { align: "right" });

  y += 50;

  // ===== Details card =====
  const rows: [string, string][] = [
    ["Full Name", payment.fullName],
    ["Zone", payment.zone],
    ["Reference", payment.reference],
  ];

  const rowHeight = 42;
  const cardTop = y;
  const cardHeight = rowHeight * rows.length;

  doc.setFillColor(...lightGray);
  doc.roundedRect(marginX, cardTop, contentWidth, cardHeight, 10, 10, "F");

  rows.forEach(([label, value], i) => {
    const rowY = cardTop + rowHeight * i;

    if (i > 0) {
      doc.setDrawColor(232, 234, 238);
      doc.setLineWidth(0.75);
      doc.line(marginX + 18, rowY, pageWidth - marginX - 18, rowY);
    }

    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(label.toUpperCase(), marginX + 18, rowY + 17);

    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text(value, marginX + 18, rowY + 32);
  });

  y = cardTop + cardHeight + 30;

  // ===== Amount paid highlight =====
  const amountBoxHeight = 64;
  doc.setFillColor(...navy);
  doc.roundedRect(marginX, y, contentWidth, amountBoxHeight, 10, 10, "F");

  doc.setTextColor(200, 208, 224);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("AMOUNT PAID", marginX + 20, y + 24);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(formatNaira(payment.amount), marginX + 20, y + 48);

  y += amountBoxHeight + 40;

  // ===== Divider =====
  doc.setDrawColor(230, 232, 236);
  doc.setLineWidth(1);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 26;

  // ===== Footer note =====
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Thank you for choosing So-track. Keep this receipt for your records.",
    marginX,
    y,
  );

  y += 16;
  doc.setFontSize(8);
  doc.setTextColor(180, 184, 192);
  doc.text(
    "This is a system-generated receipt and does not require a signature.",
    marginX,
    y,
  );

  doc.save(`sotrack-receipt-${payment.reference}.pdf`);
};