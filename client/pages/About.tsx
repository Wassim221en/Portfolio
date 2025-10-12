import {
  Code,
  Palette,
  Users,
  Zap,
  Database,
  Settings,
  Wrench,
  GraduationCap,
  Briefcase,
  Calendar,
  Bug,
  Computer,
  BellElectric,
  FastForward,
  Code2,
  Braces,
  ServerCog,
  Layers,
  SatelliteDish,
  Plug,
  MessageCircle,
  Dock,
  GitBranch,
  Gauge,
  ShieldCheck,
  Landmark,
  LayoutTemplate,
  TerminalSquare,
  TestTube,
  Eye,
  Rocket,
  Search,
  Trophy,
  Award,
} from "lucide-react";

import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Services } from "@/components/Services";
import { url } from "inspector";
import CodeforcesCard from "@/components/ProblemSolved";
export default function About() {
  const tools = [
    // Languages & Frameworks
    {
      name: "ASP.NET Core",
      category: "Framework",
      icon: <ServerCog className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      name: "EF Core",
      category: "ORM",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-red-100 text-red-700",
    },

    // Databases
    {
      name: "PostgreSQL/SQL Server",
      category: "Database",
      icon: <Database className="w-6 h-6" />,
      color: "bg-green-100 text-green-700",
    },

    {
      name: "Redis",
      category: "Caching",
      icon: <Rocket className="w-6 h-6" />,
      color: "bg-rose-100 text-rose-700",
    },

    // Communication & Messaging
    {
      name: "RabbitMQ",
      category: "Messaging",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "SignalR",
      category: "Realtime",
      icon: <SatelliteDish className="w-6 h-6" />,
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "gRPC",
      category: "RPC Protocol",
      icon: <Plug className="w-6 h-6" />,
      color: "bg-yellow-100 text-yellow-700",
    },

    // DevOps & Tools
    {
      name: "Docker",
      category: "Containerization",
      icon: <Dock className="w-6 h-6" />,
      color: "bg-cyan-100 text-cyan-700",
    },

    // Architecture & Patterns
    {
      name: "Clean Architecture",
      category: "Architecture",
      icon: <Landmark className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-700",
    },
    {
      name: "CQRS + MediatR",
      category: "Pattern",
      icon: <LayoutTemplate className="w-6 h-6" />,
      color: "bg-violet-100 text-violet-700",
    },
    {
      name: "Background Services",
      category: "Worker Services",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-lime-100 text-lime-700",
    },

    // Testing & Monitoring
    {
      name: "xUnit",
      category: "Testing",
      icon: <TestTube className="w-6 h-6" />,
      color: "bg-lime-100 text-lime-700",
    },
    {
      name: "Serilog",
      category: "Logging",
      icon: <Eye className="w-6 h-6" />,
      color: "bg-teal-100 text-teal-700",
    },
    {
      name: "Health Checks",
      category: "Monitoring",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-green-100 text-green-700",
    },
  ];

  const experience = [
    {
      title: "Back End Developer",
      company: "Elkood",
      period: "Apr 2024 -  July 2025",
      description: "",
      icon: "images/elkood.png",
      url: "https://elkood.com/en",
    },
  ];

  const education = [
    {
      degree: "Five-year Telecommunications Engineering Bachelor's degree",
      school: "Aleppo University",
      period: "2021 - Persent",
      description: "",
      icon: GraduationCap,
    },
  ];
  const achievement = [
    {
      title: "ICPC 2023 Syrian Finalist",
      school: "ICPC - International Collegiate Programming Contest",
      period: "2023",
      description:
        "Qualified for the Syrian National Finals representing Aleppo University, among the top teams nationwide.",
      icon: Trophy,
      url: "https://drive.google.com/file/d/1-KQLF-xnZjfSvWMgfgbbBQBGHF5z2Vq5/view?usp=drive_link",
    },
    {
      title: "4th Place - Aleppo Collegiate Programming Contest",
      school: "ICPC - International Collegiate Programming Contest",
      period: "2023",
      description:
        "Ranked 4th out of dozens of teams in the regional Aleppo university-level contest.",
      icon: Award,
      url: "https://drive.google.com/file/d/14OW0VFmLjjxgD7R8zSLj5aDZGVsCQBnl/view",
    },
    {
      title: "8th Place - Aleppo CPC",
      school: "ICPC - International Collegiate Programming Contest",
      period: "2024",
      description:
        "Achieved 8th place in the Aleppo-level programming contest, demonstrating continued performance and commitment.",
      icon: Award,
      url: "",
    },
    {
      title: "ICPC Competitive Programming Coach",
      school: "University of Cordoba · ICPC Syria National Finals",
      period: "Aug 2024",
      description:
        "Coached the University of Cordoba team for the ICPC Syria National Finals, focusing on advanced problem-solving, contest strategy, and team coordination.",
      icon: Braces,
      url: "https://drive.google.com/file/d/14OW0VFmLjjxgD7R8zSLj5aDZGVsCQBnl/view?usp=sharing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Content */}
        <div className="w-full lg:w-[680px] xl:w-[720px] 2xl:w-[600px]">
          <ScrollAnimation direction="left">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Wassim Alshami
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-8">
                Back End Developer
              </h2>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={0.2}>
            <div className="prose prose-lg text-gray-600 dark:text-gray-300 mb-12">
              <p className="text-lg leading-relaxed mb-6">
                I am Wassim Al Shami, a back-end developer with over 2 years of experience in ASP.NET. I specialize in designing
                high-performance software and solving complex technical
                challenges. Passionate about problem-solving, I’ve competed in
                the ICPC and local contests in Syria, also serving as a coach.
                With 1,800+ problems solved on Codeforces, I bring strong
                analytical skills to deliver efficient and innovative solutions.
              </p>
            </div>
          </ScrollAnimation>
          {/* Experience Section */}
          <ScrollAnimation direction="right">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <ScrollAnimation
                    key={index}
                    direction="right"
                    delay={0.2 * index}
                  >
                    <a
                      href={exp.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-2xl">
                            <img
                              src={exp.icon}
                              alt={`${exp.company} Logo`}
                              className="w-11 h-11 rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {exp.title}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                              {exp.company}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Achivement Section */}
          <ScrollAnimation direction="left">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Achievement
              </h3>
              <div className="space-y-6">
                {achievement.map((edu, index) => (
                  <ScrollAnimation
                    key={index}
                    direction="left"
                    delay={0.2 * index}
                  >
                    <a
                      href={edu.url || "#"} // لو ما في رابط خليها تروح لـ #
                      target="_blank" // تفتح الرابط في تاب جديد
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                            <img
                              src="images/icpc.png"
                              alt={`ICPC Logo`}
                              className="w-11 h-1 rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {edu.title}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {edu.period}
                              </span>
                            </div>
                            <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                              {edu.school}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {edu.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Services Section*/}
          <Services />

          {/* Tools Section */}
          <ScrollAnimation direction="up">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Tools
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {tools.map((tool, index) => (
                  <ScrollAnimation
                    key={index}
                    direction="fade"
                    delay={0.1 * index}
                  >
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 transform hover:scale-110">
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tool.color} text-2xl mb-3`}
                        >
                          {tool.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Education Section */}
          <ScrollAnimation direction="right">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <ScrollAnimation
                    key={index}
                    direction="left"
                    delay={0.2 * index}
                  >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                          <edu.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {edu.degree}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                            {edu.school}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Codeforces Statistics for Mobile/Tablet */}
          <div className="lg:hidden mb-16">
            <CodeforcesCard />
          </div>
        </div>

        {/* Right Content - Profile Image Area */}
        <div className="hidden lg:block lg:pl-16 w-[-200px] ml-0">
          <div className="relative">
            {/* Profile Image */}
            <ScrollAnimation direction="right" delay={0.3}>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 mb-8 shadow-inner">
                <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto shadow-lg border-4 border-white">
                  <img
                    src="images/wassim.png"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>

            {/* Floating Elements */}
            <ScrollAnimation direction="fade" delay={0.5}>
              <div className="absolute -top-4 -right-4 bg-yellow-400 w-16 h-16 rounded-2xl rotate-12 shadow-lg flex items-center justify-center">
                <Palette className="w-8 h-8 text-white" />
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="fade" delay={0.7}>
              <div className="absolute top-1/3 -left-6 bg-blue-500 w-12 h-12 rounded-xl -rotate-12 shadow-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="fade" delay={0.9}>
              <div className="absolute bottom-16 -right-2 bg-green-500 w-14 h-14 rounded-2xl rotate-45 shadow-lg flex items-center justify-center">
                <Zap className="w-7 h-7 text-white -rotate-45" />
              </div>
            </ScrollAnimation>

            {/* Achievement Cards */}
            <div className="space-y-4 mt-8">
              <ScrollAnimation direction="right" delay={0.4}>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    +2
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Years Experience
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="right" delay={0.6}>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    +9
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Projects Completed
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="right" delay={0.8}>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-12">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +1e18
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Happy Clients
                  </div>
                </div>
              </ScrollAnimation>
              <CodeforcesCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
