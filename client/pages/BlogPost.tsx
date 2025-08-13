import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, Eye, Loader2 } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';
import EditorJsViewer from '@/components/EditorJsViewer';

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  contentJson: string;
  coverImageUrl: string;
  shortDescription: string;
  tages: string[];
  dateCreated: string;
  dateUpdated?: string;
  loves: number;
  views: number;
}

interface EditorJsData {
  time?: number;
  blocks: any[];
  version?: string;
}

export default function BlogPost() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<EditorJsData | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError('معرف المقال مفقود');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://localhost:7001/api/Blog/${id}`,
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

        const data: BlogPostData = await response.json();
        setBlogPost(data);

        // Parse the contentJson
        try {
          const parsedContent: EditorJsData = JSON.parse(data.contentJson);
          setEditorData(parsedContent);
        } catch (parseError) {
          console.error('Error parsing contentJson:', parseError);
          setError('خطأ في تحليل محتوى المقال');
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('فشل في تحميل المقال. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-300">
              جاري تحميل المقال...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blogPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-red-600 dark:text-red-400 text-2xl">!</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              خطأ في تحميل المقال
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                إعادة المحاولة
              </Button>
              <Link to="/blog">
                <Button variant="outline">
                  العودة للمدونة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back Button */}
      <ScrollAnimation direction="up">
        <Link 
          to="/blog"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          العودة للمدونة
        </Link>
      </ScrollAnimation>

      {/* Article Header */}
      <ScrollAnimation direction="up" delay={0.1}>
        <header className="mb-12">
          {/* Category Badge */}
          <div className="mb-6">
            {blogPost.tages.length > 0 && (
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-4">
                {blogPost.tages[0]}
              </span>
            )}
            
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {blogPost.title}
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {blogPost.shortDescription}
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Wassim
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(blogPost.dateCreated)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              5 دقائق قراءة
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {formatNumber(blogPost.views)} مشاهدة
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              {formatNumber(blogPost.loves)} إعجاب
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="w-4 h-4 mr-2" />
              مشاركة
            </Button>
          </div>

          {/* Featured Image */}
          {blogPost.coverImageUrl && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img 
                src={blogPost.coverImageUrl} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tags */}
          {blogPost.tages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blogPost.tages.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </ScrollAnimation>

      {/* Article Content */}
      <ScrollAnimation direction="up" delay={0.2}>
        <article className="mb-12">
          {editorData ? (
            <EditorJsViewer data={editorData} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                لا يوجد محتوى متاح للعرض
              </p>
            </div>
          )}
        </article>
      </ScrollAnimation>

      {/* Article Footer */}
      <ScrollAnimation direction="up" delay={0.3}>
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                W
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Wassim</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">مطور ومصمم تطبيقات</p>
              </div>
            </div>
            <Button variant="outline">
              متابعة
            </Button>
          </div>
        </footer>
      </ScrollAnimation>

      {/* Related Articles */}
      <ScrollAnimation direction="up" delay={0.4}>
        <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">مقالات ذات صلة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/blog" 
              className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-2">
                تطوير تطبيقات الويب الحديثة
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تعلم كيفية بناء تطبيقات ويب سريعة وفعالة...
              </p>
            </Link>
            <Link 
              to="/blog" 
              className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-2">
                أفضل الممارسات في البرمجة
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نصائح وحيل لتحسين جودة الكود...
              </p>
            </Link>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
