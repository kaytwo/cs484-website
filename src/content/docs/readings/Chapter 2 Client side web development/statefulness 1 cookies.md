---
title: "Adding state to the web: cookies"
sidebar:
  order: 210
---


### Cookies: Client-Side State Management in Web Applications

Cookies play a critical role in web development, allowing developers to store data directly in a user’s browser to maintain state between HTTP requests. While HTTP is inherently stateless---even when using cookies---they enable the applications built on top of HTTP to  facilitate a wide range of functionalities like user sessions, tracking, and personalization.

In this section, we will explore the concept of cookies, how they work, their security concerns, and best practices for their use in modern web development.

---

## **What Are Cookies?**
Cookies are small pieces of data stored by the browser that are sent back to the server with each HTTP request. They were introduced to overcome the stateless nature of HTTP and provide a mechanism to store state across different page requests.

A cookie consists of:
- **Name**: The key identifying the cookie.
- **Value**: The data associated with the key.
- **Domain/Path**: Specifies the scope of the cookie—i.e., which URLs the cookie is sent to.
- **Expiration Date**: Determines how long the cookie persists on the client-side.
- **Flags**: Security-related settings, such as `Secure` or `HttpOnly`.

Here’s a simple cookie example set via HTTP headers:
```
Set-Cookie: sessionId=abc123; Expires=Wed, 21 Oct 2024 07:28:00 GMT; Path=/; Secure; HttpOnly
```
In this case, the browser stores a `sessionId` with the value `abc123`, available to the server for requests sent to paths under `/`.


## **Creating and Accessing Cookies**
Cookies can be created and accessed both through server-side HTTP headers and via JavaScript in the client browser.

**Server-side (via HTTP headers)**:  
When the server responds to an HTTP request, it can set a cookie using the `Set-Cookie` header. On subsequent requests, the browser automatically includes the cookie in the `Cookie` header.

**Client-side (via JavaScript)**:  
Cookies can be created or modified in the browser using the `document.cookie` property.

```javascript
// Setting a cookie
document.cookie = "userId=12345; expires=Wed, 21 Oct 2024 07:28:00 GMT; path=/";

// Reading cookies
console.log(document.cookie); // "userId=12345"
```

It’s important to note that the `document.cookie` API can only access cookies associated with the current domain and path. Furthermore, while it allows setting, reading, and deleting cookies, it lacks built-in methods to work with individual cookies. Developers often need to parse the cookie string manually to extract specific values.


## **Types of Cookies**
There are a few categories of cookies developers should be aware of:

- **Session Cookies**: Temporary cookies that are erased when the browser is closed. These are typically used to manage session state, such as keeping a user logged in during a single browsing session.
  
- **Persistent Cookies**: These cookies have an expiration date set in the future and remain on the user's device until that date or until they are manually deleted. They are used for remembering user preferences across sessions.

- **Secure Cookies**: Marked with the `Secure` flag, these cookies are only sent over HTTPS connections, protecting them from being intercepted by attackers using man-in-the-middle (MITM) attacks.

- **HttpOnly Cookies**: These cookies cannot be accessed or modified by JavaScript running in the browser (via `document.cookie`). This flag mitigates certain types of attacks like cross-site scripting (XSS) by preventing malicious JavaScript from accessing sensitive cookies, such as session identifiers.


## **Security Concerns with Cookies**
Cookies, while incredibly useful, can be a significant vector for security vulnerabilities if not handled properly. Some of the most common issues include:

### **Cross-Site Scripting (XSS)**
Cookies can be exposed to malicious scripts if an application is vulnerable to XSS. XSS occurs when an attacker injects malicious scripts into web pages that are then executed in the context of another user’s browser session. By default, cookies are accessible via JavaScript (`document.cookie`), making session cookies or other sensitive data a target for attackers.

**Mitigation**: Always sanitize user input to prevent XSS. Additionally, mark sensitive cookies with the `HttpOnly` flag to prevent them from being accessible to client-side scripts.

###  **Cross-Site Request Forgery (CSRF)**
In CSRF attacks, an attacker tricks a logged-in user into sending unwanted requests to a site they are authenticated against. Because the browser automatically includes cookies in all relevant requests, an attacker can potentially perform actions on behalf of the user if the site does not verify the authenticity of the request.

**Mitigation**: Use anti-CSRF tokens to validate requests, and limit cookie scope with the `SameSite` attribute, which controls whether a cookie is sent with cross-site requests.

###  **Session Hijacking**
Session hijacking occurs when an attacker gains unauthorized access to a user’s session by stealing session cookies. This can happen via insecure networks (e.g., using public Wi-Fi without encryption) or through MITM attacks.

**Mitigation**: Mark cookies with the `Secure` flag to ensure they are only transmitted over HTTPS, and regularly rotate session tokens to limit exposure in the event of cookie theft.


## **Best Practices for Cookie Usage**

To ensure cookies are secure and effective in modern web applications, developers should follow these best practices:

- **Use the `Secure` and `HttpOnly` Flags**: Always mark session cookies as `HttpOnly` to protect them from being accessed by JavaScript. Additionally, the `Secure` flag ensures cookies are only transmitted over secure HTTPS connections.
  
- **Implement the `SameSite` Attribute**: The `SameSite` attribute can be set to `Strict`, `Lax`, or `None`, controlling whether cookies are sent in cross-site requests. Setting `SameSite=Lax` or `SameSite=Strict` can mitigate CSRF attacks by limiting when cookies are included in cross-site requests.

```javascript
document.cookie = "userId=12345; Secure; HttpOnly; SameSite=Strict";
```

- **Set Reasonable Expiration Times**: Avoid unnecessarily long-lived cookies. For sensitive cookies, such as those used for authentication, keep expiration times short and ensure cookies are invalidated after logout.

- **Minimize Cookie Size**: Browsers typically limit cookie storage to 4KB per cookie, and sending large cookies with every request can add significant overhead. Store only essential information in cookies, and use server-side storage (e.g., database-backed sessions) where necessary.

- **Regularly Rotate Session Identifiers**: To reduce the risk of session hijacking, rotate session tokens periodically and invalidate old sessions as needed.


Cookies are a fundamental part of client-side web development, enabling
persistent state management in a stateless protocol like HTTP. As you progress
in web development, understanding the mechanics of cookies and their security
implications is crucial. While cookies provide powerful tools for managing
sessions and user preferences, they also present risks, such as XSS, CSRF, and
session hijacking. By following best practices like using secure flags,
employing proper input validation, and minimizing cookie size, you can mitigate
these risks and develop more secure and efficient web applications.

