# Project Management Application

A powerful and flexible project management application built to help companies manage projects, assign tasks, collaborate with teams, create comments on tasks, add image attachments, and create issues. This application is similar to tools like Jira and is designed to streamline project workflows and enhance team productivity.

## Features

- **Project Creation and Management**: Easily create and manage projects.
- **Task Assignment**: Assign tasks to team members and track progress.
- **Collaboration**: Add comments, attachments, and update tasks in real-time.
- **Issue Management**: Create and manage issues for tasks and projects.
- **File Attachments**: Attach images, documents, and other files to tasks.
- **Team Collaboration**: Support for multiple users and roles within teams.
- **Real-Time Updates**: Live updates for project and task changes.

## Tech Stack

- **Frontend**:
  - **Next.js**: For building a fast, SEO-friendly React application with server-side rendering.
  - **React**: For building dynamic and reusable UI components.
  - **Tailwind CSS**: A utility-first CSS framework for building modern UI designs.

- **Backend**:
  - **Node.js**: JavaScript runtime for building the server.
  - **Express.js**: Web framework for Node.js to handle routing and API endpoints.

- **Database**:
  - **PostgreSQL**: Relational database for storing project data, user information, and task details.

## Getting Started

### Prerequisites

- Node.js and npm (or Yarn)
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/project-management-app.git
   cd project-management-app
   ```
2. Install dependencies for both frontend and backend:

 - For the frontend:
 
    ```bash
    cd client
    npm install
    ```

 - For the backend:

   ```bash
   cd server
   npm install
   ``` 

3. Set up PostgreSQL and create a database for the application.


4. Configure your database connection in the `src/.env` file and other keys like jwt secret, tokens Expires SMTP configs, azure blob keys.

5. Run the application:

- For the backend (Express server):

  ```bash
  cd server
  npm run dev
   ```
- For the frontend (Next.js):
   ```bash
   cd server
   npm run dev
   ```
6. Open your browser and go to http://localhost:3000 to see the application running.


### Project Structure

- **client**/: Frontend code for the application built using Next.js and React.
  
  - `src/app`: Contains all Next.js pages and components.
  - `src/components/ui/`: Reusable UI components.
  - `src/app/global.css/`: Tailwind CSS configuration and global styles.
  - `src/lib/`: Redux state and RTK Query files.

- **server/**: Backend code built using Node.js and Express.js.

   - `src/routes/`:  API routes for the application.
   - `src/controllers/`: Contains business logic for handling requests.
   - `src/services/`: Contains database services for controller business logic.
   - `src/middlewares`: Contains middlewares

## UI Screenshots

1. **Dashboard**
   
   The Dashboard displays all the projects the user is involved in, along with all the tasks assigned to them. This view provides an overview of the user's current responsibilities and gives quick access to tasks within each project.
   
    ![Create Next App - Google Chrome 13-11-2024 15_40_14](https://github.com/user-attachments/assets/68ee2141-8366-4822-ad67-60b5a3a06dd8)

3. **Task Kanban Board**
   
   The Task Kanban Board allows users to manage tasks using a flexible Kanban-style board. The board offers 4 views to suit different needs:

      - **Kanban View**: A visual board showing tasks in columns based on their status.
      - **List View**: A simplified list of tasks.
      - **Table View**: Displays tasks in a tabular format with sortable columns.
      - **Timeline View**: A Gantt-style timeline view showing tasks over time.
        
      ![Create Next App - Google Chrome 13-11-2024 15_40_43](https://github.com/user-attachments/assets/158a8781-f32b-45bb-b305-35ba2166db9b)


4. **Task Details Modal**
   
      The Task Details Modal provides in-depth information about a specific task. This modal displays attachments, comments, issues, and all other task-specific details, giving users a comprehensive view of the task's current state and collaboration context.

      ![Create Next App - Google Chrome 13-11-2024 15_40_51](https://github.com/user-attachments/assets/f820f9fb-6ae3-4077-b891-e2b5cb52c634)


 ## API Endpoints

### Authentication & User Management

- **POST /register**: Register a new user.
- **POST /login**: Login with username and password.
- **POST /loginwithotp**: Login using OTP (One-Time Password).
- **POST /verifyotp**: Verify the OTP sent during login.
- **POST /logout**: Logout the current user.
- **GET /getuser**: Get details of the currently authenticated user. Requires authentication (`isAuthenticatedUser` middleware).
- **POST /forgotpassword**: Request a password reset link.
- **POST /resetpassword/:resetToken**: Reset the password using a reset token.

### Projects

- **GET /getprojects**: Get a list of all projects. Requires authentication (`isAuthenticatedUser` middleware).
- **POST /createproject**: Create a new project. Requires authentication.
- **GET /getproject**: Get details of a specific project. Requires authentication.
- **GET /getNotProjectTeams**: Get teams not associated with any project. Requires authentication.
- **PUT /inviteTeam**: Add teams to a project. Requires authentication.
- **GET /getprojectUsers**: Get users associated with a specific project. Requires authentication.
- **DELETE /delete/:projectId**: Delete a specific project by project ID. Requires authentication.
- **PUT /update/:projectId**: Update a specific project by project ID. Requires authentication.
- **GET /projects**: Search and filter projects.

### Tasks

- **GET /gettask**: Get a list of all tasks.
- **POST /createTask**: Create a new task.
- **PATCH /:taskId/updateStatus**: Update the status of a specific task by task ID.
- **GET /getsingleTask**: Get details of a single task.
- **DELETE /delete/:taskId**: Delete a specific task by task ID. Requires authentication.
- **GET /gettasks/:userId**: Get tasks assigned to a specific user by user ID.

### Comments

- **POST /comment/:taskId**: Create a comment for a specific task. Requires authentication.
- **GET /comment/:taskId**: Get all comments for a specific task.
- **DELETE /comment/:commentId**: Delete a specific comment by comment ID. Requires authentication.

### Attachments

- **POST /attachment/:taskId**: Upload an attachment (file, image, document, etc.) for a specific task. Requires authentication.
- **GET /attachment/:taskId**: Get all attachments associated with a specific task. Requires authentication.
- **DELETE /attachment/:attachmentId**: Delete a specific attachment by attachment ID. Requires authentication.

### User and Team Management

- **GET /getallusers**: Get a list of all users. Requires authentication.
- **GET /getAllTeams**: Get a list of all teams. Requires authentication.
- **GET /users**: Search and filter users.
- **GET /teams**: Search and filter teams.

### Search Endpoints

- **GET /projects**: Search and filter projects.
- **GET /users**: Search and filter users.
- **GET /tasks**: Search and filter tasks.
  

### Explanation:

1. **Project Overview**: Provides a summary of the features your application offers, including project management, task assignment, team collaboration, etc.
2. **Tech Stack**: Specifies the core technologies used in both the frontend and backend.
3. **Getting Started**: Installation and setup instructions for developers.
4. **Project Structure**: A brief description of the folder structure of the frontend (`client`) and backend (`server`).
5. **API Endpoints**: Lists and explains all the available API routes.
6. **Contributing**: How others can contribute to the project.
7. **Acknowledgements**: Credits to the frameworks and technologies used.

This markdown file is now a comprehensive resource that should provide all the necessary information for developers or users interacting with your project management application. You can further customize or add additional details as needed.
