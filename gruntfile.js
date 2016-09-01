/**
 * The file structure you want to have in order for the grunt tasks to run properly is the following:
 * assets
 * 		|-css
 * 			|-style.scss
 * 	  |-js
 * 		 	|-app.js
 * 	  |-img
 * 	index.html
 * 	gruntfile.js
 * 	bower_components	
 */

module.exports = function(grunt) {
	//Configure the task(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		//Copy files to dev location
		copy: {
			main: {
				files: [
					{expand: true, src: ['assets/css/**'], dest: 'dev/', filter: 'isFile'},
					{expand: true, src: ['assets/js/app/**'], dest: 'dev/', filter: 'isFile'},
					{expand: true, src: ['assets/finalImg/**'], dest: 'dev/', filter: 'isFile'},
					{expand: true, src: ['index.html'], dest: 'dev/', filter: 'isFile'}
				]
			},
			fonts: { //Copying without full path
				expand: true,
				src: 'bower_components/bootstrap/dist/fonts/**',
				dest: 'assets/fonts/',
				flatten: true,
				filter: 'isFile'
			}
		},

		//Minify CSS
		cssmin: {
			target: {
				files: [{
					src: ['assets/css/main.css'],
					dest: 'prod/assets/css',
					ext: '.min.css'
				}]
			}
		},

		//Uglify JavaScript
		uglify: {
			my_target: {
				options: {
					beautify: true
				},
				files: {
					'assets/js/app.min.js' : ['assets/js/app.js'],
					'assets/js/libs.min.js' : ['assets/js/vendor/libs.js']
				}
			}
		},


		//Concatenating files and libs
		concat: {
			css: {
				src: ['assets/css/style.css'],
				dest: 'assets/css/main.css'
			},
			bowercss: {
				src: ['bower_components/bootstrap/dist/css/bootstrap.css', 'bower_components/bootstrap/dist/css/bootstrap.theme.css'],
				dest: 'assets/css/libs.css'
			},
			bowerBootStrapjs: {
				src: ['bower_components/bootstrap/dist/js/bootstrap.js'],
				dest: 'assets/js/vendor/bootstrap.js'
			},
			bowerjquery: {
				src: ['bower_components/jquery/dist/jquery.js'],
				dest: 'assets/js/vendor/jquery.js'
			},
			vendorjs: {
				src: ['assets/js/vendor/jquery.js', 'assets/js/vendor/bootstrap.js'],
				dest: 'assets/js/vendor/libs.js'
			},
			allMinifiedJs: {
				src: ['assets/js/libs.min.js', 'assets/js/app.min.js'],
				dest: 'assets/js/app/fullApp.min.js'
			},
			fonts: {
				src: ['bower_components/bootstrap/dist/fonts/**'],
				dest: 'assets/css/fonts/'
			}
		},

		//Sass -> CSS
		  sass: {                       				// Task
    		dist: {                            // Target
      		options: {                       // Target options
        		style: 'expanded'
      		},
      		files: {                         // Dictionary of files
        		'style.css': 'style.scss'
      		}
    		}
  	},

		//JS Hinting
		jshint: {
			all: ['gruntfile.js', 'assets/js/app.js'],
			globals: {
				jQuery: true
			}
		},

		//Minimizing images
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [{removeViewBox: false}]
				},
				files: [{
					expand: true,
					cwd: 'assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/finalImg/'
				}]
			}
		},

		//Grunt Watch
		watch: {
			css: {
				files: ['assets/css/style.css', 'index.html'],
				tasks: ['concat:css', 'jshint', 'uglify'],
				options: {
					livereload: true
				}
			}
		}
	});

	//Load the plugins
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	//Register the task(s)
	grunt.registerTask('moveBowerLibs', ['concat:bowercss', 'concat:bowerBootStrapjs', 'concat:bowerjquery', 'concat:vendorjs']);
	grunt.registerTask('dev', ['concat:css', 'imagemin:dynamic', 'concat:allMinifiedJs', 'copy:main']);
}