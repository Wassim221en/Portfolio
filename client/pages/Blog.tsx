import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, User, BookOpen } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Design', 'UX Research', 'Product', 'Development', 'Tips'];

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Design Systems: Building for Scale',
    excerpt: 'How modern design systems are evolving to meet the needs of growing organizations and complex products.',
    content: 'Design systems have become the backbone of modern product development...',
    category: 'Design',
    author: 'Patryk Ilnicki',
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    tags: ['Design Systems', 'Scalability', 'Product Design'],
    featured: true
  },
  {
    id: 2,
    title: 'User Research in the Age of AI: What\'s Changing?',
    excerpt: 'Exploring how artificial intelligence is transforming user research methods and what designers need to know.',
    content: 'As AI continues to reshape industries, user research is not immune to change...',
    category: 'UX Research',
    author: 'Patryk Ilnicki',
    date: '2024-03-12',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
    tags: ['AI', 'User Research', 'Innovation'],
    featured: true
  },
  {
    id: 3,
    title: '10 Essential Figma Plugins Every Designer Should Know',
    excerpt: 'Boost your productivity with these must-have Figma plugins that will transform your design workflow.',
    content: 'Figma has revolutionized the design industry with its collaborative features...',
    category: 'Tips',
    author: 'Patryk Ilnicki',
    date: '2024-03-10',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    tags: ['Figma', 'Productivity', 'Design Tools'],
    featured: false
  },
  {
    id: 4,
    title: 'From Concept to Launch: A Product Design Case Study',
    excerpt: 'A detailed walkthrough of designing a SaaS product from initial research to final implementation.',
    content: 'Product design is a journey that involves multiple stakeholders...',
    category: 'Product',
    author: 'Patryk Ilnicki',
    date: '2024-03-08',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    tags: ['Case Study', 'SaaS', 'Product Design'],
    featured: false
  },
  {
    id: 5,
    title: 'The Psychology of Color in Digital Interfaces',
    excerpt: 'Understanding how color choices impact user behavior and decision-making in digital products.',
    content: 'Color is one of the most powerful tools in a designer\'s arsenal...',
    category: 'Design',
    author: 'Patryk Ilnicki',
    date: '2024-03-05',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    tags: ['Color Theory', 'Psychology', 'UI Design'],
    featured: false
  },
  {
    id: 6,
    title: 'Building Accessible Interfaces: A Practical Guide',
    excerpt: 'Essential principles and practical tips for creating inclusive digital experiences for all users.',
    content: 'Accessibility in design is not just about compliance; it\'s about creating...',
    category: 'UX Research',
    author: 'Patryk Ilnicki',
    date: '2024-03-02',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg',
    tags: ['Accessibility', 'Inclusive Design', 'UX'],
    featured: false
  },
  {
    id: 7,
    title: 'Rapid Prototyping Techniques for Modern Designers',
    excerpt: 'Speed up your design process with these effective prototyping methods and tools.',
    content: 'In today\'s fast-paced development environment, rapid prototyping has become...',
    category: 'Development',
    author: 'Patryk Ilnicki',
    date: '2024-02-28',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    tags: ['Prototyping', 'Design Process', 'Productivity'],
    featured: false
  },
  {
    id: 8,
    title: 'The Rise of Voice UI: Designing for Conversational Interfaces',
    excerpt: 'How voice interfaces are changing user interaction and what designers need to consider.',
    content: 'Voice user interfaces represent a fundamental shift in how we interact...',
    category: 'Product',
    author: 'Patryk Ilnicki',
    date: '2024-02-25',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg',
    tags: ['Voice UI', 'Conversational Design', 'Future Tech'],
    featured: false
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const filterPosts = (category: string, search: string = searchTerm) => {
    let filtered = blogPosts;
    
    if (category !== 'All') {
      filtered = filtered.filter(post => post.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterPosts(category, searchTerm);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    filterPosts(selectedCategory, search);
  };

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <ScrollAnimation direction="up">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Design Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Insights, tips, and thoughts on product design, user experience, 
            and the evolving world of digital creation.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Featured Posts */}
      <ScrollAnimation direction="up" delay={0.2}>
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <ScrollAnimation key={post.id} direction="up" delay={0.1 * index}>
                <article className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* All Posts */}
      <ScrollAnimation direction="up" delay={0.3}>
        <section>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">All Articles</h2>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full lg:w-auto">
              <Tag className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
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

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollAnimation key={post.id} direction="up" delay={0.1 * index}>
                <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 text-purple-600 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatDate(post.date)}
                      </span>
                      <Link to={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-1.5"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </section>
      </ScrollAnimation>
    </div>
  );
}
