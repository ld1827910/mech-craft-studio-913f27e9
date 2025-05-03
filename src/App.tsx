
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./hooks/use-theme";
import CompareView from "./pages/CompareView";
import Gallery from "./pages/Gallery";
import DesignHistory from "./pages/DesignHistory";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/compare" element={<CompareView />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/history" element={<DesignHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
