import { Code, Palette, Users, Zap, Database, Settings, Wrench, GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export default function About() {
  const services = [
    {
      icon: Palette,
      title: 'Product Design',
      description: 'Creating user-centered designs for digital products'
    },
    {
      icon: Code,
      title: 'Design Systems',
      description: 'Building scalable and consistent design systems'
    },
    {
      icon: Users,
      title: 'User Experience',
      description: 'Research and design for optimal user experiences'
    },
    {
      icon: Zap,
      title: 'Prototyping',
      description: 'Interactive prototypes and design validation'
    },
    {
      icon: Database,
      title: 'Performance Optimization',
      description: 'Optimizing design performance and efficiency'
    },
    {
      icon: Settings,
      title: 'Maintenance & Support',
      description: 'Ongoing design support and maintenance'
    }
  ];

  const tools = [
    {
      name: 'Figma',
      category: 'Design Tool',
      icon: '🎨',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Adobe Creative Suite',
      category: 'Design Suite',
      icon: '🎯',
      color: 'bg-red-100 text-red-700'
    },
    {
      name: 'Sketch',
      category: 'UI Design',
      icon: '⚡',
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      name: 'Principle',
      category: 'Prototyping',
      icon: '🔄',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Framer',
      category: 'Interactive Design',
      icon: '💫',
      color: 'bg-green-100 text-green-700'
    },
    {
      name: 'Miro',
      category: 'Collaboration',
      icon: '🤝',
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  const experience = [
    {
      title: 'Senior Product Designer',
      company: 'TechCorp',
      period: '2020 - Present',
      description: 'Leading design system initiatives and product strategy for SaaS applications.',
      icon: Briefcase
    },
    {
      title: 'Product Designer',
      company: 'StartupXYZ',
      period: '2018 - 2020',
      description: 'Designed user experiences for mobile and web applications from concept to launch.',
      icon: Briefcase
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      period: '2015 - 2018',
      description: 'Created digital solutions for various clients across different industries.',
      icon: Briefcase
    }
  ];

  const education = [
    {
      degree: 'Master of Design',
      school: 'Design Institute',
      period: '2013 - 2015',
      description: 'Specialized in Human-Computer Interaction and User Experience Design',
      icon: GraduationCap
    },
    {
      degree: 'Bachelor of Graphic Design',
      school: 'Art University',
      period: '2009 - 2013',
      description: 'Foundation in visual design, typography, and digital media',
      icon: GraduationCap
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Content */}
        <div className="w-full lg:w-auto">
          <ScrollAnimation direction="left">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Wassim Alshami
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-600 mb-8">
                Back End Developer
              </h2>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={0.2}>
            <div className="prose prose-lg text-gray-600 mb-12">
              <p className="text-lg leading-relaxed mb-6">
                I am Wassim Alshami, a back-end developer with over a year of experience in ASP.NET. I specialize in designing high-performance software and solving complex technical challenges. Passionate about problem-solving, I’ve competed in the ICPC and local contests in Syria, also serving as a coach. With 1,800+ problems solved on Codeforces, I bring strong analytical skills to deliver efficient and innovative solutions.
              </p>
            </div>
          </ScrollAnimation>

          {/* Services Section */}
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <ScrollAnimation key={index} direction="up" delay={0.1 * index}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <service.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {service.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Tools Section */}
          <ScrollAnimation direction="up">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {tools.map((tool, index) => (
                  <ScrollAnimation key={index} direction="fade" delay={0.1 * index}>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tool.color} text-2xl mb-3`}>
                          {tool.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Experience Section */}
          <ScrollAnimation direction="right">
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <ScrollAnimation key={index} direction="right" delay={0.2 * index}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <exp.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {exp.title}
                            </h4>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-purple-600 font-medium mb-2">{exp.company}</p>
                          <p className="text-sm text-gray-600">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Education Section */}
          <ScrollAnimation direction="left">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <ScrollAnimation key={index} direction="left" delay={0.2 * index}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <edu.icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {edu.degree}
                            </h4>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-purple-600 font-medium mb-2">{edu.school}</p>
                          <p className="text-sm text-gray-600">
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
        </div>

        {/* Right Content - Profile Image Area */}
        <div className="hidden lg:block lg:pl-8">
          <div className="relative">
            {/* Profile Image */}
            <ScrollAnimation direction="right" delay={0.3}>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 mb-8 shadow-inner">
                <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto shadow-lg border-4 border-white">
                  <img
                    src="/images/wassim.png"
                    alt="Profile"
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
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">9+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="right" delay={0.6}>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="right" delay={0.8}>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
