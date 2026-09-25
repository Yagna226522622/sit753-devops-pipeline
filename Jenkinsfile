pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh '''
                    docker run --rm \
                    -v "$PWD":/app \
                    -w /app \
                    node:20-alpine \
                    sh -c "npm ci && npm test"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sit753-devops-pipeline:1.0 .'
            }
        }
    }
}