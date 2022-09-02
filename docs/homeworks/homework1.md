---
title: homework 1 - crud apps
description: Express + SQLite
layout: default
due:
   type: due
   title: homework 1
   date: 2022-09-09T13:59:00-5:00
   description: Homework 1 due
github_link: https://classroom.github.com/a/8Hso8Pyq 
date: 2022-08-29
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Homework1 - Crud App

This Homework is about securing a CRUD App that is provided to you with a session based authentication using passport.js. Once you are done, please submit the github repository on Gradescope.  

## Overview
Homework1 is about implementing session-based authentication using passport.js and also implementing few of the frontend functions in frontendFunctions.js. 

The webapplication that is provided to you has the following features - 

1. Create a user ('/create_user')
2. Update user details ('/update_user')
3. Login ('/login')
4. Delete a user ('/delete_user')
5. Create a service request ('/create_service_request') 
6. Mark a service request as completed ('/approve_service_request'). This could only be performed by an admin user
7. Cancel a user's service request ('cancel_service_request'). This could only be performed by an customer

Checkout 'Exploring the webapplication' section on details about the functionality of webapp.

## Pre-requisite 

Please have `Node.js` installed for starting this project. For installing `Node.js` checkout this webpage https://nodejs.org/en/ and download the LTS version of Node.js for your laptop.

## Cloning your homework assignment

[This GitHub Classroom link](https://classroom.github.com/a/8Hso8Pyq) will allow you to accept the assignment.


## Installing required packages

Open the terminal window and type in `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed. This will also setup the database `HW1_DB.db` in the folder `database`. To start the server, type in `npm start` or `node server.js` and this should start the server and log following messages on the console.

```
Server Up and Listening at http://localhost:8080/
Connected to the database HW1_DB.db

```

For stopping Nodejs application, press Ctrl + c

## Project Details

This homework uses ExpressJS for quick and easy server setup along with SQlite to store user data and credentials(in encrypted format). Please find below information on different files used in this HW.

1. server.js - Main file used to start/ stop server. This file contains all the endpoints (GET, POST) and the middlewares useful for setting session-based authentication
2. serverFunctions.js - Helper file containing functions for validations of user input (name, emailId, password)
3. testServerFunctions.test.js - JEST framework unit testing file containing unit tests for functions validating username (String inputs), email and password
5. package.json - JSON file containing information about the project, dependencies, starter commands, etc
6. .gitignore - Contains information on what should be ignored from the local project while uploading to Git Repository

### New Files Used for setting Passport.js and Database connection 
7. passportAuth.js (**IMPORTANT FILE**) - File containing initialization for local strategy and functions to serialize and deserialize the user data
8. dbFunctions.js - Database connection and SQL Statements for performing CRUD Operations
9. crudOperationsFunctions.js - Intermediate file containing functions which will call functions in 'dbFunctions.js'. This approach is helpful to do any sanity checks/ data manipulation before hitting database queries 
10. views folder - The views folder contains all the .html pages that are used for this web application
11. public folder - contains all the JS enabling frontend logics

## Exploring the webapplication

Consider this web application as a place where a customers can create a service request about any issue and then the admin takes a look at the service request and if  the service request is completed, marks it complete. For simplicity, admin can view / create all the service requests and mark them complete BUT cannot cancel a request. On the other hand, customers can create / view all service request and cancel any service request BUT cannot complete a request. 

Once you are successfully able to start the server, go to the landing page by accessing 'http://localhost:8080/' page. Please replace the `port` with the port that you have used to setup the server. If you are able to see this page, you have successfully started the application. Start by creating a user
1. Create a user by accessing 'http://localhost:8080/create-user'. There are two types of user - admin and customers. Admin can create and complete a request. Customer can create and delete a service request but cannot complete the request. For simplicity everyone can view the list of requests. 
2. Once the user is created, Login using those credentials. This should take you to the dashboard. Note - With the code provided you can login with any email and password (even if its not created) as there is no authentication implemented.
3. Create a service request 
4. Use the navigation bar to access other routes
5. You can also list the service requests by clicking on the 'List Requests' button on the dashboard.

Note - For any issues encountered on the web pages, check the server logs for more details. Also, if you want to start with clean database, delete the `HW1_DB.db` file inside the `database` folder and run `npm install` again. 

## ToDo For HW1

1. This web application doesn't have authentication and you need to add code that enables authentication. You need to modify `passportAuth.js` and `server.js` files to enable passport session authentication and also add code to enable authentication on each route that is visited. Check the `TO DO` section in those files along with more comments for the specifics. 
2. Apart from that, you also have to complete the `listServiceRequest()` function inside the `./public/frontEndFunctions.js` file. This functions is used to create a list of service request and display on the dasboard page.
3. Once a service request is marked complete , the web application should send an email to the customer about the same. Check out `approve_service_request` route in `server.js` for comments about this implementation. Email notification should contain some information about the service request approved.

Note - Keep your mailgun API key in the .env file and access it in your code with the `process.env`. Checkout this link for more details - https://www.npmjs.com/package/dotenv. 

## Checking your work

Once you have completed with your work , you should be able to create a user and login. Once you login, the `req.session`, should have an extra passport entry. This confirms that you are able to authenticate using passport.js. Visit other routes and see if you able to access them. Now logout of the application and try directly accessing a route where you have implemented authentication (e.g. http://localhost:8080/dashboard). This should take you to the `login` page. 

For checking email notification. Create a request and complete the request and this should send your email notification to the recipient.

To check `listServiceRequest()`, go to `/dashboard` by logging in and then create some requests and `List Requests`. This should list all the requests you have created ( plus any previous ones if any ) and if you are logged in via admin user you should be able to complete the request. Now again press `List Requests` and you shouldn't be able to view that same service request you completed. Now login with a customer user and try completing the request. If you have implemented authentication and proper access control, you shouldn't be able to complete the request and `alert` window should pop up.

## Submitting your work

After you are confident that your code works, you can push the code to GitHub, and then submit it via Gradescope. You can find the link to our class gradescope at the bottom of this page. If you have issues with the autograder, please contact us via Piazza ASAP. **Please keep in mind that technical issues while submitting your assignment is not an acceptable excuse for improper or late submissions.**

## Points 


| Task | Points   |
| ---- | ----------------   |
|  Basic access control (pages only available to logged in users)     | 10   |
| Admin access control (non-admins can't complete tasks) | 10 |
| List of active requests populates correctly on the client side | 10 |
| Email gets sent properly to client on completion | 10 |

## Due Date

This assignment is due at 11:59 PM on Thursday, September 15th. We will release detailed test cases by Monday, September 12th. Extra credit in the course is available for anyone who writes meaningful test cases and submits them to the TA by Sunday, September 11th.