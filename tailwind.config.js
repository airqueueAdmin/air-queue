/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // 프로젝트의 다른 파일 경로를 추가
  ],
  theme: {
    extend: {
      // 사용자 정의 색상
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        // ...
      },
      // 사용자 정의 글꼴
      fontFamily: {
        sans: ['var(--font-inter)', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  // plugins:,
}