import SectionPage from "@/components/sections/SectionPage";
import ptHero from "@/assets/sections/physical-therapy-hero.jpg";

const PhysicalTherapy = () => (
  <SectionPage title="مرحباً بكم في قسم المعالجة الفيزيائية" disc="اكتشف عالم المعالجة الفيزيائية حيث يلتقي العلم بالتطبيق لتعيد جسدك إلى حيويته وتوازن طاقته ." backgroundImage={ptHero} pageKey="physical-therapy" tableName="physical_therapy_centers" />
);

export default PhysicalTherapy;