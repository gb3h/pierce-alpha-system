/* tslint:disable:max-classes-per-file */
enum ErrorType {
    PARSE,
}

export class AstError {
  constructor(public explanation: string) {}
  public explain() {
    return this.explanation
  }
  toString() {
    return this.explain()
  }
}

export class ParseError extends AstError {
  public errorType = ErrorType.PARSE
  toString() {
    return "Parse Error: " + super.toString()
  }
}
