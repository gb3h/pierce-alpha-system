// Generated from ./src/lang/Pierce.g4 by ANTLR 4.9.0-SNAPSHOT
// @ts-nocheck
/* eslint-disable */

import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { NameContext } from "./PierceParser";
import { ParenthesisContext } from "./PierceParser";
import { UnaryOpContext } from "./PierceParser";
import { BinaryOpContext } from "./PierceParser";
import { ExprContext } from "./PierceParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PierceParser`.
 */
export interface PierceListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `name`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by the `name`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by the `parenthesis`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	enterParenthesis?: (ctx: ParenthesisContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesis`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	exitParenthesis?: (ctx: ParenthesisContext) => void;

	/**
	 * Enter a parse tree produced by the `unaryOp`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	enterUnaryOp?: (ctx: UnaryOpContext) => void;
	/**
	 * Exit a parse tree produced by the `unaryOp`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	exitUnaryOp?: (ctx: UnaryOpContext) => void;

	/**
	 * Enter a parse tree produced by the `binaryOp`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	enterBinaryOp?: (ctx: BinaryOpContext) => void;
	/**
	 * Exit a parse tree produced by the `binaryOp`
	 * labeled alternative in `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	exitBinaryOp?: (ctx: BinaryOpContext) => void;

	/**
	 * Enter a parse tree produced by `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `PierceParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;
}

