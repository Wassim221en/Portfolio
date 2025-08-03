import { useState } from 'react';
import { ExternalLink, Github, Calendar, Tag, Filter } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Web Design', 'Mobile App', 'SaaS', 'E-commerce', 'Design System'];

const projects = [
  {
    id: 1,
    title: 'TaskFlow - Project Management App',
    description: 'A comprehensive project management solution designed for modern teams. Features include task tracking, team collaboration, and progress visualization.',
    category: 'SaaS',
    image: 'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg',
    tags: ['UI/UX Design', 'React', 'Design System'],
    year: '2024',
    status: 'Live',
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 2,
    title: 'ShopEase - E-commerce Platform',
    description: 'Modern e-commerce platform with focus on user experience and conversion optimization. Includes admin dashboard and mobile app.',
    category: 'E-commerce',
    image: 'https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg',
    tags: ['E-commerce', 'Mobile Design', 'UX Research'],
    year: '2024',
    status: 'In Development',
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 3,
    title: 'HealthTech Mobile App',
    description: 'Healthcare mobile application for patient monitoring and doctor consultations. Features include appointment scheduling and health tracking.',
    category: 'Mobile App',
    image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
    tags: ['Mobile App', 'Healthcare', 'User Research'],
    year: '2023',
    status: 'Live',
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    id: 4,
    title: 'Creative Agency Website',
    description: 'Portfolio website for a creative agency specializing in brand identity and digital experiences. Focus on visual storytelling.',
    category: 'Web Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    tags: ['Web Design', 'Branding', 'Animation'],
    year: '2023',
    status: 'Live',
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    id: 5,
    title: 'Financial Dashboard',
    description: 'Complex data visualization dashboard for financial analytics. Includes real-time charts, reports, and portfolio management tools.',
    category: 'SaaS',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    tags: ['Data Visualization', 'Dashboard', 'Finance'],
    year: '2023',
    status: 'Live',
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    id: 6,
    title: 'Design System Library',
    description: 'Comprehensive design system for a SaaS company. Includes components, guidelines, and documentation for consistent user experiences.',
    category: 'Design System',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    tags: ['Design System', 'Components', 'Documentation'],
    year: '2023',
    status: 'Live',
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const filterProjects = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <ScrollAnimation direction="up">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my recent work including web applications, mobile apps, 
            and design systems. Each project represents a unique challenge and solution.
          </p>
        </div>
      </ScrollAnimation>

      {/* Featured Projects */}
      <ScrollAnimation direction="up" delay={0.2}>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ScrollAnimation key={project.id} direction="up" delay={0.1 * index}>
                <div className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <a 
                        href={project.liveUrl}
                        className="p-2 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a 
                        href={project.githubUrl}
                        className="p-2 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{project.category}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* All Projects */}
      <ScrollAnimation direction="up" delay={0.3}>
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">All Projects</h2>
            
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => filterProjects(category)}
                    className={`whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'border-gray-300 hover:border-purple-600 hover:text-purple-600'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollAnimation key={project.id} direction="up" delay={0.1 * index}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-1">
                      <a 
                        href={project.liveUrl}
                        className="p-1.5 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 duration-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a 
                        href={project.githubUrl}
                        className="p-1.5 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 duration-300 delay-75"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-600 font-medium">{project.category}</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </section>
      </ScrollAnimation>
    </div>
  );
}
