---
title: My new space
date: 2021-05-15T16:00:00Z
lang: en
duration: 5min
description: Created this fun static site with Vite, Vue, and some other fun stuff. Hope you enjoy!
icon: carbon-rocket
---
Hey! My goal in creating my personal website was to provide a great, real world excersise for me to learn about some awesome technologies, and to provide a canvas for me to showcase a little about me and my thoughts.

## First, the results
![Lighthouse results for my site](/lighthouse.png "Lighthouse results for my site")

I really took care to make sure that I was creating something that left no stone unturned. I wanted a fast site, that did what it set out to do, well. _**There is always room for improvement, let me know if there is something off!**_.

I knew that something really important would be making sure I had a personal site that was extreamly easy and enjoyable to update, because if it wasn't; it wouldn't be updated. The biggest helpers in that mission were the following:

## Vue 3 & Vite 2
This is my first real attempt at using [Vue](https://vuejs.org). I'm using Vue 3 and a lot of the Composition API, which makes things extreamly simple. The cooler thing I am using is [Vite](https://vitejs.dev) which is absolutly awesome. It has truly spoiled me. It is really easy to use and super fast rendering, and extreamly customizable. So I'm using [markdown for static pages](https://github.com/antfu/vite-plugin-md), and generating all HTML server-side at build time with [vite-ssg](https://github.com/antfu/vite-ssg).

## Windi CSS
I used [Windi CSS](https://github.com/windicss/windicss) here for the first time. I love utility based CSS and have been pretty enomoured with TailwindCSS, but I was really trying to see if I could speed up my development process ans much as possible and WindiCSS has done this. Faster build (_even compared to TailwindCSS JIT_), faster rerender. 