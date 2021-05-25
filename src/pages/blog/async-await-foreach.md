---
title: Async / await in js foreach loop
date: 2020-12-17T16:00:00Z
lang: en
duration: 2min
description: A guide to running Array.forEach, but with await between each iteration of a callback function.
icon: bx-bx-shocked
---

Hey! I recently was working on a project that had me looping through an array of table names, and wanted to see if each table existed in a MySQL database. Create one if it didn’t exist, then log something.

For this article I’m going to use a different promised based function, instead of the MySQL query, for simplicity sake.

We will use this function in our loop:

```js
const waitFor = (ms) => new Promise(res => setTimeout(res, ms));
```

So the first thing I tried was:

```js
[10, 2, 3].forEach(async (num) => {
  await waitFor(num);
  console.log(num);
});
console.log('Done');
```

Seems to make sense, but in reality the output looks like this:

```zsh
$ Done
$ 2
$ 3
$ 10
```
If we take a look at the polyfill for forEach() we get a better idea of what is happening: [Array.prototype.forEach() — JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#polyfill)

Basically it uses a while loop that calls the callback for each entry, but it doesn’t wait for the previous entry to finish.

So we need to create our own asyncForEach():

```js
Array.prototype.asyncForEach = async function (callback) {
  for (let i = 0; i < this.length; i++) {
    await callback(this[i]);
  }
}
```

With this new tool we try again:

```js
[10, 2, 3].asyncForEach(async (num) => {
  await waitFor(num);
  console.log(num);
});
console.log('Done');

/** Output */
$ Done
$ 10
$ 2
$ 3
```
Closer! The asyncForEach() is working great! waiting the 10ms for iteration 0 to finish, before going on to iteration 1.

To get it all to work as expected we can just wrap our execution into an async function:

```js
const go = async () => {
  await [10, 2, 3].asyncForEach(async (num) => {
    await waitFor(num);
    console.log(num);
  });
  console.log('Done');
}
go()

/** Output */
$ 10
$ 2
$ 3
$ Done
```

And it works! 👏👏👏