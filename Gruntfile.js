module.exports = function(grunt) {

  grunt.initConfig({
    jscs: {
      src: 'lib/**/*.js',
        options: {
        config: ".jscsrc",
        esnext: false, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true,
        fix: true, // Autofix code style violations when possible.
        requireCurlyBraces: [ 'if' ]
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      scripts: {
        files: ['lib/**/*.js'],
        tasks: ['jshint', 'concat','uglify'],
        options: {
          spawn: false,
        },
      },
    },
    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: [ 'lib/**/*.js', 'node_modules/underscore/underscore.js', 'node_modules/d3/d3.js'],
        dest: 'dist/lib.js',
      },
    },

    uglify: {
      task_name: {
        options: {
          sourceMap: true,
          sourceMapIn: 'dist/lib.js.map'
        },
        files: {
          'dist/lib.min.js': ['dist/lib.js']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt',
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/*.js']
      }
    }
  });


  grunt.loadNpmTasks('grunt-mocha-test');

  //Construct
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['mochaTest']);

  grunt.registerTask('construct', ['jshint', 'concat','uglify']);

  grunt.registerTask('test', ['mochaTest']);
};
