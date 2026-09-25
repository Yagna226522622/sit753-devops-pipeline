pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'sonar-token',
                        variable: 'SONAR_TOKEN'
                    )
                ]) {
                    sh '''
                        docker run --rm \
                        -e SONAR_HOST_URL=https://sonarcloud.io \
                        -e SONAR_TOKEN=$SONAR_TOKEN \
                        -v "$WORKSPACE:/usr/src" \
                        sonarsource/sonar-scanner-cli:12.2
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sit753-devops-pipeline:1.0 .'
            }
        }
    }
}
