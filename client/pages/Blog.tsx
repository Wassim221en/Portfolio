import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  User,
  BookOpen,
  Loader2,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";

// Blog post interface based on the API response
interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  tages: string[]; // Note: API has "tages" not "tags"
  dateCreated: string;
  coverImageUrl: string;
}

// Extended interface for display purposes
interface DisplayBlogPost extends BlogPost {
  category?: string;
  author?: string;
  readTime?: string;
  featured?: boolean;
}

const categories = [
  "All",
  "Tech",
  "CSharp",
  "EFCore",
  "Programming",
  "ASP.NET",
  "Tutorial",
];
export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState<DisplayBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<DisplayBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://localhost:7001/api/Blog/GetAll`,
          {
            headers: {
              'accept': '*/*',
              'ngrok-skip-browser-warning': 'true'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BlogPost[] = await response.json();

        // Transform API data to display format
        const transformedPosts: DisplayBlogPost[] = data.map((post, index) => ({
          ...post,
          category: post.tages[0] || "General", // Use first tag as category
          author: "Wassim", // Default author
          readTime: "5 min read", // Default read time
          featured: index < 2, // Make first 2 posts featured
        }));

        setBlogPosts(transformedPosts);
        setFilteredPosts(transformedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filterPosts = (category: string, search: string = searchTerm) => {
    let filtered = blogPosts;

    if (category !== "All") {
      filtered = filtered.filter((post) =>
        post.tages.some((tag) => tag.toLowerCase() === category.toLowerCase()),
      );
    }

    if (search) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
          post.tages.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase()),
          ),
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

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading blog posts...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="mb-4">
              <Search className="w-16 h-16 text-red-300 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Blog Posts
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <ScrollAnimation direction="up">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Design Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Insights, tips, and thoughts on product design, user experience, and
            the evolving world of digital creation.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Featured Posts */}
      <ScrollAnimation direction="up" delay={0.2}>
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <ScrollAnimation key={post.id} direction="up" delay={0.1 * index}>
                <article className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.coverImageUrl}
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
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.dateCreated)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tages.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-0">
              All Articles
            </h2>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full lg:w-auto">
              <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className={`whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border-gray-300 hover:border-purple-600 hover:text-purple-600"
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
                <article className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.coverImageUrl}
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
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
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
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(post.dateCreated)}
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
                      {post.tages.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tages.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                          +{post.tages.length - 2}
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </section>
      </ScrollAnimation>
    </div>
  );
}
