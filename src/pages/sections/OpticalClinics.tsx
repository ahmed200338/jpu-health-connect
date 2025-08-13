import SectionPage from "@/components/sections/SectionPage";
import opticalHero from "@/assets/sections/optical-hero.jpg";
import { opticalClinicsMock } from "@/data/mock";

const OpticalClinics = () => (
  <SectionPage title="مرحباً بكم في قسم العيادة البصرية" disc="اكتشف رؤية جديدة مع عياداتنا البصرية ، صحتك البصرية تهمنا !" backgroundImage={opticalHero} items={opticalClinicsMock} pageKey="optical" />
);

export default OpticalClinics;