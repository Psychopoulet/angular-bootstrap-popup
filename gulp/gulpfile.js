
"use strict";

const   path = require('path'),
        fs = require('fs'),
        gulp = require('gulp'),
        plumber = require('gulp-plumber'),
        jshint = require('gulp-jshint'),
        minify = require('gulp-minify');

var dir = path.join(__dirname, '..'),
    origin = path.join(dir, 'angular-bootstrap-popup.js'),
    targetreal = path.join(dir, 'angular-bootstrap-popup-min.js'),
    targetwanted = path.join(dir, 'angular-bootstrap-popup.min.js');

gulp.task('check', function() {
    return gulp.src(origin).pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('compile', function() {
    return gulp.src(origin).pipe(plumber()).pipe(minify()).pipe(gulp.dest(dir));
});

gulp.task('run', ['compile'], function() {

    fs.rename(targetreal, targetwanted, function(err) {
        if (err) { console.log(err); }
    });

});

gulp.task('default', ['check', 'run']);
