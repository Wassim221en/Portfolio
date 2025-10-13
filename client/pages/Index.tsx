import {
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Github,
  Calendar,
  ArrowRight,
  Clock,
  User,
  BookOpen,
  Quote,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortfolioWork } from "@/components/PortfolioWork";
import { Services } from "@/components/Services";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { categories, projects } from "@/components/projects";
import { blogPosts } from "@/components/blogs";
import { SmartImage } from "@/components/SmartImage";
export default function Index() {
  const [emailCopied, setEmailCopied] = useState(false);

  // Get first 2 recommendations for homepage preview (fetched)
  type HomeRecommendation = { id: string; user: string; position: string; company: string; body: string };
  const [homeRecommendations, setHomeRecommendations] = useState<HomeRecommendation[]>([]);
  const [recommendationsCount, setRecommendationsCount] = useState(0);
  useEffect(() => {
    fetch("https://wassim221e.pythonanywhere.com/api/recommendations/getall")
      .then((res) => res.json())
      .then((data: any[]) => {
        setRecommendationsCount(Array.isArray(data) ? data.length : 0);
        const mapped = (Array.isArray(data) ? data : []).map((rec: any) => ({
          id: rec.id || rec._id || `${rec.recommender_name}-${rec.recommendation_date}`,
          user: rec.recommender_name,
          position: rec.recommender_title,
          company: rec.recommender_company,
          body: rec.recommendation_text,
        }));
        setHomeRecommendations(mapped.slice(0, 2));
      })
      .catch(() => {
        setHomeRecommendations([]);
        setRecommendationsCount(0);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("wassim221e@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email");
    }
  };
  useEffect(() => {
    const sendVisitInfo = async () => {
      try {
        await fetch("https://localhost:7001/api/Statics/AddVisitor", {
          method: "POST",
          headers: {
            Accept: "*/*",
          },
        });
      } catch (error) {
        console.error("Error sending statics info:", error);
      }
    };

    sendVisitInfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Hero Section */}
      <div className="mb-12 lg:mb-16">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Hello! I'm Wassim Alshami
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Back End Developer
            </h2>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-base sm:text-lg">Syria</span>
            </div>
          </div>
        </div>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
          I am Wassim Alshami, a back-end developer more than two years of
          experience in ASP.NET. I specialize in designing high-performance
          software and solving complex technical challenges. Passionate about
          problem-solving, I’ve competed in the ICPC and local contests in
          Syria, also serving as a coach. With 1,800+ problems solved on
          Codeforces, I bring strong analytical skills to deliver efficient and
          innovative solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium w-full sm:w-auto transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            <a
              href="https://drive.google.com/file/d/135cpnpxUpNZD9II4Jk_ptr2PThIbfutZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              My CV
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

      {/* Featured Projects Section */}
      <ScrollAnimation direction="up">
        <section className="mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Some of my recent work that I'm proud of
              </p>
            </div>
            <Link to="/Portfolio/projects">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollAnimation
                key={project.id}
                direction="up"
                delay={0.1 * index}
              >
                <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <SmartImage name={project.image.split('.')[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "Live"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
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
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          className="p-1.5 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 duration-300 delay-75"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-purple-600 font-medium">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
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


      {/* Featured Blog Posts Section */}
      <ScrollAnimation direction="up">
        <section className="mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Latest Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Insights and thoughts on development and design
              </p>
            </div>
            <Link to="/Portfolio/blog">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <ScrollAnimation key={post.id} direction="up" delay={0.1 * index}>
                <article className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

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
                      <Link to={`/Portfolio/blog/${post.id}`}>
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

      {/* Service Section */}
      <Services />

      {/* Recommendations Section */}
      <ScrollAnimation direction="up">
        <section className="mb-16 lg:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What People Say
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Don't just take my word for it
              </p>
            </div>
            <Link to="/Portfolio/recommendations">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View All ({recommendationsCount})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {homeRecommendations.map((recommendation, index) => (
              <ScrollAnimation
                key={recommendation.id}
                direction="up"
                delay={0.1 * index}
              >
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-100 dark:border-purple-800 h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {recommendation.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {recommendation.user}
                        </h4>
                        <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                          {recommendation.position}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          {recommendation.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <Quote className="w-6 h-6 text-purple-300 dark:text-purple-600 mb-3" />
                      <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-sm line-clamp-4">
                        "{recommendation.body}"
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/Portfolio/recommendations">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Read All Recommendations
              </Button>
            </Link>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
