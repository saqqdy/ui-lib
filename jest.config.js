module.exports = {
    globals: {
        // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
        // 'ts-jest': {
        //   diagnostics: {
        //     ignoreCodes: [151001],
        //   },
        // },
    },
    testEnvironment: 'jsdom',
    // 匹配到 .vue 文件的时候用 vue-jest 处理， 匹配到 .js 文件的时候用 babel-jest 处理
    transform: {
        '^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
        // '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.(t|j)sx?$': [
            '<rootDir>/node_modules/babel-jest',
            {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: true
                            }
                        }
                    ]
                ],
                plugins: ['@vue/babel-plugin-jsx', '@babel/plugin-proposal-class-properties']
            }
        ]
    },
    // collectCoverage: true,
    // collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
    testMatch: ['**/__tests__/**/*.spec.(j|t)s'], // 匹配哪些文件进行测试
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // 不进行匹配的目录
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/', '/._bak$/'],
    testPathIgnorePatterns: ['/node_modules/', '/._bak$/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // 告诉 Jest 需要匹配的文件后缀
    // u can change this option to a more specific folder for test single component or util when dev
    // for example, ['<rootDir>/packages/input']
    roots: ['<rootDir>'],
    // 处理 webpack 的别名，比如：将 @ 表示 /src 目录
    moduleNameMapper: {
        '^ui-lib/(.*)$': '<rootDir>/$1'
    }
    // snapshotSerializers: ['jest-serializer-vue'] // 将保存的快照测试结果进行序列化，使得其更美观
}
