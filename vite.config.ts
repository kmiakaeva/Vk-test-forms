import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_URL_FACT': JSON.stringify(env.VITE_API_URL_FACT),
      'process.env.VITE_API_URL_NAME_AGE': JSON.stringify(env.VITE_API_URL_NAME_AGE),
    },
  };
});
