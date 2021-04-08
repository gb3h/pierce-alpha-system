/* tslint:disable:max-classes-per-file */
import React from 'react'
import { AndBox, LiteralBox, NegativeBox } from '../components/items.js'

export abstract class AstNode{
    render?: any
    static key = 0;
}

export class Id implements AstNode {
    constructor(public name: string) { 
        this.myKey = AstNode.key++ 
        this.parent = this 
    }
    myKey: number
    parent: AstNode
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
    constructor(public operator: string, public expr: AstNode | undefined) { 
        this.myKey = AstNode.key++ 
        this.parent = this 
    }
    myKey: number
    parent: AstNode
    deleteDoubleCut() {
        if (this.parent instanceof UnaryOp) {
            if (this.expr instanceof AstNode) {
                (this.parent.parent as UnaryOp).expr = this.expr
            } else {
                (this.parent.parent as UnaryOp).expr = undefined
            }
        }
    }

    toString() { return `(${this.operator} ${this.expr})` }
    render(enclosing: number) {
        return (
            <NegativeBox ident={this.myKey} enclosing={enclosing}>
                {this.expr && this.expr.render(enclosing + 1)}
            </NegativeBox>
            )
    }
}
export class BinaryOp implements AstNode {
    constructor(public operator: string, public left: AstNode | undefined, public right: AstNode | undefined) { 
        this.myKey = AstNode.key++
        this.parent = this 
    }
    myKey: number
    parent: AstNode
    toString() { return `(${this.left} ${this.operator} ${this.right})` }
    render(enclosing: number) {
        return (
            <AndBox ident={this.myKey} enclosing={enclosing}>
                {this.left && this.left.render(enclosing)}
                {this.right && this.right.render(enclosing)}
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
