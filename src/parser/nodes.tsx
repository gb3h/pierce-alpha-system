/* tslint:disable:max-classes-per-file */
import React from 'react'
import { AndBox, LiteralBox, NegativeBox, RootBox } from '../components/items.js'

export abstract class AstNode{
    abstract render(enclosing: number): any
    abstract isDirectChild(id: number): boolean
    abstract isSameType(other: AstNode | undefined): boolean
    abstract deepClone(): AstNode
    isChild(id: number) {
        return this.isDirectChild(id)
    }
    parent?: AstNode
    myKey?: number
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

    deepClone() {
        return new Id(this.name)
    }

    isSameType(other: AstNode | undefined): boolean {
        if (!other) {
            return false
        }
        return (other instanceof Id && this.name === other.name)
    }

    isDirectChild(id: number) {
        if (this.myKey === id) return true;
        return false;
    }

    isChild(id: number) {
        return this.parent.isChild(id)
    }

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

    deepClone() {
        return new UnaryOp(this.expr && this.expr.deepClone())
    }

    isSameType(other: AstNode | undefined) {
        if (!other) {
            return false
        }
        if (other instanceof UnaryOp) {
            var expr = !other.expr 
            return this.expr ? this.expr.isSameType(other.expr) : expr
        } 
        return false
    }

    isDirectChild(id: number) {
        if (this.myKey === id) return true;
        var curr = this.expr
        if (curr) {
            return curr.isDirectChild(id);
        }
        return false;
    }

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

    deepClone() {
        return new BinaryOp(this.left && this.left.deepClone(), this.right && this.right.deepClone())
    }

    isSameType(other: AstNode | undefined) {
        if (!other) {
            return false
        }
        if (other instanceof BinaryOp) {
            var left = !other.left 
            var right = !other.right
            left = this.left ? this.left.isSameType(other.left) : left
            right = this.right ? this.right.isSameType(other.right) : right 
            return left && right
        } 
        return false
    }

    isDirectChild(id: number) {
        if (this.myKey === id) return true;
        var left = this.left ? this.left.isDirectChild(id) : false
        var right = this.right ? this.right.isDirectChild(id) : false
        return left || right;
    }

    isChild(id: number) {
        return this.parent.isChild(id)
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
    deepClone() {
        return new Root(this.child && this.child.deepClone())
    }

    isSameType(other: AstNode) {
        return false
    }

    isDirectChild(id: number) {
        return this.child ? this.child.isDirectChild(id) : false
    }

    insertDoubleCut() {
        this.insert(new UnaryOp(new UnaryOp(undefined)))
    }

    insert(astTree: AstNode) {
        this.child = this.child ? new BinaryOp(astTree, this.child) : astTree
    }

    myKey: number
    parent: AstNode
    toString() { return `(Root: ${this.child})`}
    render(enclosing: number) {
        return (<RootBox ident={this.myKey}>{this.child instanceof AstNode &&this.child.render(enclosing)}</RootBox>) 
    }
}
export class Sequence extends AstNode {
    constructor(public sequence: AstNode[]) { super() }
    deepClone() {
        return new Sequence([])
    }

    isSameType(other: AstNode) {
        return false
    }
    toString() { return `(sequence: ${this.sequence})`}
    isDirectChild(id: number) {
        return false
    }
    render(enclosing: number) {
        return (
            <div></div>
            )
    }
}
