/* tslint:disable:max-classes-per-file */
import React from 'react'
import { AndBox, LiteralBox, NegativeBox } from '../components/items.js'

export abstract class AstNode{
    abstract render(enclosing: number): any
    parent?: AstNode
    static key = 0;
    deleteSelf() {
        if (this.parent instanceof Root) {
            this.parent.child = undefined
            return
        }
        if (this.parent instanceof UnaryOp) {
            this.parent.expr = undefined
            return
        }
        if (this.parent instanceof BinaryOp) {
            this.parent.left === this ? this.parent.left = undefined : this.parent.right = undefined
            return
        }
    }
}

export class Id extends AstNode {
    constructor(public name: string) { 
        super()
        this.myKey = AstNode.key++ 
        this.parent = this 
    }
    myKey: number
    parent: AstNode

    insert(astTree: AstNode) {
        ((this.parent instanceof BinaryOp) || (this.parent instanceof UnaryOp)) && this.parent.insert(astTree)
    }

    insertDoubleCut() {
        if (this.parent instanceof Root) {
            this.parent.child = new UnaryOp(new UnaryOp(this)) 
            return
        }
        if (this.parent instanceof UnaryOp) {
            this.parent.expr = new UnaryOp(new UnaryOp(this)) 
            return
        }
        
        if (this.parent instanceof BinaryOp) {
            this.parent.left === this 
                ? this.parent.left = new UnaryOp(new UnaryOp(this)) 
                : this.parent.right = new UnaryOp(new UnaryOp(this))
            return
        }
    }

    toString() { return this.name }
    render(enclosing: number) {
        return (
            <LiteralBox ident={this.myKey} enclosing={enclosing}>
                {this.name}
            </LiteralBox>
            )
    }
}

export class UnaryOp extends AstNode {
    constructor(public expr: AstNode | undefined) { 
        super()
        this.myKey = AstNode.key++ 
        this.parent = this
    }
    myKey: number
    parent: AstNode
    deleteDoubleCut() {
        if (this.parent instanceof UnaryOp) {
            if (this.parent.parent instanceof UnaryOp) {
                (this.parent.parent as UnaryOp).expr = this.expr
            } else if (this.parent.parent instanceof BinaryOp) {
                this.parent.parent.left === this.parent 
                    ? this.parent.parent.left = this.expr
                    : this.parent.parent.right = this.expr
            } else if (this.parent.parent instanceof Root) {
                this.parent.parent.child = this.expr
            }
        }
    }

    insertDoubleCut() {
        if (this.parent instanceof Root) {
            this.parent.child = new UnaryOp(new UnaryOp(this)) 
            return
        }
        if (this.parent instanceof UnaryOp) {
            this.parent.expr = new UnaryOp(new UnaryOp(this)) 
            return
        }
        
        if (this.parent instanceof BinaryOp) {
            this.parent.left === this 
                ? this.parent.left = new UnaryOp(new UnaryOp(this)) 
                : this.parent.right = new UnaryOp(new UnaryOp(this))
            return
        }
    }

    insert(astTree: AstNode) {
        this.expr = new BinaryOp(this.expr, astTree)
    }

    toString() { return `(~ ${this.expr})` }
    render(enclosing: number) {
        return (
            <NegativeBox ident={this.myKey} enclosing={enclosing}>
                {this.expr && this.expr.render(enclosing + 1)}
            </NegativeBox>
            )
    }
}
export class BinaryOp extends AstNode {
    constructor(public left: AstNode | undefined, public right: AstNode | undefined) { 
        super()
        this.myKey = AstNode.key++
        this.parent = this 
    }
    myKey: number
    parent: AstNode

    insertDoubleCut() {
        if (this.parent instanceof Root) {
            this.parent.child = new UnaryOp(new UnaryOp(this)) 
            return
        }
        if (this.parent instanceof UnaryOp) {
            this.parent.expr = new UnaryOp(new UnaryOp(this)) 
            return
        }
        
        if (this.parent instanceof BinaryOp) {
            this.parent.left === this 
                ? this.parent.left = new UnaryOp(new UnaryOp(this)) 
                : this.parent.right = new UnaryOp(new UnaryOp(this))
            return
        }
    }

    insert(astTree: AstNode) {
        this.left = new BinaryOp(this.left, this.right)
        this.right = astTree
    }

    toString() { return `(${this.left} /\\ ${this.right})` }
    render(enclosing: number) {
        return (
            <AndBox ident={this.myKey} enclosing={enclosing}>
                {this.left && this.left.render(enclosing)}
                {this.right && this.right.render(enclosing)}
            </AndBox>
            )
    }
}

export class Root extends AstNode {
    constructor(public child: AstNode | undefined) { 
        super() 
        this.parent = this
        this.myKey = AstNode.key++
    }
    myKey: number
    parent: AstNode
    toString() { return `(Root: ${this.child})`}
    render(enclosing: number) {
        return (this.child instanceof AstNode &&this.child.render(enclosing)) 
    }
}
export class Sequence extends AstNode {
    constructor(public sequence: AstNode[]) { super() }
    toString() { return `(sequence: ${this.sequence})`}
    render(enclosing: number) {
        return (
            <div></div>
            )
    }
}
