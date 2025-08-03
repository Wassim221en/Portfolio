import { ScrollAnimation } from '@/components/ScrollAnimation';
import { optimizedAppearDataAttribute } from 'framer-motion';
import {
    Server,
    Network,
    Gauge,
    Database,
    Wrench,
    Brain,
    Code2,
} from "lucide-react";
export function Services() {
    const services = [
        {
            icon: Server,
            title: "Enterprise Back-End Development",
            description: "Robust and scalable .NET solutions for enterprise-level applications.",
        },
        {
            icon: Network,
            title: "RESTful API Design",
            description: "Clean, well-documented, and secure API design using .NET Web APIs.",
        },
        {
            icon: Database,
            title: "Database Architecture",
            description: "Efficient schema design, query optimization, and data integrity with SQL Server & EF Core.",
        },
        {
            icon: Gauge,
            title: "System Performance Optimization",
            description: "Profiling, memory management, and async programming to boost performance.",
        },
        {
            icon: Brain,
            title: "Competitive Programming Logic",
            description: "Expert-level problem solving using data structures & algorithms.",
        },
        {
            icon: Wrench,
            title: "System Maintenance & Deployment",
            description: "CI/CD, debugging, and continuous support for production systems.",
        },
    ];
    {/* Services Section */ }
    return (
        <ScrollAnimation direction="up" delay={0.1}>
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <ScrollAnimation key={index} direction="up" delay={0.1 * index}>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                                        <service.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            {service.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </ScrollAnimation>
    )
}
