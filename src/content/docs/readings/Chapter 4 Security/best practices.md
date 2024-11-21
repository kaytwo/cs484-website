---
title: "Advice for security settings for new applications"
sidebar:
  order: 450

---

The web has evolved significantly over the years, and so have the threats and
vulnerabilities that applications face. When these threats were first
discovered, defending against them was quite difficult, and required a lot of
hard work and creativity to come up with various defenses. However, most threats
on the web today are reasonably well understood - but we aren't out of the woods
yet. What we've ended up with is a large collection of "best practices" for
deploying a well-secured web application.

This reading enumerates and basically explains the most popular "secure
defaults" that you should be setting up on any new project. Adding some of these
things, especially CSP, to a large existing application can be very difficult,
but adding them from the get go (especially on something like your final project
for this class) is a relatively easy way to get started on the right foot for
user security.

---
### **1. SameSite Cookies**
#### Attack It Defends Against:
The `SameSite` attribute mitigates **Cross-Site Request Forgery (CSRF)** attacks, where an attacker tricks a victim's browser into making unauthorized requests on their behalf. Without proper restrictions, an attacker can exploit a user's authenticated session to perform actions like transferring funds or changing account settings.

#### How It Works:
The `SameSite` attribute on cookies ensures they are only sent with requests originating from the same site. With `SameSite=Lax`, cookies are included for same-site navigation and top-level GET requests, while `SameSite=Strict` ensures cookies are never sent with cross-site requests. This reduces the risk of unauthorized actions initiated from external websites.

#### Recommended Defaults:
- Set `SameSite=Strict` for cookies unless cross-site behavior is explicitly needed (e.g., for third-party integrations).
- For cookies requiring cross-site access, use `SameSite=None` with the `Secure` attribute to ensure transmission over HTTPS only.
- Always combine with CSRF tokens for an extra layer of security.

---

### **2. Content Security Policy (CSP)**
#### Attack It Defends Against:
CSP is a powerful defense against **Cross-Site Scripting (XSS)** attacks, where malicious scripts are injected into a webpage to steal data, hijack sessions, or perform other harmful actions. These scripts often originate from untrusted sources.

#### How It Works:
A CSP allows developers to define approved sources for scripts, styles, and other resources. By specifying a whitelist in the `Content-Security-Policy` header, CSP prevents the browser from executing scripts or loading assets from unauthorized origins. This drastically reduces the attack surface for injected or untrusted content.

#### Recommended Defaults:
- Use a strict CSP: e.g., `default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' 'unsafe-inline';`.
- Avoid allowing `unsafe-inline` or `unsafe-eval` for scripts unless absolutely necessary.
- Test and refine the policy regularly to balance security with functionality.

---

### **3. Cross-Origin Resource Sharing (CORS)**
#### Attack It Defends Against:
CORS defends against unauthorized **cross-origin requests**, where malicious websites attempt to access sensitive APIs or resources from another origin using a victim's credentials. Without proper restrictions, this can expose user data or allow unauthorized actions.

#### How It Works:
The CORS mechanism relies on HTTP headers (`Access-Control-Allow-Origin`, etc.) sent by the server to specify which origins are permitted to access its resources. When a cross-origin request is made, the browser enforces these rules, ensuring that the request conforms to the server's specified policies.

#### Recommended Defaults:
- Allow only trusted origins: e.g., `Access-Control-Allow-Origin: https://your-frontend.com`.
- Use specific methods (`Access-Control-Allow-Methods`) and headers (`Access-Control-Allow-Headers`) to restrict permitted actions.
- Never use `Access-Control-Allow-Origin: *` for sensitive endpoints.

---

### **4. Subresource Integrity (SRI)**
#### Attack It Defends Against:
SRI defends against **content tampering attacks**, where malicious actors modify external scripts or stylesheets loaded via `<script>` or `<link>` tags. A compromised CDN or third-party resource can deliver malicious content, compromising the application.

#### How It Works:
SRI uses cryptographic hashes to verify the integrity of external resources. When loading an external script or stylesheet, the browser compares the hash specified in the `integrity` attribute against the actual resource. If they don’t match, the browser blocks the resource from being executed.

#### Recommended Defaults:
- Always specify an `integrity` attribute with a strong hash (e.g., SHA-256) for external resources.
- Combine SRI with `crossorigin="anonymous"` for compatibility with CORS policies.
- Use tools or build systems to automate hash generation and updates.

---

### **5. HTTP Strict Transport Security (HSTS)**
#### Attack It Defends Against:
HSTS protects against **protocol downgrade attacks** and **man-in-the-middle (MITM) attacks** that exploit insecure HTTP connections. Without HSTS, attackers can intercept traffic over HTTP, even if the website supports HTTPS.

#### How It Works:
HSTS is enforced by the browser via the `Strict-Transport-Security` header. When set, this header ensures that the browser always uses HTTPS for communication with the specified domain, preventing any connection over HTTP, even if a user enters a URL without the `https://` prefix.

#### Recommended Defaults:
- Set `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` for all responses.
- Use the `preload` directive to submit the domain to HSTS preload lists for additional protection.
- Ensure HTTPS is properly configured before enabling HSTS.

---

### **6. Secure Headers**
#### Attack It Defends Against:
Secure HTTP headers defend against a range of vulnerabilities, including **clickjacking**, **MIME type sniffing**, and **XSS**. Without these headers, attackers can exploit browser behavior to inject malicious scripts or trick users into unintended actions.

#### How It Works:
- `X-Content-Type-Options: nosniff`: Prevents browsers from interpreting files as a different MIME type.
- `X-Frame-Options: DENY`: Stops the page from being embedded in iframes, defending against clickjacking.
- `X-XSS-Protection: 1; mode=block`: Enables basic XSS filtering in some older browsers.

#### Recommended Defaults:
- Always include the `X-Content-Type-Options: nosniff` and `X-Frame-Options: SAMEORIGIN` headers.
- Use a modern CSP in place of `X-XSS-Protection` for comprehensive XSS mitigation.
- Regularly review headers with tools like [securityheaders.com](https://securityheaders.com). 

---

### **7. Secure and HttpOnly Cookies**
#### Attack It Defends Against:
The `Secure` and `HttpOnly` cookie attributes help mitigate attacks that target sensitive session data, such as **session hijacking** and **Cross-Site Scripting (XSS)**. Without these attributes, attackers can intercept cookies over insecure channels or use malicious scripts to access them, potentially compromising user accounts or sensitive data.

#### How It Works:
- **`Secure` Attribute**: Ensures cookies are only sent over HTTPS, preventing their interception during transmission over unencrypted HTTP connections.
- **`HttpOnly` Attribute**: Restricts access to cookies via JavaScript, mitigating the risk of theft through XSS attacks. By making cookies inaccessible to client-side scripts, it significantly reduces their exposure.

Together, these attributes harden cookie security by ensuring they are transmitted securely and not accessible via potentially exploitable JavaScript code.

#### Recommended Defaults:
- For all cookies, enable the `Secure` attribute to ensure they are transmitted over HTTPS only:  
  Example: `Set-Cookie: sessionId=abc123; Secure`.
- Set the `HttpOnly` attribute for cookies that do not need to be accessed via JavaScript (e.g., session cookies):  
  Example: `Set-Cookie: sessionId=abc123; HttpOnly`.
- For cross-origin cookies (if required), combine with the `SameSite=None` attribute and ensure HTTPS is used.
- Regularly audit cookies to confirm appropriate flags are set and unnecessary cookies are removed.
