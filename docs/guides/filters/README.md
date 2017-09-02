# Filters

BlueRain uses a system of filter hooks for many of its operations.

## Adding Filter Functions

For example, here's how you would add a filter to `posts.edit` to give posts an `editedAt` date every time they are modified:

```js
import BR from '@blueeast/bluerain-os';

function setEditedAt (post, user) {
  post.editedAt = new Date();
  return post;
}
BR.Filters('posts.edit', setEditedAt);
``` 

## Removing Filter Functions

If the filter function is named (i.e. declared using the `function foo () {}` syntax), you can also remove it from the filter using:

```js
import BR from '@blueeast/bluerain-os';

BR.Filters.remove('posts.edit', "setEditedAt");
```

## Running Filter Hooks

Filters are run using the `BR.Filters.run` function:

```js
modifier = BR.Filters.run(`movies.edit`, modifier, document, currentUser)
```

In each case, the **first** argument is the name of the filter hook, the **second** argument is the one iterated on by each filter function on the hook, while any remaining arguments are just passed along from one iteration to the next.

Note that each filter function should return the main argument to pass it on to the next function.
