A full stack web application with frontend using React/Typescript and tailwind CSS and backend with .net core connecting to MS SQL database. JWT based authentication is implemented. Here are the steps to run the application.

1. Add the Finance Modeling Prep Key in the .env folder in React and in appsettings.json in the api folder for calls to the external API using axios.
2. Install all required node modules using npm install and also the Entity framework and JWT packages using the nuget library.
3. Run the dotnet app using "dotnet run" and the react application using "npm start"
4. Connect to the MS SQL server and add the connection string in the appsettings.json file in the api folder.
5. Run the migrations and update the database.
6. Your are now ready to use the application.
