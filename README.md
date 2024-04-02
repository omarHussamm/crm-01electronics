# CRM Project

This repository contains a Customer Relationship Management (CRM) project developed using Next.js for the frontend, FastAPI for the backend, and PostgreSQL for the database. The project is containerized using Docker, and Docker Compose is utilized for easy setup and deployment.

## Prerequisites

Before running the project, ensure you have the following prerequisites installed:

- Docker
- Docker Compose

## How to Run

To run the project, follow these steps:

1. Make sure Docker and Docker Compose are installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the project directory.
4. Run the following command:

```bash
docker-compose up
```

This command will spin up containers for the frontend, backend, and PostgreSQL database.

## Backend Endpoints
### Auth
- Sign In: http://localhost:8080/auth/signin
- Sign Up: http://localhost:8080/auth/signup
- Forgot Password: http://localhost:8080/auth/forgotpassword
- Get All Users: http://localhost:8080/auth/users
- JWT Authentication: http://localhost:8080/auth/me
### Actions
- Get All Clients: http://localhost:8080/actions/clients
- Get All Leads: http://localhost:8080/actions/leads
- Get All Meetings: http://localhost:8080/actions/meetings
- Create Client: http://localhost:8080/actions/client
- Create Lead: http://localhost:8080/actions/lead
- Create Meeting: http://localhost:8080/actions/meeting
- Get Logged In User's Clients: http://localhost:8080/actions/myclients
- Get Logged In User's Meetings: http://localhost:8080/actions/mymeetings
- Add Lead to Logged In User's Clients: http://localhost:8080/actions/addclient
- Remove Client: http://localhost:8080/actions/removeclient
- Delete Meeting: http://localhost:8080/actions/meeting/{id}
- Search Clients: http://localhost:8080/actions/search/clients/{query}
- Search Leads: http://localhost:8080/actions/search/leads/{query}
### Populate DB
- Populate Database: http://localhost:8080/populatedb

## Additional Queries
To run additional queries on the database, follow these steps:

Run the following command to get the container ID of the PostgreSQL container:
```bash
docker ps
```
Identify the container ID associated with the PostgreSQL container.
Run the following commands to access the PostgreSQL container and execute queries:
```bash
docker exec -it <postgres-container-id> bash
psql -U postgres
\c crm
```
You can now enter any database query you want.

## Project Logic
- Users can sign in, sign up, and reset their passwords via email.
- Users can view their clients on the dashboard page and meetings on the client page.
- Users can search for all clients and leads.
- Users can only view, create, and delete their meetings.
- Users can only add clients to themselves.
- Users can remove clients back to leads.
