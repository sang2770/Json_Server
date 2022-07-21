pipeline {
  agent any

  tools {nodejs "node"}
    
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

    stage('npm install') {
      steps{
        sh "npm install"
      }
    }

    stage('packaging') {
      steps{
        sh "npm start"
      }
    }
  }
}
