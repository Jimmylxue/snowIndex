import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: 'types',
				replacement: resolve(__dirname, 'src/types'),
			},
			{
				find: '@utils',
				replacement: resolve(__dirname, 'src/utils'),
			},
			{
				find: '@hooks',
				replacement: resolve(__dirname, 'src/hooks'),
			},
			{
				find: '@stores',
				replacement: resolve(__dirname, 'src/stores'),
			},
		],
	},
})
