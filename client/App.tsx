import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Recommendations from "@/pages/Recommendations";
import Store from "@/pages/Store";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ReactGA from "react-ga4";
const TRACKING_ID = "G-T8FRHQZ9BH";
ReactGA.initialize(TRACKING_ID);
function App() {
  ReactGA.send("pageview");
  return (
    <BrowserRouter>
      <ResponsiveLayout>
        <Routes>
          <Route path="Portfolio/" element={<Index />} />
          <Route path="Portfolio/projects" element={<Projects />} />
          <Route path="Portfolio/about" element={<About />} />
          <Route
            path="Portfolio/recommendations"
            element={<Recommendations />}
          />
          <Route path="Portfolio/store" element={<Store />} />
          <Route path="Portfolio/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="Portfolio/contact" element={<Contact />} />
          <Route path="Portfolio/*" element={<NotFound />} />
        </Routes>
      </ResponsiveLayout>
    </BrowserRouter>
  );
}

export default App;
