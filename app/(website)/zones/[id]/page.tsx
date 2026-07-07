import { notFound } from "next/navigation";
import { zones } from "../../../data/zones";
import SingleLocationMain from "../../../components/SingleLocation/SingleLocationMain";
import LocationHero from "@/app/components/SingleLocation/LocationHero";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const zone = zones.find((z) => z.id === Number(id));

  if (!zone) {
    notFound();
  }

  return (
    <>
      <LocationHero />
      <SingleLocationMain zone={zone} />
    </>
  );
};

export default Page;
