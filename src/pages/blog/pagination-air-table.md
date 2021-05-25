---
title: Pagination set up in AirTables NodeJS
date: 2021-2-17T16:00:00Z
lang: en
duration: 5min
description: I found it difficult to figure out the best way to paginate through records in AirTable, this tutorial explains a possible implimentation. 
icon: simple-icons:airtable
---

_**Please know that from a performance perspective, if your records ever get too big (1,000+) it might be time to move away from AirTables, which is best for smaller projects.**_

I have a endpoint that accepts three query string parameters.

1. limit: The max number of records that should be returned, not to be confused with "maxLimit" AirTable select parameter
2. offset: Where to start the return of recrords
3. sort: The AirTable select parameter for sorting

First we want to be able to have this occur inside of an async function, so I'll break all of this logic into another function that returns a Promise:

```js
function apiOn() {
      return new Promise(resolve => {
        //Logic will go here
      })
    }
const records = await apiOn()
```

Inside of our Promise we want to set up two variables:

```js
let count = 1
let records = []
```

Next we will begin the AirTable selct function and set up for eachPage:

```js
base('Table').select({ }).eachPage((rec, fetchNextPage) => {
}, (error) => {
     if(error) resolve({ statusCode: 500, body: error.toString() })
     else resolve(records)
})
```
Inside our first parameter's function we then want to go through our records and add the records that are past our offset, and stop when we've reached our limit. If there are less records than our limit, we will end up call the `fetchNexPage()`, which will send us to our second function because there are no more records and we will just resolve with the records we have. If the `fetchNextPage() `gets called and we have more records and haven't reached our limit, we will keep going.

```js
let done = false
console.log(rec.length)
for (let i = 0; i < rec.length; i++) {
    console.log(i, count, (limit + offset))
    if (count > (limit + offset)) {
        console.log('We are done')
        done = true
        break
    }
    if (count > offset) {
        let record = rec[i]._rawJson
        record.recordNumber = count
        records.push(record)
    }
    count++
}
if (!done) {
    console.log('fetching new page')
    fetchNextPage()
} else {
    resolve(records)
}
```

The whole thing will look something like this:

```js
function apiOn() {
      return new Promise(resolve => {
        let count = 1
        let parameters = sort ? { sort } : { }
        if (filter) parameters.filterByFormula = filter
        let records = []
        base(subject).select(parameters).eachPage((rec, fetchNextPage) => {
          let done = false
          for (let i = 0; i < rec.length; i++) {
            console.log(i, count, (limit + offset))
            if (count > (limit + offset)) {
              console.log('We are done')
              done = true
              break
            }
            if (count > offset) {
              let record = rec[i]._rawJson
              record.recordNumber = count
              records.push(record)
            }
            count++
          }

          if (!done) {
            console.log('fetching new page')
            fetchNextPage()
          } else {
            resolve(records)
          }
        }, (error) => {
          if (error) resolve({ statusCode: 500, body: error.toString() })
          else resolve(records)
        })
      })
    }

    const records = await apiOn()

```