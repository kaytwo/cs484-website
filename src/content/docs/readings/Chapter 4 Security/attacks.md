---
title: "Canonical web security attacks"
sidebar:
  order: 410

---

# Web security attacks

The web model of computing, with a provider-controlled server communicating with a client-controlled browser, leads to a number of unique security challenges. In this reading, we'll cover some of the most common web security attacks and how to defend against them. As a reminder, please review [the seven security principles](/readings/chapter-1-http/security-fundamentals/) from Chapter 1 before proceeding.

In 2024, by and large, we know how to do security "right." There are many classes of vulnerabilities (as we are about to see), but thankfully most of them have well-understood solutions, and many are even the default "out of the box" behavior in popular libraries. However, it's still important to know about all of these attacks and where you might unwittingly re-introduce them into your application.

# High-level overview

Much like any other computing platform, _user controlled inputs_ are the source of a vast majority of the security vulnerabilities in web applications. The web is unique in that the user has a lot of control over the inputs that are sent to the server, and the server has to verify that the inputs are valid and will not lead to the attacker gaining control over parts of the server process that they shouldn't. This is why the web is so vulnerable to attacks like SQL injection, XSS, and CSRF.

## `console.log("owned")`

Remember that there are _vulnerabilities_, which are the bugs in your code that allow an attacker to exploit your system, and _exploits_, which are the actual exploitation of those vulnerabilities. In many cases when we are showing the proof of concept of an attack, we use a very simple "proof" that the attack was successful. In Cross-Site Scripting (XSS), a `console.log()` call or a `alert()` call is a common way to show that the attacker has control over the page. If those commands are run successfully, they indicate that arbitrary code could be executed by the attacker on the victim machine (whether that's the server or another client). A real attacker probably won't just run `console.log("owned")` and call it a day, but they might use that same exploit to steal data, take over accounts, or otherwise cause harm to your system. The extent to which an attacker with this capability can cause harm is a different topic - for now, we want to make sure that they can't get to that point in the first place.

While other classes of attack besides XSS also have "proof of concept" exploits, XSS is the most common and the most easily demonstrated. The important thing to remember is that as a defender, you need to make sure that the attacker can't get to the point where they can run arbitrary code on your server or client. Proving that an application has a vulnerability is usually enough to motivate needing to fix a given vulnerability.

# Injection attacks

Injection attacks are a high level class of attacks where an attacker is able to submit "user input" to the system, but then do so in a way that confuses the system such that it runs code that the attacker wants it to run. The most common types of injection attacks are SQL injection (SQLi) and Cross-Site Scripting (XSS).

Although XSS and SQLi are the most well-known injection attacks on the web, any time that user input is used to construct a command that is run on the server, there is a potential for an injection attack. This becomes especially difficult to defend against when user input is being used without the developer's knowledge: for instance, the [shellshock vulnerability](https://blog.cloudflare.com/inside-shellshock/) was a vulnerability in the bash shell that allowed an attacker to run arbitrary code on a server when their input was passed to the shell as an environment variable. It turned out that many servers were vulnerable to this attack because they were using bash as their shell, and they were passing user input to the shell without sanitizing it first.

## Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a type of injection attack where an attacker is able to execute malicious scripts in the context of another user's browser. This can happen when an application includes untrusted data in a web page without proper validation or escaping. There are three main types of XSS attacks:

### Stored XSS

Stored XSS occurs when malicious input from an attacker is stored on the target server, such as in a database, message forum, visitor log, or comment field. The victim then retrieves the stored data from the web application without proper output encoding, causing the malicious script to be executed in their browser.

### Reflected XSS

Reflected XSS occurs when an application includes unvalidated and unescaped user input as part of the output it generates. This type of attack is typically delivered via a link that the victim has to click. When the victim clicks the link, the malicious script is executed in their browser.

### DOM-based XSS

DOM-based XSS occurs when the client-side script of a web page processes data from an untrusted source in an unsafe way, leading to the execution of malicious scripts. This type of XSS does not require a server round-trip and is executed entirely on the client side.

### Defending Against XSS

To defend against XSS attacks, developers should:

1. **Validate Input**: Ensure that all user input is validated on both the client and server sides.
2. **Escape Output**: Properly escape all untrusted data before including it in the web page. Use context-specific escaping functions.
3. **Content Security Policy (CSP)**: Implement a strong Content Security Policy to restrict the sources from which scripts can be loaded and executed.
4. **Use Security Libraries**: Utilize security libraries and frameworks that automatically handle escaping and validation.

By following these best practices, developers can significantly reduce the risk of XSS vulnerabilities in their applications.


## SQL Injection (SQLi)

SQL Injection (SQLi) is a type of injection attack where an attacker is able to execute arbitrary SQL code on a database by manipulating user input. This can lead to unauthorized access to data, data modification, or even deletion of entire databases. SQLi is one of the most common and dangerous web application vulnerabilities.

### Types of SQL Injection

There are several types of SQL injection attacks:

#### Classic SQL Injection

Classic SQL Injection occurs when an attacker is able to manipulate a SQL query by injecting malicious input directly into the query string. This can happen when user input is concatenated into SQL queries without proper sanitization.

#### Blind SQL Injection

Blind SQL Injection occurs when the application does not return error messages or other direct feedback to the attacker. Instead, the attacker infers information based on the application's behavior, such as response times or differences in responses.

#### Error-based SQL Injection

Error-based SQL Injection relies on the database server's error messages to gain information about the database structure. By causing the database to generate errors, the attacker can gather details about the database schema and other sensitive information.

### Defending Against SQL Injection

To defend against SQL injection attacks, developers should:

1. **Use Prepared Statements**: Use prepared statements with parameterized queries to ensure that user input is treated as data and not executable code.
2. **Validate Input**: Validate and sanitize all user inputs to ensure they conform to expected formats and types.
3. **Use ORM Frameworks**: Utilize Object-Relational Mapping (ORM) frameworks that abstract and handle SQL queries securely.
4. **Least Privilege**: Follow the principle of least privilege by ensuring that database accounts have the minimum permissions necessary to perform their tasks.
5. **Error Handling**: Implement proper error handling to avoid exposing database error messages to users.

By following these best practices, developers can significantly reduce the risk of SQL injection vulnerabilities in their applications.

# Cross-Site Request Forgery (CSRF)

Cross-Site Request Forgery (CSRF) is an attack that tricks a user into performing actions on a web application in which they are authenticated, without their knowledge or consent. This can lead to unauthorized actions being performed on behalf of the user, such as changing account details, making purchases, or transferring funds.

## How CSRF Works

CSRF exploits the trust that a web application has in the user's browser. When a user is authenticated and has an active session with a web application, the browser automatically includes session cookies with every request to that application. An attacker can create a malicious website or email that contains a request to the target web application. If the user is tricked into visiting the malicious site or clicking a link, the browser will send the request along with the session cookies, making it appear as if the user initiated the request.

## Example of a CSRF Attack

Consider a web application that allows users to change their email address by submitting a form:

```html
<form action="https://example.com/change-email" method="POST">
  <input type="hidden" name="email" value="attacker@example.com">
  <input type="submit" value="Submit">
</form>
```

An attacker could create a malicious website with the above form. If a user who is logged into the target web application (example.com) visits the malicious site and submits the form, their email address will be changed to `attacker@example.com` without their knowledge. This is possible because the browser includes the session cookies with the request, making it appear as if the user initiated the action.

## Defending Against CSRF

To defend against CSRF attacks, developers should implement the following measures:

1. **CSRF Tokens**: The canonical solution to CSRF is to include a unique, unpredictable token in each form and verify the token on the server side. This ensures that for every request to a form that can change sensitive data (hint: safe to assume all user data is sensitive!), the form can only be successfully submitted after first rendering and reading values from the form on the victim site, something that attacker code can't do because of the Same-Origin Policy.
2. **SameSite Cookies**: Use the `SameSite` attribute for cookies to restrict them from being sent with cross-site requests. This can help prevent CSRF attacks by ensuring that cookies are only sent with requests originating from the same site.
3. **Double Submit Cookies**: Send a CSRF token both as a cookie and as a request parameter, and verify that both values match on the server side.
4. **Custom Headers**: Require custom headers for sensitive actions and verify their presence on the server side. Since custom headers cannot be set by cross-origin requests, this can help prevent CSRF attacks.

# Broken Access Control

Broken Access Control is a security vulnerability that occurs when an application fails to properly enforce restrictions on what authenticated users are allowed to do. This can lead to unauthorized access to sensitive data, such as user accounts, financial information, or administrative functions. At a high level, broken access control boils down to "the security settings weren't set up correctly" which, in many cases, is a lot easier said than done.

# Security Misconfigurations

In a very similar vein, "security misconfgurations" is a more general version of the same idea of "not set up correctly:" accidentally leaving default accounts activated, using default "changeme!" type passwords, having unnecessary features enabled, or exposing error messages with sensitive information - all of these count as security misconfigurations. While they may not be as "sexy" as a SQL injection or XSS attack, they can be just as important to an attacker looking to exploit your system.

# Directory Traversal

Web servers for static web applications (and many applications with filesystem-based routing) map the requested URL onto a location within the server's filesystem hierarchy to find the file it needs to serve/execute. Directory Traversal is an attack that allows an attacker to access files and directories that are outside the list of intended files to serve/execute. This can lead to unauthorized access to sensitive files, such as configuration files, user data, or system files. Directory Traversal attacks are typically carried out by manipulating file paths in web requests to access files that are not intended to be publicly accessible.