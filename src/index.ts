
export type ParseErrorPlusDecoder = (code: number, message: string) => [number, string, string | undefined];

export function setupParseError(parse, decoder?: ParseErrorPlusDecoder) {
  const oldError = parse.Error

  if (oldError.prototype.__proto__ === Error.prototype) {// Already converted
    return
  }

  function ParseError(code: number, message: string){
    let stack;
    [code, message, stack] = decoder ? decoder(code, message) : [code, message, undefined];
    
    if (stack) {
      this.stack = stack
    } else {
      (Error as any).captureStackTrace(this)
    }
    
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



