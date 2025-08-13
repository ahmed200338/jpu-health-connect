import SectionPage from "@/components/sections/SectionPage";
import radiologyHero from "@/assets/sections/radiology-hero.jpg";
import { radiologyCentersMock } from "@/data/mock";

const Radiology = () => (
  <SectionPage title="مرحباً بكم في قسم الأشعة" disc="ليست مجرد صور بل هي نافذة تكشف عن قصة كاملة
لصحة كل مريض . " backgroundImage={radiologyHero} items={radiologyCentersMock} pageKey="radiology" />
);

export default Radiology;