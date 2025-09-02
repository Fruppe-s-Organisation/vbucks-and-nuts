import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { TitleMenu } from "./components/TitleMenu";
import { AdminDashboard } from "./components/AdminDashboard";
import { UserServiceSelection } from "./components/UserServiceSelection";
import FortniteBusiness from "./components/FortniteBusiness";
import GroundnutBusiness from "./components/GroundnutBusiness";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type AppState = "loading" | "title" | "admin" | "user" | "service";

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>("loading");
  const [selectedService, setSelectedService] = useState<string>("");

  const handleLoadingComplete = () => setCurrentState("title");
  
  const handleLoginSelect = (type: "admin" | "user") => {
    setCurrentState(type);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setCurrentState("service");
  };

  const handleLogout = () => setCurrentState("title");
  
  const handleBack = () => setCurrentState("title");

  const renderCurrentScreen = () => {
    switch (currentState) {
      case "loading":
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
      case "title":
        return <TitleMenu onLoginSelect={handleLoginSelect} />;
      case "admin":
        return <AdminDashboard onLogout={handleLogout} />;
      case "user":
        return <UserServiceSelection onServiceSelect={handleServiceSelect} onBack={handleBack} />;
      case "service":
        if (selectedService === "fortnite") {
          return <FortniteBusiness />;
        } else if (selectedService === "groundnuts") {
          return <GroundnutBusiness />;
        }
        return <UserServiceSelection onServiceSelect={handleServiceSelect} onBack={handleBack} />;
      default:
        return <TitleMenu onLoginSelect={handleLoginSelect} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={renderCurrentScreen()} />
            <Route path="/original" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
