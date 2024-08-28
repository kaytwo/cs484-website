---
title: Browser basics
sidebar:
  order: 130
---

In the last section, we learned about the HTTP protocol, which can be used to request and receive resources from a web server. In this section, we'll learn about the web browser, which is the most common type of device that uses HTTP to request and receive resources from a web server.

# The goal of a web browser

Fundamentally, a web browser does two things. One, it allows you to view and interact with web pages rendered out of a collection of resources - HTML for page architecture, textual content, and markup; CSS for styling; JavaScript for interactivity; images, videos, audio, etc for richer media experiences. Two, it allows you to navigate between different web pages on the Internet via hyperlinks. This is one of the really "magical" parts of the web and why it became so popular - being able to easily both navigate between different sites and organize links to them from anywhere created the first truly global information system.

## Isolation

Because you're using one tool (the browser) to navigate between lots of different websites, and because each website can itself include resources from other websites, one of the most important jobs for the browser is **isolation**. This means that the browser has to make sure that the resources from one website don't interfere with the resources from another website. This is a big part of what makes the browser unique, especially from a security perspective.

Your browser is responsible for performing lots of different isolation tasks:

- **Origin isolation**: making sure that resources from one origin can't access resources from another origin. This is the same-origin policy which we'll go into more detail about later.
- **Process isolation**: making sure that if one tab crashes, it doesn't crash the whole browser, and if one tab is compromised, it doesn't compromise the whole browser.
- **Storage isolation**: making sure that user data from one origin can't be accessed by another origin.

## Architecture

If we start thinking about building a browser as a software engineer, we can see
a few different important parts: there's the main **user interface** that
renders the browser window, tabs, URL bar, etc, and receives input (clicks,
swipes, taps, key presses) from the user; there's the **rendering engine**,
which is what takes the HTML, CSS, and JavaScript for a given frame and turns it
into a visual representation that the user can see and interact with. There's
also the **browser engine**, which coordinates the UI and the rendering engine,
and there's the **networking engine**, which actually sends and receives the
HTTP requests and responses, and the **storage engine** that keeps track of
things like cookies, and provides them to other parts of the browser as needed.
Finally, there's the **JavaScript engine**, which is what executes the
JavaScript code that's included in the web page.

Modern browsers have a multi-process architecture. There is a main **browser
process** that coordinates the overall interface, storage, and network requests,
and then there are separate **renderer** processes for each site that you have
open - usually this corresponds to individual tabs, but sometimes tabs can each
have multiple frames controlled by different sites.

![Browser architecture](../../../../assets/images/browser_architecture.svg)

Processes provide strong isolation guarantees: the main process can spawn these
individual renderer processes and prevent them from accessing any information
besides what the main process chooses to send to them. This process architecture
not only does this provide a strong security isolation guarantee, running each
site in its own process makes it so that if one tab crashes, it doesn't crash
the whole browser, and if one tab is compromised, it doesn't compromise the
whole browser.

This is also an example of the principle of least privilege: the browser process
only gives the renderer processes the information they need to render the page,
and nothing more. This is very important in the web context because part of what
makes the web a powerful environment (you can visit any web page and immediately
use the cool functionality that the site authors made!) also makes the web a
dangerous environment (you can immediately start running hostile code that might
try to steal your data or compromise your computer).

# The life of a web request in a browser

One important way to understand how a browser works is to understand how it
processes a web request. Here's a high-level overview of what happens when you
type a URL like <https://484.cs.uic.edu> into the address bar and hit enter.
We'll focus on things happening specifically in the browser, so things like DNS
requests, TCP connections, etc. are not covered here.

1. **Parsing the URL and making the initial request**: The browser parses the
   URL into its components: the protocol (HTTPS), the domain (484.cs.uic.edu),
   and the path (/). This is how the browser knows what server to send a request
   for the resource `/` to the server at `484.cs.uic.edu` using the `HTTPS`
   protocol. We'll cover the details of how HTTPS works in a later section - for
   now, you can think of it as "use the HTTP protocol, but inside of a channel
   that makes it more secure."

2. **Receive and parse the response**: The browser receives the response from
   the server, which will be a stream of bytes that describe an HTML document.
   Very roughly, this document will include two different things:
   * HTML, JavaScript, and CSS content that is embedded in the document itself.
     These bytes will be parsed (and in the case of JS, executed) as they are
     received, and the browser will start to build a representation of the page
     that it can show to the user.
   * Links to other resources that the browser needs to fetch in order to
     correctly render the page. These resources might include images, CSS files,
     JavaScript files, etc. Links to media (like images or videos) are fetched
     and displayed to the user once they are received. By default, links to CSS
     and JavaScript files are fetched and executed as they are received.
   
   The parsing process happening on the main document turns the stream of bytes
   into an internal data structure called the DOM Tree. The DOM Tree is a
   tree-like representation of the document that the browser can use to render
   the page. The browser will also build a CSSOM Tree, which is a tree-like
   representation of the CSS rules that apply to the document. The browser will
   use the DOM Tree and the CSSOM Tree to build a render tree, which is a
   tree-like representation of the visual elements on the page. The render tree
   is then used to render the page to the user. We won't go into the innards of
   how these work in this course, but it's important to know that they exist and
   that they are part of how the browser works.

3. **Executing JavaScript and firing events**: As the browser parses the HTML
   document, it will encounter JavaScript code that is embedded in the document.
   This code will be executed as it is encountered. JavaScript code can do a
   variety of things, including modifying the DOM, making network requests, and
   setting up event listeners. JavaScript code can also set up event listeners
   that will fire when certain events happen, like the page load completing or a
   user clicking on a button. When these events happen, the browser will execute
   the event listeners that have been set up.

At a very high level, this is all that happens in the browser. It's not a one
and done process though - the browser will continue to fetch resources, execute
JavaScript, and fire events as long as the page is open. This is why you can
have pages that update in real-time, like chat applications or stock tickers.


# Further reading

- [Inside look at a modern web browser](https://developer.chrome.com/blog/inside-browser-part1): this entire series is a great in-depth look at how Chrome works under the hood.
