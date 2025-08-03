// Common dark mode class combinations for consistent theming
export const darkModeClasses = {
  // Text colors
  heading: "text-gray-900 dark:text-white",
  subheading: "text-gray-600 dark:text-gray-300", 
  bodyText: "text-gray-600 dark:text-gray-300",
  mutedText: "text-gray-500 dark:text-gray-400",
  primaryText: "text-purple-600 dark:text-purple-400",
  
  // Backgrounds
  cardBg: "bg-white dark:bg-gray-800",
  primaryBg: "bg-gray-50 dark:bg-gray-900",
  
  // Borders
  border: "border-gray-200 dark:border-gray-700",
  
  // Interactive elements
  hover: "hover:bg-gray-50 dark:hover:bg-gray-800",
  active: "bg-gray-100 dark:bg-gray-800",
  
  // Form elements
  input: "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
  
  // Navigation
  navLink: "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
  navActive: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
} as const;
