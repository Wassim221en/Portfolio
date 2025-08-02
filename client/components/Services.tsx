import { Code, Palette, Users, Zap, Database, Settings, Wrench, GraduationCap, Briefcase, Calendar, Bug, Computer, BellElectric, BellElectricIcon, FastForward, FastForwardIcon } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { optimizedAppearDataAttribute } from 'framer-motion';
export function Services() {
    const services = [
        {
            icon: Computer,
            title: 'Back-End Development',
            description: ''
        },
        {
            icon: Code,
            title: 'RESTful API Development',
            description: ''
        },
        {
            icon: FastForwardIcon,
            title: 'Performance Optimization',
            description: ''
        },
        {
            icon: Database,
            title: 'Database Management',
            description: ''
        },
        {
            icon: Bug,
            title: 'Maintenance & Support',
            description: ''
        },
    ];
    {/* Services Section */ }
    return (
    <ScrollAnimation direction="up" delay={0.1}>
        <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service, index) => (
                    <ScrollAnimation key={index} direction="up" delay={0.1 * index}>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <service.icon className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        {service.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
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