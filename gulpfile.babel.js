import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';



gulp.task('popup-js', ['clean'], (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('event-js', ['clean'], (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});





gulp.task('content-js', ['clean'], (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});



gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-css', ['clean'], () => {
  return gulp.src('bootstrap.min.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-css2', ['clean'], () => {
  return gulp.src('style.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-icon', ['clean'], () => {
  return gulp.src(['icons/form_view.png','icons/form_view_succes.png'])
    .pipe(gulp.dest('./build/icons'));
});

gulp.task('copy-js', ['clean'], () => {
  return gulp.src(['jquery-ui.min.js','jquery-2.1.4.min.js'])
    .pipe(gulp.dest('./build/'));
});
/*
gulp.task('copy-rename', ['clean'],() => {
  return gulp.src('popup/src/scripts/components/app/**')
    .pipe(gulp.dest('./content/src/scripts/components/getlist'))

});
*/
gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-js','copy-icon','copy-css2','copy-css', 'copy-manifest', 'popup-js', 'popup-html', 'event-js', 'content-js']);
//gulp.task('build', ['copy-rename','copy-icon','copy-css2','copy-css', 'copy-manifest', 'popup-js', 'popup-html', 'event-js', 'content-js']);

gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('content/**/*', ['build']);
  gulp.watch('event/**/*', ['build']);
  gulp.watch('style.css', ['build']);
});

gulp.task('default', ['build']);
