# TypeScript-RxJS-Cypress-Webpack-Docker

A (relatively) basic project using yarn and docker for testing rxjs with typescript. With Cypress for testing and Webpack to build.

# Running Services

Linux users should first open xhost to local docker user. Example:
>xhost +"local:docker@"

Build docker image when running for the first time:
>docker-compose build

Startup:
>docker-compose up

This will start two service containers: web (service "frontend") and cypress

Open browser to:
>http://192.168.2.99:3000/dist


# webpack watch

For development, run webpack watch. Log into service "frontend" container and run:
     yarn run webpack build --watch


[not integrating it into yarn start since this can become optional]


# Creating the web app
Some steps I did for the web app project. 

## 1. Add serve package
Launched docker image "node:latest" to do this step, which is before making the docker files.

(In container...)

Add server:

	yarn add server

Now we can serve (empty) project on web

	yarn serve

## 2. Docker services
Created Dockerfile and docker-compose.yml for Cypress and web server (service "frontend").

Do docker build:

	[sudo] docker-compose build

When frontend is launched, login to container like so:

	docker exec -it [container ID] /bin/bash  
  
## 3. Add TypeScript, rxjs, webpack

(in container...)

add rxjs:

	yarn add rxjs
	
add typescript:

	yarn add typescript --dev
	yarn run tsc --init

make build folder and perm:

	mkdir build
	chmod 775 build
	sudo chmod 775 tsconfig.json
	sudo chown <dev user> tsconfig.json

For tsc watch options, modify tsconfig.json with hints in **[article](https://www.typescriptlang.org/docs/handbook/configuring-watch.html)**
  

...I basically added exclude:

>"exclude": [
>  "node_modules",
>  "**/*.spec.ts"
>]

These options are useful if transpiling is done with just **tsc**, but it's more convenient to set up webpack instead so that module loading is more typical.
  
### Add Webpack

Install webpack:

	yarn add webpack webpack-cli --dev

## 4. The homepage
Follow some steps in **[webpack beginner tutorial](https://webpack.js.org/guides/getting-started/)** to make new folder dist/ with root index **dist/index.html**

Key thing is that dist/index.html will have link to the build like so:

	<script src="/dist/main.js"></script>
