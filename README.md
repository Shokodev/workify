# workify

## Installation
 This project was mainly made to run on a OFFLINE Windows machine! 

### Prerequisities
 On the target machine install: 
 1. Node https://nodejs.org/en/
 2. Mongodb https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
 3. Clone this repo or latest release to a dev machine(with node installed)
 4. Do the project setup:
 
    Install depencies backend  @ `/ ` with:
    ```
    npm install
    ```
    Install depencies frontend @ `/client` with:
    ```
    npm install
    ```
    Compile frontend in backend `public` folder @ `/client` with:  
    ```
    npm run build
    ```
  5. Copy all files except the client folder to the offline target machine. Since you have to copy the node modules we suggest you to zip the files but its up to you.
  6. On the target machine you can unzip the files in any directory
 
### ENV Settings
 1. Navigate to the unzippet project and edit the .env-sample.txt 
  
  ```
  NODE_ENV=production (dev or production)
  PORT= port which you want the app to listen to 
  DATABASE_URL= URL of previous installed mongodb service / name for db instance example: mongodb://localhost:27017/workify
  TOKEN_SECRET= choose any characters, this is the private key for the jwt token service
  TOKEN_EXPIRES_IN= number in seconds for token expire time 
  DEFAULT_ADMIN_PW= password for the default admin user
  ```
  2. Save the file as `.env` 
 
### Build Setup
 1. Open command promt as admin in the project directory
 2. `npm run install` 

### Unistall 
 1. Open command promt as admin in the project directory
 2. `npm run uninstall` 

## Technologies
<p align="center">
 <img src="https://icons.andreas-vogt.ch/workify.png" alt="Fail">
</p>
 
# More information

* Nickname of  default admin `dfa`
* Log file @ `/logs/ServerLog.log `

