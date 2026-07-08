import { notFound } from "next/navigation";
import { getAllZones } from "../../../services/zone.servies";
import SingleLocationMain from "../../../components/SingleLocation/SingleLocationMain";
import LocationHero from "@/app/components/SingleLocation/LocationHero";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const zones = await getAllZones();
  const zone = zones.find((z: { id: number }) => z.id === Number(id));

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
