import SectionPage from "@/components/sections/SectionPage";
import laboratoriesHero from "@/assets/sections/laboratories-hero.jpg";

const Laboratories = () => (
  <SectionPage title="مرحباً بكم في قسم المخابر" disc="دقة المختبر هي أساس للتشخيص الصحيح ." backgroundImage={laboratoriesHero} pageKey="laboratories" tableName="laboratories" />
);

export default Laboratories;