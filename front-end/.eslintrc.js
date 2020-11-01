/* eslint-disable indent */
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		'@nuxtjs',
		'prettier',
		'prettier/vue',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended',
	],
	plugins: ['prettier'],
	// add your custom rules here
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		// we only want single quotes
		quotes: ['error', 'single'],
		// we use 2 spaces to indent our code
		indent: ['error', 'tab'],
		// we want to avoid useless spaces
		'no-multi-spaces': ['error'],
		'at-rule-no-unknown': 0,
		'scss/at-rule-no-unknown': 0,
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'vue/no-v-html': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/attributes-order': ['error'],
	},
}
