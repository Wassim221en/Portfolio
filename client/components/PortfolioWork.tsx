export function PortfolioWork() {
  const projects = [
    {
      id: 1,
      title: "Project Management Dashboard",
      image: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg",
      description: "A comprehensive project management solution",
    },
    {
      id: 2,
      title: "Analytics Platform",
      image:
        "https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg",
      description: "Data visualization and analytics dashboard",
    },
  ];

  return (
    <section className="mt-12 lg:mt-16 mb-16">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 lg:mb-8">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
