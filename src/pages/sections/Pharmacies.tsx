import SectionPage from "@/components/sections/SectionPage";
import pharmaciesHero from "@/assets/sections/pharmacies-hero.jpg";
import { pharmaciesMock } from "@/data/mock";

const Pharmacies = () => (
  <SectionPage title="الصيدليات" backgroundImage={pharmaciesHero} items={pharmaciesMock} pageKey="pharmacies" />
);

export default Pharmacies;