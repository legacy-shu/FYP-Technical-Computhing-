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

cp /var/lib/jenkins/workspace/env/client/.env ./job-board-client/.env
cat ./job-board-client/.env

cp /var/lib/jenkins/workspace/env/microservices/job/.env ./microservices/job-management/.env
cat ./microservices/job-management/.env

cp /var/lib/jenkins/workspace/env/microservices/user/.env ./microservices/user-management/.env
cat ./microservices/user-management/.env

cp /var/lib/jenkins/workspace/env/microservices/notification/.env ./microservices/notification-management/.env
cat ./microservices/notification-management/.env

cp /var/lib/jenkins/workspace/env/microservices/api-gateway/.env ./microservices/api-gateway/.env
cat ./microservices/api-gateway/.env'''
      }
    }

    stage('Job-Management Test') {
      steps {
        sh '''cd microservices
cd job-management
npm i && npm test

'''
      }
    }

    stage('Build') {
      steps {
        sh '''sudo docker compose build
sudo docker images'''
      }
    }

    stage('Log into docker hub') {
      steps {
        sh '''sudo docker login -u ${DOCKER_ID} -p ${DOCKER_PASS}
'''
      }
    }

    stage('Push to docker hub') {
      steps {
        sh '''sudo docker compose push
'''
      }
    }

    stage('Pull from docker hub') {
      steps {
        sh '''sudo docker compose pull

'''
      }
    }

    stage('Docker compose up') {
      steps {
        sh '''sudo docker compose down
sudo docker compose up -d'''
      }
    }

  }
  tools {
    nodejs '19.0.0'
  }
}