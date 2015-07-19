var FRONTEND_CONFIG = {

    options: {
        transform: [
            ['babelify', { 'stage': 0 }]
        ],
        external: [
            'react'
        ]
    },

    files: {
        'client/js/build/bundle.js': 'client/js/src/app.js'
    }

};


module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        browserify: {

            buildDeps: {
                options: {
                    require: [
                        'react'
                    ]
                },
                files: {
                    'client/js/build/deps.js': []
                }
            },

            buildFrontend: FRONTEND_CONFIG,

            buildFrontendAndWatch: getWatchConfig(FRONTEND_CONFIG)
        },


        babel: {

            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'server/src',
                        src: ['**/*.*'],
                        dest: 'server/build/',
                        ext:'.js'
                    }
                ]
            }

        },
        execute: {
            server: {
                src: ['server/build/server.js']
            }
        }
    });



    grunt.registerTask('buildServer', 'babel');
    grunt.registerTask('buildDeps', 'browserify:buildDeps');
    grunt.registerTask('buildFrontend', 'browserify:buildFrontend');

    grunt.registerTask('buildAll', ['buildServer', 'buildDeps', 'buildFrontend']);

    grunt.registerTask('watchFrontend', 'browserify:buildFrontendAndWatch');


    grunt.registerTask('runServer', 'execute:server');

    grunt.registerTask('default', 'buildAll');

};

function getWatchConfig(browserifyConfig) {
    var newConfig = JSON.parse(JSON.stringify(browserifyConfig));
    newConfig.options = newConfig.options || {};
    newConfig.options.watch = true;
    newConfig.options.keepAlive = true;

    return newConfig;
}
