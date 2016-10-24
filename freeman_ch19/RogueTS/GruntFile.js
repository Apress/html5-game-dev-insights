module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './deploy'
                }
            }
        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'deploy/js/game.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        watch: {
            files: 'src/**/*.ts',
            tasks: ['typescript']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }

    });

    grunt.registerTask('default', ['typescript', 'connect', 'open', 'watch']);

}
