# Victora University of Wellington - Wellington Faculty of Architecture and Design Innovation (Strapi application)

VUW Project is based on [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Strapi CMS](https://strapi.io/).

This repo is the Strapi application Headless CMS for the current [frontend](https://github.com/psychoactive-studios/vuw-frontend)

## Table of Content
* [I. Hosting with VUW Server and Nginx](#i-hosting-with-vuw-server-and-nginx)
  - [To connect to VUW server](#to-connect-to-vuw-server)
  - [Development and Deployment environment](#development-and-deployment-environment)
* [II. General Settings](#ii-general-settings)
  - [Scripts to run the app](#scripts-to-run-the-app)
  - [`ecosystem.config.js`](#ecosystemconfigjs)
  - [`.env`](#env)
  - [index.html](#indexhtml--publicindexhtml)
  - [Configuration](#configuration--config)

## I. Hosting with VUW Server and Nginx
The current site is being deployed over VUW Server. There are currently two directories inside the folder has my name on it `vincent`

  * `vuw-frontend` - This folder linked to the [frontend repo](https://github.com/psychoactive-studios/vuw-frontend) on Psychoactive Github
  * `vuw-backend` - This folder linked to the [backend repo](https://github.com/psychoactive-studios/vuw-backend) on Psychoactive Github
  * AWARE: both of these 2 folders have their own branch for deployment which is `vuw`

### To connect to VUW server:
  * `ssh vincent@vuwunicodesjav1.vuw.ac.nz`
  * Password: Please consult with Psychoactive Account manager

Note: Contact VUW later in the future if require to create a new connection account / password to server

### Development and Deployment environment
  * Ensure the Node JS version USED is v14.18.2
  * There is also [PM2](https://pm2.keymetrics.io/) installed that will help managing and keep application online 24/7)
    - Check the list of app that currently running by `pm2 list`, you will find 2 apps that currently running in the list:
      - `vuw-frontend`
      - `vuw-backend`
    - To STOP the app `pm2 stop <app-name>`
    - To RESTART the app `pm2 restart <app-name>`
    - There are also DELETE, START

### `/etc/nginx/sites-available/vuwunicodesjav1.vuw.ac.nz`

  ```conf
  server {
          # Listen HTTP
          listen 80;
          listen [::]:80;
          server_name vuwunicodesjav1.vuw.ac.nz;

          #access_log /var/log/nginx/nginx.vhost.access.log;
          #error_log /var/log/nginx/nginx.vhost.error.log;
    
          # Static Root
          location / {
                  add_header 'Access-Control-Allow-Origin' '*';
                  proxy_pass http://localhost:3000;
                  proxy_http_version 1.1;
                  proxy_set_header X-Forwarded-Host $host;
                  proxy_set_header X-Forwarded-Server $host;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header X-Forwarded-Proto $scheme;
                  proxy_set_header Host $http_host;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_set_header Connection "Upgrade";
                  proxy_pass_request_headers on;
          }

          location /backend {
                  rewrite ^/backend/?(.*)$ /$1 break;
                  add_header 'Access-Control-Allow-Origin' '*';
                  proxy_pass http://localhost:1337;
                  #proxy_http_version 1.1;
                  #proxy_set_header X-Forwarded-Host $host;
                  #proxy_set_header X-Forwarded-Server $host;
                  #proxy_set_header X-Real-IP $remote_addr;
                  #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  #proxy_set_header X-Forwarded-Proto $scheme;
                  #proxy_set_header Host $http_host;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_cache_bypass $http_upgrade;
                  #proxy_set_header Connection "Upgrade";
                  #proxy_pass_request_headers on;
          }
  }
  ```
  * `location /` proxy_pass to the localhost port 3000 which is the Frontend of the VUW Site
  * `location /backend` proxy_pass to the localhost port 1337 which is the Backend of the VUW Site
  * Make sure you check the nginx status that it run successfully

## II. General Settings

### Scripts to run the app
When first clone the repo, please ensure you are on:

  * Node JS version `v14.18.2`
  * Run `npm ci` in the terminal to install all the packages while respect all the requirements in `package-lock.json`
  * `npm run develop` - this command to run local development for the Strapi APP. Most of the development of the CMS can be executed through the application interface [localhost:1337](http://localhost:1337)
    - Adding collection/field to the CMS
    - Creating logic for the backend (required field, edittable field, etc)
  * `npm run start` - this command to run local build of the Strapi app
    - Ensure the `npm run build` is succeed before `npm run start`
    - You can still access [localhost:1337](http://localhost:1337) for adding more content/media, though you CANNOT adding more collection/field as the environment is now production, not development.
  * `npm run build` - this command to build the strapi app
  * `npm run strapi` - this command will generate a list of other helpful commands to work with Strapi.

### `ecosystem.config.js`
This file created when run `pm2 init` and it is also the file for `pm2` to execute the app running forever.

```js
module.exports = {
  apps : [{
   name: 'vuw-backend',
   script: 'npm',
   args: 'start'
  }]
};
```

### `.env`
The `.env` file will be generated when first time running the project.

Ensure these are exists in the file:

```env
PUBLIC_URL="http://vuwunicodesjav1.vuw.ac.nz/backend"
JWT_SECRET=<This is going to be different between places of the app>
API_TOKEN_SALT=<This is going to be different between places of the app>
```

### index.html → `/public/index.html`

```html
<html>
  <head>
    <meta http-equiv="refresh" content="0;URL='/admin'" />
  </head>
</html>
```

This file is mainly for redirect people to everytime go to this path, it will take them to `/admin` in order to login to the CMS Dashboard.

### Configuration → `/config`
This directory is where Strapi stored all the configuration files for setting up the CMS. Strapi has generated default files to set things up ready and go.

