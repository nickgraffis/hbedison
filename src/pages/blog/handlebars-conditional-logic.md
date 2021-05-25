---
title: Using conditional logic in handlebars
date: 2020-12-23T16:00:00Z
lang: en
duration: 2min
description: We have {#if} and {#unless}, but how can we expand on this for easier and more advanced logic inside our handlebars templates?
icon: mdi-mustache
---
> ⚠️ **Heads Up**: I'm using a single  mustache syntax "{ }" in the article, to avoid conflicts with Vue rendering.
## Comparisons
The handlebars `{#if}` and `{#unless}` helpers only accept one argument that must result in truthy or falsey values.

So…

```js
{#if user.id === 1} //This will not work, and will throw an error
```

First we can think about using handlebars **subexpressions**:

```js
{#if (user.id === 1)} //This will still not work
```

What we need is something to help us use comparisons inside our handlebars, so lets make a helper!

```js
const hbs = Handlebars.create({ 
  compare: function (variableOne, comparator, variableTwo) {
    if (eval(one + comparator + two)) {
      return true
    } else {
      return false
    }
  },
});
```

Here we create a helper function inside handle bars named “compare”. This accepts three arguments; a variable, a comparator, and another variable.
It then takes these strings and `eval()s` them and returns the result.
So now lets try…

```js
{#if (compare user.id '===' 1)}
  <p>You are the first user!</p>
{/if}
```

And it works! 👏
You can use the same logic with `{#unless}`

## Take it up a notch: and/or

We can create and/or logic thanks to handlebars ability to accept nested helper functions. Lets add these two helpers:

```js
and: function() {
      return Array.prototype.slice.call(arguments, 0, arguments.length - 1).every(Boolean);
    },
or: function() {
      return Array.prototype.slice.call(arguments, 0, arguments.length - 1).some(Boolean);
    }
```

The first will call() the Array.prototype.slice() method with the arguments provided as this array. Then start at index 0 and go to the end. Finally we will use Array.prototype.every() to return the truthy or falsey value of the array.

The second will do the same, but with the Array.prototype.some() method, will return true if some item in the array returned truthy.

Implement this like so in handlebars:

```js
{#if ( and (q user.id '===' 1) (q user.publications.length '>' 0) ) }
  You are the first PUBLISHED user!
{/if}
```