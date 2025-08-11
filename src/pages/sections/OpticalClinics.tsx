import SectionPage from "@/components/sections/SectionPage";
import opticalHero from "@/assets/sections/optical-hero.jpg";
import { opticalClinicsMock } from "@/data/mock";

const OpticalClinics = () => (
  <SectionPage title="العيون" backgroundImage={opticalHero} items={opticalClinicsMock} pageKey="optical" />
);

export default OpticalClinics;