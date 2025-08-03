import { MapPin, Copy, Check, ExternalLink, Github, Calendar, ArrowRight, Clock, User, BookOpen, Quote } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PortfolioWork } from '@/components/PortfolioWork';
import { Services } from '@/components/Services';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export default function Index() {
  const [emailCopied, setEmailCopied] = useState(false);

  // Featured projects data
  const featuredProjects = [
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
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'ShopEase - E-commerce Platform',
      description: 'Modern e-commerce platform with focus on user experience and conversion optimization.',
      category: 'E-commerce',
      image: 'https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg',
      tags: ['E-commerce', 'Mobile Design', 'UX Research'],
      year: '2024',
      status: 'In Development',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  // Featured blog posts data
  const featuredBlogPosts = [
    {
      id: 1,
      title: 'The Future of Design Systems: Building for Scale',
      excerpt: 'How modern design systems are evolving to meet the needs of growing organizations and complex products.',
      category: 'Design',
      author: 'Wassim Alshami',
      date: '2024-03-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      tags: ['Design Systems', 'Scalability', 'Product Design']
    },
    {
      id: 2,
      title: 'User Research in the Age of AI: What\'s Changing?',
      excerpt: 'Exploring how artificial intelligence is transforming user research methods and what designers need to know.',
      category: 'UX Research',
      author: 'Wassim Alshami',
      date: '2024-03-12',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
      tags: ['AI', 'User Research', 'Innovation']
    }
  ];

  // Recommendations data
  const recommendations = [
    {
      user: "Adel Abobacker",
      position: "Senior WordPress Developer",
      imageUrl: "",
      body: "Wassim Alshami is an exceptional back-end developer with expertise in ASP.NET and problem-solving. He excels in performance optimization, scalable architecture, and high code quality. A great team player, he shares knowledge and tackles challenges efficiently. I highly recommend him!"
    }
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('wassim221e@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Hero Section */}
      <div className="mb-12 lg:mb-16">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Hello! I'm Wassim Alshami
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Back End Developer
            </h2>
            <div className="flex items-center space-x-1 text-gray-600 mt-2 sm:mt-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-base sm:text-lg">Syria</span>
            </div>
          </div>
        </div>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mb-6 lg:mb-8">
          I am Wassim Alshami, a back-end developer with over a year of experience in ASP.NET. I specialize in designing high-performance software and solving complex technical challenges. Passionate about problem-solving, I’ve competed in the ICPC and local contests in Syria, also serving as a coach. With 1,800+ problems solved on Codeforces, I bring strong analytical skills to deliver efficient and innovative solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium w-full sm:w-auto transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            <a
              href="https://drive.google.com/file/d/1C7aeidZVG5FdZRj3iNylxKYXIQok_7Pb/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              My CV
            </a>
          </Button>
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium w-full sm:w-auto transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            <a
              href="https://gitlab.com/wassim221e"
              target="_blank"
              rel="noopener noreferrer"
            >
              My GitLab
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={copyEmail}
            className="border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 w-full sm:w-auto transition-all duration-200 transform hover:scale-105 hover:shadow-md"
          >
            {emailCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy email</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Portfolio Work Section */}
      <PortfolioWork />
      {/* Service Section */}
      <Services/>
    </div>
  );
}
