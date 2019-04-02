# Cinephile Network

> A social network app for film buff built with the MERN stack.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

Developed a full stack social media web app for cinephiles to connect and discuss movies. Cinephiles can create profiles, recommend movies, review movies & participate in discussion by commenting or liking on other cinephile's post.
Created Backend API's with protected routes using Nodejs, Express, JWT and Passport.
Developed front end in ReactJs and performed state management using Redux.

## Technologies

Project is created with:

- node: 10.15.4,
- express: 4.16.4,
- react: 16.8.5,
- redux: 4.0.1

## Setup

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a keys_dev.js in the server config folder with

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

### Author

Sanidhya keluskar
[Sanidhya keluskar](https://sanidhyakeluskar.com)

### Version

1.0.0
