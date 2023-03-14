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

cp /var/jenkins_home/workspace/env/microservices/job/.env ./microservices/job-management/.env
cat ./microservices/job-management/.env

cp /var/jenkins_home/workspace/env/microservices/user/.env ./microservices/user-management/.env
cat ./microservices/user-management/.env

cp /var/jenkins_home/workspace/env/microservices/notification/.env ./microservices/notification-management/.env
cat ./microservices/notification-management/.env

cp /var/jenkins_home/workspace/env/microservices/api-gateway/.env ./microservices/api-gateway/.env
cat ./microservices/api-gateway/.env'''
      }
    }

  }
}