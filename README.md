# Homeflix

The Homeflix API & Web Server

## Notes

### Azure Function Auth Tokens

Functions lets you use keys to make it harder to access your HTTP function endpoints during development. Unless the HTTP access level on an HTTP triggered function is set to anonymous, requests must include an API access key in the request.

In function.json > bindings > authLevel. This must be set to 'anonymous' or endpoint can only be accessed with token in query string

## Versions

### 3.0.0

- Switch from Azure SQL to Azure Table Storage
- Switch from ExpressJS web app to Serverless Functions
- Removed Admin section from web app

### 2.1.0

Switched to Azure App Service & Azure SQL Database

### 2.0.1

Added CORS support

### 2.0.0

Switched to serverless architecture with AWS Lambda & API Gateway. Also removed data fetch from MongoDB

### 1.2.0

Removed old MongoDB connection and models and switched over to MySQL & Sequelize.

### 1.1.0

Swapped out user auth for Auth0.com

### 1.0.0

Quick build based on MongoDB and basic user auth using AWS
