module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        dom_munger: {
            dist: {
                options: {
                    read: [
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'cssRefs', isPath: true },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'jsRefs', isPath: true },
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'cssRefsWithoutPath', isPath: false },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'jsRefsWithoutPath', isPath: false }
                    ],
                    remove: ['link:not(.dom_munger-ignore)', 'script:not(.dom_munger-ignore)'],
                    append: [
                      { selector: 'head', html: '<link href="app.min.css" rel="stylesheet">' },
                      { selector: 'body', html: '<script src="app.min.js"></script>' }
                    ]
                },
                cwd: '.',
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },

        copy: {
            img: {
                cwd: '.',
                src: ['./img/**/*'],
                dest: 'dist/',
                expand: true
            },
            misc: {
                files: [
                    { src: '404.html', dest: 'dist/404.html' },
                    { src: 'favicon.ico', dest: 'dist/favicon.ico' },
                    { src: 'bower_components/respond/dest/respond.min.js', dest: 'dist/respond.min.js' },
                    { src: 'web.config', dest: 'dist/web.config' }
                ]
            }
        },

        clean: {
            options: {
                force: true
            },
            cwd: '.',
            everything: {
                force: true,
                src: ['dist']
            }
        },

        cssmin: {
            dist: {
                cwd: '.',
                src: '<%= dom_munger.data.cssRefsWithoutPath %>',
                dest: 'dist/app.min.css'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    { src: 'dist/index.html', dest: 'dist/index.html' }
                ]
            }
        },

        uglify: {
            dist: {
                cwd: '.',
                src: '<%= dom_munger.data.jsRefsWithoutPath %>',
                dest: 'dist/app.min.js'
            }
        }
    });

    grunt.registerTask(
        'dist',
        'Compiles all of the assets and copies the files to the dist directory',
        ['clean:everything', 'dom_munger:dist', 'copy:img', 'copy:misc', 'uglify', 'cssmin:dist', 'htmlmin:dist']
    );
    grunt.registerTask(
        'default',
        'Creates a deploy-ready build.',
        ['dist']
    );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
