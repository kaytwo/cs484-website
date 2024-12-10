---
title: "Deploying Apps"
sidebar:
  order: 505

---

In this reading, we explore fundamental concepts that every web developer should understand when working with large-scale systems. High-level architectural decisions have a direct impact on an application's scalability, reliability, and security. Whether you're deciding between deployment abstractions or planning how to roll out new features, understanding these topics is key to building resilient and efficient web applications. These concepts help ensure smooth development cycles, secure deployments, and effective scaling strategies, making them essential knowledge for any aspiring developer.

# Systems-Level Considerations

In large-scale web applications, it's crucial to understand different deployment and infrastructure options, as well as the isolation techniques that keep applications secure and efficient. These considerations help determine how applications are hosted, scaled, and maintained, and they directly impact the overall system performance, security, and cost-efficiency.

## A quick history lesson on isolation

A long time ago, if you wanted to deploy an app on the Internet (that wasn't just hosted on the computer under your desk) you had to rent a physical server (almost always at a monthly rate, if not yearly), and manage it completely yourself.  This was a huge burden for small companies, and even large companies had to hire a team of people to manage their servers.

The fundamental barrier to effectively providing rented compute to customers is the _isolation_ of workloads between different customers. Thankfully, CS researchers came up with a lot of interesting technologies in this space, ushering in **the cloud computing era**. In this module, we're going to learn about those different isolation technologies, how they work, what products they enable, and how you can choose among them.

One of the biggest technical advances that enabled the cloud computing era is operating system virtualization.  Virtualization allows providers to run multiple customer "virtual machines" on a single physical server.  From the perspective of the customer, you have an entire computer to yourself that is connected to the internet, its own hard drives, has its own RAM, etc. In actuality, you're running one of several different virtual machines that all exist on one physical machine. Because not everyone uses 100% of the bandwidth, memory, and compute available on their rented server at the same time, this is much more efficient, and allows cloud providers to offer virtual machines at a much lower cost than physical servers. They can also bill by the second, provision new servers in seconds, and offer a wide range of server sizes by allocating more or fewer resources (CPU, memory, disk, etc.) to each virtual machine.

### Container Isolation

Especially in the earlier days of cloud computing, provisioning new virtual machines still took a long time (many seconds up to several minutes). While the isolation provided by virtual machines is very strong, it requires running entire copies of operating systems, which is very inefficient. Also importantly, while it's very useful that each virtual machine user gets to choose exactly which operating system kernel to use, the vast majority of users don't care about this, and would be served just as well if they all used the same kernel.

:::note
An important topic that isn't super relevant to a web dev course is the kernel space / user space distinction.  The kernel is the core of the operating system that manages hardware resources and provides services to applications.  User space is where applications run.  In a virtual machine, each virtual machine has its own kernel, which is a lot of overhead.  In a container, all containers share the same kernel, which is much more efficient. There's a LOT more to understand about kernels and user space, but that is better left to CS 361, CS 461, and similar courses.
:::

**Containers** take advantage of the isolation mechanisms that Linux provides for different processes running within the same Linux (virtual or physical) machine (many times you'll hear this referred to as "cgroups" and "namespaces", but there's more to it than that). While starting a new virtual machine effectively requires "booting up" an entire operating system, starting a new container is as easy as starting a new process with a customized configuration.  This makes them ideal for running many small applications, or for running many copies of the same application. Containers are also a great way to ensure that your application runs the same way in development, testing, and production environments.

At an isolation level, containers rely on the Linux kernel to provide process isolation, resource management, and network isolation. Containers share the host OS kernel, which makes them more lightweight compared to virtual machines. However, this shared kernel also means that containers are less isolated than VMs, which can be a security concern. For instance, if there is a kernel vulnerability, all containers on the host could be affected. However, with virtual machines, there must be a vulnerability in the virtual machine management software (called a _hypervisor_) to affect multiple VMs.

:::tip[Pedantic point]
Virtual machine security can also be subverted by vulnerabilities in the hardware itself, but typically vulnerabilities in the hardware itself are (a) thankfully more rare than software vulnerabilities, and (b) will impact basically all uses of that computer regardless of the software based isolation mechanisms in place.
:::

### V8 isolates

A newer form of cloud computing isolation has become popular in recent times - running different customers' code within the same process.  This is called "serverless" computing, and is often implemented using V8 isolates.  V8 is the JavaScript engine that underlies Chrome and Node.js. V8 isolates are a way to run multiple JavaScript applications within the same process, while keeping them isolated from each other.  This is a very lightweight form of isolation, and is very efficient.  It's also very secure, because the V8 engine is designed to run untrusted code in a secure way (providing isolation in the browser based on the _Same Origin Principle_).

## Deployment abstractions

The above technologies are just that - technologies.  They are tools that can be used to build a wide variety of products.  Here are some common ways that these technologies are used:

### IaaS vs. SaaS vs. PaaS vs. CaaS vs. FaaS

- **IaaS (Infrastructure as a Service)**: Provides virtualized computing resources over the internet, allowing users to manage and scale _virtualized_ infrastructure components (e.g., servers, storage, networking). IaaS provides only the most basic building blocks for creating a networked application. It is suitable for businesses that require full control over their infrastructure and want to manage the underlying hardware.
- **CaaS (Container as a Service)**: Focus on container management, providing a managed environment for containerized applications (e.g., Docker, Kubernetes). CaaS provides developers with the flexibility to package their applications and dependencies in containers, ensuring consistency across environments and simplifying deployment.
- **PaaS (Platform as a Service)**: Provides a managed platform for developing and running applications without worrying about infrastructure. PaaS is well-suited for developers who want to focus on application logic rather than infrastructure management. Examples include Google App Engine and AWS Elastic Beanstalk.
- **FaaS (Function as a Service)**: Serverless architecture to run individual functions, focusing on scaling without managing infrastructure (e.g., AWS Lambda). FaaS is best for event-driven workloads where scaling is handled automatically, reducing the operational overhead.
- **SaaS (Software as a Service)**: Applications delivered over the internet, minimizing infrastructure management. SaaS is ideal for businesses that want to avoid the complexities of hosting and maintaining software, allowing them to focus purely on using the service.
- **Edge Computing**: A newer form of cloud computing that involves running code close to the user, often on the same server that is serving the user's request.  This can be done using V8 isolates, or by running containers on the same server that is serving the user's request.


## Large-Scale Rollouts and Deployments

- **Blue/Green Deployments**: Blue/green deployment is a strategy used to minimize downtime and risk when deploying new features or updates. In this model, two environments are maintained—**Blue** (the current production version) and **Green** (the new version). During deployment, traffic is redirected from Blue to Green, which allows for quick rollback if issues arise.

  - **Benefits**: Quick failover and reduction in downtime, making it an effective approach for mission-critical applications. Users experience minimal disruptions, as traffic can be redirected seamlessly.
  - **Drawbacks**: Requires maintaining two separate environments, at least temporarily, which can be resource-intensive and costly. Effective use of blue/green deployments necessitates thorough testing of the new environment before switching over.
  - **Best Practices**: It is important to automate the switching process and include health checks to ensure that the new environment is stable before redirecting all user traffic.

- **Canary Testing**: In canary deployments, a new version is rolled out to a small subset of users before being made available to the entire user base. This approach allows teams to monitor for issues and collect performance data without affecting the entire user base.

  - **Benefits**: Early detection of problems with minimal impact on users, allowing issues to be caught and fixed before they affect all users. Canary testing also provides valuable insights into how new changes perform under real-world conditions.
  - **Drawbacks**: Managing multiple versions of the software simultaneously can be challenging. It requires effective monitoring tools and a rollback strategy if issues are detected.
  - **Best Practices**: Implement robust monitoring and alerting systems to gather meaningful metrics from the canary environment. Ensure that a quick rollback plan is in place in case problems arise.

- **Feature Flagging**: Feature flags (or feature toggles) enable developers to activate or deactivate features in production without deploying new code. This approach is especially useful for A/B testing, gradual rollouts, and experimentation.

  - **Benefits**: Increased control over feature rollout, allowing for gradual exposure of new features to users. Feature flags provide flexibility, as features can be toggled on or off based on user feedback or detected issues.
  - **Drawbacks**: Adds complexity to code management, as developers need to ensure that the feature toggles are managed properly and removed once features are stable. Improperly managed flags can lead to technical debt and cluttered code.
  - **Best Practices**: Keep feature flags temporary and ensure they have a defined lifecycle. Clean up and remove flags once features are fully rolled out. Utilize a feature management system to keep track of active flags and their status.
- **Deployment Automation Tools**:
  - **Terraform**: Terraform is an open-source infrastructure as code (IaC) tool that allows developers to define and provision infrastructure using a declarative configuration language. It integrates well with cloud providers, making it ideal for managing infrastructure as code in scalable environments.
  - **Ansible**: Ansible is an automation tool focused on configuration management, application deployment, and orchestration. It uses playbooks to manage deployment processes, helping teams maintain consistency across different environments.
  - **Benefits of Automation**: Using these tools reduces manual errors, speeds up deployments, and ensures that infrastructure configurations are consistent across all environments.
