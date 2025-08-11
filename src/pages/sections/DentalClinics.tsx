import SectionPage from "@/components/sections/SectionPage";
import dentalHero from "@/assets/sections/dental-hero.jpg";
import { dentalClinicsMock } from "@/data/mock";

const DentalClinics = () => (
  <SectionPage title="عيادات الأسنان" backgroundImage={dentalHero} items={dentalClinicsMock} pageKey="dental" />
);

export default DentalClinics;