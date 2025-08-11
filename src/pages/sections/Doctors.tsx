import SectionPage from "@/components/sections/SectionPage";
import doctorsHero from "@/assets/sections/doctors-hero.jpg";
import { doctorsMock } from "@/data/mock";

const Doctors = () => (
  <SectionPage title="الأطباء" backgroundImage={doctorsHero} items={doctorsMock} pageKey="doctors" />
);

export default Doctors;