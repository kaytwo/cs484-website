---
title: "Giving your application memory: databases"
sidebar:
  order: 310

---

# Databases: adding meaningful state to web applications

Databases are at the heart of most modern web applications, providing the backbone for data storage, retrieval, and management. From simple user information to complex analytics, databases enable the organization, persistence, and access of data in ways that empower web applications to scale, respond to user requests, and operate efficiently.

## Types of Databases

There are several types of databases, each suited to different needs and use cases:

- ****SQL Databases****: Also known as relational databases, these are structured and rely on a schema. They use Structured Query Language (SQL) for data manipulation.

- ****Document Databases****: These store data in JSON-like documents, enabling flexibility in how data is modeled and retrieved.

- ****Key-Value Databases****: A simpler model that stores data as a collection of key-value pairs, offering high-performance read/write capabilities.

Databases also extend to other more specialized types, including time-series databases for tracking events over time, vector databases for advanced similarity searches, and search databases for handling full-text searches.

## Uses for Databases in Web Applications

Databases are essential for multiple purposes in web applications:

- ****Permanent, Non-Volatile Storage****: The backbone of almost every web application, ensuring that critical data persists.

- ****Temporary Storage****: Used for session data or caching, allowing fast retrieval without the need for long-term persistence.

- ****Enabling Complex Queries****: Databases allow for the execution of complex queries that aggregate, filter, and manipulate large datasets efficiently.

Developers must carefully choose the right database depending on the type of data, the access patterns, and the performance requirements of their application.

# Data Protection is Paramount

When developing a web application, especially one that handles sensitive data like customer information, understanding the importance of protecting that data cannot be overstated. Losing or compromising customer data is a critical failure that can lead to financial losses, legal repercussions, and reputational damage.

## Designing to Protect Customer Data

The primary rule in data protection is to ensure that ****customer data is sacrosanct****. Losing data not only causes immediate operational issues but also erodes customer trust. Companies like Equifax and Yahoo have suffered massive breaches that have left lasting scars on their reputations.

To design your database systems with security in mind:

- Implement a ****3-2-1 backup strategy****: Keep 3 copies of your data, stored on at least 2 different types of media, with at least 1 copy offsite. This ensures redundancy and disaster recovery readiness.

- ****Never use real customer data in development****. Test databases should be populated with mock data to avoid accidental leakage or misuse.

- Impose strict ****access controls**** to track who has access to customer data and log interactions. This helps ensure accountability and compliance with data privacy laws.

In web application development, security must be ingrained in every layer of the data infrastructure, from how data is stored to how it is accessed and manipulated.

# Database Types Commonly Used in Web Applications

Web applications rely on different database types depending on the type of data and the use case. Below is an overview of the most commonly used types:

## SQL Databases

SQL databases (relational databases) are widely regarded as the standard for storing structured data. These databases require a predefined schema, ensuring that all data is organized into tables with well-defined relationships.

****When to use SQL Databases****:

- ****Textual and lightweight data****: For example, user information, blog posts, comments, or other forms of structured content.

- ****Reliability and transactions****: SQL databases excel at providing ****ACID (Atomicity, Consistency, Isolation, Durability)**** transactions, which are crucial for ensuring data integrity, especially in environments where multiple users are writing to the database simultaneously.

- ****Complex queries and joins****: SQL databases allow for the combination of data from different tables using joins, which are indispensable when dealing with relationships between entities, such as users and their associated content.

****Common SQL Databases****:

- ****Standalone****: PostgreSQL, MySQL (MariaDB is an open-source fork)

- ****Cloud-Based****: Amazon RDS, Google Cloud SQL, Azure SQL

- ****Embedded****: SQLite, which is often used in applications with limited concurrency needs or for prototyping.

## Document Databases

Document databases offer a more flexible approach to data storage. Instead of storing data in rows and columns, document databases store entire JSON-like objects, allowing for rapid iteration and adaptability of the data model.

****When to use Document Databases****:

- ****Rapid iteration and schema flexibility****: Document databases allow you to quickly add or modify fields in your documents without the need to alter the schema.

- ****Write-heavy workloads****: These databases perform well in environments where data is frequently written but not frequently updated or joined with other data.

- ****Data without complex relationships****: For example, a collection of independent blog posts or social media updates can be stored as individual documents.

****Common Document Databases****:

- ****Standalone****: MongoDB, CouchDB

- ****Cloud-Based****: Amazon DynamoDB, Firebase Firestore

## Key-Value Databases

Key-value databases are optimized for speed and simplicity. They store data as a collection of key-value pairs, making them ideal for use cases like caching, session storage, and fast, simple lookups.

****When to use Key-Value Databases****:

- ****Caching****: Caching expensive or frequently accessed data to reduce latency for users.

- ****Session management****: Keeping track of short-term user sessions.

- ****Work queues****: Managing distributed task queues in large-scale applications.

****Common Key-Value Databases****:

- ****Standalone****: Redis, Memcached

- ****Cloud-Based****: Amazon ElastiCache, Google Cloud Memorystore

# Database Deployment Modalities

The way in which a database is deployed has significant implications for performance, scaling, and management complexity. There are several common deployment modalities for databases:

## Standalone Databases

In this deployment mode, you manage the entire database infrastructure yourself, typically running the database on your own servers. This offers maximum control over configuration but also requires you to manage scaling, backups, and failover strategies.

****Advantages****:

- Full control over the database stack.

- Ability to customize the configuration to meet specific needs.

****Disadvantages****:

- Significant operational overhead.

- Scaling and high availability require complex infrastructure management.

## Managed Databases

Managed databases shift the operational burden to a cloud provider, allowing developers to focus on the data rather than the infrastructure. Most cloud providers offer managed database services that handle scaling, backups, and failover automatically.

****Advantages****:

- No need to manage hardware or infrastructure.

- Built-in scalability and high availability.

****Disadvantages****:

- Typically more expensive than running your own servers.

- Limited control over specific configurations or optimizations.

## Embedded Databases

Embedded databases, like SQLite, are packaged within an application and typically run in memory or on local storage. Rather than connecting to a separate process, embedded databases are effectively libraries that you include into your own code to operate directly on the files that make up the database. SQLite has become one of the most popular database technologies in the world implementing this model.

Recently, SQLite has been used in production environments for web applications, especially when combined with tools like [LiteStream](https://litestream.io/how-it-works/), which provides a mechanism for replicating the files underlying a SQLite databases to remote storage for backup and disaster recovery. There are also multiple SaaS offerings that provide SQLite as a service (including [Turso](https://turso.tech/) and [Cloudflare D1](https://developers.cloudflare.com/d1/)), allowing developers to use SQLite in a serverless environment.

****Advantages****:

- High performance with low latency.

- Simple setup and minimal operational overhead.

****Disadvantages****:

- Not ideal for distributed environments or high-concurrency applications.

# Outsourcing Database Infrastructure

Outsourced databases, such as Amazon RDS or Google Cloud SQL, take the complexity out of managing the underlying infrastructure. However, they also introduce trade-offs, especially around cost and control.

## What You Should Know About Outsourcing

- ****Managed but with varying levels of abstraction****: Some outsourced databases still require you to manage the underlying virtual machines (VMs), while others abstract away the hardware entirely, charging only for data storage and the number of requests.

- ****Cost considerations****: Outsourced databases can become expensive at scale, especially when traffic spikes lead to increased query loads or storage needs.

# Advanced Database Types

In addition to the commonly used databases in web applications, there are more exotic databases tailored to specific use cases:

## Graph Databases

Graph databases like Neo4j and Amazon Neptune are designed for traversing and querying relationships between entities. They are ideal for use cases like social networks, recommendation systems, and fraud detection, where relationships between entities are as important as the entities themselves.

## Columnar Databases

Columnar databases, such as ClickHouse, Amazon Redshift, and Google BigQuery, are optimized for analytical queries on large datasets. Instead of storing data by row, they store it by column, allowing for faster aggregation and analysis of large amounts of data.

## Search Databases

Search databases like [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro-what-is-es.html) and [Meili Search](https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch?utm_campaign=oss&utm_source=docs&utm_medium=home-page) are designed for full-text search, enabling efficient and flexible queries over large text-based datasets. These databases are often used for search functionality on websites and applications.

## Vector Databases

Vector databases, such as pg\_vector, are designed for handling semantic similarity searches, which are essential in machine learning and natural language processing applications. They store and query vector representations of data, enabling advanced use cases like recommendation systems and image or text similarity searches.

## Time-Series Databases

Time-series databases, like InfluxDB, are designed for storing and querying data that is timestamped. These databases are ideal for use cases like IoT applications, monitoring systems, and any scenario where data is collected at regular intervals over time.

# Object-Relational Mappers (ORMs)

Object-Relational Mappers (ORMs) are tools that help developers interact with databases by abstracting the database operations into object-oriented code. Instead of writing SQL queries directly, developers use classes and methods in their programming language to perform operations like creating, reading, updating, and deleting records.

## When to Use ORMs

- Rapid Development: ORMs are especially useful during rapid prototyping and development, as they reduce the amount of boilerplate code needed to interact with the database.
- Reduced Complexity: For applications with simple data models, ORMs can significantly reduce the complexity of database interactions, making it easier for developers who may not be experts in SQL.

## Advantages of ORMs

- **Abstraction**: ORMs abstract away the SQL queries, allowing developers to focus on the logic of their applications without needing to worry about database-specific syntax.
- **Code Reusability**: By using object-oriented programming, developers can reuse classes and methods, which improves maintainability.
- **Productivity**: ORMs can save time by automating repetitive tasks like data migration, schema creation, and query building.

## Disadvantages of ORMs

- **Performance Overhead**: ORMs can introduce a performance overhead because the queries generated may not be as optimized as handwritten SQL queries.
- **Limited Flexibility**: Complex queries or highly optimized database operations might be challenging to perform using an ORM, requiring developers to use raw SQL for those cases.
- **Learning Curve**: Learning to use an ORM effectively can have a steep learning curve, especially for developers who are unfamiliar with object-relational mapping concepts.

# Object-Relational mappers

Object-relational mappers (ORMs) are tools that abstract the database layer by allowing developers to interact with the database using the same object-oriented programming language they use for the rest of the application. ORMs automatically generate SQL queries and map the results to objects, providing features such as type safety, code autocompletion, and migration management. They reduce the need for boilerplate SQL and make data management easier, particularly in complex applications. ORMs also typically include tools to manage database migrations, which streamline the process of modifying the database schema over time while maintaining data integrity..

## Popular ORMs in the TypeScript Ecosystem

### Prisma

Prisma is a modern ORM that offers features like type safety, autogenerated queries, and an intuitive API that simplifies working with databases. Prisma integrates well with TypeScript, making it easier to catch errors at compile time and reducing runtime issues. It also provides built-in data modeling tools and a query engine that translates data requests into optimized SQL. To deploy Prisma in a web application, developers need to run the Prisma engine alongside the application server, ensuring that the Prisma engine can translate application queries to the database efficiently. The Prisma CLI is used for generating types, managing migrations, and setting up the connection to the database.

### Drizzle

Drizzle is a lightweight ORM designed for developers who want simplicity and full control over their database interactions. Unlike traditional ORMs, Drizzle functions as a "headless ORM," meaning it doesn't impose a specific data model or require additional runtime components. Instead, it generates strongly-typed queries in TypeScript, which can be executed using a compatible database driver. A database driver is a low-level interface that allows the application to communicate directly with the database, executing the raw queries generated by Drizzle. To deploy Drizzle, developers use it directly within their application code, without the need for a separate engine or service, simplifying the deployment process while maintaining performance and type safety.

# Conclusion

Databases are essential to the architecture of any secure web application, and selecting the right type of database, deployment modality, and backup strategy is critical for both performance and data security. Understanding the different types of databases and their appropriate use cases helps ensure your application can scale, respond efficiently to user demands, and keep customer data safe. By prioritizing security and making thoughtful choices in your database design, you build the foundation for a resilient, high-performance web application.
