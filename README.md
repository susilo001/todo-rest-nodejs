# Todo App

This is a simple todo app built with Node.js, Express, and MySQL. It is a RESTful API that allows you to create, read, update, and delete todo items.

## Prerequisites

Before you start, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (if you want to run the app locally without Docker)

### Getting Started

1. Clone this repository to your local machine:

```bash
gh repo clone susilo001/todo-rest-nodejs
```

2.cd todo-app

```bash
cd todo-rest-nodejs
```

3.copy .env.example to .env

```bash
cp .env.example .env
```

4.docker-compose up

```bash
docker-compose up --build
```

You can access the app at <http://localhost:3030> in your browser.
