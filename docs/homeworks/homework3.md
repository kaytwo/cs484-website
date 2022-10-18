---
title: homework 3 - Intro to Supabase And React
description: Building a client side web application with supabase
layout: default
due:
   type: due
   title: homework 3
   date: 2022-10-07T13:59:00-5:00
   description: Homework 3 due
github_link: https://classroom.github.com/a/3NWauEwD
date: 2022-09-23
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Homework3 - Implementing 312 App using Supabase and React


## Cloning your homework assignment

[This GitHub Classroom link]() will allow you to accept the assignment.


## Installing required packages

Open the terminal window and type in `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed. `npm run dev` will run a local development server and open a web browser window for you that's pointed at your application.

## Skeleton code

The skeleton code for this application is an almost entirely complete, but the state is not persistent. You need to add code to make it work with supabase backend which will store the information about service requests.

## Navigating and starting project

Before running the project please make sure that you have installed all the dependencies mentioned in the step `Installing required packages`. Start the project by typing `npm run dev` in the terminal and open the URL in a browser. 

This the same application you created during the last homework, so the functionality remains the same. Your task is to create a supabase instance and setup the D]database and then use the supabase CRUD APIs to make this project functional with the backend. Also, for this homework you will implement Oauth authentication with Github. 

## Getting Started with setting up Database with Supabase

Before you start working on the Homework, please get a good overview about supabase. You may want to start with the (quick start)[https://supabase.com/docs/guides/with-react] guides to get a good idea about the workings of supabase. 

The skeleton code contains SQL scripts to create `service_requests` & `admins_mapping` tables in supabase. These scripts are located under `src/database_starter`. Copy the content in these scripts and navigate to  `SQL Editor` on supabase dashboard. Then click on `New Query` located on the left pane and paste the SQL Scripts and press `Run`.

### service_requests table
This is the main table where information about service requests are stored. Apart from other data fields , please take a closer look at `id` and `user_id` fields. `id` is the primary key and uniquely identifies each service requests. `user_id` is a foreign key which helps in mapping information about which user created the requests



## Deliverables

Your code must function identically to the fully functional application. There are no TODO lines in the code - part of the challenge of this assignment is choosing where and how to save state in your application.

Deliverables - 

1. Github Oauth Authentication - In the skeleon project, you have been provided with the dummy `login` and `logout` functionality  


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