import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };

  const url = new URL(process.env.VITE_APP_PRODUCTION_URL || 'https://localhost/');
  const base = url.pathname.replace(/\/$/, '') || '/';

  return defineConfig({
    plugins: [vue()],
    base: base,
    resolve: {
      alias: [
        { find: "@", replacement: fileURLToPath(new URL('./src', import.meta.url)) }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          relativeUrls: true,
          javascriptEnabled: true
        }
      }
    }
  });
}
