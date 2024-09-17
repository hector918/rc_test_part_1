## Folder Structure

```
root
│
├── client (React frontend)
│ ├── package.json
│ └── node_modules
│
├── server (Node.js backend)
│ ├── package.json
│ └── node_modules
│
└── package.json (root)
```

## How to Run This Application (At the ROOT of the FOLDER)

Follow these steps:

1. Install dependencies for the client and server:

```
   npm run install:client
   npm run install:server
```

2. Set up the database:

```
   npm run database
```

3. Seed the database:

```
   npm run seed
```

4. Start the application:

```
   npm run start
```

Once running, both the client and server will be available:

Visit http://localhost:3000 to see the React app.\
Visit http://localhost:3001/users to view all users.\
Visit http://localhost:3001/movies to view all movies.

## React Application

The React app (accessible at http://localhost:3000), you'll see a simple interface with seven movie titles. You can search for these movies by typing their titles into the input box. For example, typing "The Matrix" will display "The Matrix" and its release date.

## SQL Injection Demonstration

A sample SQL injection code is provided for demonstration:

```
' OR 1=1; SELECT * FROM users --
```

Paste this code into the input box to see all users from the database. This exposes a significant security vulnerability.

## Task

Your objectives are:

Identify and Fix Vulnerabilities:

Backend: Address the SQL injection vulnerabilities in the server code.
Frontend: Implement measures to prevent the injection of malicious input.
Research and Presentation:

What is SQL Injection?
Who is Affected?
What Changes Were Made on the Backend?
What Changes Were Made on the Client Side?
Red Canary requires you to document your research and analytical process to evaluate your problem-solving skills.

Please share the GitHub repository link and a PowerPoint presentation with your findings.

You are expected to demonstrate your code and present your findings on SQL injection, including how you resolved the issues.

Please refer to the Detection Engineer documentation for more information.

If you have any questions, please slack me or email me at pak@pursuit.org
