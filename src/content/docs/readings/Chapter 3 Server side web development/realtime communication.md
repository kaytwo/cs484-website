---
title: "Realtime Communication in Web Applications"
sidebar:
  order: 330
---

Modern web applications increasingly demand realtime communication capabilities to deliver dynamic, responsive user experiences. Whether it's live chat, collaborative editing, realtime notifications, or streaming video, implementing realtime features is essential for engaging users. In this chapter, we'll explore the engineering considerations behind setting up and using realtime communication on the web. We'll delve into the specifics of WebSockets, Server-Sent Events (SSE), the publish-subscribe (pub/sub) pattern, WebRTC, and streaming video, providing practical guidance and code examples to help you integrate these technologies into your applications.

# What is "Realtime Communication"?

Most of our typical web communication is based on the request-response model. The client sends a request to the server, which processes it and sends back a response. This model works well for many applications, but it has limitations when it comes to delivering dynamic, interactive experiences.

Realtime communication refers to the instantaneous exchange of data between a client and a server or between peers. Unlike traditional request-response models where the client initiates all interactions, realtime communication allows servers to push updates to clients as soon as they occur, enabling features like live updates and interactive collaboration. It also allows clients and servers to send data to each other without waiting for a response or encapsulating the entire message within an HTTP request/response.

Key challenges in realtime communication include managing persistent connections, ensuring low latency, handling scalability for numerous concurrent users, securely managing authentication, and optimizing resource usage.

# Engineering Approaches to Real-Time Communication

Several methods exist to implement realtime communication in the browser, each with its own trade-offs:

- **Polling**: Clients periodically send requests to the server to check for updates.
- **Long Polling**: Clients send a request that the server holds open until an update is available.
- **Server-Sent Events (SSE)**: The server can push updates to the client over a single, long-lived HTTP connection.
- **WebSockets**: A protocol providing full-duplex communication channels over a single TCP connection.
- **WebRTC**: A set of APIs and protocols enabling realtime peer-to-peer communication of audio, video, and data.

We'll focus on WebSockets, SSE, pub/sub patterns, and WebRTC, as they offer efficient and scalable solutions for realtime communication needs.

# WebSockets: Enabling Full-Duplex Communication

## How WebSockets Work

WebSockets provide a persistent, full-duplex communication channel between the client and server over a single TCP connection. This allows both parties to send data at any time without the overhead of establishing new connections for each message.

The WebSocket protocol starts with an HTTP handshake to establish the connection. Once the handshake is complete, the protocol is upgraded to WebSocket, which enables efficient two-way communication. This upgrade significantly reduces latency compared to traditional polling methods because it avoids the need to repeatedly establish new connections.

## Practical Considerations

### Establishing a WebSocket Connection

To set up a WebSocket connection, you initiate it from the client using JavaScript:

```javascript
// Always use wss:// (secure) in production
const socket = new WebSocket('wss://example.com/socketserver');
```

On the server side, you need a WebSocket server to handle incoming connections. Here's a simple example using Node.js and the `ws` library:

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('Client connected');
  socket.on('message', message => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    socket.send(`Server says: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
```

### Upgrading from HTTP to WebSocket (WS)

The WebSocket protocol begins by establishing a connection using a regular HTTP request, known as the HTTP handshake. During this handshake, the client sends an `Upgrade` header to the server, indicating its intent to switch protocols to WebSocket. The server, if capable, responds with a `101 Switching Protocols` status code.

#### Server Handling the Upgrade

The server must support the WebSocket protocol to successfully handle the upgrade. Here is an example using Node.js and the `ws` library to handle the upgrade process:

```javascript
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  // Security Check: Validate Origin here before upgrading
  if (request.headers.origin !== 'https://trusted-site.com') {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
  }
  
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (socket) => {
  console.log('Client connected via WebSocket');
  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    socket.send(`Server says: ${message}`);
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
```

### Handling Disconnections and Reconnections

Persistent connections can be interrupted due to network issues or server restarts. Implementing robust reconnection logic is critical.

**Important:** Avoid using a fixed delay (e.g., `setTimeout(connect, 1000)`). If your server restarts, thousands of clients will try to reconnect simultaneously after exactly 1 second, causing a "Thundering Herd" that can crash your server again. Instead, use **Exponential Backoff** with **Jitter** (randomness).

```javascript
let retryDelay = 1000;
const maxDelay = 30000;

function connect() {
  const socket = new WebSocket('wss://example.com/socketserver');

  socket.onopen = () => {
    console.log('WebSocket connection established');
    retryDelay = 1000; // Reset delay on successful connection
  };

  socket.onclose = event => {
    console.log(`WebSocket closed: ${event.reason}`);
    
    // Exponential Backoff with Jitter
    // Double the delay, but cap it at maxDelay
    retryDelay = Math.min(retryDelay * 2, maxDelay); 
    // Add random jitter (e.g., +/- 500ms) to spread out reconnections
    const jitter = Math.random() * 1000; 
    
    setTimeout(connect, retryDelay + jitter);
  };

  socket.onerror = error => {
    console.error(`WebSocket error: ${error.message}`);
    socket.close();
  };
}

connect();
```

### Optimizing Data Flow

For high-frequency events, it's important to optimize data flow to prevent overwhelming the client or network:

  - **Throttling**: Limit the rate at which messages are sent.
  - **Batching**: Combine multiple messages into a single payload before sending them. This reduces the number of network packets and parsing overhead.
  - **Compression**: Enable per-message compression (like `permessage-deflate`) to reduce the size of messages being transmitted.
  - **Binary Formats**: For high-performance applications, consider using binary formats like Protobuf or MessagePack instead of JSON to reduce payload size and parsing time.

## Security Considerations for Realtime Channels

Realtime connections introduce unique security challenges compared to standard HTTP requests.

1.  **Encryption is Mandatory:** Always use `wss://` (WebSocket Secure) and `https://` for SSE. This encrypts data in transit and prevents Man-in-the-Middle attacks.
2.  **Cross-Site WebSocket Hijacking (CSWSH):** Unlike standard HTTP, WebSockets do not enforce the Same-Origin Policy by default. An attacker can initiate a WebSocket connection from a malicious site to your server using the victim's cookies.
      * *Defense:* The server **must** validate the `Origin` header during the upgrade handshake. If the origin does not match your domain, reject the connection immediately.
3.  **Authentication:** Browsers do not allow custom headers (like `Authorization: Bearer`) in the initial WebSocket handshake. Common solutions include:
      * **Cookies:** Validated during the HTTP upgrade request (requires strict CSRF protection).
      * **Ticket System:** The client makes a standard HTTP request to get a short-lived "ticket" (token), then passes that ticket as a query parameter in the WebSocket URL (`wss://api.com?ticket=xyz`).
4.  **Rate Limiting:** Realtime connections consume persistent resources. Implement strict rate limiting and message size limits to prevent Denial of Service (DoS) attacks.

## Scaling WebSocket Connections

### Challenges

  - **Concurrency**: Handling a large number of simultaneous connections requires efficient resource management.
  - **State Management**: When connections are spread across multiple servers, ensuring each server has access to the correct client state becomes challenging.
  - **Load Balancing**: WebSocket connections are long-lived. Traditional round-robin load balancing fails because it doesn't account for the persistent nature of the connection.

### Strategies

  - **Sticky Sessions**: Configure the load balancer to route all messages from a client to the same server instance during the handshake phase.
  - **Horizontal Scaling**: Deploy multiple server instances.
  - **Message Brokers**: Use systems like Redis or Kafka to handle pub/sub messaging between servers (detailed in the Pub/Sub section).

## Example Application with WebSockets

Let's build a simple demo for WebSockets using Hono. The client will periodically send a string to the server, and the server will print it.

### Server-Side Code (Node.js with `hono` and `node-ws`)

```javascript
import { createNodeWebSocket } from '@hono/node-ws'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.get('/ws', upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`)
        ws.send('Hello from server!')
      },
      onClose: () => {
        console.log('Connection closed')
      },
    }
}))

const server = serve(app)
injectWebSocket(server)
```

### Client-Side Code

```javascript
// client.ts
import { hc } from 'hono/client'
import type app from './server'

const client = hc<typeof app>('http://localhost:8787')
const ws = client.ws.$ws(0)

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send(new Date().toString())
  }, 1000)
})
```

# Server-Sent Events (SSE): Efficient Unidirectional Updates

## How SSE Works

SSE allows the server to push updates to the client over a single, long-lived HTTP connection. It's unidirectional—from server to client—which makes it ideal for scenarios like live comment feeds, stock tickers, or notification streams.

## Practical Considerations

### Establishing an SSE Connection

On the client side, use the native `EventSource` API:

```javascript
const eventSource = new EventSource('/events');

eventSource.onmessage = event => {
  console.log(`New message: ${event.data}`);
};

// Automatic reconnection is built-in to EventSource
eventSource.onerror = error => {
  console.error('EventSource failed:', error);
};
```

On the server side, set the appropriate headers:

```javascript
const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const interval = setInterval(() => {
      // Note the specific formatting required for SSE
      res.write(`data: ${new Date().toISOString()}\n\n`);
    }, 1000);

    req.on('close', () => {
      clearInterval(interval);
    });
  }
}).listen(8000);
```

# Publish-Subscribe (Pub/Sub) Model in Real-Time Communication

As your application scales, handling real-time communication using direct WebSocket connections becomes difficult. If you have multiple servers, a user connected to Server A cannot send a message to a user connected to Server B without a mechanism to bridge them.

## Pub/Sub Fundamentals

The pub/sub pattern decouples message producers (publishers) from consumers (subscribers). Publishers emit messages to channels via a **Message Broker** (like Redis), which then distributes those messages to all servers subscribed to that channel.

## Engineering Pub/Sub with Redis (Node.js)

**Motivation**: By using a message broker, your web servers become stateless regarding message distribution. They simply pass messages to the broker, and the broker ensures all relevant servers receive the data to push to their connected clients.

Here is an example using the modern **Redis v4+** syntax (which relies on Promises and explicit connections):

```javascript
const { createClient } = require('redis');

(async () => {
  const publisher = createClient();
  const subscriber = createClient();

  await publisher.connect();
  await subscriber.connect();

  // Subscribe to the 'news' channel
  await subscriber.subscribe('news', (message) => {
    console.log(`Received on news channel: ${message}`);
    // Logic to forward 'message' to connected WebSocket clients goes here
  });

  // Publish a message to the 'news' channel
  await publisher.publish('news', 'Breaking: Realtime is cool!');
})();
```

# WebRTC: Peer-to-Peer Communication for Audio, Video, and Data

WebRTC (Web Real-Time Communication) enables direct peer-to-peer communication of audio, video, and **arbitrary data** between browsers. It is unique because, after a brief signaling phase via a server, the data flows directly between users, bypassing the server entirely.

## The Hidden Gem: RTCDataChannel

While WebRTC is famous for video chat, its `RTCDataChannel` is a powerful tool for "Local-First" applications, file sharing, and real-time gaming.

  * **File Sharing:** You can stream gigabytes of data directly between users. This eliminates server storage costs, bandwidth fees, and offers privacy by design (the file never touches your server).
  * **Real-Time Collaboration:** For apps like whiteboards or multiplayer games, you can send update packets via UDP-like unreliable channels. This avoids the "head-of-line blocking" issues of TCP, ensuring that if one packet is dropped, it doesn't delay the rest of the stream—crucial for low-latency interactions.

### Code Example: Using Data Channels

```javascript
// Configuring the Peer Connection
const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// Creating a Data Channel (Side A)
const dataChannel = peerConnection.createDataChannel("chat");

dataChannel.onopen = () => console.log("Direct P2P connection open!");
dataChannel.onmessage = (event) => console.log("Received P2P msg:", event.data);

// Sending data (Side A)
dataChannel.send("Hello directly from Peer A!");

// Receiving the Data Channel (Side B)
peerConnection.ondatachannel = (event) => {
    const receiveChannel = event.channel;
    receiveChannel.onmessage = (e) => console.log("Received:", e.data);
};
```

## Summary of WebRTC

WebRTC is the gold standard for **low-latency peer-to-peer exchange**.

  * **For Video:** It is perfect for 1:1 calls. However, scaling to large group calls (e.g., 50 people) usually requires a central media server (SFU) because a client cannot upload 50 streams simultaneously.
  * **For Data:** It is highly effective. Tools like **Wormhole.app** or **Sharedrop** use WebRTC to transfer files securely. Collaborative tools use it to synchronize state (CRDTs) with minimal latency.

# Video Streaming in Real-Time Applications

Video streaming dominates web traffic. It is generally categorized into **Live Streaming** (Twitch, Zoom) and **Stored/On-Demand Streaming** (YouTube, Netflix).

## Challenges in Video Streaming

1.  **Latency vs. Quality**: In live streaming, you often have to trade quality for lower latency.
2.  **Adaptive Bitrate**: Users have different internet speeds. You must transcode video into multiple qualities (360p, 720p, 1080p, 4k) and allow the client to switch between them dynamically.
3.  **High Performance Codecs**:
      * **H.264**: Greatest compatibility, average compression.
      * **H.265 (HEVC)**: High compression, but licensing costs and variable browser support.
      * **VP9**: Royalty-free, supported by Google/YouTube, good compression.
      * **AV1**: The future of streaming. Exceptional compression and royalty-free. While computationally expensive to encode purely in software, support is growing rapidly with modern hardware encoders (NVENC, Apple Silicon).

## Overview of Video Streaming Protocols

  * **HLS (HTTP Live Streaming)**: Developed by Apple. It breaks video into small chunks (`.ts` files) and uses a manifest (`.m3u8`) to index them. It uses standard HTTP, making it easy to cache via CDNs. It is the most widely supported protocol.
  * **DASH (Dynamic Adaptive Streaming over HTTP)**: Similar to HLS but codec-agnostic and an open standard.
  * **RTMP**: An older protocol mostly used now for *ingesting* video (sending video from OBS to Twitch), which is then converted to HLS/DASH for delivery to viewers.

# Choosing the Right Real-Time Communication Approach

| Technology | Strengths | Weaknesses |
| :--- | :--- | :--- |
| **WebSockets** | Full-duplex, Low latency, widely supported. | Complex to scale, requires manual reconnection logic. |
| **SSE** | Native browser support (EventSource), Auto-reconnects, HTTP-friendly. | Unidirectional (Server-to-Client only). |
| **WebRTC** | Ultra-low latency, Peer-to-Peer (low server cost for data/files). | Complex setup (needs signaling), UDP packets can be blocked by corporate firewalls. |

## Guidelines for Real-Time App Architecture

  - **Use WebSockets** for chat apps, collaborative editing, and notification systems where 2-way communication is needed.
  - **Use SSE** for stock tickers, news feeds, or simple server notifications where the client doesn't need to reply.
  - **Use WebRTC** for voice/video calls, high-speed gaming state, or local-first file sharing.
  - **Always Secure Your Transport**: Use WSS/HTTPS and validate Origins to prevent hijacking.

# Conclusion

Implementing realtime communication in web applications involves careful consideration of the available technologies and their trade-offs. Understanding the specifics of WebSockets, SSE, the pub/sub pattern, and WebRTC enables you to choose the right tools for your application's needs. By prioritizing security, utilizing message brokers for scalability, and choosing the right protocol for the job, you can create responsive and engaging realtime experiences for your users.
