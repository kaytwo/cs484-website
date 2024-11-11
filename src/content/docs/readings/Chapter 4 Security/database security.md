---
title: "Database attacks and defenses"
sidebar:
  order: 440

---

# This reading is work in progress! Stay tuned for more updates.

## NoSQL vulnerabilities

In theory, NoSQL systems like Firebase and Supabase _can_ be just as secure than traditional SQL databases, as they use specialized security mechanisms like custom access control rules (Firebase) or Postgres's "row-level security" (Supabase) to protect data. However, these systems are also more complex and less mature than traditional SQL databases, which can make them more vulnerable to attacks.

It's also easy to misconfigure these systems, leading to potential security vulnerabilities:

- **Improper Access Controls**: Misconfigured access rules can allow unauthorized users to read or write data they shouldn't have access to.
- **Exposed API Keys**: If API keys are not properly secured, they can be exposed in client-side code, allowing attackers to gain access to your database.
- **Insufficient Data Validation**: Without proper validation, malicious users can inject harmful data or execute unauthorized operations on your database.

In the past couple years, there have been two high-profile hacks perpetrated on Firebase (but could have just as easily been against Supabase or other NoSQL databases):

* [gaining access to anyones browser without them even visiting a website](https://kibty.town/blog/arc/)
* [How I pwned half of America’s fast food chains, simultaneously.](https://mrbruh.com/chattr/)

These stories do a great job of explaining how Firebase gets used in production by real companies, as well as how they end up misconfiguring it, and the security implications of those misconfigurations.