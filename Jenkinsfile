pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/w-ryan-jung/FYP-Technical-Computhing-.git', branch: 'dev')
      }
    }

    stage('Set Env') {
      steps {
        sh '''pwd

ls -al

cp /var/jenkins_home/workspace/env/client/.env ./job-board-client/.env
cat ./job-board-client/.env

sudo cp /var/jenkins_home/workspace/env/microservice/job/.env ./microservices/job-management/.env
sudo cat ./microservices/job-management/.env

sudo cp /var/jenkins_home/workspace/env/microservice/user/.env ./microservices/user-management/.env
sudo cat ./microservices/user-management/.env

sudo cp /var/jenkins_home/workspace/env/microservice/notification/.env ./microservices/notification-management/.env
sudo cat ./microservices/notification-management/.env

sudo cp /var/jenkins_home/workspace/env/microservice/api-gateway/.env ./microservices/api-gateway/.env
sudo cat ./microservices/api-gateway/.env'''
      }
    }

  }
}