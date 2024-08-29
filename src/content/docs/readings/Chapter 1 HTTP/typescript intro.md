---
title: TypeScript - JavaScript but better
sidebar:
  order: 150
---

TypeScript is a superset of JavaScript that adds optional static typing and other advanced features to the language. It compiles down to plain JavaScript, making it compatible with existing JavaScript codebases while providing additional benefits for developers.

# Using TypeScript in your projects

TypeScript is _not_ a separate language - it's a superset of JavaScript that adds optional static typing and other advanced features. On the client side, you'll need a transpiler to translate the TypeScript code into JavaScript that browsers can understand. On the server side, you typically still need to transpile the code, but there are tools like `tsx` that make this fast and easy, and newer JS runtimes like bun and deno support TypeScript natively.

# What makes TypeScript different

Here are some key features of TypeScript that set it apart from JavaScript:

### Static Typing
   TypeScript adds static typing to JavaScript, allowing you to define variable types explicitly. This helps catch type-related errors at compile-time, improving code reliability. TypeScript types are optional but provide better tooling support and code readability.

   **Example:**
   ```typescript
   let x: number = 5;
   x = "Hello"; // Error: Type 'string' is not assignable to type 'number'.
   ```

### Interfaces and Type Aliases
   TypeScript allows the definition of interfaces and type aliases to describe the structure of objects and functions. These constructs help in defining clear contracts for data shapes, making it easier to work with complex data structures.

   **Example:**
   ```typescript
   interface User {
       name: string;
       age: number;
   }

   let user: User = {
       name: "Alice",
       age: 25
   };
   ```

### Classes and Inheritance
   TypeScript builds on JavaScript's prototype-based inheritance with a more familiar class-based syntax. It includes access modifiers (e.g., `public`, `private`, `protected`), which allow better control over the visibility of class members.

   **Example:**
   ```typescript
   class Person {
       private name: string;

       constructor(name: string) {
           this.name = name;
       }

       greet() {
           console.log(`Hello, ${this.name}`);
       }
   }

   let john = new Person("John");
   john.greet(); // Output: "Hello, John"
   ```

### Generics
   TypeScript's generics allow you to create reusable components that work with any data type. Generics provide a way to create functions, classes, or interfaces that can operate on a variety of types while still being type-safe.

   **Example:**
   ```typescript
   function identity<T>(arg: T): T {
       return arg;
   }

   let num = identity<number>(5); // num: number
   let str = identity<string>("Hello"); // str: string
   ```

### Union and Intersection Types
   TypeScript supports union and intersection types, which allow a variable to take on multiple types (union) or combine multiple types (intersection). These features make it easier to handle different types of data in a type-safe manner.

   **Example:**
   ```typescript
   function printId(id: number | string) {
       console.log(`ID: ${id}`);
   }

   printId(123); // Output: "ID: 123"
   printId("abc"); // Output: "ID: abc"
   ```

### Type Inference
   While TypeScript allows explicit type annotations, it also has powerful type inference capabilities. This means the compiler can often determine the type of a variable based on the value assigned to it, reducing the need for explicit type declarations.

   **Example:**
   ```typescript
   let x = 10; // TypeScript infers 'x' as a number
   x = "Hello"; // Error: Type 'string' is not assignable to type 'number'.
   ```

### Enums
   TypeScript's `enum` type provides a way to define a set of named constants. Enums make it easier to work with sets of related values and improve the readability of the code.

   **Example:**
   ```typescript
   enum Direction {
       Up,
       Down,
       Left,
       Right
   }

   let move: Direction = Direction.Up;
   ```

### Type Assertions
   TypeScript allows type assertions to override its inferred types when you know more about the structure of your data than the type system can infer. This is useful in scenarios where you're certain of a type but TypeScript can't determine it automatically.

   **Example:**
   ```typescript
   let someValue: unknown = "Hello, world!";
   let strLength: number = (someValue as string).length;
   ```

### Modules and Namespaces
   TypeScript supports ES6 modules, allowing code to be organized into separate files with clearly defined imports and exports. Namespaces can also be used to group related code together under a common name, preventing global scope pollution.

   **Example:**
   ```typescript
   // file: mathUtils.ts
   export function add(a: number, b: number): number {
       return a + b;
   }

   // file: main.ts
   import { add } from './mathUtils';
   console.log(add(5, 3)); // Output: 8
   ```

### Advanced Types
   TypeScript provides advanced type features like `Mapped Types`, `Conditional Types`, and `Utility Types`. These features allow for more sophisticated type manipulations, making TypeScript a powerful tool for complex applications.

   **Example:**
   ```typescript
   type Readonly<T> = {
       readonly [P in keyof T]: T[P];
   };

   interface User {
       name: string;
       age: number;
   }

   let user: Readonly<User> = {
       name: "Alice",
       age: 25
   };

   // user.age = 30; // Error: Cannot assign to 'age' because it is a read-only property.
   ```
