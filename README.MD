# PROYECTO NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# npm -i para instalar modules
npm -i 

# para ejecutar 
npm run dev

# package.json
Se modificó

"scripts": {
    "dev": "tsnd --respawn --clear src/app.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/app.js"

Se debe instalar 

npm install --save-dev @types/node

# dev
1.- Clonar el archivo .env.template a .env
2.- configurar las variables de entorno

```
MAILER_EMAIL=
MAILER_SECRET=
PORT=3000
PROD=false
```
3.- Ejecutar el comando ```npm install ````

4.- Levantar las bases de datos con el comando 
````
    docker compose up -d
```
5.- Ejecutar ```npm run dev ```

