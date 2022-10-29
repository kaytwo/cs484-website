---
title: homework 3 - Intro to Supabase And React
description: Building a client side web application with supabase
layout: default
due:
   type: due
   title: homework 3
   date: 2022-11-04T13:59:00-5:00
   description: Homework 3 due
github_link: https://classroom.github.com/a/i3IfdWLk
date: 2022-10-19
---
import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Homework3 - Implementing 312 App using Supabase and React

### Link to Brief Introduction - https://youtu.be/bc00pY7CEBM


## Installing required packages

Open the terminal window and type in `npm install`. This will install all the dependencies listed in the `package.json` file and will create a folder `node_modules` where all these dependencies will be installed. `npm run dev` will run a local development server and open a web browser window for you that's pointed at your application.

## Skeleton code

The [skeleton code](https://classroom.github.com/a/i3IfdWLk) for this application is an almost entirely complete, but the state is not persistent. You need to add code to make it work with supabase backend which will store the information about service requests.

## Navigating and starting project

Before running the project please make sure that you have installed all the dependencies mentioned in the step `Installing required packages`. Start the project by typing `npm run dev` in the terminal and open the URL in a browser. 

This is the same application you created during the last homework, so the functionality remains the same. Your task is to create a supabase instance, setup the database and then use the supabase CRUD APIs to make this project functional with supabase as your backend. Also, for this homework you will implement Oauth authentication with Github. 

For this project you will have to create a supabase account. Creating an account is easy as you login with your github credentials. Once you login create a new project and select the free tier. Supabase will setup a postgres SQL database for you. 

In your skeleton code, a supabaseClient code is present. You can use the client code diretly by modifying the .env file. Please add the appropriate URL and anon key related to your account. While submiting your project though please make sure that you add .env file into the .gitignore


## Getting Started with setting up Database with Supabase

Before you start working on the Homework, please get a good overview about [supabase](https://supabase.com) . You may want to start with the [quick start](https://supabase.com/docs/guides/with-react) guides to get a good idea about the workings of supabase. 

The skeleton code contains SQL scripts to create `service_requests` & `admins_mapping` tables in supabase. These scripts are located under `src/database_starter`. Copy the content in these scripts and navigate to  `SQL Editor` on supabase dashboard. Then click on `New Query` located on the left pane and paste the SQL Scripts and press `Run`.

### service_requests table
This is the main table where information about service requests are stored. Apart from other data fields , please take a closer look at `id` and `user_id` fields. `id` is the primary key and uniquely identifies each service requests. `user_id` is a foreign key which helps in mapping information about which user created the requests. You could use these fields to restrict access to the row in a database with RLS ( Row Level Security ) (More on that later). For each service request created , the `accept_reject` column should be false indicating that the service request is not yet completed. Whenever a service request is completed ( by an admin ) this should turn to true. 

### admins_mapping table
With Github Oauth, whenever you login with a new user and authorize access with Github, this will create a user entry in the `users` table in the `auth` schema. Each user created has a unique user id ( referenced by column `id` in `users` table). The purpose of this table is to give admin level access to the user whose `id` ( from the users table ) is present in this table. The skeleton code doesn't provide such functionality and you might want to use this table's fields to structure your RLS policies such that only users from these tables can complete service request. Please take a look at this [link](https://supabase.com/docs/guides/auth/row-level-security#policies-with-joins) for more reference. In order to make a github user an admin simply copy the `id` from the `auth.users` table and create an entry into this table with that `id`. 


## Deliverables

In the previous homework, you worked with creating states in react and work with it to create a functional application but that application didn't have authentication and a way to authorize users to perform actions on the service requests. In this homework you will add to the previous homework by performing these tasks with supabase. There are TODOs marked for some files in the skeleton code. These TODOs are just reference guides for implementing the project. You can implement this app in anyway you want but please make sure it implements the required deliverables  

Deliverables - 

1. Github Oauth Authentication - In the skeleton project, you have been provided with the dummy `login` and `logout` functionality. Your task is to integrate Oauth Authentication with Github. Please checkout [this](https://supabase.com/docs/guides/auth/auth-github) for more details.

2. Creating RLS Policies - Similar to Homework1, only `admins` can complete a service request. Rest of the users can create a service request & can **cancel only their own service request**. Thus, each user (admin or customer) can create a service request and cancel their service request. For this task, you will have to create [RLS policies](https://supabase.com/docs/guides/auth/row-level-security) which will restrict access to the rows in the database based on the user. For making a user admin please add an entry into the `admins_mapping` table and then use this entry into your RLS policies to authorize access to complete a request, etc.

3. Implementing CRUD using supabase - In your previous homework, you implemented adding, removing (cancelling) & completing the list service requests in a local state which was volatile. In this homework, you will have to leverage the use of [supabase APIs](https://supabase.com/docs/guides/api) (RESTful APIs) to recreate the same functionality with persistant storage (postgres database) provided by supabase. You will make the use of service_requests table that you created in the "Getting Started with setting up Database with Supabase" section to store the service requests. Whenever a service requests is completed the `accept_reject` should be changed from false to true & whenever a service request is cancelled then the service request should be deleted from the database. **Any user can view all the service requests created**. Also, you should list only service requests that are yet to be completed.

4. Adding Realtime APIs - Whenever two different users are logged-in on different computers and if one of the user either creates a requests / completes a request ( if it's an admin ), then this change should be automatically reflected into the other users computer. This can be acheived with [Supabase Realtime APIs](https://supabase.com/docs/guides/realtime). You will have to make use of Postgres CDC. Check out this [article](https://supabase.com/docs/guides/realtime/postgres-cdc) as a reference. Thus, whenever a change happens in the postgres database and specifically in the `service_requests` table then this will invoke the realtime listener and perform actions like updating the list of service requests shown to the user, etc.  

**Note** - All the CRUD requests accessing the database should be only authorized if the user is authenticated and your RLS policies should incorporate this.  

## Brief Working of 312 React App 

This section is an optional read and meant to provides information on how the application should function when the authentication and authorization sections are implemented. 

First, whenever you start the application it should show the login screen with only `Home` tab displayed on the Navigation along with the `Welcome to our awesome 311 app.`. After clicking `Login` this should take you to the github authentication page where you input your github credential. Once you are successfully authenticated this should take you to your application where now you should be able to see `Add Requests`, `List Requests` & `Visualize` navigations. **Hint** - To acheive this whenever the application is loaded with an authenticated user you should load the information about the service requests by using supabase APIs. You can acheive this by using the [useEffect](https://reactjs.org/docs/hooks-effect.html) prop in react.

Once you are logged-in you should be able to create a service request by going to `Add Requests` tab and filling-in the information needed. This should create a service request entry into the database. **Hint** - to implement this, once you add the service request you should call the supabase API to insert this request into the database. If this API call succeeds then add this service request to the local state by `setRequests` method. You could also get all the service requests from the database after inserting the service request by doing a supabase "select" API call and then call setRequests with the data you received. Thus, whenever you switch tab to the `List Requests` tab you should be able to see the service requests there already. If you are logged in as an `admin` then you should be able to complete the service requests and this shouuld update the `accept_reject` column from false to true for that service request. You should also be able to cancel the service request ( if you created it ) and this should delete the record for service requests in the database. 

For the realtime APIs, you can login-in with another user (on a different browser or in incognito mode ,etc) and make a change to service request / add service request and you should be able to see the changes appearing on the other browser. **Hint** - while implementing the realtime APIs code section, you can subscribe to a channel when a user is first authenticated and listen to changes like INSERT, UPDATE, DELETE and write a handler function which will update the list of service requests. 

## Debugging for Supabase and React App


1. Testing APIs with RLS enabled but no policies present-  If you are testing supabase APIs for INSERT, DELETE, 
UPDATE, SELECT and if you have not implemented policy for specific action (INSERT, SELECT, DELETE, UPDATE )
and are getting a 4xx error then first try to work by disabling entire RLS policies and then checking if 
the API works and then add RLS policy for that action and check again. This same applies for Realtime APIs as well. For any error you encounter can open the browser developer tool and check the issue about the request by going to the networks tab.

2. While inserting data, you need to pass the user_id ( which you will get from the session ), email, 
name, short description, long description. You might not choose to insert the id as it is an auto increment and unique field.
Once you insert the record, please make sure that you update the requests by calling the setRequest useState function
But before calling the setRequest you will have to do some manipulations. The `requests` state contains array 
of service requests ( just like the last homework ) but here you will have to append the 'id' for all
the requests. Thus, once you insert the service request you could fetch that same request you created or fetch
all requests where the accept_reject is false and then create and array of JSONs something like this ,

```js
// Fetch the data 
const {data, error} = await supabase.from(...).select(...).eq('accept_reject' : false) 

let newRequestsData = []

// structure the new data
// Please note the mapping from the service_request table and the requests object. sdescription is mapped to short_desc from table, etc
data.forEach((item) => newRequestsData.push({ name: item.name, sdescription: item.short_desc, ldescription: item.long_desc, id: item.id, email: item.email, isCompleted: item.accept_reject })

// set the new state
setRequests(newRequestsData)
```

This is just one approach of updating state after creating a new service request. Your design could skip the
above part if you configure your realtime APIs to listen to changes and then updating records or if you
design and manage state in a different fashion. 

3. If using async-await inside the useEffect you could wrap your code as described here - [https://devtrium.com/posts/async-functions-useeffect](https://devtrium.com/posts/async-functions-useeffect)

## Testing your code

There are no test cases for this homework. You can verify your work by checking if you have completed the above deliverables and also by comparing your functionality to that of the Brief Intro Video. 

## Submission Instructions

The gradescope link for homework submission is created but this time, there is no autograder. You will have to submit your work such that it can be reproduced again and can be graded by the TA. 

Apart from submitting your code you will also have to submit your RLS policies. For that you will have to submit a SQL Script which will create your table and enable RLS policies. Please refer to [these](https://docs.google.com/document/d/1jqXBt6VpHwiCwC3uYJz4T0uiQtG8N9b6_fgkfEJpIq4/edit?usp=sharing) steps and make a CREATE TABLE script. 

Please also provide brief instructions on setting up your homework project (Github Oauth, Real time Settings, any additional .env variables, etc). 

**Note** - Please add .env or any credential sensitive file in .gitignore before submitting your homework.

## Points 


| Task | Points   |
| ---- | ----------------   |
| Github Oauth Authentication   | 5  |
| Creating service request and storing the data in database  | 5 |
| Restricting only admins to complete a service requests | 5 |
| Allowing only user who created the request to cancel the request | 5 |
| Implementing Realtime API functionality | 5 |

## Due date

This Homework is due on Friday 4th November, at 1:59 PM.
