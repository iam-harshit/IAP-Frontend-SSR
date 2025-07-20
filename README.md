M&M - Frontend
Prerequisites

Download the following.

1.Node JS

https://nodejs.org/en

2.Visual Studio Code

https://code.visualstudio.com/

Create React App Using Vite with below commands

1.type _npm create vite@latest_ in your vsc terminal

2.go to your created folder & type _npm init_ in your terminal for node_modules & package-lock.json

3.type _npm run dev_ to run react app.

Integrate Your App with

1.Tailwind CSS

2.Axios

3.Router

4.Redux Toolkit

1. Tailwind CSS

https://tailwindcss.com/docs/guides/vite

step 1:type _npm install -D tailwindcss postcss autoprefixer_

step 2:type _npx tailwindcss init -p_
These two commands will create two config files -> Postcss.config.js & tailwind.config.js

step 3: replace the code in tailwind.config.js file with the below code.

/\*_ @type {import('tailwindcss').Config} _/

export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

step 4: Go to index.css file & add this directives

@tailwind base;

@tailwind components;

@tailwind utilities;

step 5 : Tailwind Setup is done.

2. How to setup Axios in your project.

https://www.npmjs.com/package/axios

step 1 : type _npm i axios_ in your terminal.

step 2 : import axios from "axios";

step 3 : use axios in your app like

axios.get(url)
.then(res => {

<!-- console.log(res.data); -->

});

3. How to setup React Router Dom

https://www.npmjs.com/package/react-router-dom

step 1 : type _npm i react-router-dom_ in your terminal.

follow the remaining steps

https://reactrouter.com/en/main/start/tutorial

4. How to Integrate Redux ToolKit

step 1: type _npm i @reduxjs/toolkit_

step 2 : type _npm i react-redux_

follow the remaining steps

https://redux-toolkit.js.org/tutorials/quick-start
