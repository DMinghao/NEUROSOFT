# NeuroSoft Survey Platform 

## Description
NeuroSoft is a medical surveying platform that allows surgeons to create, manage, and distribute medical treatment admission surveys to new and returning patients. The platform will utilize the MERN stack (MongoDB, Express, React, Node.js) to achieve all core functions and incorporate a conventional SQL database to achieve the medical report generation function. 

---
## File Structure
```
NEUROSOFT
├───Main
│   ├───backend
│   │   ├───middleware
│   │   │   └───auth.js                         # 
│   │   ├───models
│   │   │   ├───survey                          
│   │   │   │   ├───pageTemp.model.js           # 
│   │   │   │   ├───questionTemp.model.js       # 
│   │   │   │   ├───survey.model.js             # ORM for survey object
│   │   │   │   └───surveyTemp.model.js         # 
│   │   │   └───user.model.js                   # ORM for user object
│   │   ├───node_modules
│   │   ├───routes
│   │   │   └───API                             
│   │   │       ├───survey.js                   # HTTP handler for survey
│   │   │       ├───template.js                 # 
│   │   │       └───user.js                     # HTTP handler for user
│   │   ├───.env                                # Environemnt variables (i.e. DB connection token)
│   │   └───server.js                           # Server runtime listener 
│   ├───build                                   #
│   ├───node_modules
│   ├───public
│   │   ├───robots.txt                          # 
│   │   └───index.html                          # Main HTML render template
│   ├───src
│   │   ├───components
│   │   │   ├───AdminComponents
│   │   │   │   ├───AdminNav.component.js       # 
│   │   │   │   ├───SurveyMGT.component.js      # 
│   │   │   │   └───UserMGT.component.js        # 
│   │   │   ├───Auth
│   │   │   │   ├───Create-user.component.js    # 
│   │   │   │   └───Login.component.js          # 
│   │   │   ├───Dashboards
│   │   │   │   ├───DocUserPage.component.js    # 
│   │   │   │   └───PaUserPage.component.js     # 
│   │   │   ├───About.component.js              # 
│   │   │   ├───Home.component.js               # 
│   │   │   ├───ViewEdit-survey.component.js    #
│   │   │   ├───Navbar.component.js             # Front end + control of global navigation bar component
│   │   │   ├───new-survey.component.js         # Front end + control of create new survey page
│   │   │   └───survey-list.component.js        # Front end + control of display survey page
│   │   ├───Context                             # 
│   │   │   └───UserContext.js                  # 
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

1. Download and install [Node.js](https://nodejs.org/)
2. Open terminal and access the **NEUROSOFT** folder
3. Run setup commend under **NEUROSOFT** folder:
    * For Windows

        ```bash
        start cmd.exe /c "cd Main/backend && npm i" && start cmd.exe /c "cd Main && npm i"
        ```
    * For MAC

        ```bash
        cd Main ; sudo npm i ; cd backend ; sudo npm i
        ```

### Running the platform 
* <details><summary>For Windows</summary>

    1. Run this shortcut command under **NEUROSOFT** folder: 
        ```bash
        start cmd.exe /c "cd Main/backend && nodemon server" && start cmd.exe /c "cd Main && npm start"
        ```
    2. If the shortcut command does not work, do those steps:
        1. Go to the **backend** folder
            ```bash
            cd Main\backend
            ```
        2. Start a local server 
            ```bash
            nodemon server
            ```
        3. Start a **new terminal**
        4. Go to the **Main** folder
            ```bash
            cd Main
            ```
        5. Start the application 
            ```bash
            npm start
            ```

</details>

* <details><summary>For MAC</summary>

    1. Run this shortcut command under **NEUROSOFT** folder: 
        ```bash
        cd Main/backend ; node server
        ```
    2. Use keyboard shortcut to creat a **new tab** on terminal:<br/>
        <kbd>⌘ Command</kbd> + <kbd>T</kbd>
    3. Run this short command on new tab under **Main** folder:
        ```bash
        cd Main ; npm start
        ```

</details>

* If not automatically opened, in your browser go to the address below 
    ```HTML
    http://localhost:3000/
    ```

### Deploy to AWS
1. **MAKE SURE EVERYTHING IS WORKING**
2. Change MODE variable in .env file 
    ```
    MODE = BUILD
    ```
3. Commit to remote repo
    ```git
    git commit -m "Deploy Build"
    ```
4. Login to AWS EC2 instance 
5. Navigate to /var/www/NEUROSOFT folder
    ```bash
    cd /var/www/NEUROSOFT
    ```
6. Pull repo to EC2 (remote repo username & password required)
    ```git
    git pull 
    ```
7. Navigate to Main folder and build 
    ```bash
    cd /var/www/NEUROSOFT/Main && sudo npm run build
    ```
8. Restart PM2 backend process 
    ```bash
    cd /var/www/NEUROSOFT/Main/backend && sudo pm2 stop all && sudo pm2 delete all && sudo pm2 start server.js 
    ```
<!-- 9. Restart Nginx 
    ```bash
    sudo service nginx stop && sudo service nginx start
    ``` -->
---
## Development Plan 
For project management details, please see [trello](https://trello.com/neurosoft/home)
