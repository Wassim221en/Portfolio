import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FolderOpen,
  User,
  ShoppingBag,
  FileText,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Dribbble,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import App from '@/App';

const navigation = [
  { name: 'Homepage', href: 'Portfolio/', icon: Home },
  { name: 'Projects', href: 'Portfolio/projects', icon: FolderOpen },
  { name: 'About', href: 'Portfolio/about', icon: User },
  { name: 'Store', href: 'Portfolio/store', icon: ShoppingBag },
  { name: 'Blog', href: 'Portfolio/blog', icon: FileText },
  { name: 'Contact', href: 'Portfolio/contact', icon: Mail },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wassim-alshami-wassim221e/', icon: Linkedin },
  { name: 'CodeForces', href: 'https://codeforces.com/profile/Wassim221e', icon: Code },
  { name: 'WhatsApp', href: 'https://wa.me/963933719221?text=Hello%2C%20Wassim', icon: Code },
  
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-lg">
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="images/wassim.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Wassim Alshami</h2>
            <p className="text-sm text-gray-600">Back End Developer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105",
                    isActive
                      ? "bg-gray-100 text-gray-900 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="px-4 py-6 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Social
        </p>
        <div className="space-y-2">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
