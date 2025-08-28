/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // General span utility classes
      span: {
        'label': 'text-xs text-gray-500 font-medium',
        'value': 'text-sm text-gray-900',
        'muted': 'text-xs text-gray-400',
        'highlight': 'text-sm font-semibold text-blue-600',
        'status': 'text-xs font-medium px-2 py-1 rounded-full',
        'status-active': 'bg-green-100 text-green-600',
        'status-inactive': 'bg-red-100 text-red-600',
      }
    },
  },
  plugins: [],
}
