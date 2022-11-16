# Storefront Backend Project

## Getting Started

This repo contains a basic Storefront API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Setup

### 1. Create a .env file
You need to setup the required environmental variables:
```bash
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
ENV=dev
BCRYPT_PASSWORD=
SALT_ROUNDS=
PEPPER=
TOKEN_SECRET=
```

### 2. Create a docker container
The next step is to run `yarn docker` to create the container and the main database POSTGRES_DB, as well as establish the connection with it.

**NOTE1** It is required a docker interface, like Docker Desktop, installed and running.

### 3. Running the API
After previous settings, run the API:
```bash
yarn watch
```

### 4. Test
#### 4.1 Creating a test database
With the container running, you need to access it with the POSTGRES_USER and create the POSTGRES_TEST_DB: 
```bash
docker exec -it <container_name> bash
su postgres
psql
CREATE DATABASE <database_name>;
```
#### 4.2 Running tests
To test the API run:
```bash
yarn test
```
