# workify

## Installation
 This project was mainly made to run on a OFFLINE Windows machine! 

### Prerequisities
 On the target machine install: 
 1. Node https://nodejs.org/en/
 2. Mongodb https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
 3. Copy the latest release of this repo to machine and unzip it @ any directory
    
    Please consider that the node modules has to be included if the target machine is offline!
 
### ENV Settings
 1. Navigate to the unzippet repo and edit the .env-sample.txt 
  
  ```
  NODE_ENV=production (dev or production)
  PORT= port which you want the app to listen to 
  DATABASE_URL= URL of previous installed mongodb service / name for db instance
  TOKEN_SECRET= choose any characters, this is the private key for the jwt token service
  TOKEN_EXPIRES_IN= number in seconds for token expire time 
  DEFAULT_ADMIN_PW= password for the default admin user
  ```
  2. Save the file as `.env` 
 
### Build Setup
 1. Open Command promt as Admin in the project directory
 2. `npm run install` 

### Unistall 
 1. Open Command promt as Admin in the project directory
 2. `npm run uninstall` 

## Technologies
<p align="center">
 <img src="https://raw.githubusercontent.com/8bithemant/8bithemant/master/svg/dev/languages/js.svg" alt="Fail">
 <img src="https://raw.githubusercontent.com/8bithemant/8bithemant/master/svg/dev/services/npm.svg" alt="Fail">
</p>
 
