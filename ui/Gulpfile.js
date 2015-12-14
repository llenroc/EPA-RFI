'use strict';
/**
 * Gulpfile.js - for tasks I haven't moved over to plain npm yet...
 */
var gulp        = require('gulp');
var del         = require('del');
var execSync    = require('sync-exec');
var fs          = require('fs');
var moment      = require('moment');
var os          = require('os');
var pkg         = require('./package.json');

gulp.task('dist', function() {

    del.sync(['dist']);
    fs.mkdirSync('dist');

    gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));

    var ver = 'dist/version.txt';
    var now = moment();

    // get current git revision from git.
    // Requires 'git' command line!!
    var rev = 'Not Available';
    var branch = 'Not Available';
    try {
        rev = execSync('git rev-parse HEAD').stdout.trim();
        branch = execSync('git rev-parse --abbrev-ref HEAD').stdout.trim();
    }
    catch (err) {
        console.log('Error running "git rev-parse HEAD"');
        console.log('    ' + err.message);
    }

    fs.appendFileSync(ver, '\nEPA RFI Response');
    fs.appendFileSync(ver, '\n===================');
    fs.appendFileSync(ver, '\nName: ' + pkg.name);
    fs.appendFileSync(ver, '\nURL: https://github.com/AppliedIS/EPA-RFI');
    fs.appendFileSync(ver, '\nVersion: ' + pkg.version);
    fs.appendFileSync(ver, '\nGit Branch: ' + branch);
    fs.appendFileSync(ver, '\nGit Revision: ' + rev);
    fs.appendFileSync(ver, '\nBuild Time: ' + now.format('YYYY-MM-DD HH:mm:ss'));
    fs.appendFileSync(ver, '\nBuild Host: ' + os.hostname() + ' [' + os.platform() + ']');
    fs.appendFileSync(ver, '\n');
    fs.appendFileSync(ver, '\n');
});
