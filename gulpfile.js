// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// Funçao para compilar o SASS e adicionar os prefixos
function compilaSass() {
  return gulp
  .src('./src/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist/css/'))
}

// Tarefa de gulp para a função de SASS
gulp.task('sass', compilaSass);

// Função para juntar o JS
function gulpJS() {
    return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(babel({
			presets: ['@babel/preset-env']
		}))
}

gulp.task('mainjs', gulpJS);


// Função de watch do Gulp
function watch() {
  gulp.watch('src/scss/*.scss', compilaSass);
  gulp.watch('src/js/*.js', gulpJS);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch'));