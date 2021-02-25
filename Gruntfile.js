const sass = require('node-sass');
module.exports = function ( grunt ) {

	// require it at the top and pass in the grunt instance
	require( 'time-grunt' )( grunt );

	// Load all Grunt tasks
	require( 'jit-grunt' )( grunt, {
		makepot: 'grunt-wp-i18n'
	} );

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		// Concat and Minify our js.
		uglify: {
			dev: {
				files: {
					'js/third/index.min.js'									: 'js/third/index.js',
				}
			}
		},

		// Minify CSS
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				keepSpecialComments: 0
			},
			prod: {
				files: {
					'css/style.min.css'						: 'css/style.css',
				}
			}
		},

		// Compile our sass.
		sass: {
			dev: { // This outputs the expanded css file
                options: {
                	implementation: sass,
                    outputStyle: 'expanded',
                    sourceMap: false,
                },
                files: {
					'css/style.css': 'css/style.scss',
                }
            },
            prod: { // This outputs the compressed css file
                options: {
                	implementation: sass,
                    outputStyle: 'compressed',
                    sourceMap: false,
                },
                files: {
					'css/style.css': 'css/style.scss',
                }
            }
		},

		// Autoprefixer.
		autoprefixer: {
			options: {
				browsers: [
					'last 8 versions', 'ie 8', 'ie 9'
				]
			},
			main: {
				files: {
					'assets/css/style.css': 'assets/css/style.css',
				}
			}
		},

		// Newer files checker
		newer: {
			options: {
				override: function ( detail, include ) {
					if ( detail.task === 'php' || detail.task === 'sass' ) {
						include( true );
					} else {
						include( false );
					}
				}
			}
		},

		// Watch for changes.
		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			scss: {
				files: [ 'sass/**/*.scss' ],
				tasks: [
					'newer:sass:dev',
					'newer:sass:prod',
					'newer:autoprefixer:main',
				]
			},
			js: {
				files: [ 'assets/js/**/*.js' ],
				tasks: [
					'newer:uglify:dev',
					'newer:uglify:prod',
				]
			}
		},

		// Images minify
		imagemin: {
			screenshot: {
				files: {
					'screenshot.png': 'screenshot.png'
				}
			},
			dynamic: {
				files: [ {
					expand: true,
					cwd: 'assets/img/',
					src: [ '**/*.{png,jpg,gif}' ],
					dest: 'assets/img/'
				} ]
			}
		},

		// Copy the theme into the build directory
		copy: {
			build: {
				expand: true,
				src: [
					'**',
					'!node_modules/**',
					'!bower_components/**',
					'!build/**',
					'!.git/**',
					'!Gruntfile.js',
					'!package.json',
					'!desktop.ini',
					'!prepros.cfg',
					'!CONTRIBUTING.md',
					'!README.md',
					'!.csscomb.json',
					'!.tern-project',
					'!.gitignore',
					'!.jshintrc',
					'!.DS_Store',
					'!*.map',
					'!**/*.map',
					'!**/Gruntfile.js',
					'!**/package.json',
					'!**/*~'
				],
				dest: 'build/<%= pkg.name %>/'
			}
		},

		// Compress build directory into <name>.zip
		compress: {
			build: {
				options: {
					mode: 'zip',
					archive: './build/<%= pkg.name %>.zip'
				},
				expand: true,
				cwd: 'build/<%= pkg.name %>/',
				src: [ '**/*' ],
				dest: '<%= pkg.name %>/'
			}
		},

		// Clean up build directory
		clean: {
			build: [
				'build/<%= pkg.name %>',
				'build/<%= pkg.name %>.zip'
			]
		},

		makepot: {
			target: {
				options: {
					domainPath: '/languages/', // Where to save the POT file.
					exclude: [ // Exlude folder.
						'build/.*',
						'assets/.*',
						'readme/.*',
						'sass/.*',
						'bower_components/.*',
						'node_modules/.*'
					],
					potFilename: '<%= pkg.name %>.pot', // Name of the POT file.
					type: 'wp-theme', // Type of project (wp-plugin or wp-theme).
					updateTimestamp: true, // Whether the POT-Creation-Date should be updated without other changes.
					processPot: function ( pot, options ) {
						pot.headers[ 'plural-forms' ] 				= 'nplurals=2; plural=n != 1;';
						pot.headers[ 'last-translator' ] 			= 'AzThemes\n';
						pot.headers[ 'language-team' ] 				= 'AzThemes\n';
						pot.headers[ 'x-poedit-basepath' ] 			= '..\n';
						pot.headers[ 'x-poedit-language' ] 			= 'English\n';
						pot.headers[ 'x-poedit-country' ] 			= 'UNITED STATES\n';
						pot.headers[ 'x-poedit-sourcecharset' ] 	= 'utf-8\n';
						pot.headers[ 'x-poedit-searchpath-0' ] 		= '.\n';
						pot.headers[ 'x-poedit-keywordslist' ] 		= '_esc_attr__;esc_attr_x;esc_attr_e;esc_html__;esc_html_e;esc_html_x;__;_e;__ngettext:1,2;_n:1,2;__ngettext_noop:1,2;_n_noop:1,2;_c;_nc:4c,1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;_nx_noop:4c,1,2;\n';
						pot.headers[ 'x-textdomain-support' ] 		= 'yes\n';
						return pot;
					}
				}
			}
		}

	} );

	// Dev task
	grunt.registerTask( 'default', [
		'uglify:dev',
		'cssmin:prod',
		'sass:dev',
		'sass:prod'
	] );

	// Production task
	grunt.registerTask( 'build', [
		'uglify:prod',
		//'imagemin',
		'sass:dev',
		'sass:prod',
		//'autoprefixer:main',
		//'copy'
	] );

	// Package task
	grunt.registerTask( 'package', [
		'compress',
	] );

};