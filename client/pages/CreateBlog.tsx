import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, Tag, FileText, Calendar } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SimpleEditorJs from '@/components/SimpleEditorJs';
import EditorJsViewer from '@/components/EditorJsViewer';

interface BlogPostData {
  title: string;
  slug: string;
  shortDescription: string;
  tags: string[];
  coverImageUrl: string;
  contentJson: string;
}

export default function CreateBlog() {
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  
  const [formData, setFormData] = useState<BlogPostData>({
    title: '',
    slug: '',
    shortDescription: '',
    tags: [],
    coverImageUrl: '',
    contentJson: ''
  });
  
  const [tagInput, setTagInput] = useState('');
  const [editorData, setEditorData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setSaving] = useState(false);

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && { slug: generateSlug(value) })
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleEditorChange = (data: any) => {
    setEditorData(data);
    setFormData(prev => ({
      ...prev,
      contentJson: JSON.stringify(data)
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Validate required fields
      if (!formData.title || !formData.shortDescription || !editorData) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      // Get latest editor data
      if (editorRef.current) {
        const currentData = await editorRef.current.save();
        setEditorData(currentData);
        formData.contentJson = JSON.stringify(currentData);
      }

      // Prepare data for API
      const blogPostData = {
        ...formData,
        tages: formData.tags, // API expects 'tages' not 'tags'
        dateCreated: new Date().toISOString()
      };

      // Call your API to save the blog post
      const response = await fetch('https://localhost:7001/api/Blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(blogPostData)
      });

      if (response.ok) {
        const savedPost = await response.json();
        alert('تم حفظ المقال بنجاح!');
        navigate(`/blog/${savedPost.id}`);
      } else {
        throw new Error('فشل في حفظ المقال');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('حدث خطأ أثناء حفظ المقال');
    } finally {
      setSaving(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <ScrollAnimation direction="up">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link 
              to="/blog"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 mr-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للمدونة
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              إنشاء مقال جديد
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={togglePreview}
              className="flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'تعديل' : 'معاينة'}
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'جاري الحفظ...' : 'حفظ المقال'}
            </Button>
          </div>
        </div>
      </ScrollAnimation>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <ScrollAnimation direction="up" delay={0.1}>
            {showPreview ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  معاينة المقال
                </h2>
                
                {/* Preview Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {formData.title || 'عنوان المقال'}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {formData.shortDescription || 'وصف المقال'}
                  </p>
                  
                  {formData.coverImageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img 
                        src={formData.coverImageUrl} 
                        alt={formData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Preview Content */}
                {editorData && <EditorJsViewer data={editorData} />}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    معلومات المقال
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">عنوان المقال *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="اكتب عنوان المقال"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slug">الرابط</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="blog-post-url"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="description">وصف مختصر *</Label>
                    <Textarea
                      id="description"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      placeholder="اكتب وصفاً مختصراً للمقال"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="coverImage">صورة الغلاف</Label>
                    <Input
                      id="coverImage"
                      value={formData.coverImageUrl}
                      onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
                      placeholder="رابط صورة الغلاف"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Editor */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    محتوى المقال
                  </h2>
                  <SimpleEditorJs
                    ref={editorRef}
                    onChange={handleEditorChange}
                    placeholder="ابدأ بكتابة مقالك هنا..."
                  />
                </div>
              </div>
            )}
          </ScrollAnimation>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                التصنيفات والكلمات المفتاحية
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tags">إضافة تصنيف</Label>
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="اكتب التصنيف واضغط Enter"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    اضغط Enter لإضافة التصنيف
                  </p>
                </div>
                
                {formData.tags.length > 0 && (
                  <div>
                    <Label>التصنيفات المضافة</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full flex items-center cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/50"
                          onClick={() => removeTag(tag)}
                          title="انقر للحذف"
                        >
                          {tag} ×
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  معلومات النشر
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  تاريخ الإنشاء: {new Date().toLocaleDateString('ar-SA')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  المؤلف: Wassim
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
