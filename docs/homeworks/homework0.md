---
title: homework 0 - turning in assignments
description: Turning in using Gradescope
layout: default
due:
   type: due
   title: homework 0
   date: 2022-08-29T13:59:00-5:00
   description: Running Node.js programs, turning in using Gradescope
github_link: https://classroom.github.com/a/8Q0q3DmV 
date: 2022-08-22
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Turning in assignments

This homework is a test run for submitting the future homework assignments
for this class. You will test whether everything is working as expected by
submitting this assignment to the Gradescope. Same method should be followed
throughout the course for the submission of the assignments.

**This assignment is a practice to make sure that each student is comfortable with:**
   * Installing node.js in your environment of choice
   * Cloning a clean copy of your assignment from the GitHub repository using
   SSH and not by typing a password (the repository link
   will be of the format
   `git@github.com:ckclassrooms/cs484-hw0-YOURGITHUBUSERNAME.git`)
   * Making a code change, running the tests, committing it, and pushing it.
   * Navigating to the course Gradescope page and uploading those
      changes (this upload goes through GitHub, not from the machine where
      you are doing your programming).



## Tasks to complete before coding


### Installing Node.js

The easiest way to get started is to go to https://nodejs.org/en/ and download the LTS version of Node.js for your laptop. This will allow you to use the `node` command to run JavaScript from the command line as well as `npm` to install packages and run node applications.

### Cloning your homework assignment

Once you have [accepted the assignment](https://classroom.github.com/a/8Q0q3DmV), you can clone your repository from `git@github.com:ckclassrooms/cs484-hw0-YOURGITHUBUSERNAME.git` and open that directory in your favorite IDE. I would recommend VS Code, as I will be using that for any demonstrations.

### Installing required packages

In the terminal, type `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed.

###Starting application

To start the server and listen on incoming requests, run below command on terminal,

```
npm start

```

This should start the server and you should be able to see console log saying 'Server Up and Listening at 8080'.
Note - If port 8080 is allocated, you can change the port number in the server.js file. 


## The coding

Homework0 is to get familiar with the NodeJS frameworks and some key modules used to setup a web server.
This homework uses ExpressJS for quick and easy server setup. Please find below information on different files used in this HW.

1. server.js - Main file used to start/ stop server. This file contains all the endpoints (GET, POST) 
2. serverFunctions.js - Helper file containing functions for validations of user input 
3. testScript.test.js - JEST framework unit testing file containing unit tests.
4. login.html - HTML/CSS page containing login form.
5. package.json - JSON file containing information about the project, dependencies, starter commands, etc
6. .gitignore - Contains information on what should be ignored from the local project while uploading to Git Repository

### To Do For HW0

The task is super simple: edit `sum` inside of serverFunctions.js so that it takes two (stringified) numbers, adds them, and returns the result. The provided test cases test both valid and invalid inputs.

### Checking your work

We have provided test cases for you using the `jest` testing library. You don't need to edit the test files - for now, just know that this test will use predefined inputs and test for expected correct outputs. You can run the tests locally by running `npm run test`.

### Submitting your work

After you are confident that your code works, you can push the code to GitHub, and then submit it via Gradescope. You can find the link to our class gradescope at the bottom of this page.
If
you have issues with the autograder, please contact us via Piazza ASAP.
**Please keep in mind that technical issues while submitting your assignment is not an
acceptable excuse for improper or late submissions.**

## Points
Causing the one test to pass is worth 10 points, and the entire assignment is worth 10 points. Note that this implicitly tests your ability to download Node, install packages, edit files, upload to github, etc.

## Due Date

This assignment is due at 1:59 PM on Monday, August 29th. See the <Link to="/syllabus">Syllabus</Link> for the late turnin policy. 