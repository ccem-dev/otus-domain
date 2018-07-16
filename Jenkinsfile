pipeline {
	agent any
		tools {
			maven 'maven 3.5.0'
			jdk 'Java8'
			nodejs 'node 8.4.0'
		}


	stages{
		stage('Build Application') {
			steps{
				sh "npm install --prefix otus-domain/"
			}
		}

		stage('Unit tests') {
			steps{
				sh "npm run test --prefix otus-domain/"
			}
		}

		stage('Update Docs') {
			steps {
				sh "npm run gulp sonar --sonarUrl='${URL_SONAR}' --sonarDatabaseUsername='${USER_SONAR}' --sonarDatabasePassword='${PWD_SONAR}' --prefix otus-domain/"
			}
		}
	}

}
