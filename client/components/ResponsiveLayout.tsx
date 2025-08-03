import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { PageTransition } from "./PageTransition";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // إغلاق القائمة الجانبية عند التنقل لصفحة جديدة
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // إضافة دعم السحب للسايدبار على الموبايل والتابليت
  useSwipeGesture({
    onSwipeRight: () => {
      // فتح السايدبار عند السحب من اليسار لليمين (فقط على الشاشات الصغيرة)
      const isMobile = window.innerWidth < 1024;
      if (isMobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
    },
    onSwipeLeft: () => {
      // إغلاق السايدبار عند السحب من اليمين لليسار (فقط إذا كان مفتوح)
      const isMobile = window.innerWidth < 1024;
      if (isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    },
    threshold: 60, // المسافة المطلوبة للسحب
    preventScroll: false, // السماح بالتمرير العادي
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* منطقة السحب الحساسة من الحافة اليسرى للموبايل */}
      <div className="fixed left-0 top-0 h-full w-4 z-30 lg:hidden" />

      {/* منطقة السحب للإغلاق عند فتح السايدبار */}
      {sidebarOpen && (
        <div className="fixed right-0 top-0 h-full w-16 z-30 lg:hidden" />
      )}
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Profile info on mobile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="images/wassim.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-right">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Wassim Alshami
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Back End Developer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
