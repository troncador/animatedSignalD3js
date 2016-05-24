module.exports = function(grunt) {
  var tasks = ['jshint', 'jscs', 'concat','uglify', 'copy', 'less:dev'],
      srcJS = [
        'node_modules/underscore/underscore.js',
        'node_modules/d3/d3.js',
        'node_modules/jim-knopf/dist/knob.js',
        'lib/**/*.js'
        ],
      srcCSS =  [
        'less/*.less'
        ]
      ;

  grunt.initConfig({
    jscs: {
      src: 'lib/**/*.js',
        options: {
        config: ".jscsrc",
        esnext: false, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true,
        fix: false
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      scripts: {
        files: ['lib/**/*.js', 'less/*.less', 'Gruntfile.js'],
        tasks: tasks,
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
        src: srcJS,
        dest: 'dist/lib.js',
      },
    },
    less: {
      dev: {
        options: {
          sourceMap: true,
          dumpLineNumbers: 'comments',
          relativeUrls: true
        },
        files: {
          'dist/style.css': srcCSS
        }
      },
      production: {
        options: {
          cleancss: true,
          compress: true,
          relativeUrls: true
        },
        files: {
          'dist/style.css': srcCSS
        }
      }
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
    },
    copy: {
      main: {
        expand: true,
        src: ['node_modules/font-awesome/fonts/*', 'node_modules/boostrap/fonts/*'],
        dest: 'fonts/',
        flatten: true,
        filter: 'isFile'
      },
      math: {
        expand: true,
        src: 'node_modules/mathjs/dist/*',
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      }
    }
  });


  //Construct
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //Testing
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', tasks);
  grunt.registerTask('construct', tasks);

  grunt.registerTask('test', ['mochaTest']);
};
