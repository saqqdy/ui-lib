const { series, src, dest, watch } = require('gulp')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const plugins = [
    cssnano({
        preset: [
            'advanced',
            {
                discardComments: {
                    removeAll: true
                },
                reduceIdents: false,
                mergeIdents: false,
                autoprefixer: false,
                'postcss-zindex': false,
                zindex: false
            }
        ],
        discardComments: {
            removeAll: true
        },
        reduceIdents: false,
        mergeIdents: false,
        autoprefixer: false,
        'postcss-zindex': false,
        zindex: false
    }),
    cssnext({ browsers: ['last 1 version'] })
]

function compile() {
    return src('./packages/style/*.less')
        .pipe(less())
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(postcss(plugins, {}))
        .pipe(dest('./lib/style'))
}

const concatCSS = series(compile, function (cb) {
    src(['./lib/style/*.css']).pipe(sourcemaps.init()).pipe(concat('index.css')).pipe(postcss(plugins, {})).pipe(sourcemaps.write('.')).pipe(dest('./lib/style'))
    cb()
})

// function copyfont() {
// 	return src('src/fonts/**').pipe(dest('./lib/fonts'));
// }

// function copyimage() {
// 	return src('src/img/**').pipe(dest('./lib/img'));
// }

exports.compile = compile
exports.concatCSS = concatCSS
// exports.copyfont = copyfont;
// exports.copyimage = copyimage;
exports.watch = function () {
    // You can use a single task
    watch('./packages/style/*.less', concatCSS)
}
// exports.build = series(compile, copyfont);
// exports.default = series(concatCSS, copyfont);
exports.build = series(compile)
exports.default = series(concatCSS)
