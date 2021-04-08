// Generated from ./src/lang/Pierce.g4 by ANTLR 4.9.0-SNAPSHOT
// @ts-nocheck
/* eslint-disable */

import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { NameContext } from "./PierceParser";
import { ParenthesisContext } from "./PierceParser";
import { UnaryOpContext } from "./PierceParser";
import { BinaryOpContext } from "./PierceParser";
import { ExprContext } from "./PierceParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PierceParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface PierceVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `name`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenthesis`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesis?: (ctx: ParenthesisContext) => Result;

	/**
	 * Visit a parse tree produced by the `unaryOp`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryOp?: (ctx: UnaryOpContext) => Result;

	/**
	 * Visit a parse tree produced by the `binaryOp`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryOp?: (ctx: BinaryOpContext) => Result;

	/**
	 * Visit a parse tree produced by `PierceParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
}

