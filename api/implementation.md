# Introduction

This API acts as an intermediary between your client application and the database.
It provides a set of convenient functions and features, with the goal of allowing different parts of the project to communicate in a persistent manner.

# Features

- User account creation, authentication, and session persistence

- Professor- and Student-specific user information

- Ability to create, view, modify, and delete Courses, Quizzes, and Quiz Questions.

# Usage

There are two ways to interface with the API, either directly through HTTP requests or by using the premade javascript SDK script.

If your application does not use client-side javascript, you will have to use HTTP requests, but the sdk may still be useful to reference for implementation.

## Using the javascript SKD

simply include the script located at [https://antibuddies-api.glitch.me/js/api.js](https://antibuddies-api.glitch.me/js/api.js). This exposes our complete set of endpoints as normal javascript function calls.

for instance, `api.getCourses()` returns an array of all the Courses in the database. this is identical to `GET https://antibuddies-api.glitch.me/api/courses`

## Using HTTP requests

check the best practices for making HTTP requests in the language your app is using.

for instance, in javascript this will look like

```js
fetch("https://antibuddies-api.glitch.me/api/...", {
  method: "POST",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  },
  body: {
    /* ... */
  }
});
```

in java, [https://stackoverflow.com/questions/1359689/how-to-send-http-request-in-java](https://stackoverflow.com/questions/1359689/how-to-send-http-request-in-java)

in C#, [https://stackoverflow.com/questions/9620278/how-do-i-make-calls-to-a-rest-api-using-c](https://stackoverflow.com/questions/9620278/how-do-i-make-calls-to-a-rest-api-using-c)

# Documentation

A written description documentation page can be found
