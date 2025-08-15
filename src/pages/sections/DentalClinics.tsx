import SectionPage from "@/components/sections/SectionPage";
import dentalHero from "@/assets/sections/dental-hero.jpg";

const DentalClinics = () => (
  <SectionPage title="مرحباً بكم في قسم عيادات الأسنان" disc="لأن كل ابتسامة لها قصة ، دعنا نكتب قصتك معاً ." backgroundImage={dentalHero} pageKey="dental" tableName="dental_clinics" />
);

export default DentalClinics;