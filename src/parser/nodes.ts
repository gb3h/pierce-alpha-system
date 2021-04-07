/* tslint:disable:max-classes-per-file */
export interface AstNode {
}
export class Id implements AstNode {
    constructor(public name: string) { }
    toString() { return this.name }
}

export class UnaryOp implements AstNode {
    constructor(public operator: string, public expr: AstNode) { }
    toString() { return `(${this.operator} ${this.expr})` }
}
export class BinaryOp implements AstNode {
    constructor(public operator: string, public left: AstNode, public right: AstNode) { }
    toString() { return `(${this.left} ${this.operator} ${this.right})` }
}
export class Sequence implements AstNode {
    constructor(public sequence: AstNode[]) { }
    toString() { return `(sequence: ${this.sequence})`}
}
