import SectionPage from "@/components/sections/SectionPage";
import hospitalsHero from "@/assets/sections/hospitals-hero.jpg";
import { hospitalsMock } from "@/data/mock";

const Hospitals = () => (
  <SectionPage title="مرحباً بكم في قسم المشافي" disc="في كل غرفة من غرف المشفى تكتب قصة نجاة وقلب ممتن ." backgroundImage={hospitalsHero} items={hospitalsMock} pageKey="hospitals" />
);

export default Hospitals;