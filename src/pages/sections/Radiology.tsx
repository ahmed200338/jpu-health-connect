import SectionPage from "@/components/sections/SectionPage";
import radiologyHero from "@/assets/sections/radiology-hero.jpg";
import { radiologyCentersMock } from "@/data/mock";

const Radiology = () => (
  <SectionPage title="الأشعة" backgroundImage={radiologyHero} items={radiologyCentersMock} pageKey="radiology" />
);

export default Radiology;