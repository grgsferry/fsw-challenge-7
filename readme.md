# GameRoom Project

## About

A MVC web application build on Express/Node.js to play games within a room with authentication/authorization implementation for users (players) and admins (who controls and maintain data).

## Setup

- Make sure you have installed RDBMS.
- Install the required packages.
- Install sequelize-cli to global environment.
- Create a folder named `config` and create a file named `config.json` inside it, adjust the content of the file by your own configurations. Example:

```json
{
  "development": {
    "username": "postgres",
    "password": "password",
    "database": "database_development",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": "postgres",
    "password": "password",
    "database": "database_production",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres",
    "logging": false
  }
}
```

- Create `.env` file in root folder with this format:

```
SESSION_KEY = Insert your secret session key here;
JWT_SECRET_TOKEN = Insert your JWT secret token here;
```

- Run these command in your terminal:

```
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

- After successful database creation, mingration, and seeding, you can run the app using:

```
node app.js
```

- You can use `username:admin|password:1234` from Sequelize seeders to access as Player or as Admin. 

## Restful API Routes (Guest)

### No Authentication/Authorization

| Route            | HTTP | Body                                                                                  | Description                                               |
| ---------------- | ---- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| /api/v1/register | POST | `username:String` (required), `email:String` (required), `password:String` (required) | Register a user                                           |
| /api/v1/login    | POST | `username:String` (required), `password:String` (required)                            | Login a user, will return JWT token to authorize the user |

## Restful API Routes (User)

### Authentication needed, Authorization("PlayerUser") needed

| Route              | HTTP   | Body                                                                                                                                                                                                          | Description                 |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| /api/v1/auth/user  | GET    | none                                                                                                                                                                                                          | Read user data              |
| /api/v1/auth/user  | PUT    | `username:String` (optional), `email:String` (optional), `password:String` (optional)                                                                                                                         | Update or change user data  |
| /api/v1/auth/user  | DELETE | none                                                                                                                                                                                                          | Delete user data            |
| /api/v1/auth/game  | GET    | `name:String` (optional)                                                                                                                                                                                      | Read game(s) data           |
| /api/v1/auth/room  | GET    | `name:String` (required)                                                                                                                                                                                      | Read an existing room data  |
| /api/v1/auth/room  | POST   | `name:String` (required), `gameid:Number` (required)                                                                                                                                                          | Create a new room           |
| /api/v1/auth/match | GET    | `roomname:String` (required)                                                                                                                                                                                  | Read an existing match data |
| /api/v1/auth/match | POST   | `roomname:String` (required), `user_suit_1:String` (required: rock/paper/scissors only), `user_suit_2:String` (required: rock/paper/scissors only), `user_suit_3:String` (required: rock/paper/scissors only) | Read an existing match data |

## Restful API Routes (Admin)

### Authentication needed, Authorization("SuperAdmin") needed

| Route               | HTTP   | Body                                                                                                              | Description                  |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| /api/v1/admin/user  | GET    | none                                                                                                              | Read all users data          |
| /api/v1/admin/user  | POST   | `username:String` (required), `email:String` (required), `password:String` (required), `roleid:Number` (required) | Create a new user data       |
| /api/v1/admin/user  | PUT    | `userid:Number` (required), `username:String` (optional), `email:String` (optional), `password:String` (optional) | Update an existing user data |
| /api/v1/admin/user  | DELETE | `userid:Number` (required)                                                                                        | Delete a user data           |
| /api/v1/admin/game  | GET    | none                                                                                                              | Read all games data          |
| /api/v1/admin/game  | POST   | `name:String` (required), `description:String` (required)                                                         | Create a new game data       |
| /api/v1/admin/game  | PUT    | `id:Number` (required), `name:String` (optional), `description:String` (optional),                                | Update an existing game data |
| /api/v1/admin/game  | DELETE | `id:Number` (required)                                                                                            | Delete a game data           |
| /api/v1/admin/room  | GET    | none                                                                                                              | Read all rooms data          |
| /api/v1/admin/room  | PUT    | `id:Number` (required), `name:String` (optional)                                                                  | Update an existing room data |
| /api/v1/admin/room  | DELETE | `id:Number` (required)                                                                                            | Delete a room data           |
| /api/v1/admin/match | GET    | none                                                                                                              | Read all matches data        |
| /api/v1/admin/match | DELETE | `id:Number` (required)                                                                                            | Delete a match data          |

## Contact

Gregorius Ferry - [Github Page](https://github.com/grgsferry)
