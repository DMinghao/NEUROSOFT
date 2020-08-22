# NeuroSoft Survey Platform 

## Description
NeuroSoft is a medical surveying platform that allows surgeons to create, manage, and distribute medical treatment admission surveys to new and returning patients. The platform will utilize the MERN stack (MongoDB, Express, React, Node.js) to achieve all core functions and incorporate a conventional SQL database to achieve the medical report generation function. 

---
## File Structure (Not up to date)
```
NEUROSOFT
├───Main
│   ├───backend
│   │   ├───models
│   │   │   ├───survey.model.js                 # ORM for survey object
│   │   │   └───user.model.js                   # ORM for user object
│   │   ├───node_modules
│   │   ├───routes
│   │   │   ├───survey.js                       # HTTP handler for survey
│   │   │   └───user.js                         # HTTP handler for user
│   │   ├───.env                                # Environemnt variables (i.e. DB connection token)
│   │   └───server.js                           # Server runtime listener 
│   ├───build
│   ├───node_modules
│   ├───public
│   │   └───index.html                          # Main HTML render template
│   ├───src
│   │   ├───components
│   │   │   ├───create-user.component.js        # Front end + control of create user page
│   │   │   ├───edit-survey.component.js        # (not implemented)
│   │   │   ├───Navbar.component.js             # Front end + control of global navigation bar component
│   │   │   ├───new-survey.component.js         # Front end + control of create new survey page
│   │   │   └───survey-list.component.js        # Front end + control of display survey page
│   │   ├───App,js                              # Application component layout structure 
│   │   └───index.js                            # Main file (rendering App to HTML template)
│   └───README.md
├───README.md                                   # Read me doc
├───.gitignore
└───tree.txt                                    # I am Groot
```
---
## Getting Started

### Dependencies

Download and install [Node.js](https://nodejs.org/)

Run this command under NEUROSOFT folder: 
```bash
start cmd.exe /c "cd Main/backend && npm i" && start cmd.exe /c "cd Main && npm i"
```

### Running the platform 

1. Go to the backend folder
    ```bash
    cd Main\backend
    ```
2. Start a local server 
    ```bash
    nodemon server
    ```
3. Start a **new terminal**
4. Go to the Main folder
    ```bash
    cd Main
    ```
5. Start the application 
    ```bash
    npm start
    ```
6. If not automatically opened, in your browser go to the address below 
    ```HTML
    http://localhost:3000/
    ```
If you are lazy like me use this command under NEUROSOFT folder: 
```bash
start cmd.exe /c "cd Main/backend && nodemon server" && start cmd.exe /c "cd Main && npm start"
```

---
## Development Plan 
For project management details, please see [trello](https://trello.com/neurosoft/home)
