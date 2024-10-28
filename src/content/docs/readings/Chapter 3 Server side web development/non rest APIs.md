---
title: "Beyond REST: alternative API architectures"
sidebar:
  order: 320
---


External-facing APIs have traditionally followed the REST paradigm, providing a straightforward mechanism for exposing server functionality in a standardized way. However, REST has its drawbacks—including limited flexibility and performance inefficiencies—and has led developers to explore alternative approaches to creating high-performance APIs. Here we will explore the evolution of API architectures, starting from REST and advancing to more modern and efficient methods like GraphQL and RPC approaches.

# REST

## Basics of REST

Representational State Transfer (REST) is an architectural style that provides a simple interface for interacting with resources. REST APIs typically use HTTP methods such as GET, POST, PUT, and DELETE to represent CRUD operations on resources. Each resource is identified by a URI, and the server processes requests based on the HTTP method used.

REST emphasizes stateless interactions, where every request from the client contains all the necessary information for the server to fulfill that request. This simplicity, combined with the widespread use of HTTP, has made REST a very popular choice for API development over the past decade.

## Downsides of REST

Despite its popularity, REST has several limitations:

- **Inefficient Data Fetching**: Clients may need to make multiple requests to gather all the required information, leading to inefficiencies.
- **Underfetching and Overfetching**: REST endpoints often return more data than is needed (overfetching) or require clients to request additional endpoints for more data (underfetching).
- **Resource-Centric Design**: REST is not well-suited for relationships between entities, resulting in overly complex resource nesting and a lack of flexibility in responding to dynamic client needs.

# GraphQL

## Intention of GraphQL

GraphQL is a query language and runtime developed by Facebook to address many of the challenges associated with REST. Unlike REST, GraphQL allows clients to request exactly the data they need in a single request, improving efficiency and performance. GraphQL's focus on data querying and its flexibility makes it ideal for modern applications where clients often need to access complex data structures.

## Important Considerations for Developers

- **Use Cases**: GraphQL is useful when the client-side requirements are dynamic and vary from client to client. Its flexibility makes it great for mobile and frontend applications that may want different sets of data at different times.
- **Complexity and Security**: GraphQL introduces complexities such as schema design and query optimization. It also requires proper validation and rate limiting to prevent resource exhaustion from overly complex or malicious queries.

## Simple GraphQL Example

Here is a simple example of a GraphQL query to retrieve a user's name and email:

```graphql
{
  user(id: "1") {
    name
    email
  }
}
```

The above query would only return the `name` and `email` fields for a user with ID 1, demonstrating how GraphQL allows clients to specify exactly the data they want.

# A query language, not a server

One very important thing to note about GraphQL is that it is not a piece of software, but rather a specification for how to send queries and receive properly shaped responses from an API consumer to an API provider. It does not require you to use a specific database or even a specific server-side technology. GraphQL can be implemented in a variety of programming languages, and the server can interact with different types of databases or other data sources, providing a flexible interface between clients and the backend.

# Designing a GraphQL API

To design a GraphQL API, you start by defining the **schema**. The schema is the core of a GraphQL API and describes the types of data clients can request and how they can interact with the API. It consists of:

1. **Type Definitions**: These define the data shapes, including object types (like User, Product), fields, and relationships.
2. **Queries and Mutations**: Queries are used to retrieve data, while mutations are used to modify data. They are defined in the schema to allow the client to understand what operations are possible.

For example, in a schema:

```graphql
type User {
  id: ID!
  name: String
  email: String
}

type Query {
  user(id: ID!): User
}
```

## Resolvers

Resolvers are functions that implement the behavior of the API. They define how to fetch or manipulate data for each field in the schema. You do not provide explicit SQL queries in the schema but instead link fields to resolvers, which can run any logic—including making SQL queries, calling other APIs, or even combining multiple sources.

For instance, in JavaScript, a resolver might look like:

```javascript
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await db.query('SELECT * FROM users WHERE id = ?', [id]);
    }
  }
}
```

## Abstraction of SQL Queries

The actual SQL query generation is abstracted from the front end by the resolvers. The client sends a GraphQL query, and the server handles the data retrieval internally by calling appropriate resolvers. This hides the backend implementation details, ensuring that clients are only concerned with requesting data in the format they need.

For instance, a client might send:

```graphql
{
  user(id: "1") {
    name
    email
  }
}
```

The server processes this query, invoking the `user` resolver, which may query a SQL database and return the requested fields. The frontend only deals with the GraphQL query and the structured response—without knowing how the data is fetched or manipulated.

# Improving API performance through better Serialization

Most traditional APIs use either form-encoded data or JSON for request and response serialization. JSON is human-readable, widely supported, and easy to use, making it a popular choice for both REST and GraphQL APIs.

## Downsides of JSON and Form-Encoded Data

- **Verbosity**: JSON can be verbose, leading to larger payloads that increase latency, especially on low-bandwidth networks.
- **Parsing Overhead**: JSON parsing can add overhead compared to more efficient binary formats.
- **Schemaless**: By default, JSON objects have no defined shape, leading to recipients to need to carefully validate (or blindly trust) returned values. JSON Schema is an extension to JSON that allows for a well-defined schema, but is not universally deployed.

## One popular alternative: Protobuf

**Protocol Buffers (Protobuf),** developed by Google, offers several advantages over JSON. Protobuf is a compact, binary serialization format that reduces the size of transmitted data, which makes it faster to send over the network and more efficient to parse. Unlike JSON, Protobuf messages are defined by a strongly-typed schema, which ensures data consistency and reduces errors. The serialization and deserialization processes are optimized for performance, resulting in lower CPU usage and quicker processing times, which makes Protobuf a great choice for systems where efficiency and performance are crucial.

# Remote Procedure Calls (RPC)

Remote Procedure Calls are an approach where a client can invoke a procedure (function) on a remote server, as if it were a local function. This concept has been around since the early days of distributed computing and aims to simplify network communication by abstracting the underlying complexity.

## When to Consider Using RPCs

RPCs are a good fit when you need a more direct and efficient way to execute functions on a server, rather than working with abstracted "resources" as in REST or GraphQL. RPC approaches are often used in systems that require low latency and high performance, such as real-time applications or microservice architectures. By abstracting network communication into function calls, RPCs can make the developer experience smoother and reduce the complexity of managing multiple endpoints.

## gRPC

gRPC, developed by Google, is an open-source, high-performance RPC framework that uses HTTP/2 and Protocol Buffers (protobuf) to provide efficient serialization and communication. gRPC is designed for low latency, making it a great fit for microservices that require fast and reliable communication. gRPC will rarely be used to directly communicate with clients, and will more often be deployed within the server side of the application.

## tRPC

tRPC is a newer approach that uses the RPC concept to make it easier to write full stack applications in TypeScript. While there is some additional complexity that comes from deploying tRPC in your project, it allows both client and server to share types and understand the arguments and return types of server-side functionality, making client-side usage easier and less error-prone.

## When to Use gRPC and tRPC

- **gRPC**: Best for microservices or systems requiring high performance and efficient communication, especially when dealing with polyglot environments where different services may be implemented in different programming languages.
- **tRPC**: Suitable for projects where TypeScript is used on both the server and client sides, and a type-safe API layer is needed. It is ideal for applications where developer productivity and type safety are high priorities.

## Simple RPC Example

Here is a simple example of an RPC in gRPC, defining a service to get a user's information:

```proto
syntax = "proto3";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
  string user_id = 1;
}

message UserResponse {
  string name = 1;
  string email = 2;
}
```

This example shows how to define a `UserService` with a `GetUser` RPC method,
which takes a `UserRequest` and returns a `UserResponse`. Once you've configured
your codebase for it, you can use this function in a TypeScript application
like so:

```typescript
interface UserResponse {
  name: string;
  email: string;
}

// Invoke the GetUser RPC method with a typed response
client.GetUser({ user_id: '1' }, (error: grpc.ServiceError | null, response: UserResponse) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('User Info:', response);
});
```
