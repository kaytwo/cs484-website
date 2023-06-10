---
title: homework 4 - hacking a juice shop
description: Learn web app security by exploring the juice shop
due: 2022-11-23T23:59:00-5:00
github_link: https://classroom.github.com/a/i3IfdWLk
release: 2022-11-08
---

import Link from '@docusaurus/Link';
import site from '@site/course.json'

# Hacking a juice shop

The final non-project assignment of class will be hacking the UIC [Juice shop](https://juice-shop.cs.uic.edu/). This is an intentionally vulnerable web application built with Angular, Express, and Sqlite.

When starting to use the juice shop, it will ask you for your team name. This is an individual assignment. Use **your netID** (not your UIN: `ckanich` is my netID) as your team name. Feel free to get started as soon as you find this writeup online, but we will go over the basics in class on Wednesday.

Once you're in the Juice Shop, there are hints about what you should do first. Eventually, you will find a main map of how the entire intentionally vulnerable application "game" works. The main task will be to find and exploit several different flavors of vulnerability.

The juice shop keeps a [high score board](https://juice-shop.cs.uic.edu/balancer/score-board). You receive nothing but bragging rights for getting a high score.

## Find it fix it

In addition to exploiting vulnerabilities, a subset of all of the tasks have a "find it + fix it" task, where you first select which lines are the problem, and then choose from a set of multiple choice options for how to best fix that problem. You get as many attempts as you want for these, and it will explain what the right answer is for you.

These do not show up in the score board, but will be computed as part of your score on the homework (see below).

## Academic integrity

There are two forms of documentation available for the juice shop - the hints that are directly linked from the score board, and other materials available online. Using the hints available through the juice shop is totally acceptable, however to get the most out of the experience, give it a shot without reading through all of the hints right away.

There are also various writeups and videos online that walk you through the entire task (including a solutions appendix on the official documentation website). Do NOT use those. Juice Shop has several anti-cheat mechanisms built into it that will make it easy to detect people who aren't attempting the assignment in good faith. It's all open source so you're free to inspect the anti-cheat mechanisms.

This is an individual assignment, but helping each other is encouraged - my two rules for helping are:

1. Any help that you expect to take more than 30 seconds must be posted as a public question on Piazza.
2. Any help on Piazza should not COMPLETELY give the answer away, but it is fine to come closer than the hints provided in the main writeup on [pwning.owasp-juice.shop](https://pwning.owasp-juice.shop/).

As I mentioned in the syllabus, **significant assistance for other students** can be converted into extra credit on your final grade. There is no cutoff for this (please don't ask what it is), but people who make a good faith effort will generally be rewarded.

If we detect evidence of cheating, we reserve the right to ask you to perform the tasks that you were able to successfully perform in your submission. This assignment leans heavily on the honor system for getting the most out of it: students who are found through the DoS process to have broken the academic integrity policy on this assignment will fail the course. If you ONLY use Piazza for Q&A and ONLY use the built-in hint system, you will be fine.

## Submitting your score

To submit your score, you will need to download your progress snapshot:

![screenshot of export button](/img/export-status.png "Export status button")

Then upload this file to gradescope.

Using someone else's (partial or full) progress snapshot is a violation of the academic integrity policy. They are not tied to your identity, so the juice shop won't prevent you from uploading someone else's progress file, but the monitoring system can detect when you upload a progress snapshot that you did not achieve yourself.

## Points

There are far more tasks in this juice shop than we would expect you to get done - there are 100 vulnerabilities, and 26 "find it fix it" tasks. To get 100%, you need to finish 11 "find it fix it" tasks and 30 of the main puzzles. "find it fix it" tasks are worth twice as much as normal puzzles. Beyond that, ever additional "find it fix it" is a bonus 2%, and every additional puzzle is a bonus 1%, up to a total bonus of 100% (which is equivalent to wiping out a whole missed assignment).

Your full score can be computed as:

| Task                            | Points      |
| ------------------------------- | ----------- |
| first 11 "find it fix it" tasks | ~3.85% each |
| first 30 puzzles                | ~1.92% each |
| next 15 "find it fix it" tasks  | 2% each     |
| next 70 puzzles                 | 1% each     |

## Due date

This Homework is due on Wednesday 23rd November, at 11:59 PM. This deadline is FIRM. This assignment is easier than all of the rest, so please put some time in and finish it before the deadline, so you have more time to work on your final project.
