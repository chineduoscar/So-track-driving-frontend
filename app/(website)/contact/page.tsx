import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactServices from "../../components/contact/ContactServices";
import FAQ from "../../components/home/FAQ";

const page = () => {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactServices />
      <FAQ />
    </>
  );
};

export default page;
