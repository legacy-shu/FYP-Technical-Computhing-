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

sudo mv ~/env/client/.env ./job-board-client/.env
sudo cat ./job-board-client/.env

sudo mv ~/env/microservice/job/.env ./microservice/job-management/.env
sudo cat ./microservice/job-management/.env

sudo mv ~/env/microservice/user/.env ./microservice/user-management/.env
sudo cat ./microservice/user-management/.env

sudo mv ~/env/microservice/notification/.env ./microservice/notification-management/.env
sudo cat ./microservice/notification-management/.env

sudo mv ~/env/microservice/api-gateway/.env ./microservice/api-gateway/.env
sudo cat ./microservice/api-gateway/.env'''
          }
        }

      }
    }

  }
}