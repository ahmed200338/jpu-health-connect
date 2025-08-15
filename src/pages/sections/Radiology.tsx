import SectionPage from "@/components/sections/SectionPage";
import radiologyHero from "@/assets/sections/radiology-hero.jpg";

const Radiology = () => (
  <SectionPage title="مرحباً بكم في قسم الأشعة" disc="ليست مجرد صور بل هي نافذة تكشف عن قصة كاملة لصحة كل مريض ." backgroundImage={radiologyHero} pageKey="radiology" tableName="radiology_centers" />
);

export default Radiology;