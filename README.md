# Todo App

## Prerequisites

Before you start, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (if you want to run the app locally without Docker)

### Getting Started

1. Clone this repository to your local machine:

```bash
  git clone https://github.com/yourusername/todo-app.git
```

2.cd todo-app

```bash
cd todo-app
```

3.docker-compose up

```bash
docker-compose up --build
```

You can access the app at <http://localhost:3030> in your browser.

### Usage

To add a new task, click on the "Add Task" button and fill in the task details.
To mark a task as completed, click the checkbox next to the task.
To delete a task, click the "Delete" button associated with the task.
Database Configuration
The app uses a MySQL database to store todo items. You can configure the database connection in the docker-compose.yml file and the Node.js application's environment variables in the .env file.
