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



## Installing required packages

Open the terminal window and type in `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed. `npm run dev` will run a local development server and open a web browser window for you that's pointed at your application.

## Skeleton code

The skeleton code for this application is an almost entirely complete, but the state is not persistent. You need to add code to make it work with supabase backend which will store the information about service requests.

## Navigating and starting project

Before running the project please make sure that you have installed all the dependencies mentioned in the step `Installing required packages`. Start the project by typing `npm run dev` in the terminal and open the URL in a browser. 

This the same application you created during the last homework, so the functionality remains the same. Your task is to create a supabase instance, setup the database and then use the supabase CRUD APIs to make this project functional with supabase as your backend. Also, for this homework you will implement Oauth authentication with Github. 

## Getting Started with setting up Database with Supabase

Before you start working on the Homework, please get a good overview about [supabase](https://supabase.com) . You may want to start with the [quick start](https://supabase.com/docs/guides/with-react) guides to get a good idea about the workings of supabase. 

The skeleton code contains SQL scripts to create `service_requests` & `admins_mapping` tables in supabase. These scripts are located under `src/database_starter`. Copy the content in these scripts and navigate to  `SQL Editor` on supabase dashboard. Then click on `New Query` located on the left pane and paste the SQL Scripts and press `Run`.

### service_requests table
This is the main table where information about service requests are stored. Apart from other data fields , please take a closer look at `id` and `user_id` fields. `id` is the primary key and uniquely identifies each service requests. `user_id` is a foreign key which helps in mapping information about which user created the requests. You could use these fields to restrict access to the row in a database with RLS ( Row Level Security ). For each service request created , the `accept_reject` column should be false indicating that the service request is not yet completed. Whenever a service request is completed ( by an admin ) this should turn to true. 

### admins_mapping table
With Github Oauth, whenever you login with a new user and authorize access with Github this will create a user entry in the `users` table in the `auth` schema. Each user created has a unique user id ( referenced by column `id` in `users` table). The purpose of this table is to give admin level access to the user whose `id` ( from the users table ) is present in this table. You might want to use this information to structure your RLS policies such that only users from these tables can complete service request. Please take a look at this [link](https://supabase.com/docs/guides/auth/row-level-security#policies-with-joins) for reference.   


## Deliverables

In the previous homework, you worked with creating states in react and work with it to create a functional application but that application didn't have authentication and a way to authorize users to perform actions on the service requests. In this homework you will add to the previous homework by performing these tasks with supabase. There are TODOs marked for some files in the skeleton code. These TODOs are just reference guides for implementing the project. You can implement this app in anyway you want but please make sure it implements the required deliverables  

Deliverables - 

1. Github Oauth Authentication - In the skeleton project, you have been provided with the dummy `login` and `logout` functionality. Your task is to integrate Oauth Authentication with Github. Please checkout [this](https://supabase.com/docs/guides/auth/auth-github) for more details.

2. Creating RLS Policies - Similar to Homework1, only `admins` can complete a service request. Rest of the users can create a service request & can **cancel only their own service request**. Thus, each user (admin or customer) can create a service request and cancel their service request. For this task, you will have to create (RLS policies)[https://supabase.com/docs/guides/auth/row-level-security] which will restrict access to the rows in the database based on the user. For making a user admin please add an entry into the `admins_mapping` table and then use this entry into your RLS policies to authorize access to complete a request, etc.

3. Implementing CRUD using supabase - In your previous homework, you implemented add, remove, complete the list service requests in a local state which was volatile. In this homework, you will have to leverage the use of [supabase APIs](https://supabase.com/docs/guides/api) to recreate the same functionality with persistant storage (postgres database) provided by supabase. You will make the use of service_requests table you created in the "Getting Started with setting up Database with Supabase" section to store the service requests

4. Adding Realtime APIs - Whenever two different users are logged-in on different computers and if one of the user either creates a requests / completes a request ( if it's an admin ), then this change should be automatically reflected into the other users computer. This can be acheived with (Supabase Realtime APIs)[https://supabase.com/docs/guides/realtime]. You will have to make use of Postgres CDC. Check out this (article)[https://supabase.com/docs/guides/realtime/postgres-cdc] as a reference. Thus, whenever a change happens in the postgres database and specifically in the `service_requests` table then this will invoke the realtime listener and perform actions like updating the list of service requests shown to the user, etc.  

**Note** - While implementing RLS policies please also make sure that any action performed has to be performed by an authenticated user. 

## Brief Working of 312 React App 

This section is optional read and meant to provides information on how the application should function when the authentication and authorization sections are implemented. 

First, whenever you start the application it should show the login screen with only `Home` tab displayed on the Navigation along with the `Welcome to our awesome 311 app.`. After clicking `Login` this should take you to the github authentication page where you input your github credential 

## Testing your code

The TA will release integration based test cases for the assignment during the week it is due. As with other assignments, any reasonable-quality test cases that you provide to the class (integration or unit, take your pick) will be eligible for extra credit.

**IMPORTANT**: Test cases are not a list of TODOs. Many students had difficulty getting started on the previous assignment because they took the grading criteria / test cases as an ordered list of TODOs. Please take stock of the full application and requirements before you start writing your code; it will probably be worth your time to stand in front of a whiteboard and build an understanding of the application structure before choosing where to add what.

## Points 


| Task | Points   |
| ---- | ----------------   |
| Github Oauth Authentication   | 5  |
| Creating service request and storing the data in database  | 5 |
| Restricting only admins to complete a service requests | 5 |
| Allowing only user who created the request to cancel the request | 5 |
| Implementing Realtime API functionality | 5 |

## Due date

