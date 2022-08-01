pipeline {
  agent any
    
//   tools {nodejs "nodejs"}
  options { skipDefaultCheckout() }

	environment {
		DOCKER_IMAGE = "captcha"
		SERVICE_NAME = "captcha"
	}
  
  stages { 
    stage('checkout') {
      steps {
        checkout scm
      }
    }

    stage('check node') {
      steps{
        sh "node -v"
      }
    }

    stage('check npm') {
      steps{
        sh "npm -v"
      }
    }
    stage('SonarQube Analysis') {
	    steps{
		    
// 		    def scannerHome = tool 'SonarScanner';
		    withSonarQubeEnv(installationName: 'SonarQube 192') {
// 		      sh "${scannerHome}/bin/sonar-scanner"
			    sh './mvnw sonar:sonar'
		    }
	    }
    }
    stage('npm install') {
      steps{
        sh "npm install"
      }
    }

//     stage('packaging') {
//       steps{
//         sh "npm start"
//       }
//     }

	    
    stage('build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest . "
                sh "docker image ls | grep ${DOCKER_IMAGE}"

                //clean to save disk
                sh "docker image prune -f"
            }
    }
    
    stage('deploy') {
            steps {
                sh "docker stop ${SERVICE_NAME} || true && docker rm -f ${SERVICE_NAME} || true"
                sh "docker run -p 8091:3000 --name ${SERVICE_NAME} ${DOCKER_IMAGE}:latest"
            }
    }
}
}
