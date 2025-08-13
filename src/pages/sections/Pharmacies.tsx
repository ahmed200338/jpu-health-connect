import SectionPage from "@/components/sections/SectionPage";
import pharmaciesHero from "@/assets/sections/pharmacies-hero.jpg";
import { pharmaciesMock } from "@/data/mock";

const Pharmacies = () => (
  <SectionPage title="مرحباً بكم في قسم الصيدليات" disc="في كل زجاجة دواء وفي كل نصيحة استعادة صحة وعافية" backgroundImage={pharmaciesHero} items={pharmaciesMock} pageKey="pharmacies" />
);

export default Pharmacies;