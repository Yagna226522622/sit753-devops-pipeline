pipeline {
    agent any

    environment {
        SONAR_PROJECT_KEY = 'Yagna226522622_sit753-devops-pipeline'
        SONAR_ORGANIZATION = 'Yagna226522622'
        SONAR_HOST_URL = 'https://sonarcloud.io'
    }

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
                          -e SONAR_HOST_URL=${SONAR_HOST_URL} \
                          -e SONAR_TOKEN=${SONAR_TOKEN} \
                          -v "$WORKSPACE:/usr/src" \
                          sonarsource/sonar-scanner-cli:12.2 \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.organization=${SONAR_ORGANIZATION} \
                          -Dsonar.host.url=${SONAR_HOST_URL} \
                          -Dsonar.token=${SONAR_TOKEN} \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=node_modules/**,coverage/** \
                          -Dsonar.tests=test \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
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
