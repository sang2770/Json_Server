pipeline {
  agent any

  tools {nodejs "node"}
    
  stages { 
    stage('checkout') {
        checkout scm
    }

    stage('check node') {
        sh "node -v"
    }

    stage('check npm') {
        sh "npm -v"
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('packaging') {
        sh "npm start"
    }
  }
}
