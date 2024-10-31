---
title: "Realtime Communication in Web Applications"
sidebar:
  order: 330
---

Modern web applications increasingly demand realtime communication capabilities to deliver dynamic, responsive user experiences. Whether it's live chat, collaborative editing, realtime notifications, or streaming video, implementing realtime features is essential for engaging users. In this chapter, we'll explore the engineering considerations behind setting up and using realtime communication on the web. We'll delve into the specifics of WebSockets, Server-Sent Events (SSE), the publish-subscribe (pub/sub) pattern, and WebRTC, providing practical guidance and code examples to help you integrate these technologies into your applications.

# What is "Realtime Communication"?

Most of our typical web communication is based on the request-response model. The client sends a request to the server, which processes it and sends back a response. This model works well for many applications, but it has limitations when it comes to delivering dynamic, interactive experiences. 

Realtime communication refers to the instantaneous exchange of data between a
client and a server or between peers. Unlike traditional request-response models
where the client initiates all interactions, realtime communication allows
servers to push updates to clients as soon as they occur, enabling features like
live updates and interactive collaboration. It also allows clients and servers
to send data to each other without waiting for a response or encapsulating the
entire message within an HTTP request/response - which still needs to be done
even for H2 and H3, even though the framing layer minimizes the overhead of the
request/response cycle.

Key challenges in realtime communication include managing persistent
connections, ensuring low latency, handling scalability for numerous concurrent
users, and optimizing resource usage.

# Engineering Approaches to Real-Time Communication

Several methods exist to implement realtime communication, each with its own trade-offs:

- **Polling**: Clients periodically send requests to the server to check for updates.
- **Long Polling**: Clients send a request that the server holds open until an update is available.
- **Server-Sent Events (SSE)**: The server can push updates to the client over a single, long-lived HTTP connection.
- **WebSockets**: A protocol providing full-duplex communication channels over a single TCP connection.
- **WebRTC**: A set of APIs and protocols enabling realtime peer-to-peer communication of audio, video, and data.

We'll focus on WebSockets, SSE, pub/sub patterns, and WebRTC, as they offer efficient and scalable solutions for realtime communication needs.

# WebSockets: Enabling Full-Duplex Communication

## How WebSockets Work

WebSockets provide a persistent, full-duplex communication channel between the client and server over a single TCP connection. This allows both parties to send data at any time without the overhead of establishing new connections for each message.

The WebSocket protocol starts with an HTTP handshake to establish the connection, then upgrades to the WebSocket protocol, enabling efficient two-way communication.

## Practical Considerations

### Establishing a WebSocket Connection

To set up a WebSocket connection, you initiate it from the client using JavaScript:

```javascript
const socket = new WebSocket('ws://example.com/socketserver');
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

### Handling Disconnections and Reconnections

Persistent connections can be interrupted due to network issues or server restarts. Implementing reconnection logic on the client side ensures a resilient connection:

```javascript
function connect() {
  const socket = new WebSocket('ws://example.com/socketserver');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onclose = event => {
    console.log(`WebSocket closed: ${event.reason}`);
    // Attempt to reconnect after a delay
    setTimeout(connect, 1000);
  };

  socket.onerror = error => {
    console.error(`WebSocket error: ${error.message}`);
    socket.close();
  };

  socket.onmessage = event => {
    console.log(`Received: ${event.data}`);
  };
}

connect();
```

### Optimizing Data Flow

For high-frequency events, it's important to optimize data flow to prevent overwhelming the client or network:

- **Throttling**: Limit the rate at which messages are sent.
- **Batching**: Combine multiple messages into a single payload.
- **Compression**: Enable per-message compression if supported.

## Scaling WebSocket Connections

### Challenges

- **Concurrency**: Handling a large number of simultaneous connections can strain server resources.
- **State Management**: Maintaining connection state across distributed systems requires careful design.
- **Load Balancing**: Traditional load balancers may not be suitable for WebSocket traffic.

### Strategies

- **Sticky Sessions**: Configure the load balancer to route all messages from a client to the same server instance.
- **Horizontal Scaling**: Deploy multiple server instances and distribute connections among them.
- **Message Brokers**: Use systems like Redis or Kafka to handle pub/sub messaging between servers.

## Example Application with WebSockets

Let's build a simple chat server using WebSockets.

### Server-Side Code (Node.js with `ws`)

```javascript
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
const clients = new Set();

server.on('connection', socket => {
  clients.add(socket);
  socket.on('message', message => {
    // Broadcast the message to all connected clients
    for (const client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
  });
});
```

### Client-Side Code

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = event => {
  const message = event.data;
  displayMessage(message);
};

function sendMessage(message) {
  socket.send(message);
}
```

# Server-Sent Events (SSE): Efficient Unidirectional Updates

## How SSE Works

SSE allows the server to push updates to the client over a single, long-lived HTTP connection. It's unidirectional—from server to client—which makes it ideal for scenarios where the client needs to receive continuous updates without sending data back.

## Practical Considerations

### Establishing an SSE Connection

On the client side, you create an `EventSource`:

```javascript
const eventSource = new EventSource('/events');

eventSource.onmessage = event => {
  console.log(`New message: ${event.data}`);
};

eventSource.onerror = error => {
  console.error('EventSource failed:', error);
};
```

On the server side, you need to set the appropriate headers and write data in the SSE format:

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
      res.write(`data: ${new Date().toISOString()}\n\n`);
    }, 1000);

    req.on('close', () => {
      clearInterval(interval);
    });
  }
}).listen(8000);
```

### Handling Reconnections

Browsers automatically attempt to reconnect when an SSE connection is lost. You can handle reconnection logic on the server if needed.

### Managing Bandwidth and Updates

To optimize bandwidth:

- **Send Only Necessary Data**: Streamline the data sent to clients.
- **Control Update Frequency**: Limit the rate of messages.

## Scaling SSE Connections

Similar to WebSockets, scaling SSE requires managing numerous concurrent connections:

- **Use Efficient Event Loop**: Node.js and similar platforms handle I/O efficiently.
- **Leverage HTTP/2**: For better performance and multiplexing.

## Example Use Case: Live News Feed

Implementing a live news feed with SSE allows clients to receive updates as they happen without polling.

### Server-Side Code

```javascript
// See previous SSE server example
```

### Client-Side Code

```javascript
const eventSource = new EventSource('/news');

eventSource.onmessage = event => {
  const newsItem = JSON.parse(event.data);
  displayNews(newsItem);
};
```

# Publish-Subscribe (Pub/Sub) Model in Real-Time Communication

## Pub/Sub Fundamentals

The pub/sub pattern decouples message producers (publishers) from consumers (subscribers). Publishers emit messages to channels without knowledge of subscribers, who listen to channels of interest.

## Engineering Pub/Sub with Real-Time Protocols

### Implementing Pub/Sub with WebSockets

You can implement pub/sub over WebSockets by managing channels on the server:

```javascript
const channels = {};

server.on('connection', socket => {
  socket.on('message', message => {
    const { command, channel, data } = JSON.parse(message);
    if (command === 'subscribe') {
      if (!channels[channel]) channels[channel] = new Set();
      channels[channel].add(socket);
    } else if (command === 'publish') {
      const subscribers = channels[channel];
      if (subscribers) {
        for (const subscriber of subscribers) {
          subscriber.send(JSON.stringify({ channel, data }));
        }
      }
    }
  });

  socket.on('close', () => {
    for (const subscribers of Object.values(channels)) {
      subscribers.delete(socket);
    }
  });
});
```

### Using Message Brokers

For scalability, integrate a message broker like Redis:

```javascript
const redis = require('redis');
const subscriber = redis.createClient();
const publisher = redis.createClient();

subscriber.subscribe('news');

subscriber.on('message', (channel, message) => {
  // Forward message to connected WebSocket clients
});

function publish(channel, message) {
  publisher.publish(channel, message);
}
```

## Scaling Pub/Sub Systems

- **Horizontal Scaling**: Distribute load across multiple servers.
- **Message Brokers**: Offload message handling to specialized systems.
- **Stateless Servers**: Keep server instances stateless for easier scaling.

# WebRTC: Peer-to-Peer Communication for Real-Time Audio, Video, and Data

## Understanding WebRTC

WebRTC enables realtime peer-to-peer communication of audio, video, and data directly between browsers without requiring intermediate servers for media transfer.

## Technical Components of WebRTC

- **Signaling**: Exchange of control messages to establish the connection.
- **ICE (Interactive Connectivity Establishment)**: Determines the best path between peers.
- **STUN/TURN Servers**: Assist in traversing NATs and firewalls.


### Managing Bandwidth and Quality

- **Adaptive Bitrate**: Adjust video quality based on network conditions.
- **Codec Selection**: Use efficient codecs like VP9 or H.264.
- **Selective Forwarding Units (SFUs)**: For group calls, use an SFU to relay streams.

## Video Streaming in Real-Time Applications

### Overview of Video Streaming Protocols

- **WebRTC**: Ideal for low-latency, peer-to-peer video communication.
- **RTMP (Real-Time Messaging Protocol)**: Used for live streaming to media servers.
- **HLS/DASH**: HTTP-based protocols for large-scale video streaming.

### Implementing Video Streaming with WebRTC

Using WebRTC for video streaming involves capturing media, establishing peer connections, and managing streams.

Alternatively, `getUserMedia` can be used to capture media for post-processing, not necessarily needing to be sent to other users for webRTC. Consider this when coming up with your project in class!

#### Capturing Media

```javascript
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    // Use the stream for WebRTC
  })
  .catch(error => {
    console.error('Error accessing media devices.', error);
  });
```

#### Establishing Peer Connections

Refer to the earlier WebRTC client-side code for setting up peer connections and handling signaling.

### Optimizing Video Quality and Performance

- **Adaptive Bitrate Streaming**: Implement logic to adjust video quality based on network bandwidth.
- **Hardware Acceleration**: Utilize hardware encoding/decoding for better performance.
- **Efficient Codecs**: Choose codecs that offer a good balance between quality and compression.

### Scaling Video Streaming

For group calls or broadcasting to many users, consider:

- **Media Servers**: Use SFUs to relay streams without requiring each client to send multiple copies.
- **CDNs**: For large audiences, stream via Content Delivery Networks using protocols like HLS.

### Alternatives and Extensions to WebRTC

- **RTMP**: Suitable for streaming from an encoder to a media server.
- **HLS/DASH**: Ideal for one-to-many streaming, such as live events.

# Connection Management and Resiliency in Real-Time Apps

## Handling Disconnects and Reconnection Logic

Design your application to handle intermittent connectivity gracefully:

- **State Synchronization**: On reconnection, synchronize the client's state with the server.
- **Queueing Messages**: Buffer messages when offline and send them upon reconnection.

## Reducing Latency in Real-Time Communication

- **Edge Servers**: Deploy servers closer to users geographically.
- **Optimized Routing**: Use services that optimize network paths.

## Optimizing Data Throughput and Resource Use

- **Efficient Data Formats**: Use binary protocols or compress data.
- **Resource Management**: Monitor CPU and memory usage to ensure scalability.

# Choosing the Right Real-Time Communication Approach

## Trade-offs and Practical Tips

- **WebSockets**: Best for bidirectional communication where both client and server can send messages independently.
- **SSE**: Ideal for server-to-client unidirectional streaming with simple implementation.
- **WebRTC**: Suited for peer-to-peer audio, video, and data transfer with low latency.

## Guidelines for Real-Time App Architecture

- **Use Established Libraries**: Simplify implementation using libraries like Socket.IO, SignalR, or PeerJS.
- **Consider Protocol Overheads**: Balance features against the overhead of implementing them.

# Conclusion

Implementing realtime communication in web applications involves careful consideration of the available technologies and their trade-offs. Understanding the specifics of WebSockets, SSE, the pub/sub pattern, and WebRTC enables you to choose the right tools for your application's needs. By focusing on engineering best practices, optimizing performance, and planning for scalability, you can create responsive and engaging realtime experiences for your users.

---