import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			// example : additionalData: `@import "./src/design/styles/variables";`
	// 			// dont need include file extend .scss
	// 			// additionalData: `@import "./src/assets/common_styles/const";`
	// 		}
	// 	}
	// },
	define: {
		'process.env': {}
	},
	server: { open: true },
	plugins: [ react() ]
});
