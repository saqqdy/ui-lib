module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset',
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'entry',
				corejs: 3,
				targets: '> 0.5%, not dead',
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
};
