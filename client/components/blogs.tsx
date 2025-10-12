
export const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable APIs with ASP.NET Core',
    excerpt: 'Discover how to architect and build high-performance APIs using ASP.NET Core for modern applications.',
    content: 'ASP.NET Core has become a top choice for backend development thanks to its performance, modularity, and cross-platform capabilities...',
    category: 'Backend',
    author: 'Wassim Alshami',
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    tags: ['ASP.NET Core', 'API', 'Scalability'],
    featured: true
  },
  {
    id: 2,
    title: 'Authentication & Authorization in ASP.NET Core',
    excerpt: 'Learn how to secure your backend applications with modern authentication and authorization techniques.',
    content: 'Security is a critical part of any backend system. ASP.NET Core offers a powerful Identity framework, JWT authentication, and policy-based authorization...',
    category: 'Security',
    author: 'Wassim Alshami',
    date: '2024-03-12',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
    tags: ['Authentication', 'Authorization', 'Identity', 'JWT'],
    featured: true
  },
  {
    id: 3,
    title: 'Top 10 ASP.NET Core Middleware Every Developer Should Know',
    excerpt: 'Boost your backend with these essential middleware components to handle requests, errors, and more.',
    content: 'Middleware is at the heart of the ASP.NET Core pipeline. Understanding how to use and create middleware can greatly enhance your app’s functionality...',
    category: 'Tips',
    author: 'Wassim Alshami',
    date: '2024-03-10',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    tags: ['Middleware', 'ASP.NET Core', 'Best Practices'],
    featured: false
  },
  {
    id: 4,
    title: 'Case Study: From Idea to Deployment with ASP.NET Core',
    excerpt: 'Follow a real-world example of building and deploying a production-ready backend using ASP.NET Core.',
    content: 'This case study covers the entire journey of backend development: architecture, data access, security, testing, and deployment...',
    category: 'Case Study',
    author: 'Wassim Alshami',
    date: '2024-03-08',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg',
    tags: ['Case Study', 'Deployment', 'Backend'],
    featured: false
  },
  {
    id: 5,
    title: 'Optimizing Performance in ASP.NET Core Applications',
    excerpt: 'Learn how caching, async programming, and configuration tuning can drastically improve backend performance.',
    content: 'Performance optimization is key for modern APIs. Techniques like response caching, async/await, and database connection pooling can make a big difference...',
    category: 'Performance',
    author: 'Wassim Alshami',
    date: '2024-03-05',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    tags: ['Performance', 'Caching', 'Async'],
    featured: false
  },
  {
    id: 6,
    title: 'Building RESTful APIs: Best Practices with ASP.NET Core',
    excerpt: 'A practical guide to designing clean, maintainable, and RESTful APIs using ASP.NET Core.',
    content: 'RESTful APIs remain the backbone of many modern applications. ASP.NET Core offers tools to implement them with clarity and structure...',
    category: 'API Design',
    author: 'Wassim Alshami',
    date: '2024-03-02',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    tags: ['REST', 'API', 'Best Practices'],
    featured: false
  },
  {
    id: 7,
    title: 'Entity Framework Core: Rapid Data Access for ASP.NET Core',
    excerpt: 'Learn how to integrate EF Core to simplify database interactions and speed up development.',
    content: 'Entity Framework Core is Microsoft’s lightweight ORM that enables developers to work with databases using .NET objects...',
    category: 'Data Access',
    author: 'Wassim Alshami',
    date: '2024-02-28',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    tags: ['EF Core', 'Database', 'ORM'],
    featured: false
  },
  {
    id: 8,
    title: 'gRPC in ASP.NET Core: High-Performance Communication',
    excerpt: 'Discover how gRPC provides a faster alternative to REST for service-to-service communication.',
    content: 'gRPC is becoming popular for backend microservices. ASP.NET Core offers first-class support for building efficient gRPC services...',
    full_content: "",
    category: 'Architecture',
    author: 'Wassim Alshami',
    date: '2024-02-25',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
    tags: ['gRPC', 'Microservices', 'ASP.NET Core'],
    featured: false
  },
  {
    id: 9,
    title: 'Refresh Tokens in SaaS: Secure Authentication Done Right',
    excerpt: 'Learn how to implement refresh tokens securely using hashing, rotation, and proper data modeling in ASP.NET Core.',
    content: 'Refresh tokens play a crucial role in maintaining user sessions in modern SaaS applications. Unlike short-lived access tokens, refresh tokens enable long-term authentication without repeated logins...',
    text: `
  🚀 How to Properly Handle Refresh Tokens in Modern SaaS Applications
  When building authentication flows with JWT in multi-tenant SaaS systems, access tokens alone are not enough. Since access tokens usually have a short lifetime (e.g., 15 minutes), we need a secure way to keep users logged in without asking them to re-authenticate all the time.
👉 That’s where refresh tokens come in.

🧠 What is a Refresh Token?

A refresh token is a long-lived credential issued alongside the access token. It allows the client to request new access tokens without asking the user to log in again. Typically, refresh tokens live for weeks or months.

🛡️ Secure Storage: Hash, Don’t Store Plain Text

Never store refresh tokens as plain text in your database.
Instead:

Generate a cryptographically secure random string (e.g., 32 bytes).

Store only its hash (e.g., SHA-256) in the database.

Return the plain token to the client only once.

This way, even if the database is leaked, attackers can’t reuse stolen refresh tokens.

🔄 Rotation: The Modern Standard

In professional SaaS systems, rotating refresh tokens is a must:

User logs in → Receives AccessToken + RefreshToken (R1).

Later, the client uses R1 to refresh → Server issues R2 and invalidates R1.

Any reuse of R1 afterwards is detected and treated as suspicious.

This rotation flow significantly reduces the risk of replay attacks and allows for better session control across devices.

🧱 Data Model Example

A typical RefreshToken entity might include:

UserId → Link to the user

TokenHash → Securely stored hash

ExpiresAt → Token lifetime

IsUsed & IsRevoked → Track usage & revocation

DeviceId, IpAddress → Optional, for multi-device sessions and auditing

This gives you fine-grained control to revoke tokens per device, detect suspicious activity, and maintain a clear session history.

🧠 Key Takeaways

✅ Always hash refresh tokens before storing them.

🔄 Implement token rotation for better security.

📅 Set reasonable expiration periods (e.g., 30–90 days).

🌐 Track device/IP for multi-device SaaS scenarios.

🚨 Detect and handle token reuse to prevent replay attacks.

Authentication is often overlooked, but refresh tokens are the backbone of secure, scalable session management in modern SaaS systems. If you get this part right early on, you’ll avoid a lot of pain later. 🔐

Would you like me to make it sound a bit more personal / thought-leader style (like “I learned this building a real SaaS”)? 🧠✨
`,
    category: 'Security',
    author: 'Wassim Alshami',
    date: '2025-10-12',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
    tags: ['Refresh Tokens', 'Authentication', 'ASP.NET Core', 'SaaS'],
    featured: false
  }

];