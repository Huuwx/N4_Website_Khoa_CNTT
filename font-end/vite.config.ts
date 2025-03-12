import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    proxy: {
      '/api': { // Đường dẫn API mà bạn muốn proxy
        target: 'http://localhost:8080', // URL của backend Spring Boot
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ '/api' khỏi đường dẫn khi gửi đến backend
      },
      // Thêm các proxy khác nếu cần thiết
      // Ví dụ:
      // '/uploads': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      // },
    },
  },
})