/* tslint:disable:max-classes-per-file */
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { RuleNode } from 'antlr4ts/tree/RuleNode'
import { ErrorNode } from 'antlr4ts/tree/ErrorNode'
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { AstNode, BinaryOp, UnaryOp, Id, Sequence} from './nodes'
import { ParseError } from './errors'
import { BinaryOpContext, ExprContext, NameContext, ParenthesisContext, PierceParser, UnaryOpContext } from '../lang/PierceParser'
import { PierceVisitor } from '../lang/PierceVisitor'
import { PierceLexer } from '../lang/PierceLexer'

class ExpressionGenerator extends AbstractParseTreeVisitor<AstNode> implements PierceVisitor<AstNode> {
  visitName(ctx: NameContext): Id {
    return new Id(ctx.LOWERCASE_IDENT().text) 
  }
  visitParenthesis(ctx: ParenthesisContext): AstNode {
    return this.visit(ctx._exp)
  }
  visitUnaryOp(ctx: UnaryOpContext): AstNode {
    return new UnaryOp(this.visit(ctx._exp))
  }
  visitBinaryOp(ctx: BinaryOpContext): AstNode {
    return new BinaryOp(this.visit(ctx._left), this.visit(ctx._right))
  }
  defaultResult(): AstNode {
    return new Id("Default") 
  }
  visitExpr?: ((ctx: ExprContext) => AstNode) | undefined
  visit(tree: ParseTree): AstNode {
    return tree.accept(this)
  }
  visitChildren(node: RuleNode): AstNode {
    const expressions: AstNode[] = []
    for (let i = 0; i < node.childCount; i++) {
      expressions.push(node.getChild(i).accept(this))
    }
    return new Sequence(expressions)
  }
  visitErrorNode(node: ErrorNode): AstNode {
    throw new ParseError(node.toString() + " is not a valid expression")
  }
}

function convertPierce(expression: ExprContext): AstNode {
  const generator = new ExpressionGenerator()
  return expression.accept(generator)
}

export function parse(input: string) {
  let program: AstNode | undefined
  
    const inputStream = new ANTLRInputStream(input)
    const lexer = new PierceLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new PierceParser(tokenStream)
    parser.buildParseTree = true
    try {
      const tree = parser.expr()
      program = convertPierce(tree)
      return program
    } catch (error) {
        throw error
    }
}
