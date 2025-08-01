import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Store from "@/pages/Store";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ResponsiveLayout>
    </BrowserRouter>
  );
}

export default App;
