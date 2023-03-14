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

sudo cp ~/env/client/.env ./job-board-client/.env
sudo cat ./job-board-client/.env

sudo cp ~/env/microservice/job/.env ./microservices/job-management/.env
sudo cat ./microservices/job-management/.env

sudo cp ~/env/microservice/user/.env ./microservices/user-management/.env
sudo cat ./microservices/user-management/.env

sudo cp ~/env/microservice/notification/.env ./microservices/notification-management/.env
sudo cat ./microservices/notification-management/.env

sudo cp ~/env/microservice/api-gateway/.env ./microservices/api-gateway/.env
sudo cat ./microservices/api-gateway/.env'''
          }
        }

      }
    }

    stage('Test') {
      steps {
        sh '''pwd
ls'''
      }
    }

  }
}