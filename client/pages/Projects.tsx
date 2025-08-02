import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  Code,
  GitBranch,
  Rocket,
  LayoutTemplate,
  TerminalSquare,
  Award,
} from "lucide-react";

export default function Projects() {
  // بيانات المشاريع
  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my skills and projects.",
      period: "2023",
      icon: Rocket,
      imageUrl:"https://cdn.prod.website-files.com/670cbf146221ee06c3cdd761/670cbf146221ee06c3cde03c_Web%20Development%20Projects.avif  ",
      url: "https://your-portfolio.com",
      techStack: ["React", "Tailwind CSS", "Vercel"],
    },
    {
      title: "Task Manager API",
      description: "RESTful API to manage tasks with authentication and authorization.",
      period: "2024",
      icon: TerminalSquare,
      imageUrl:"https://cdn.prod.website-files.com/670cbf146221ee06c3cdd761/670cbf146221ee06c3cde03c_Web%20Development%20Projects.avif",
      url: "https://github.com/username/task-manager-api",
      techStack: ["ASP.NET Core", "Entity Framework", "SQL Server"],
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured e-commerce platform with payment integration.",
      period: "2024",
      icon: GitBranch,
      imageUrl:"https://cdn.prod.website-files.com/670cbf146221ee06c3cdd761/670cbf146221ee06c3cde03c_Web%20Development%20Projects.avif",
      url: "https://github.com/username/ecommerce-platform",
      techStack: ["Next.js", "Stripe API", "MongoDB"],
    },
    {
      title: "Open Source Contribution",
      description: "Contributed features and bug fixes to popular open source projects.",
      period: "2023 - Present",
      icon: Award,
      imageUrl:"https://cdn.prod.website-files.com/670cbf146221ee06c3cdd761/670cbf146221ee06c3cde03c_Web%20Development%20Projects.avif",
      url: "https://github.com/username",
      techStack: ["JavaScript", "TypeScript", "Open Source"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-12">
        <ScrollAnimation direction="left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            A selection of projects I’ve worked on, demonstrating my skills and interests.
          </p>
        </ScrollAnimation>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ScrollAnimation key={index} direction="right" delay={0.2 * index}>
            <a
              href={project.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-white p-6 rounded-2xl border border-gray-200 transition-transform duration-300 hover:scale-105 cursor-pointer w-full max-w-[350px] h-[350px]">
                <div className="flex flex-col items-center space-y-4 h-full">
                  {/* صورة بدل الأيقونة */}
                  <div className="overflow-hidden">
                    <img
                      src={project.imageUrl}  // لازم تضيف حقل imageUrl في بيانات المشروع
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="text-center flex flex-col justify-between flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-4 mb-2">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <span className="text-sm text-gray-500 flex items-center justify-center mt-1 sm:mt-0">
                        <LayoutTemplate className="w-4 h-4 mr-1" />
                        {project.period}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>



            </a>
          </ScrollAnimation>
        ))}
      </div>

    </div>
  );
}
