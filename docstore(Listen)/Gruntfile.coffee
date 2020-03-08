spawn = require("child_process").spawn

module.exports = (grunt) ->
	grunt.initConfig
		forever:
			app:
				options:
					index: "app.js"

		coffee:
			app_src:
				expand: true,
				flatten: true,
				cwd: "app"
				src: ['coffee/*.coffee'],
				dest: 'app/js/',
				ext: '.js'

			app:
				src: "app.coffee"
				dest: "app.js"

			unit_tests:
				expand: true
				cwd:  "test/unit/coffee"
				src: ["**/*.coffee"]
				dest: "test/unit/js/"
				ext:  ".js"

			acceptance_tests:
				expand: true
				cwd:  "test/acceptance/coffee"
				src: ["**/*.coffee"]
				dest: "test/acceptance/js/"
				ext:  ".js"

			smoke_tests:
				expand: true
				cwd:  "test/smoke/coffee"
				src: ["**/*.coffee"]
				dest: "test/smoke/js"
				ext:  ".js"

		clean:
			app: ["app/js/"]
			unit_tests: ["test/unit/js"]
			acceptance_tests: ["test/acceptance/js"]
			smoke_tests: ["test/smoke/js"]

		execute:
			app:
				src: "app.js"

		mochaTest:
			unit:
				options:
					reporter: grunt.option('reporter') or 'spec'
					grep: grunt.option("grep")
				src: ["test/unit/js/**/*.js"]
			acceptance:
				options:
					reporter: grunt.option('reporter') or 'spec'
					timeout: 40000
					grep: grunt.option("grep")
				src: ["test/acceptance/js/**/*.js"]
			smoke:
				options:
					reporter: grunt.option('reporter') or 'spec'
					timeout: 10000
				src: ["test/smoke/js/**/*.js"]
		
		shell:
			dockerTests:
				command: 'docker run -v "$(pwd):/app" -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" -e AWS_BUCKET="$AWS_BUCKET" --rm sl-acceptance-test-runner'

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-mocha-test'
	grunt.loadNpmTasks 'grunt-shell'
	grunt.loadNpmTasks 'grunt-execute'
	grunt.loadNpmTasks 'grunt-bunyan'
	grunt.loadNpmTasks 'grunt-forever'

	grunt.registerTask 'compile:app', ['clean:app', 'coffee:app', 'coffee:app_src']
	grunt.registerTask 'run',         ['compile:app', 'bunyan', 'execute']

	grunt.registerTask 'compile:unit_tests', ['clean:unit_tests', 'coffee:unit_tests']
	grunt.registerTask 'test:unit',          ['compile:app', 'compile:unit_tests', 'mochaTest:unit']

	grunt.registerTask 'compile:acceptance_tests', ['clean:acceptance_tests', 'coffee:acceptance_tests']
	grunt.registerTask 'test:acceptance',          ['compile:acceptance_tests', 'mochaTest:acceptance']

	grunt.registerTask 'compile:smoke_tests', ['clean:smoke_tests', 'coffee:smoke_tests']
	grunt.registerTask 'test:smoke',          ['compile:smoke_tests', 'mochaTest:smoke']

	grunt.registerTask 'install', 'compile:app'
	
	grunt.registerTask 'test:acceptance:docker', ['compile:acceptance_tests', 'shell:dockerTests']

	grunt.registerTask 'default', ['run']


