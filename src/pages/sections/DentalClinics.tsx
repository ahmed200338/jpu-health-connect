import SectionPage from "@/components/sections/SectionPage";
import dentalHero from "@/assets/sections/dental-hero.jpg";
import { dentalClinicsMock } from "@/data/mock";

const DentalClinics = () => (
  <SectionPage title="مرحباً بكم في قسم عيادات الأسنان" disc="لأن كل ابتسامة لها قصة ، دعنا نكتب قصتك معاً ." backgroundImage={dentalHero} items={dentalClinicsMock} pageKey="dental" />
);

export default DentalClinics;