import SectionPage from "@/components/sections/SectionPage";
import laboratoriesHero from "@/assets/sections/laboratories-hero.jpg";
import { laboratoriesMock } from "@/data/mock";

const Laboratories = () => (
  <SectionPage title="المختبرات" backgroundImage={laboratoriesHero} items={laboratoriesMock} pageKey="laboratories" />
);

export default Laboratories;