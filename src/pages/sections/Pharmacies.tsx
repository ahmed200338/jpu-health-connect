import SectionPage from "@/components/sections/SectionPage";
import pharmaciesHero from "@/assets/sections/pharmacies-hero.jpg";

const Pharmacies = () => (
  <SectionPage title="مرحباً بكم في قسم الصيدليات" disc="في كل زجاجة دواء وفي كل نصيحة استعادة صحة وعافية" backgroundImage={pharmaciesHero} pageKey="pharmacies" tableName="pharmacies" />
);

export default Pharmacies;