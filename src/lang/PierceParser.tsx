// Generated from ./src/lang/Pierce.g4 by ANTLR 4.9.0-SNAPSHOT
// @ts-nocheck
/* eslint-disable */

import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { PierceListener } from "./PierceListener";
import { PierceVisitor } from "./PierceVisitor";


export class PierceParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly WHITESPACE = 3;
	public static readonly LOWERCASE_IDENT = 4;
	public static readonly PREFIX_OP = 5;
	public static readonly INFIX_OP = 6;
	public static readonly OR_OP = 7;
	public static readonly IMPLICATION_OP = 8;
	public static readonly BIIMPLICATION_OP = 9;
	public static readonly RULE_expr = 0;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", undefined, undefined, undefined, undefined, undefined, 
		"'->'", "'<->'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "WHITESPACE", "LOWERCASE_IDENT", "PREFIX_OP", 
		"INFIX_OP", "OR_OP", "IMPLICATION_OP", "BIIMPLICATION_OP",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(PierceParser._LITERAL_NAMES, PierceParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return PierceParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Pierce.g4"; }

	// @Override
	public get ruleNames(): string[] { return PierceParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return PierceParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(PierceParser._ATN, this);
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 0;
		this.enterRecursionRule(_localctx, 0, PierceParser.RULE_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 10;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PierceParser.LOWERCASE_IDENT:
				{
				_localctx = new NameContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 3;
				this.match(PierceParser.LOWERCASE_IDENT);
				}
				break;
			case PierceParser.T__0:
				{
				_localctx = new ParenthesisContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 4;
				this.match(PierceParser.T__0);
				this.state = 5;
				(_localctx as ParenthesisContext)._exp = this.expr(0);
				this.state = 6;
				this.match(PierceParser.T__1);
				}
				break;
			case PierceParser.PREFIX_OP:
				{
				_localctx = new UnaryOpContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 8;
				(_localctx as UnaryOpContext)._prefixOp = this.match(PierceParser.PREFIX_OP);
				this.state = 9;
				(_localctx as UnaryOpContext)._exp = this.expr(5);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 26;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 24;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new BinaryOpContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BinaryOpContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, PierceParser.RULE_expr);
						this.state = 12;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 13;
						(_localctx as BinaryOpContext)._infixOp = this.match(PierceParser.INFIX_OP);
						this.state = 14;
						(_localctx as BinaryOpContext)._right = this.expr(5);
						}
						break;

					case 2:
						{
						_localctx = new OrOpContext(new ExprContext(_parentctx, _parentState));
						(_localctx as OrOpContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, PierceParser.RULE_expr);
						this.state = 15;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 16;
						(_localctx as OrOpContext)._infixOp = this.match(PierceParser.OR_OP);
						this.state = 17;
						(_localctx as OrOpContext)._right = this.expr(4);
						}
						break;

					case 3:
						{
						_localctx = new ImplicationOpContext(new ExprContext(_parentctx, _parentState));
						(_localctx as ImplicationOpContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, PierceParser.RULE_expr);
						this.state = 18;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 19;
						(_localctx as ImplicationOpContext)._infixOp = this.match(PierceParser.IMPLICATION_OP);
						this.state = 20;
						(_localctx as ImplicationOpContext)._right = this.expr(3);
						}
						break;

					case 4:
						{
						_localctx = new BiImplicationOpContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BiImplicationOpContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, PierceParser.RULE_expr);
						this.state = 21;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 22;
						(_localctx as BiImplicationOpContext)._infixOp = this.match(PierceParser.BIIMPLICATION_OP);
						this.state = 23;
						(_localctx as BiImplicationOpContext)._right = this.expr(2);
						}
						break;
					}
					}
				}
				this.state = 28;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 0:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);

		case 1:
			return this.precpred(this._ctx, 3);

		case 2:
			return this.precpred(this._ctx, 2);

		case 3:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\v \x04\x02\t" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05" +
		"\x02\r\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x02\x1B\n\x02\f\x02\x0E\x02\x1E" +
		"\v\x02\x03\x02\x02\x02\x03\x02\x03\x02\x02\x02\x02\x02$\x02\f\x03\x02" +
		"\x02\x02\x04\x05\b\x02\x01\x02\x05\r\x07\x06\x02\x02\x06\x07\x07\x03\x02" +
		"\x02\x07\b\x05\x02\x02\x02\b\t\x07\x04\x02\x02\t\r\x03\x02\x02\x02\n\v" +
		"\x07\x07\x02\x02\v\r\x05\x02\x02\x07\f\x04\x03\x02\x02\x02\f\x06\x03\x02" +
		"\x02\x02\f\n\x03\x02\x02\x02\r\x1C\x03\x02\x02\x02\x0E\x0F\f\x06\x02\x02" +
		"\x0F\x10\x07\b\x02\x02\x10\x1B\x05\x02\x02\x07\x11\x12\f\x05\x02\x02\x12" +
		"\x13\x07\t\x02\x02\x13\x1B\x05\x02\x02\x06\x14\x15\f\x04\x02\x02\x15\x16" +
		"\x07\n\x02\x02\x16\x1B\x05\x02\x02\x05\x17\x18\f\x03\x02\x02\x18\x19\x07" +
		"\v\x02\x02\x19\x1B\x05\x02\x02\x04\x1A\x0E\x03\x02\x02\x02\x1A\x11\x03" +
		"\x02\x02\x02\x1A\x14\x03\x02\x02\x02\x1A\x17\x03\x02\x02\x02\x1B\x1E\x03" +
		"\x02\x02\x02\x1C\x1A\x03\x02\x02\x02\x1C\x1D\x03\x02\x02\x02\x1D\x03\x03" +
		"\x02\x02\x02\x1E\x1C\x03\x02\x02\x02\x05\f\x1A\x1C";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PierceParser.__ATN) {
			PierceParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(PierceParser._serializedATN));
		}

		return PierceParser.__ATN;
	}

}

export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PierceParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class NameContext extends ExprContext {
	public LOWERCASE_IDENT(): TerminalNode { return this.getToken(PierceParser.LOWERCASE_IDENT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterName) {
			listener.enterName(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitName) {
			listener.exitName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesisContext extends ExprContext {
	public _exp!: ExprContext;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterParenthesis) {
			listener.enterParenthesis(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitParenthesis) {
			listener.exitParenthesis(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitParenthesis) {
			return visitor.visitParenthesis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryOpContext extends ExprContext {
	public _prefixOp!: Token;
	public _exp!: ExprContext;
	public PREFIX_OP(): TerminalNode { return this.getToken(PierceParser.PREFIX_OP, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterUnaryOp) {
			listener.enterUnaryOp(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitUnaryOp) {
			listener.exitUnaryOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitUnaryOp) {
			return visitor.visitUnaryOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryOpContext extends ExprContext {
	public _left!: ExprContext;
	public _infixOp!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public INFIX_OP(): TerminalNode { return this.getToken(PierceParser.INFIX_OP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterBinaryOp) {
			listener.enterBinaryOp(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitBinaryOp) {
			listener.exitBinaryOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitBinaryOp) {
			return visitor.visitBinaryOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrOpContext extends ExprContext {
	public _left!: ExprContext;
	public _infixOp!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public OR_OP(): TerminalNode { return this.getToken(PierceParser.OR_OP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterOrOp) {
			listener.enterOrOp(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitOrOp) {
			listener.exitOrOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitOrOp) {
			return visitor.visitOrOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImplicationOpContext extends ExprContext {
	public _left!: ExprContext;
	public _infixOp!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IMPLICATION_OP(): TerminalNode { return this.getToken(PierceParser.IMPLICATION_OP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterImplicationOp) {
			listener.enterImplicationOp(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitImplicationOp) {
			listener.exitImplicationOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitImplicationOp) {
			return visitor.visitImplicationOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BiImplicationOpContext extends ExprContext {
	public _left!: ExprContext;
	public _infixOp!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public BIIMPLICATION_OP(): TerminalNode { return this.getToken(PierceParser.BIIMPLICATION_OP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PierceListener): void {
		if (listener.enterBiImplicationOp) {
			listener.enterBiImplicationOp(this);
		}
	}
	// @Override
	public exitRule(listener: PierceListener): void {
		if (listener.exitBiImplicationOp) {
			listener.exitBiImplicationOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PierceVisitor<Result>): Result {
		if (visitor.visitBiImplicationOp) {
			return visitor.visitBiImplicationOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


