import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Support from "./pages/Support";
import Departments from "./pages/Departments";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Doctors from "./pages/sections/Doctors";
import Hospitals from "./pages/sections/Hospitals";
import Pharmacies from "./pages/sections/Pharmacies";
import Laboratories from "./pages/sections/Laboratories";
import DentalClinics from "./pages/sections/DentalClinics";
import Radiology from "./pages/sections/Radiology";
import OpticalClinics from "./pages/sections/OpticalClinics";
import PhysicalTherapy from "./pages/sections/PhysicalTherapy";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route path="/departments" element={<Departments />} />

          <Route path="/sections/doctors" element={<Doctors />} />
          <Route path="/sections/hospitals" element={<Hospitals />} />
          <Route path="/sections/pharmacies" element={<Pharmacies />} />
          <Route path="/sections/laboratories" element={<Laboratories />} />
          <Route path="/sections/dental-clinics" element={<DentalClinics />} />
          <Route path="/sections/radiology" element={<Radiology />} />
          <Route path="/sections/optical-clinics" element={<OpticalClinics />} />
          <Route path="/sections/physical-therapy" element={<PhysicalTherapy />} />

          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
