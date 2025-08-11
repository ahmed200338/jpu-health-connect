import SectionPage from "@/components/sections/SectionPage";
import ptHero from "@/assets/sections/physical-therapy-hero.jpg";
import { physicalTherapyCentersMock } from "@/data/mock";

const PhysicalTherapy = () => (
  <SectionPage title="المعالجة الفيزيائية" backgroundImage={ptHero} items={physicalTherapyCentersMock} pageKey="physical-therapy" />
);

export default PhysicalTherapy;