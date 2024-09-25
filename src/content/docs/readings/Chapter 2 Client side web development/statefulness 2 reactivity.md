---
title: "Adding state to web user interfaces: reactivity"
sidebar:
  order: 220
---

In the previous section, we discussed how **state** in web application
communication is enabled via cookies. Cookies allow the client and server
to maintain state across multiple requests. There is another  very different
type of state that is important in web applications: **statefulness** in the
client-side user interface. This type of state is used to maintain the
application's state across different user interactions. As web applications
have become more complex, the need for statefulness in the client-side user
interface has increased.

# Motivation for statefulness in the client-side user interface

Imagine you've built a full fledged web shop, complete with item categories,
user accounts, search, and a shopping cart. Everything from collapsible item
descriptions to cart quantity indicators to search filters all need to maintain
state across user interactions. Doing all of these things in vanilla JavaScript
is totally possible. As the complexity of the application
increases, it becomes more and more difficult---from a code complexity level, to
a software engineering level, and a performance level---to maintain and improve
the application.

## An example of statefulness without library help

Imagine you’re building a shopping cart feature where you update both the item
count and total price. Using vanilla JavaScript, you might update the DOM
directly with something like:

```html
<div>
  <h1 id="count">Items in Cart: 0</h1>
  <h2 id="total">Total Price: $0</h2>
  <button id="incrementButton">Add Item</button>
</div>

<script>
  let count = 0;
  let total = 0;

  document.getElementById("incrementButton").addEventListener("click", () => {
  count += 1;
  total += 5;
  document.getElementById('count').innerText = `Items in Cart: ${count}`;
  document.getElementById('total').innerText = `Total Price: $${total}`;
  });
</script>
```

### "Source of truth" issues

In this example, the `count` and `total` variables are the **source of truth**
for the shopping cart state. However, the DOM elements `count` and `total` are
**derived state** that reflect the current state of the shopping cart. When you
update the `count` and `total` variables, you also need to update the DOM to
reflect those changes. If you forget to update the DOM after changing
`count` and `total`, the UI will display incorrect information, leading to
inconsistent and confusing user experiences.

### Coupling UI to business logic

In this example, the business logic (updating `count` and `total`) is tightly
coupled with the DOM manipulation (updating `count` and `total` elements). This
coupling makes the code harder to maintain and test, as you need to keep track
of both the business logic and the UI updates. It also makes it harder to
rearrange or refactor the code, as changes to the business logic might require
modifying the UI code, and vice versa.

### Reusability

Somewhat similar to the coupling issue, the code is not easily reusable or
abstractable. Ideally, we would want the entire "widget" to be reusable anywhere
in our application, perhaps by simply instantiating an individual object or by
calling an individual function. Both the overall design and the specific
callback function above are not easily reusable.


### Performance issues

In this case, each time you call `innerText`, the browser:

1. **Pauses JavaScript Execution**: When you update `innerText`, the browser
   pauses JavaScript execution to handle the DOM manipulation.
   
2. **Triggers Layout Recalculation (Reflow)**: Changing the text content of an
   element can trigger reflow, as the browser needs to recalculate the layout to
   adjust for the new content. Even small updates like modifying text can cause
   a cascade of recalculations in the layout of other elements.
   
3. **Repaints the UI**: After reflow, the browser repaints the updated part of
   the page to reflect the new content. If you're changing multiple elements in
   sequence (like `count` and `total`), each update triggers a repaint.

4. **Repeats the Process**: After updating the `count`, the browser resumes
   JavaScript execution, only to pause again when it hits `innerText` for
   `total`. This triggers another reflow and repaint, leading to redundant,
   sequential updates.

In a complex UI where state updates happen frequently, or looping over and
individually updating several DOM elements, this repeated cycle of DOM updates,
reflows, and repaints can cause significant performance problems, leading to
**jank** (visual lag or stuttering) and sluggish user interactions.


# Enter React

Here's a version with the same functionality but written using React:

```jsx
import React, { useState } from 'react';

// Pure presentational component (no internal state)
function ShoppingCart({ count, total, onIncrement }) {
  return (
    <div>
      <h1>Items in Cart: {count}</h1>
      <h2>Total Price: ${total}</h2>
      <button onClick={onIncrement}>Add Item</button>
    </div>
  );
}

// Container component that maintains the state
function App() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    setTotal(prevTotal => prevTotal + 5);
  };

  return (
    <div>
      <ShoppingCart count={count} total={total} onIncrement={handleIncrement} />
    </div>
  );
}

export default App;
```

This example separates the concerns of state management and UI presentation.

### **Manual DOM Updates**:
   - **Old Problem**: In vanilla JS, you manually update specific DOM elements
     (`#count`, `#total`).
   - **React’s Solution**: The `ShoppingCart` component no longer knows anything
     about how the DOM is updated. It just receives `count` and `total` as
     _props_, which are read only input variables. It then creates an abstract
     description of what should be rendered into the UI, and hands it off to
     React to render. React handles the DOM updates behind the scenes, so you
     don’t have to manually manipulate the DOM. The UI stays up-to-date based on
     the passed props.

### **Tight Coupling**:
   - **Old Problem**: In vanilla JS, the logic for updating the UI and the
     business logic (e.g., how `count` and `total` are calculated) are coupled.
     The UI directly interacts with how these values are updated.
   - **React’s Solution**: The UI (`ShoppingCart`) is completely decoupled from
     the business logic. It just receives the current state (`count`, `total`)
     and renders it. The business logic for updating the state (inside the
     `handleIncrement` function) lives in the `App` component, which passes down
     the new state and a function to modify the state (`onIncrement`) as props.
     This keeps business logic and UI logic separate.

### **Inconsistent State**:
   - **Old Problem**: In vanilla JS, managing consistent state across different
     parts of the UI is hard, as you have to ensure that all parts of the DOM
     are updated when state changes.
   - **React’s Solution**: The state (`count` and `total`) is managed in one
     place (`App`), and only the latest values are passed down to the
     `ShoppingCart` component. React uses special variables that can persist
     across invocations of functional components to encapsulate only those
     specific variables that need to be tracked as application state. React
     automatically re-renders the component when the state changes, ensuring
     that the UI always stays in sync with the latest state.

### **Reusability**:
   - **Old Problem**: In vanilla JS, the logic for updating the DOM is tightly
     coupled to specific DOM elements, making it hard to reuse code.
   - **React’s Solution**: The `ShoppingCart` component is a stateless, reusable
     presentational component. It doesn’t care how the state is managed—it just
     receives `count`, `total`, and `onIncrement` as props. This makes it
     reusable across different parts of the app or even in other projects, as
     long as it receives the required props.

The important things to identify in this example are that:

- **State is external**: The state (`count` and `total`) is maintained in the
  `App` component, while the `ShoppingCart` component only displays that state
  and triggers events (`onIncrement`) to update it. Other components, like a
  badge on the cart icon, could  display the same state without needing to
  manually synchronize it.
- **UI is decoupled**: The `ShoppingCart` component is purely a UI component and
  has no business logic or internal state. It is understandable, reusable, and
  testable.
- **State and events are passed via props**: The UI gets its state via props and
  sends events (`onIncrement`) to the parent to request state changes, keeping a
  clean separation of concerns. If the cart state needs to be persisted to the
  back end (which it should!), the `App` component would handle that logic in
  one place.

### **(Re)rendering performance**

React minimizes the performance issues we saw above with the vanilla JS example
by using the **Virtual DOM** and **batched updates**:

- Instead of updating the DOM immediately, React first updates its Virtual DOM
  (a lightweight in-memory representation of the actual DOM). After all state
  changes are collected (e.g., `setCount` and `setTotal`), React calculates the
  minimal set of changes needed to the DOM that will be shown to the user.
  
- React then **batches** those changes, updating the real DOM in one operation.
  In the shopping cart example, React would batch the updates to both `count`
  and `total`, perform a single reflow and repaint, and avoid redundant updates.

This means React efficiently handles updates by reducing the number of costly
reflows and repaints, improving performance, and ensuring that the UI stays
responsive, even as your app scales in complexity. React’s Virtual DOM and
batching mechanism allow developers to focus on updating state declaratively,
while React optimizes how those changes are reflected in the real DOM.