module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset',
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'entry',
				corejs: 3,
				targets: '> 0.5%, not dead',
				loose: true,
				modules: false,
				// proposals: true,
			},
		],
	],
	plugins: [
		[
			'import',
			{
				libraryName: 'js-cool',
				style: false,
				libraryDirectory: 'lib',
				camel2DashComponentName: false,
			},
			'js-cool',
		],
	],
	env: {
		utils: {
			ignore: ['**/*.test.ts', '**/*.spec.ts'],
			presets: [
				[
					'@babel/env',
					{
						loose: true,
						modules: false,
					},
				],
			],
			plugins: [
				[
					'babel-plugin-module-resolver',
					{
						root: ['ui-lib-demo'],
						alias: {
							'@ui-lib-demo': 'ui-lib-demo/lib',
						},
					},
				],
			],
		},
	},
};
