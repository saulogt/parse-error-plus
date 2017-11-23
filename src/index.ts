
export function setupParseError(parse) {
  const oldError = parse.Error

  if (oldError.prototype.__proto__ === Error.prototype) {// Already converted
    return
  }

  function ParseError(code: number, message: string){
    (Error as any).captureStackTrace(this)
    oldError.call(this, code, message)
    this.code = code;
  }

  for (let key in oldError) {
    ParseError[key] = oldError[key]
  }

  oldError.prototype.__proto__ = Error.prototype
  ParseError.prototype = oldError.prototype

  parse.Error = ParseError
  
}

declare global {
  export namespace Parse {
    interface Error {
      stack?: string;
    }
  }
}



