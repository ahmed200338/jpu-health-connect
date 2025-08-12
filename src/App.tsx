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
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard";
import InsuranceSettings from "./pages/dashboard/InsuranceSettings";
import SubscriptionsManagement from "./pages/dashboard/SubscriptionsManagement";
import UsersManagement from "./pages/dashboard/UsersManagement";
import ServicesManagement from "./pages/dashboard/ServicesManagement";
import RequestsManagement from "./pages/dashboard/RequestsManagement";

const queryClient = new QueryClient();

const PublicLayout = ({ children }) => (
  <>
    <Navigation />
    {children}
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/support" element={<PublicLayout><Support /></PublicLayout>} />
          <Route path="/departments" element={<PublicLayout><Departments /></PublicLayout>} />

          <Route path="/sections/doctors" element={<PublicLayout><Doctors /></PublicLayout>} />
          <Route path="/sections/hospitals" element={<PublicLayout><Hospitals /></PublicLayout>} />
          <Route path="/sections/pharmacies" element={<PublicLayout><Pharmacies /></PublicLayout>} />
          <Route path="/sections/laboratories" element={<PublicLayout><Laboratories /></PublicLayout>} />
          <Route path="/sections/dental-clinics" element={<PublicLayout><DentalClinics /></PublicLayout>} />
          <Route path="/sections/radiology" element={<PublicLayout><Radiology /></PublicLayout>} />
          <Route
            path="/sections/optical-clinics"
            element={<PublicLayout><OpticalClinics /></PublicLayout>}
          />
          <Route
            path="/sections/physical-therapy"
            element={<PublicLayout><PhysicalTherapy /></PublicLayout>}
          />

          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />

          {/* DASHBOARD SECTION */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="insurance-settings" element={<InsuranceSettings />} />
            <Route path="subscriptions" element={<SubscriptionsManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="requests" element={<RequestsManagement />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
        
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
