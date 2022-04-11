## Description 

The main idea of that project is to implement basic features and functionality which are used in different projects on a 
daily basis, so that one can simply copy-paste necessary parts of the code to their project.     

### Technologies / Frameworks

  - **Node.js + Express**
  - **React + Redux**
  - **Jest**
  - **MongoDB + Mongoose**
  - **Heroku**
  
### Implemented Features

  - **React routing**
  - **REST API and WebSocket** 
  - **File upload** 
  - **Authentication + Authorization (via Json Web Token)**
  - **Google Analytics**
  - **Email notification**
  - **Cron Jobs**

### NPM commands
  
  - **npm install** - Installs dependencies for server 
  - **npm run client-install** - Installs dependencies for client 
  - **npm run app** - Starts the client & server with concurrently 
  - **npm run server** - Starts the Express server only 
  - **npm run server:build** - Builds server files (from Typescript to Javascript)  
  - **npm run client** - Starts the React client only 
  - **npm run deploy** - Deploys changes to Heroku app (run server:build and commit changes to master beforehand) 
   
**Server runs on http://localhost:5000 and client on http://localhost:3000**

### App Configuration

  - Run **heroku create** inside app root (in console) to connect our app to heroku.
  - Add mLab addon in Heroku dashboard and create DB. 
  - Create **.env** file inside **server** folder and add there variables: <br/>
  `MONGO_URI_LOCAL = <URL_TO_MONGO_DB>` (DB to work locally) <br/>
  `MONGO_URI = <URL_TO_MLAB_DB>` (DB in Heroku)<br/>
  `EMAIL_LOGIN = <GMAIL_LOGIN>` (used for sending emails during sign up)<br/>
  `EMAIL_PASSWORD = <GMAIL_PASSWORD>`.
  - Paste the correct openSocket link (for localhost / prod) inside client WebSocket.ts file.
  - Paste correct Google Analytics ID inside ReactGA.initialize().
  
  **Notes:**
  
  - Connection to DB might fail. It might happen because Mongo Cloud removes clusters due to inactivity. Check whether 
  the following instance is active: https://cloud.mongodb.com/ => Project 0 => Databases => Cluster 0 
  - Another DB connection failure might be connected to the IP whitelist. Try to add your IP in 
  https://cloud.mongodb.com/ => Security => Network Access => Add Ip Address => Add current IP address 
  - Email confirmation functionality might fail with error because of Google policy
  
### Heroku
  
  Heroku is a platform used for app hosting. List of available commands (via Terminal):
  - **heroku open** - opens heroku app URL in browser
  - **heroku local** - runs locally heroku app (to test locally how the app will work on prod)
  - **heroku config** - shows the list of env variables (declared on heroku side)
  - **heroku domains** - shows the list of heroku domains used for the app 

### Webstorm (Intellij) IDE settings

  - **Languages & Frameworks => Javascript => Libraries => Add Node** (or enable if it's already added)
  - **npm install --save-dev @types/express** - to make IDE see Express methods  
 
