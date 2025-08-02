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
          <Route path="Portfolio/" element={<Index />} />
          <Route path="Portfolio/projects" element={<Projects />} />
          <Route path="Portfolio/about" element={<About />} />
          <Route path="Portfolio/store" element={<Store />} />
          <Route path="Portfolio/blog" element={<Blog />} />
          <Route path="Portfolio/contact" element={<Contact />} />
          <Route path="Portfolio/*" element={<NotFound />} />
        </Routes>
      </ResponsiveLayout>
    </BrowserRouter>
  );
}

export default App;
