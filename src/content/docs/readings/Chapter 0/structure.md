---
title: Structure
sidebar:
  order: 20
---

This course is split into five different modules exemplified by the name of the course: _security_, _web_, _application_, _development_ (client and server). We don't present them in this order, but it's still a useful way to think about learning web dev.

# _Web_

The first module is about the fundamentals of the web: what makes it interesting, unique, challenging, and rewarding as a way for humans to use computers to perform various tasks. In this module we cover both the base protocol of HTTP, the structure of the web browser, and other fundamentals of the underlying technical system that we're designing for.

# _Development_ (server-side)

The next module we cover is server-side web application programming. This allows us to take a dip into programmatically handling HTTP requests coming from clients and passing back relevant information that's the result of computation on the server side. In the way back history of the web, this was the main way that web applications functioned. Even in the contemporary web with plentiful client-side functionality, certain actions require code to be running on the server side to handle client requests, and so there's no way around building a solid understanding of server-side web development.

With modern technologies like HTMX, Phoenix LiveView, and View Transitions, a lot of these ideas about how to construct web apps that have most or all of their code running on the server side, you could say that the backend-focused web is making a comeback.

# _Development_ (client-side)

Client-side web application development is perhaps the most unique part of web development as a whole, as well as being a very large portion of this course, and a substantial source of entry-level jobs within the web development employment ecosystem. Even if you're going to be spending most or all of your time writing server-side code, browsers are such a ubiquitous and unique code execution platform that having a deep understanding of how client-side code works is necessary.

# Secure

If you're going to write web application code and expose it on the Internet, you're inviting 8 billion different people to attack it. That's why this course combines security and web application development.

The web is a mature system with a lot of well understood best practices for security that substantially reduce the risk of successful attacks against your web apps. For the vast majority of security incidents on the modern web, there's a well known defense that the application developer wasn't aware of, or they were aware of it but chose not to implement. Thus, there are two flavors of security content in this book: "best practices" woven throughout every chapter, and this chapter that specifically focuses on security concepts. To be a well-rounded web developer with strong security chops, you both need to have a foundational understanding of what web attacks and web defenses look like, and how they work, alongside an awareness of what best practices are for the purposes of deploying a performant, secure web application.

So the structure that we use focuses on learning the fundamentals of the underlying system, along with basic details about current best practices. Once we've built that understanding, we go into more detail regarding potential attacks and how those specific defenses work within its own individual chapter.

# Application

The capstone of this course is a module that zooms out from the concerns of writing individual lines of code or making individual web requests, and focuses on _applications_ as whole things that provide services to users. While an introductory course in web app development is no doubt going to focus on those fundamentals of getting individual well-defined apps up and running, a large part of any software engineer's daily life is dealing with the problem of _application design_ - either as an architect themselves as they rise in seniority, or as an entry-level developer who should nonetheless have a firm grasp on the bigger picture that shapes the larger structure of the applications that they work on every day.

The main focus of this module is on how to build a performant, secure web application that is itself made up of different pieces. Most all web applications, like all complex modern applications, are not individual monolithic processes that service every part of a request, reading and writing information directly to disk as needed, but rather a collection of different components that have been composed in a specific way to serve a specific need. Additionally, it should come as no surprise that there is already a lot of open source code with reasonable licenses that you can download and add to your application today, without changing a single line of code, just by providing relevant configuration (this is before we even start talking about using libraries in our own code!). There are caching layers, database technologies, deployment modalities, and many more concerns that have more to do with _choosing_ what to use and _how_ it will all be put together, rather than _writing_ the unique code of your application itself.

This module focuses on how to make those choices, what tradeoffs to be considering, and how to explain them to others. A good outcome of this module (and one we use as part of our module exam) is the ability to successfully complete a "system design" interview, in which the interviewee must explain the design decisions (both in terms of what technologies to use, and how to combine them) for a given hypothetical use case.

In this module, we also go much further than simply exploring the purely technical aspects of application design: the web exists not only as a technical force, but also as a social and economic force that has significant impacts on our society. As a software developer interested in the big picture of both their career and the company they work for, understanding the _economic_ constraints and motivations when choosing to deploy microservices vs. virtual machines is just as important as understanding the _technical_ motivations that underlie that decision. This module, and the course overall, are also focused on giving aspiring developers an understanding of all the forces that will be shaping their day to day life - why you're using a given technology, why you're building a given widget, etc.
