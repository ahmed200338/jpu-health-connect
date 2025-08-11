import SectionPage from "@/components/sections/SectionPage";
import hospitalsHero from "@/assets/sections/hospitals-hero.jpg";
import { hospitalsMock } from "@/data/mock";

const Hospitals = () => (
  <SectionPage title="المستشفيات" backgroundImage={hospitalsHero} items={hospitalsMock} pageKey="hospitals" />
);

export default Hospitals;