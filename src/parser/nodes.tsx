/* tslint:disable:max-classes-per-file */
import React from 'react'
import { AndBox, LiteralBox, NegativeBox } from '../components/items.js'

export abstract class AstNode{
    render?: any
    static key = 0;
}

export class Id implements AstNode {
    constructor(public name: string) { this.myKey = AstNode.key++ }
    myKey: number
    toString() { return this.name }
    render(enclosing: number) {
        return (
            <LiteralBox ident={this.myKey} enclosing={enclosing}>
                {this.name}
            </LiteralBox>
            )
    }
}

export class UnaryOp implements AstNode {
    constructor(public operator: string, public expr: AstNode) { this.myKey = AstNode.key++ }
    myKey: number
    toString() { return `(${this.operator} ${this.expr})` }
    render(enclosing: number) {
        return (
            <NegativeBox ident={this.myKey} enclosing={enclosing}>
                {this.expr.render(enclosing + 1)}
            </NegativeBox>
            )
    }
}
export class BinaryOp implements AstNode {
    constructor(public operator: string, public left: AstNode, public right: AstNode) { this.myKey = AstNode.key++}
    myKey: number
    toString() { return `(${this.left} ${this.operator} ${this.right})` }
    render(enclosing: number) {
        return (
            <AndBox ident={this.myKey} enclosing={enclosing}>
                {this.left.render(enclosing)}
                {this.right.render(enclosing)}
            </AndBox>
            )
    }
}
export class Sequence implements AstNode {
    constructor(public sequence: AstNode[]) { }
    toString() { return `(sequence: ${this.sequence})`}
    render(enclosing: number) {
        return (
            <div></div>
            )
    }
}
