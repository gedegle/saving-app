/* eslint-disable */
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
module.exports = {
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'front-end',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~assets/scss/_variables.scss', '~assets/scss/_mixins.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',
		'@nuxtjs/vuetify',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		'@nuxtjs/eslint-module',
		'nuxt-svg-loader',
		'@nuxtjs/svg-sprite',
		['nuxt-sass-resources-loader', ['./assets/scss/_variables.scss']],
	],

	styleResources: {
		scss: ['./assets/scss/*.scss'],
	},

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		extend(config, { isDev }) {
			if (isDev) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
					options: {
						fix: true,
					},
				})

				config.resolve.symlinks = false
			}

			config.module.rules.push({
				enforce: 'pre',
				test: /\.txt$/,
				loader: 'raw-loader',
				exclude: /(node_modules)/,
			})

			config.module.rules.push({
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							spriteFilename: 'icons.svg',
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [{ removeViewbox: false }],
						},
					},
				],
			})

			return config
		},
		plugins: [new SpriteLoaderPlugin()],
		styleResources: {
			// See https://github.com/yenshih/style-resources-loader#options
			scss: ['./assets/scss/_variables.scss', './assets/scss/_svg-map.scss'],
		},
	},
}
