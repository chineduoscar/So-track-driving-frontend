import { notFound } from "next/navigation";
import { getSingleZone } from "../../../../services/zone.servies";
import CheckoutForm from "../../../../components/checkout/CheckoutForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const CheckoutPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const zoneId = Number(id);
  if (!id || Number.isNaN(zoneId) || zoneId <= 0) {
    notFound();
  }

  let zone;
  try {
    zone = await getSingleZone(zoneId);
  } catch (err) {
    console.error("Failed to fetch zone:", err);
    notFound();
  }

  if (!zone) {
    notFound();
  }

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-md mx-auto">
        <CheckoutForm zone={zone} />
      </div>
    </section>
  );
};

export default CheckoutPage;
