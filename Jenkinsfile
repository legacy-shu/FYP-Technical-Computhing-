pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      parallel {
        stage('Checkout Code') {
          steps {
            git(url: 'https://github.com/w-ryan-jung/FYP-Technical-Computhing-.git', branch: 'dev')
          }
        }

        stage('set env files') {
          steps {
            sh '''pwd

ls -al

mv ~/env/client/.env ./job-board-client/.env
cat ./job-board-client/.env

mv ~/env/microservice/job/.env ./microservice/job-management/.env
cat ./microservice/job-management/.env

mv ~/env/microservice/user/.env ./microservice/user-management/.env
cat ./microservice/user-management/.env

mv ~/env/microservice/notification/.env ./microservice/notification-management/.env
cat ./microservice/notification-management/.env

mv ~/env/microservice/api-gateway/.env ./microservice/api-gateway/.env
cat ./microservice/api-gateway/.env'''
          }
        }

      }
    }

  }
}