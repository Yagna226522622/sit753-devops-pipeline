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

        stage('Security Audit') {
            steps {
                sh 'npm audit --audit-level=high'
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
                          -e SONAR_TOKEN="$SONAR_TOKEN" \
                          -v "$WORKSPACE:/usr/src" \
                          -w /usr/src \
                          sonarsource/sonar-scanner-cli:12.2 \
                          -Dsonar.projectKey=Yagna226522622_sit753-devops-pipeline \
                          -Dsonar.organization=yagna226522622 \
                          -Dsonar.host.url=https://sonarcloud.io \
                          -Dsonar.token="$SONAR_TOKEN" \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=node_modules/**,coverage/**
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sit753-devops-pipeline .'
            }
        }

    }

}