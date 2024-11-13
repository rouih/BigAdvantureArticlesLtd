# BigAdvantureArticlesLtd

# **Project Title**

A RESTful API application built with Node.js, Express, MongoDB, Elasticsearch, and Redis. The API supports managing articles, comments, and users, with functionality for authentication, searching articles, and finding the most common word occurrences.

## **Table of Contents**

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Requirements](#requirements)
- [Installation and Setup](#installation-and-setup)
  - [With Docker](#with-docker)
  - [Without Docker](#without-docker)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
  - [Articles](#articles)
  - [Comments](#comments)
  - [Users](#users)
- [Run Tests](#run-tests)

---

## **Features**

- **CRUD Operations**: Create, retrieve, update, and delete articles, comments, and users.
- **Authentication**: User authentication using JWT.
- **Search**: Full-text search with Elasticsearch to find articles based on specific words.
- **Common Word Search**: Find articles with the most occurrences of a specified word.
- **Caching**: Redis for caching search results to improve performance.

## **Requirements**

- Node.js and npm
- MongoDB
- Elasticsearch
- Redis

## **Installation and Setup**

### **With Docker**

The project can be set up easily with Docker and Docker Compose.

1. Create an `.env` file in the project root (see [Environment Variables](#environment-variables) section).
2. Run the following command:

   ```bash
   docker-compose up -d
   ```

3. The application will be running at `http://localhost:3000`.

### **Without Docker**

To run the project manually, follow these steps:

1. Ensure that MongoDB, Elasticsearch, and Redis are installed and running locally.
2. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root (see [Environment Variables](#environment-variables) section).
5. Start the server:

   ```bash
   npm run start
   ```

6. The application will be running at `http://localhost:3000`.

---

## **Environment Variables**

Ensure the following environment variables are set in your `.env` file:

```plaintext
NODE_ENV=development
PORT=3000
MONGO_URI = mongodb://localhost:27017/yourDbName
ELASTIC_PASSWORD= elasticPassword
ELASTIC_URI = elasticsearch://localhost:9200
ELASTIC_API_KEY = your-api-key (optional)
```

## **Routes**

### **Articles**

| Method | Endpoint                | Description                                                                          |
| ------ | ----------------------- | ------------------------------------------------------------------------------------ |
| GET    | `/article`              | Returns a list of all articles.                                                      |
| GET    | `/article/`             | Returns the article with the specified title based on a specified title in the body. |
| GET    | `/article/search`       | Returns a list of articles based on the specified search body.                       |
| GET    | `/article/common/:word` | Returns the article with the most occurrences of the specified word.                 |
| POST   | `/article`              | Creates a new article.                                                               |

### **Comments**

| Method | Endpoint                      | Description                                           |
| ------ | ----------------------------- | ----------------------------------------------------- |
| POST   | `/article/comment`            | Creates a new comment for the specified article.      |
| GET    | `/article/comment/:articleId` | Returns a list of comments for the specified article. |
| GET    | `/article/comment/:id`        | Returns the comment with the specified.               |

### **Users**

| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| GET    | `/user`       | Returns a list of all users.            |
| GET    | `/user/:id`   | Returns the user with the specified ID. |
| POST   | `/user`       | Creates a new user.                     |
| GET    | `/user/login` | Logs in the user.                       |

---

## **Run Tests**

To run the tests, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the tests:

   ```bash
   npm test
   ```

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
