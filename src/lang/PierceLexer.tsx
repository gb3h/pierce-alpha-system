// Generated from ./src/lang/Pierce.g4 by ANTLR 4.9.0-SNAPSHOT
// @ts-nocheck
/* eslint-disable */

import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class PierceLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly WHITESPACE = 3;
	public static readonly LOWERCASE_IDENT = 4;
	public static readonly PREFIX_OP = 5;
	public static readonly INFIX_OP = 6;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "WHITESPACE", "LOWERCASE_IDENT", "PREFIX_OP", "INFIX_OP",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "WHITESPACE", "LOWERCASE_IDENT", "PREFIX_OP", 
		"INFIX_OP",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(PierceLexer._LITERAL_NAMES, PierceLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return PierceLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(PierceLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Pierce.g4"; }

	// @Override
	public get ruleNames(): string[] { return PierceLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return PierceLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return PierceLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return PierceLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\b:\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x06\x04\x15\n\x04\r" +
		"\x04\x0E\x04\x16\x03\x04\x03\x04\x03\x05\x06\x05\x1C\n\x05\r\x05\x0E\x05" +
		"\x1D\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x05\x06*\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x079" +
		"\n\x07\x02\x02\x02\b\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02" +
		"\x07\r\x02\b\x03\x02\x03\x05\x02\v\f\x0F\x0F\"\"\x02?\x02\x03\x03\x02" +
		"\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02" +
		"\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x03\x0F\x03\x02\x02" +
		"\x02\x05\x11\x03\x02\x02\x02\x07\x14\x03\x02\x02\x02\t\x1B\x03\x02\x02" +
		"\x02\v)\x03\x02\x02\x02\r8\x03\x02\x02\x02\x0F\x10\x07*\x02\x02\x10\x04" +
		"\x03\x02\x02\x02\x11\x12\x07+\x02\x02\x12\x06\x03\x02\x02\x02\x13\x15" +
		"\t\x02\x02\x02\x14\x13\x03\x02\x02\x02\x15\x16\x03\x02\x02\x02\x16\x14" +
		"\x03\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x18\x03\x02\x02\x02\x18\x19" +
		"\b\x04\x02\x02\x19\b\x03\x02\x02\x02\x1A\x1C\x04c|\x02\x1B\x1A\x03\x02" +
		"\x02\x02\x1C\x1D\x03\x02\x02\x02\x1D\x1B\x03\x02\x02\x02\x1D\x1E\x03\x02" +
		"\x02\x02\x1E\n\x03\x02\x02\x02\x1F \x07^\x02\x02 !\x07p\x02\x02!\"\x07" +
		"g\x02\x02\"*\x07i\x02\x02#$\x07^\x02\x02$%\x07n\x02\x02%&\x07p\x02\x02" +
		"&\'\x07q\x02\x02\'*\x07v\x02\x02(*\x07\x80\x02\x02)\x1F\x03\x02\x02\x02" +
		")#\x03\x02\x02\x02)(\x03\x02\x02\x02*\f\x03\x02\x02\x02+,\x071\x02\x02" +
		",9\x07^\x02\x02-.\x07^\x02\x02./\x07n\x02\x02/0\x07c\x02\x0201\x07p\x02" +
		"\x0219\x07f\x02\x0223\x07^\x02\x0234\x07y\x02\x0245\x07g\x02\x0256\x07" +
		"f\x02\x0267\x07i\x02\x0279\x07g\x02\x028+\x03\x02\x02\x028-\x03\x02\x02" +
		"\x0282\x03\x02\x02\x029\x0E\x03\x02\x02\x02\x07\x02\x16\x1D)8\x03\b\x02" +
		"\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PierceLexer.__ATN) {
			PierceLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(PierceLexer._serializedATN));
		}

		return PierceLexer.__ATN;
	}

}

