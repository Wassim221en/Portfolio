
export const categories = [
  "All",
  "E-commerce",
  "Logistics",
  "Food Delivery",
  "Education",
  "POS / Business",
  "Web App"
];

export const projects = [
  {
    id: 1,
    title: "Bronz",
    description:
      "A kids clothing e-commerce app (ages 1–16) offering a smooth browsing experience, advanced search & filtering, promotions, and a complete order delivery flow. I was responsible for the backend: designing REST APIs, managing orders and returns, handling notifications, and integrating payment gateways using ASP.NET Core.",
    category: "E-commerce / Mobile App",
    image: "bronz.png",
    imageSource: "https://play.google.com/store/apps/details?id=com.elkood.bronze",
    tags: ["E-commerce", "Mobile App", "Backend (ASP.NET Core)"],
    year: "2024",
    status: "Finished",
    liveUrl: "https://play.google.com/store/apps/details?id=com.elkood.bronze",
    projectPage: "https://elkood.com/en/projects/bronz-app/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Mazayah",
    description:
      "A logistics and shipment management solution with separate admin and client apps. The system supports shipment tracking, customs clearance workflows, and reporting. I built the backend architecture using ASP.NET Core — covering shipment lifecycle management, real-time tracking, role-based authorization, and exporting reports in various formats.",
    category: "Logistics / Mobile App",
    image: "mazzayah.png",
    imageSource: "https://play.google.com/store/apps/details?id=com.elkood.mazayah",
    tags: ["Logistics", "Shipping", "Backend (ASP.NET Core)"],
    year: "2024",
    status: "Finished",
    liveUrl: "https://play.google.com/store/apps/details?id=com.elkood.mazayah",
    projectPage: "https://mazzaya.elkood.com/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Fly Order",
    description:
      "An on-demand delivery platform (restaurants, groceries, pharmacy) with live tracking, driver management, and secure payments. I handled the backend: order processing pipelines, real-time driver tracking, push notifications, and payment gateway integrations — all built with ASP.NET Core.",
    category: "Food Delivery / Mobile App",
    image: "flyorder.png",
    imageSource: "https://play.google.com/store/apps/details?id=com.elkood.fly_order.fly_order",
    tags: ["Food Delivery", "Logistics", "Backend (ASP.NET Core)"],
    year: "2023",
    status: "Finished",
    liveUrl: "https://play.google.com/store/apps/details?id=com.elkood.fly_order.fly_order",
    projectPage: "https://elkood.com/en/category/mobile-applications/",
    githubUrl: "#",
    featured: false
  },
  {
    id: 4,
    title: "BeTheBest",
    description:
      "A modern educational app featuring structured lessons, interactive quizzes, and progress tracking for students. I developed the backend using ASP.NET Core: authentication, subscription management, content APIs, and analytics endpoints to support the mobile experience.",
    category: "Education / Mobile App",
    image: "bethebest.png",
    imageSource: "https://play.google.com/store/apps/details?id=com.elkood.be_the_best",
    tags: ["Education", "E-learning", "Backend (ASP.NET Core)"],
    year: "2025",
    status: "Finished",
    liveUrl: "https://play.google.com/store/apps/details?id=com.elkood.be_the_best",
    projectPage: "https://play.google.com/store/apps/developer?id=elKood",
    githubUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Royal Button POS",
    description:
      "A point-of-sale and inventory management platform with a mobile app and web dashboard. I implemented the backend with ASP.NET Core — handling inventory APIs, role-based access control, real-time stock synchronization, and reporting endpoints.",
    category: "POS / Business",
    image: "royalbutton.png",
    imageSource: "https://play.google.com/store/apps/details?id=com.elkood.royalbutton",
    tags: ["POS", "Inventory", "Backend (ASP.NET Core)"],
    year: "2025",
    status: "Finished",
    liveUrl: "https://play.google.com/store/apps/details?id=com.elkood.royalbutton",
    projectPage: "https://apkpure.com/royal-button-pos/com.elkood.royalbutton",
    githubUrl: "#",
    featured: false
  },
  {
    id: 6,
    title: "CP Training Platform",
    description:
      "A web application inspired by Duolingo, but focused on teaching and practicing competitive programming. The platform features structured levels, interactive challenges, problem-solving exercises, and real-time feedback to help users improve their algorithmic skills progressively. I built the backend using ASP.NET Core and designed the training flow logic to support competitive programming topics such as data structures, algorithms, and problem-solving patterns.",
    category: "Education / Web App",
    image: "cptraining.png", // You can replace this with a real screenshot
    imageSource: "https://wassim221en.github.io/Cp_Training/",
    tags: ["Competitive Programming", "Education", "Web App", "Backend (ASP.NET Core)"],
    year: "2025",
    status: "In Development",
    liveUrl: "https://wassim221en.github.io/Cp_Training/",
    projectPage: "https://wassim221en.github.io/Cp_Training/",
    githubUrl: "https://github.com/wassim221en/Cp_Training",
    featured: true
  },
  {
    id: 7,
    title: "PhythaCourse",
    description:
      "An education platform & POS integration for course distribution — video lessons, PDFs, interactive tests and POS flows for selling courses. I built the backend services: authentication, access/token generation for courses, content management APIs, and payment/reporting integrations.",
    category: "Education / POS",
    image: "phithacourse.png",
    imageSource: "https://play.google.com/store/apps/details?id=com.elkood.pytha_course",
    tags: ["Education", "POS", "Backend (ASP.NET Core)"],
    year: "2024",
    status: "Finished",
    liveUrl: "https://play.google.com/store/apps/details?id=com.elkood.pytha_course",
    projectPage: "https://elkood.com/en/category/mobile-applications/", // company page lists the app
    githubUrl: "#",
    featured: true
  },
  {
    "id": 8,
    "title": "ElectroSaaS",
    "description":
      "A SaaS (Software as a Service) platform for managing and running electronics online stores — product catalog, inventory sync, order processing, subscription billing, multi-tenant admin dashboards, and API integrations. I’m building the backend and core infrastructure: tenant isolation, payment & billing engine, product/inventory APIs, authorization & roles, and integrations with logistics and supplier systems.",
    "category": "E-commerce / SaaS",
    "image": "cmd.png",
    "imageSource": "https://github.com/Wassim221en/Cmd",
    "tags": ["E-commerce", "SaaS", "Backend (e.g. ASP.NET Core / Node.js)"],
    "year": "2025",
    "status": "In Development",
    "liveUrl": "—",
    "projectPage": "cptraining.png",
    "githubUrl": "https://github.com/Wassim221en/Cmd",
    "featured": false
  }

];
