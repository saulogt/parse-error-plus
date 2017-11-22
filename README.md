This module adds the stack trace to Parse.Error objects and makes it an instance of native Error as well.
Tested on NodeJs

## Install
npm i parse-error-plus --save

## Usage
### ES6 or Typescript

```ts
import { setupParseError } from 'parse-error-plus'
setupParseError(Parse)
```

### Old way

```js
require('parse-error-plus').setupParseError(Parse)
```

`Parse` must be defined before calling it.
