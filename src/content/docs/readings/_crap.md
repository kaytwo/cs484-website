---
title: Unused stuff
---

<!-- there is a zero width space on the first line of the below code block to get the annotation to show up and not get eaten by the markdown proccessor. -->

```text title="Client Request" {"1. request line":1-2} {"2. headers":3-5} {"3. empty header signifying end of headers":6-7} {"4. body - in this case, empty":8-9}
​
GET /index.html HTTP/1.1\r\n

Host: example.com\r\n
Connection: close\r\n

\r\n
​
​
```
