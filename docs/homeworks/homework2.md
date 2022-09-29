---
title: homework 2 - Intro to React
description: Building a client side web application to receive 
layout: default
due:
   type: due
   title: homework 2
   date: 2022-10-07T13:59:00-5:00
   description: Homework 2 due
github_link: https://classroom.github.com/a/3NWauEwD
date: 2022-09-23
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Homework2 - CRUD in the Browser Using React


## Cloning your homework assignment

[This GitHub Classroom link](https://classroom.github.com/a/3NWauEwD) will allow you to accept the assignment.


## Installing required packages

Open the terminal window and type in `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed. `npm run dev` will run a local development server and open a web browser window for you that's pointed at your application.

## Skeleton code

The skeleton code for this application is an almost entirely complete, but completely "inert," version of the functional React application that the professor demonstrated in class. You job is to add interactivity and reactivity to this application.

## Navigating and starting project

Before running the project please make sure that you have installed all the dependencies mentioned in the step `Installing required packages`. Start the project by typing `npm run dev` in the terminal and open the URL in a browser. 

When you browse the link, it should take you to the `Home` Page. Explore the app by navigating to the various tabs to get a understanding about the features of the application. 

To start navigating through the project start with the `index.html` page and then follow the path to check how components are used. The main component used in this app is `App` (you can find the code for this in `App.jsx`). Checkout the `Routes` in this file and the other components used. All the other components are written in `/components` folder. The `scss` folder contains the styling import for bootstrap. `initial-data.json` contains the data about initial service requests. You will use this file to list service request whenever you start the applications OR when the user reloads the page. 

Note - Please do not override the `initial-data.json` data with some additional service requests you will create on the web application. This file should be treated as a read-only file.

## Deliverables

Your code must function identically to the fully functional application. There are no TODO lines in the code - part of the challenge of this assignment is choosing where and how to save state in your application.

**Update** 

Deliverables - 

1. Complete the code section in `Chart.jsx` to create a word frequency array. The word frequency is formed based on the long descriptions in the service requests.
An example about the format for creating this array is given. Please visit [react-tagcloud](https://www.npmjs.com/package/react-tagcloud) for more examples. This word frequency array is later passed on to TagCloud component. 

2. List Requests Tab should list the service requests. The representation should be similar like the last homework and should contain buttons to cancel and complete a request. For this homework, when a complete button is pressed the request's text ( name, email, long and short descriptions, etc ) should be striken through (e.g. ~~text~~) to indicate that the request is complete. 
When a request is cancelled, it should be deleted and should be removed from the service request list. 
When is page is loaded / reloaded, the default requests inside the `initial-data.json` should be displayed (i.e. the initial state given by `initial-data.json` should be restored). For example, when a user first loads the page the requests from initial-data.json should be displayed . Now if the user cancels a request, this request is deleted from the service request but if the user reloads the page, all
the requests from the initial-data.json should be again displayed. This action only happens when a user reloads/loads the page. In case the user doesn't reload the page and switches tabs then the current state of the service requests should be displayed. 

3. Add Requests tab contains a form to create service request. Please complete the functions for buttons `Create Request` and `Reset Form`. `Create Request` button should create a request and update the state ( Service Requests ). After creating the service request, this service request should be displayed when you switch to the `List requests` tab ( without page reload ). Whereas `Reset form` button should clear the contents of the form.

## Testing your code

The TA will release integration based test cases for the assignment during the week it is due. As with other assignments, any reasonable-quality test cases that you provide to the class (integration or unit, take your pick) will be eligible for extra credit.

**IMPORTANT**: Test cases are not a list of TODOs. Many students had difficulty getting started on the previous assignment because they took the grading criteria / test cases as an ordered list of TODOs. Please take stock of the full application and requirements before you start writing your code; it will probably be worth your time to stand in front of a whiteboard and build an understanding of the application structure before choosing where to add what.

**Test Cases**

Please download / pull the test cases from this (https://github.com/Tejas-UIC/CS484_HW2_Skeleton.git) repository and create a folder `tests` inside `src` and put the test cases there. The test cases are in `src/tests` folder of the repository. In order to run the test cases, please make sure that you include all the dependencies from the `package.json` from this repo. Also, please include the vitest environment configurations from the `vite.config.js`. If you have not changed your `vite.config.js` or `package.json`, you may directly replace it with these files from the repository. 

In order to run the test, you can change the `test` script in `package.json` to `vitest run`. Once you do this, you can run the tests by typing `npm run test` on terminal. This will run the vitest suite and will provide logging on the console about the test case results. Please note while submitting homework on gradescope, please include the following command in the `test` scripts - `vitest run --reporter=json --outputFile.json=./jest-output.json`. 

## Points 


| Task | Points   |
| ---- | ----------------   |
| List Requests - Complete and Cancel Functions along with displaying of service requests     | 10   |
| Add Request - Create and Reset functions properly implemented | 10 |
| Visualize requests - Tag Cloud Implemented for service requests | 5 |


## Due date

This assignment is due on Friday, October 7th, at 1:59PM. A successful solution to this assignment requires you to write/change approximately **75** lines of code. You are highly encouraged to get started early, because Piazza responses will be delayed near the assignment deadline due to travel.