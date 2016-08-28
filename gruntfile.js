module.exports = function(grunt) {
	//Configure the task(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			main: {
				files: [
					{expand: true, src: ['assets/**'], dest: 'dev/', filter: 'isFile'},
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

		cssmin: {
			target: {
				files: [{
					src: ['assets/css/main.css'],
					dest: 'prod/assets/css',
					ext: '.min.css'
				}]
			}
		},

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
			fonts: {
				src: ['bower_components/bootstrap/dist/fonts/**'],
				dest: 'assets/css/fonts/'
			}
		},

		watch: {
			css: {
				files: ['assets/css/style.css', 'index.html'],
				tasks: ['concat:css'],
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
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//Register the task(s)
	grunt.registerTask('firstconcat', ['concat:bowercss', 'concat:bowerBootStrapjs', 'concat:bowerjquery', 'concat:vendorjs']);
	grunt.registerTask('dev', ['concat:css', 'copy:main']);
}