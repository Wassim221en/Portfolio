import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Code2, Database, Server } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { Button } from '@/components/ui/button';

const blogPost = {
  id: 1,
  title: 'Building Scalable APIs: From Design to Production',
  excerpt: 'A comprehensive guide to designing and implementing scalable backend APIs using modern best practices.',
  category: 'Backend Development',
  author: 'Patryk Ilnicki',
  date: '2024-03-15',
  readTime: '12 min read',
  image: 'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg',
  tags: ['Node.js', 'API Design', 'Scalability', 'Best Practices'],
  content: `
    <p>Building scalable APIs is one of the most critical aspects of modern backend development. In this comprehensive guide, we'll walk through the entire process from initial design considerations to production deployment.</p>

    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#api-design">API Design Principles</a></li>
      <li><a href="#data-modeling">Data Modeling & Database Design</a></li>
      <li><a href="#implementation">Implementation Best Practices</a></li>
      <li><a href="#performance">Performance Optimization</a></li>
      <li><a href="#monitoring">Monitoring & Observability</a></li>
    </ul>

    <h2 id="api-design">API Design Principles</h2>
    <p>When designing APIs, following consistent patterns and standards is crucial for maintainability and developer experience. Here are the key principles:</p>

    <h3>RESTful Design Patterns</h3>
    <p>REST APIs should follow predictable patterns that make them intuitive for developers to use:</p>
  `
};

// Sample code snippets for the article
const codeSnippets = {
  apiRoutes: `// Express.js API Routes Example
const express = require('express');
const router = express.Router();

// GET /api/users - Get all users with pagination
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    
    const query = {
      offset,
      limit: parseInt(limit),
      ...(search && { 
        where: {
          name: { [Op.iLike]: \`%\${search}%\` }
        }
      })
    };
    
    const users = await User.findAndCountAll(query);
    
    res.json({
      data: users.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: users.count,
        pages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;`,

  dataValidation: `// Data Validation with Joi
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
  role: Joi.string().valid('user', 'admin', 'moderator').default('user')
});

// Validation middleware
const validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }
  
  req.validatedData = value;
  next();
};`,

  databaseQuery: `-- Optimized Database Query with Indexing
-- Create composite index for common query patterns
CREATE INDEX idx_users_active_created 
ON users(is_active, created_at DESC) 
WHERE is_active = true;

-- Query with proper joins and filtering
SELECT 
  u.id,
  u.name,
  u.email,
  p.title as profile_title,
  COUNT(po.id) as post_count
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id
LEFT JOIN posts po ON u.id = po.author_id AND po.published = true
WHERE u.is_active = true
  AND u.created_at >= $1
GROUP BY u.id, u.name, u.email, p.title
ORDER BY u.created_at DESC
LIMIT $2 OFFSET $3;`,

  caching: `// Redis Caching Strategy
const redis = require('redis');
const client = redis.createClient();

class CacheService {
  static async get(key) {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  static async set(key, data, ttl = 3600) {
    try {
      await client.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
  
  static async invalidate(pattern) {
    try {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }
}

// Usage in API endpoint
router.get('/users/:id', async (req, res) => {
  const cacheKey = \`user:\${req.params.id}\`;
  
  // Try cache first
  let user = await CacheService.get(cacheKey);
  
  if (!user) {
    // Fetch from database
    user = await User.findByPk(req.params.id);
    
    if (user) {
      // Cache for 1 hour
      await CacheService.set(cacheKey, user, 3600);
    }
  }
  
  res.json(user);
});`
};

// Performance comparison table data
const performanceData = [
  { metric: 'Response Time', before: '450ms', after: '89ms', improvement: '80.2%' },
  { metric: 'Throughput (req/s)', before: '2,400', after: '12,800', improvement: '433%' },
  { metric: 'Database Queries', before: '15', after: '3', improvement: '80%' },
  { metric: 'Memory Usage', before: '256MB', after: '164MB', improvement: '36%' },
  { metric: 'Error Rate', before: '2.1%', after: '0.3%', improvement: '85.7%' }
];

// API endpoints comparison
const apiEndpoints = [
  { method: 'GET', endpoint: '/api/users', description: 'Fetch paginated users', cache: 'Yes', rateLimit: '100/min' },
  { method: 'POST', endpoint: '/api/users', description: 'Create new user', cache: 'No', rateLimit: '20/min' },
  { method: 'GET', endpoint: '/api/users/:id', description: 'Get user by ID', cache: 'Yes', rateLimit: '200/min' },
  { method: 'PUT', endpoint: '/api/users/:id', description: 'Update user', cache: 'No', rateLimit: '50/min' },
  { method: 'DELETE', endpoint: '/api/users/:id', description: 'Delete user', cache: 'No', rateLimit: '10/min' }
];

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back Button */}
      <ScrollAnimation direction="up">
        <Link 
          to="/blog"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </ScrollAnimation>

      {/* Article Header */}
      <ScrollAnimation direction="up" delay={0.1}>
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-4">
              {blogPost.category}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {blogPost.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {blogPost.excerpt}
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {blogPost.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              March 15, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {blogPost.readTime}
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img 
              src={blogPost.image} 
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blogPost.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
      </ScrollAnimation>

      {/* Article Content */}
      <ScrollAnimation direction="up" delay={0.2}>
        <article className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
            <div className="flex items-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-blue-900 m-0">What You'll Learn</h3>
            </div>
            <ul className="text-blue-800 m-0">
              <li>RESTful API design principles and best practices</li>
              <li>Database optimization techniques for better performance</li>
              <li>Caching strategies to reduce server load</li>
              <li>Monitoring and observability implementation</li>
              <li>Production deployment considerations</li>
            </ul>
          </div>

          {/* API Design Section */}
          <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
            <Code2 className="w-6 h-6 mr-3 text-purple-600" />
            API Design Principles
          </h2>
          
          <p>Building scalable APIs requires careful consideration of design patterns, data structures, and performance optimization. Let's start with the fundamental building blocks.</p>

          {/* API Endpoints Table */}
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Endpoint</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cache</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Rate Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apiEndpoints.map((endpoint, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{endpoint.endpoint}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{endpoint.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{endpoint.cache}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{endpoint.rateLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Code Example 1 */}
          <h3>Express.js Route Implementation</h3>
          <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
            <pre className="text-green-400 text-sm leading-relaxed">
              <code>{codeSnippets.apiRoutes}</code>
            </pre>
          </div>

          {/* Data Validation Section */}
          <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
            <Database className="w-6 h-6 mr-3 text-purple-600" />
            Data Validation & Security
          </h2>
          
          <p>Proper data validation is crucial for API security and reliability. Here's how to implement robust validation using Joi:</p>

          {/* Code Example 2 */}
          <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
            <pre className="text-green-400 text-sm leading-relaxed">
              <code>{codeSnippets.dataValidation}</code>
            </pre>
          </div>

          {/* Performance Section */}
          <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
            <Server className="w-6 h-6 mr-3 text-purple-600" />
            Performance Optimization Results
          </h2>
          
          <p>After implementing the optimization strategies discussed above, here are the performance improvements we achieved:</p>

          {/* Performance Table */}
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium">Metric</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Before</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">After</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {performanceData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.metric}</td>
                    <td className="px-4 py-3 text-gray-600">{row.before}</td>
                    <td className="px-4 py-3 text-gray-600">{row.after}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                        +{row.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Database Optimization */}
          <h3>Database Query Optimization</h3>
          <p>Optimizing database queries is essential for API performance. Here's an example of an optimized query with proper indexing:</p>

          <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
            <pre className="text-blue-400 text-sm leading-relaxed">
              <code>{codeSnippets.databaseQuery}</code>
            </pre>
          </div>

          {/* Caching Strategy */}
          <h3>Redis Caching Implementation</h3>
          <p>Implementing a robust caching layer can dramatically improve API response times:</p>

          <div className="bg-gray-900 rounded-lg p-6 my-6 overflow-x-auto">
            <pre className="text-yellow-400 text-sm leading-relaxed">
              <code>{codeSnippets.caching}</code>
            </pre>
          </div>

          {/* Best Practices Callout */}
          <div className="bg-green-50 border-l-4 border-green-400 p-6 my-8 rounded-r-lg">
            <h4 className="text-lg font-semibold text-green-900 mb-3">💡 Key Takeaways</h4>
            <ul className="text-green-800 space-y-2">
              <li><strong>Always validate input data</strong> - Use schema validation libraries like Joi or Yup</li>
              <li><strong>Implement proper caching</strong> - Use Redis for frequently accessed data</li>
              <li><strong>Optimize database queries</strong> - Create proper indexes and avoid N+1 problems</li>
              <li><strong>Monitor performance</strong> - Use tools like New Relic or DataDog</li>
              <li><strong>Handle errors gracefully</strong> - Provide meaningful error messages</li>
            </ul>
          </div>

          {/* Conclusion */}
          <h2>Conclusion</h2>
          <p>Building scalable APIs requires attention to detail in design, implementation, and monitoring. By following these best practices and continuously optimizing based on real-world usage data, you can create APIs that perform well under load and provide excellent developer experience.</p>

          <p>The techniques covered in this article have helped reduce our API response times by over 80% while increasing throughput by more than 400%. Remember that optimization is an ongoing process - continue monitoring and improving your APIs as your application grows.</p>

        </article>
      </ScrollAnimation>

      {/* Article Footer */}
      <ScrollAnimation direction="up" delay={0.3}>
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-lg">
                P
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{blogPost.author}</h4>
                <p className="text-sm text-gray-600">Senior Backend Developer & Product Designer</p>
              </div>
            </div>
            <Button variant="outline">
              Follow
            </Button>
          </div>
        </footer>
      </ScrollAnimation>

      {/* Related Articles */}
      <ScrollAnimation direction="up" delay={0.4}>
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/blog" className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
                Building Microservices with Node.js
              </h4>
              <p className="text-sm text-gray-600">Learn how to architect and deploy scalable microservices...</p>
            </Link>
            <Link to="/blog" className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
                Database Design Patterns for Scale
              </h4>
              <p className="text-sm text-gray-600">Essential database patterns for high-performance applications...</p>
            </Link>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
