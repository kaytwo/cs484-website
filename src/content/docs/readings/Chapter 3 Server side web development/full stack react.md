---
title: The Transition from Client-Side to Server-Side Rendering
sidebar:
  order: 301
---

# A Brief History of Server and Client-Side Rendering

Web development has undergone significant transformations since the early days of the internet. Understanding the evolution of rendering techniques is crucial to contextualizing the current shift toward server-side rendering and hybrid models.

## Early Web: The Era of Server-Side Rendering

In the earliest stages of web development, web applications were largely static, and all rendering took place on the server. The server-side rendering (SSR) process would typically involve the following:
- A user would send a request to a web server (e.g., typing a URL in the browser).
- The server would process the request, execute any necessary business logic (e.g., querying a database), and dynamically generate an HTML page.
- The server would send the complete HTML, CSS, and sometimes JavaScript back to the client (browser).
- The client would render the page, and any interactions would trigger a full-page reload by sending another request to the server.

This method of SSR worked well for early web applications because it aligned with the web's primary role as a document delivery system. Websites consisted mostly of static content or simple dynamic elements, such as form submissions or links. However, it had one major drawback: every interaction that required new data meant a full-page reload. This was inefficient and created a poor user experience, especially as applications grew more interactive.

## The Rise of Client-Side Rendering (CSR) and the SPA Revolution

As web applications evolved, the need for more responsive and interactive user interfaces led to the birth of **client-side rendering (CSR)**. This approach transferred more responsibility to the browser, allowing it to render dynamic content without needing to request a full page from the server every time a user interacted with the application. CSR was made possible by the rise of **JavaScript**, and later, tools like **jQuery**, **Backbone.js**, and eventually **Angular**, **React**, and **Vue.js**.

In client-side rendering:
- The browser sends an initial request to the server, which responds with a basic HTML skeleton, often containing little more than references to JavaScript and CSS files.
- The JavaScript files are downloaded, executed, and then dynamically generate the HTML content on the client side by interacting with APIs or data sources.
- Once the page is loaded, further interactions (like clicking buttons, loading new data, etc.) can be handled entirely on the client without involving the server for rendering new pages.

This approach became the foundation of the **single-page application (SPA)** architecture, which revolutionized web development by enabling fluid user experiences similar to desktop applications. SPAs gave rise to highly interactive web applications, like Gmail and Facebook, where users could interact with the interface without the lag of full page reloads.

## Challenges with Client-Side Rendering

Despite the flexibility and user experience improvements offered by CSR and SPAs, this architecture introduced several challenges:
- **Initial load performance**: Since the entire application’s JavaScript bundle must be downloaded and executed before the user sees meaningful content, SPAs can suffer from slow initial load times, especially on slower networks or mobile devices.
- **SEO limitations**: Search engines historically struggled to index content rendered client-side because they crawled pages before JavaScript was executed. Although tools like Google's headless browsing and dynamic rendering emerged to address this, it remained a pain point for developers.
- **JavaScript bloat**: As SPAs grew in complexity, the amount of JavaScript required to render and update the UI increased, leading to performance bottlenecks on both modern and older devices.

To mitigate these issues, developers began re-evaluating the value of **server-side rendering (SSR)**, leading to a modern renaissance of SSR approaches combined with client-side enhancements.

# Motivating Modern Server-Side Rendering

As the web evolved and the limitations of pure client-side rendering became more pronounced, developers began to look for ways to balance the strengths of both server-side and client-side rendering. This is where the concept of **modern server-side rendering** comes into play.

## Key Motivations for Moving Back to Server-Side Rendering

1. **Improved Initial Load Performance**  
   In CSR, the browser must download the entire JavaScript bundle, initialize it, and then fetch additional data before displaying anything meaningful. This leads to slow **time-to-first-paint (TTFP)**, especially on slower networks. By rendering the HTML on the server and delivering a pre-rendered page to the client, **SSR reduces the time it takes for users to see content**. While client-side hydration (discussed later) is still necessary to make the page interactive, the user sees something meaningful much faster.

2. **Better SEO**  
   Server-side rendering generates HTML at the server level, meaning search engines and social media platforms can index the content immediately without having to execute JavaScript. For content-heavy sites or applications where SEO is crucial (e.g., blogs, e-commerce sites), SSR offers significant advantages over CSR.

3. **Improved Performance on Low-End Devices**  
   Some devices—especially mobile phones or older desktops—struggle to handle large client-side JavaScript bundles. Offloading the bulk of the rendering to the server means that these devices have to process less JavaScript, making the application more responsive and improving the overall user experience.

4. **Enhanced User Experience with Faster Time to Interactive (TTI)**  
   While CSR excels in creating dynamic and responsive interfaces, users often experience lag during initial interactions as the JavaScript framework hydrates the page (i.e., converts static HTML to interactive elements). SSR delivers a pre-rendered page, allowing users to see content quickly, and combining it with techniques like **concurrent rendering** (introduced in React 18) can progressively load and hydrate the application, improving the time-to-interactivity.

5. **The Return of Hybrid Models**  
   SSR and CSR are no longer mutually exclusive. Modern web frameworks allow developers to combine both approaches to get the best of both worlds. For example, **Next.js** and **Nuxt.js** are frameworks built on top of React and Vue, respectively, that allow developers to render pages server-side while also enabling client-side interactions through hydration. This **hybrid model** gives developers flexibility, enabling them to choose when to render on the server versus the client.

# Mechanisms for Server-Side Rendering

Several mechanisms exist for implementing server-side rendering in modern web applications. These approaches vary in complexity and performance trade-offs. Below, we’ll explore the most prominent methods, explaining their mechanisms and drawbacks.

## Traditional Server-Side Rendering
This is the most straightforward SSR approach, where each user request triggers the server to render an entire page dynamically. When a user makes a request:
- The server processes the request (e.g., querying a database, running business logic).
- The server generates the necessary HTML on the fly, sends it back to the browser, and the browser renders the page.

**Advantages**:
- Fully dynamic pages: Every request gets a fresh, unique HTML page based on the server’s logic.
- Great for content-heavy websites or applications with frequently changing data.

**Drawbacks**:
- Server load: Every request requires a full HTML page to be rendered on the server, which can be taxing under high traffic conditions.
- Slower interactions: Every interaction requiring new data or content will trigger a full page reload, which can slow down user experience compared to CSR.

## Static Site Generation (SSG)
Static Site Generation is the opposite of dynamic SSR. It involves pre-rendering pages at build time, creating a set of static HTML files that can be served directly from a content delivery network (CDN). This approach is popular for blogs, documentation sites, and pages with infrequent updates.

**Advantages**:
- Blazing-fast performance: Since pages are pre-rendered, the server only needs to deliver static files, drastically reducing latency.
- Scalability: Serving static files from a CDN allows applications to scale effortlessly, even under high traffic.

**Drawbacks**:
- Limited dynamism: Static pages cannot change without re-deploying the site or using workarounds like client-side rendering or serverless functions.
- Update lag: Any change in content requires a rebuild, which might introduce delays.

## Incremental Static Regeneration (ISR)
A more advanced method, Incremental Static Regeneration (ISR), is a hybrid approach introduced by frameworks like **Next.js**. ISR allows static pages to be updated on-demand at runtime. When a page is first requested, the server checks if the static page is stale and re-generates it in the background if necessary.

**Advantages**:
- Combines the speed of static generation with the flexibility of SSR.
- Allows pages to stay up-to-date without sacrificing performance or needing frequent rebuilds.

**Drawbacks**:
- More complex to implement than traditional SSR or SSG.
- Requires careful consideration of cache invalidation and page expiration.

In effect, ISR is a mechanism that allows a site to fundamentally be written as
a static site but with individual pages updated as needed, rather than
re-rendering the entire site. This requires integration between the build system
and the deployment system in a way that's more complex than traditional static
sites.

Static sites are typically deployed to object storage or directly to a CDN,
which doesn't necessarily have the ability to run server-side code. This means
that whatever tool you're using to perform the ISR needs to be able to either
update the static files in the object store that backs the CDN, or it needs to
be able to run server-side code to update the pages in a caching layer in front
of the CDN itself. This approach is similar to (and has evolved into) edge
rendering systems like Vercel's Edge Network or Cloudflare Workers.

## Partial Prerendering and Astro Server Islands

Another modern approach is Vercel's partial prerendering and Astro's Server
Islands, where some parts of a page are prerendered, but then JavaScript on the
page is used to replace individual sub-components on the page with
server-rendered snippets of dynamic content. This method allows developers to
strike a balance between static and dynamic content, enabling both fast load
times and interactivity. This drastically reduces the amount of JavaScript
required at the initial page load, making it an increasingly popular choice for
performance-conscious developers.

# How to accomplish server-side rendering

React’s **server-side rendering (SSR)** model offers the benefits of traditional SSR while leveraging the React component model. The motivation for React SSR is largely to improve **performance and SEO** by sending a fully rendered HTML page to the client, reducing the initial load time and improving the user experience on slow networks or devices.

When a React app is server-rendered:
1. The client sends a request to the server.
2. The server runs the React components on the server, using `ReactDOMServer` to render the component tree into static HTML.
3. The server sends this HTML to the client, which can be displayed immediately.
4. React on the client then **hydrates** the HTML, attaching event handlers and making the page interactive.

## Example of React SSR

Consider a basic example of how React SSR works in a Next.js app:

```javascript
// pages/index.js
import React from 'react';

export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Data from server: {data}</p>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data on the server-side
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return { props: { data } };
}
```

In this example, the `getServerSideProps` function runs on the server and fetches data. The React component `Home` renders that data into HTML, which is then sent to the client.

## Hydration of React Apps

### Motivation

The key motivation behind **hydration** is to allow a React app to have the best of both worlds: fast initial loads (due to pre-rendered HTML) and rich interactivity. After the server sends the rendered HTML, React must "hydrate" the app on the client side to make it interactive. This process attaches event listeners to the pre-rendered markup and reconciles any differences between the initial static HTML and the client-side state.

### How Hydration Works

When React is hydrated, the client-side JavaScript takes over the static HTML rendered by the server. React compares the static content with its virtual DOM, attaches necessary event listeners, and ensures that the app behaves like a typical React app.

```javascript
import hydrateRoot from 'react-dom/client';

const root = hydrateRoot(document.getElementById('root'), <Home />);
```

In this example, the server has already rendered the entire dom subtree for
`<Home />`, and sent it to the client in html form under the dom elemetn with id
`root`. Then, on the client, `hydrateRoot` will re-render the component into its
virtual DOM, compare that result to what's in the DOM, and if it matches, it
will attach interactivity to the existing HTML, allowing the app to function as
if it had been initially rendered on the client.

### Drawbacks of Hydration

While hydration provides a more interactive user experience, it introduces a delay before the page becomes fully interactive. Until the hydration process is complete, elements may appear static or unresponsive. This can be particularly noticeable in complex applications with large amounts of JavaScript.

## Suspense

### Motivation

React's **Suspense** feature addresses some of the challenges posed by SSR and hydration. Traditionally, SSR would wait for all data to be fetched and components to be ready before sending the complete HTML to the client. Suspense changes this paradigm by allowing components to "wait" for asynchronous data to load while sending the rest of the page to the client.

### How Suspense Works

Suspense allows developers to define components that can suspend their rendering until data or code is available. In SSR, Suspense streams HTML to the client progressively, improving the time-to-first-paint by allowing parts of the UI to be displayed even if some components are still waiting for data.

```javascript
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

In this example, while the `LazyComponent` is still loading, the rest of the page renders, and a loading indicator is shown.

## Other bleeding-edge approaches

Another important development in the SSR space is **React Server Components (RSC)**. Unlike traditional SSR, where both HTML and JavaScript are sent to the client, RSC allows for sending only the minimal amount of JavaScript needed for interactivity. RSC handles rendering on the server but lets some components remain entirely on the server, reducing the JavaScript bundle sent to the client.


# Alternative Approaches to Full Stack Interactivity

While JavaScript frameworks dominate the full-stack web development space, several alternative approaches enable developers to build interactive applications without relying on JavaScript-heavy ecosystems. These approaches focus on server-side rendering, minimal client-side JavaScript, and real-time interaction.

## Ruby on Rails with Hotwire

**Ruby on Rails (RoR)** is a full-stack framework that has long been a favorite among developers for its "convention over configuration" philosophy. With the introduction of **Hotwire**, Rails now offers a modern, efficient way to build highly interactive applications without writing significant amounts of JavaScript.

Hotwire consists of two primary technologies:
- **Turbo**: This allows developers to create fast, dynamic applications by sending HTML over the wire instead of JSON or JavaScript.
- **Stimulus**: A lightweight JavaScript framework that enhances HTML elements with client-side behavior where needed, without taking over the entire rendering process.

## HTMX

**HTMX** provides a simple, declarative way to build interactive web apps by extending HTML with

 attributes that can trigger AJAX requests, WebSockets, and more. It offloads most of the logic to the server, reducing the need for client-side JavaScript frameworks. HTMX is ideal for developers who want to keep their applications simple and rely on server-rendered HTML, but still need dynamic interactions.

## Phoenix LiveView

**Phoenix LiveView**, built on the **Elixir** programming language, offers a compelling way to build real-time, interactive applications. By leveraging WebSockets, LiveView keeps the server responsible for rendering HTML, but updates the DOM dynamically in response to user actions. This eliminates the need for client-side frameworks and enables real-time, server-driven interactivity.

These alternative approaches offer developers the ability to build fast,
interactive applications while minimizing JavaScript complexity and maximizing
performance, making them attractive choices for certain types of web
applications.

# Why is this so complicated?

There are many, many conversations on the Internet about how "bad" the
JavaScript ecosystem is, and especially when it comes to server-side and
full-stack web application development. But why, after years of development,
millions of dollars of investment, have we ended up back at "let's render web
apps on the server"? Different people definitely have different opinions on
this, but my take is:

Client-side interactivity is much more complicated now than it was when we were
first deploying "single page applications," meaning that for many use cases,
just shipping a statically rendered app, or one with a little bit of
interactivity but most of the rendering happening on the server, isn’t really
viable. Companies that minimize their software development costs (read: all of
them) would rather re-use existing code/technology than throw it all out and
reinvent the wheel. So if you’ve invested $$$ into a React app for your front
end, it’s not feasible to say “just switch to HTMX/Phoenix
LiveView/other-hot-tech-of-the-month”, as this would entail a huge rewrite to
get back to where you started. Investing in React wasn't a mistake (for these
companies or for you if you want to do front end), it’s a big successful
ecosystem that makes life better for people building user interfaces on the web.
It’s just that there’s this loop we’re in that’s basically:

1. Deploy a thing.
2. Determine what the “limiting factor” is to increasing performance and fix that
3. GOTO 1

This is a greedy algorithm, meaning that it doesn't guarantee that all the
individual improvements will add up to an optimal solution. However without
deploying the app to your userbase at a specific moment in time (which itself is
changing, both as different groups decide to use your app, as well as time
moving forward and how fast the computer is, is it on wifi or cell, is it a
mobile phone or a laptop). So combine this greedy algorithm with the difficulty
of predicting the future and the expense/practicality of throwing everything out
and starting over is a good explanation of the evolution that we see on full
stack web application architectures.