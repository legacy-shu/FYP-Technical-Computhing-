# Final Year Project (Technical Computing)
## A Job-board Web Application using Microservice-Oriented 

### Introduction
This project aims to develop a job posting platform using microservice-oriented architecture. The system consists of three microservices: User Management Service, Job Listing Management Service, and Notification Management Service. The project also includes a CI/CD pipeline to automate testing, building, and deploying using Kubernetes and Docker containers.

### Background
The job search industry has been evolving, and many companies have been adopting the practice of releasing software early, which has generally been labeled Continuous Delivery. The concept of Continuous Delivery has evolved and further built upon to create what is now known as DevOps. DevOps aims to minimize the duration between making a modification to a system and implementing the modification in the standard production process, all while upholding superior quality.

Microservice Architecture has become popular in the DevOps practice as it allows DevOps teams to develop independent pieces of functionality in parallel and provide scalability, flexibility, and efficient development. Docker is highly adopted as a containerized tool for building, packaging, and deploying applications in a microservice architecture. Furthermore, Kubernetes is highly adopted as a container orchestration system for automating software deployment, scaling, and management.

### Objectives
The objectives of this project are:

To design a job-board web application with a defined software engineering process.
To implement a Microservice-based Job-board Web Application consisting of the three microservices mentioned above.
To implement a CI/CD Pipeline using Jenkins for DevOps practice.
System Architecture
The system consists of three microservices:

User Management Service: This microservice verifies job seekers and employers and stores information such as name, email, phone number, and resumes.
Job Listing Management Service: This microservice makes it easy for job seekers to find job listings and easy for employers to post their job openings.
Notification Management Service: This microservice sends notifications regarding application status updates, such as when a new job is posted, and the employers accept the application from the job seeker.
The project also includes a CI/CD pipeline to automate testing, building, and deploying using Kubernetes and Docker containers.

### Docker Compose Architecture
The following services are used in the Docker Compose architecture:

* user-db: This service provides a MongoDB database for the user management microservice.
* job-db: This service provides a MongoDB database for the job management microservice.
* rabbitmq: This service provides a RabbitMQ message broker, which is used to facilitate communication between the different microservices.
* frontend: This service provides the web-based user interface for the application.
* api-gateway: This service serves as the main entry point for the application, handling requests from the frontend and routing them to the appropriate microservices.
* notification-service: This service handles notifications sent from the job-service microservice to users.
* job-service: This service provides functionality for managing job postings.
* user-service: This service provides functionality for managing user accounts.

Each microservice is built from source code located in their respective directories and configured to run on a specific port. They also depend on other microservices and services to function properly.

### Note 
The Env files are not included. The building of this project needs env files

### Demo link
* http://ec2-13-49-41-140.eu-north-1.compute.amazonaws.com:3000/
* http://ec2-13-49-41-140.eu-north-1.compute.amazonaws.com:8080/ (guest/guest)