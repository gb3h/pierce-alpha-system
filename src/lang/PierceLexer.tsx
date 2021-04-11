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
	public static readonly OR_OP = 7;
	public static readonly IMPLICATION_OP = 8;
	public static readonly BIIMPLICATION_OP = 9;

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
		"OR_OP", "IMPLICATION_OP", "BIIMPLICATION_OP",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", undefined, undefined, undefined, undefined, undefined, 
		"'->'", "'<->'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "WHITESPACE", "LOWERCASE_IDENT", "PREFIX_OP", 
		"INFIX_OP", "OR_OP", "IMPLICATION_OP", "BIIMPLICATION_OP",
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\vO\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x04\x06\x04\x1B\n\x04\r\x04\x0E\x04\x1C\x03\x04\x03\x04\x03\x05\x06" +
		"\x05\"\n\x05\r\x05\x0E\x05#\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x060\n\x06\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x05\x07?\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b" +
		"G\n\b\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x02\x02\x02\v\x03\x02" +
		"\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11" +
		"\x02\n\x13\x02\v\x03\x02\x03\x05\x02\v\f\x0F\x0F\"\"\x02U\x02\x03\x03" +
		"\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03" +
		"\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02" +
		"\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x03\x15\x03\x02" +
		"\x02\x02\x05\x17\x03\x02\x02\x02\x07\x1A\x03\x02\x02\x02\t!\x03\x02\x02" +
		"\x02\v/\x03\x02\x02\x02\r>\x03\x02\x02\x02\x0FF\x03\x02\x02\x02\x11H\x03" +
		"\x02\x02\x02\x13K\x03\x02\x02\x02\x15\x16\x07*\x02\x02\x16\x04\x03\x02" +
		"\x02\x02\x17\x18\x07+\x02\x02\x18\x06\x03\x02\x02\x02\x19\x1B\t\x02\x02" +
		"\x02\x1A\x19\x03\x02\x02\x02\x1B\x1C\x03\x02\x02\x02\x1C\x1A\x03\x02\x02" +
		"\x02\x1C\x1D\x03\x02\x02\x02\x1D\x1E\x03\x02\x02\x02\x1E\x1F\b\x04\x02" +
		"\x02\x1F\b\x03\x02\x02\x02 \"\x04c|\x02! \x03\x02\x02\x02\"#\x03\x02\x02" +
		"\x02#!\x03\x02\x02\x02#$\x03\x02\x02\x02$\n\x03\x02\x02\x02%&\x07^\x02" +
		"\x02&\'\x07p\x02\x02\'(\x07g\x02\x02(0\x07i\x02\x02)*\x07^\x02\x02*+\x07" +
		"n\x02\x02+,\x07p\x02\x02,-\x07q\x02\x02-0\x07v\x02\x02.0\x07\x80\x02\x02" +
		"/%\x03\x02\x02\x02/)\x03\x02\x02\x02/.\x03\x02\x02\x020\f\x03\x02\x02" +
		"\x0212\x071\x02\x022?\x07^\x02\x0234\x07^\x02\x0245\x07n\x02\x0256\x07" +
		"c\x02\x0267\x07p\x02\x027?\x07f\x02\x0289\x07^\x02\x029:\x07y\x02\x02" +
		":;\x07g\x02\x02;<\x07f\x02\x02<=\x07i\x02\x02=?\x07g\x02\x02>1\x03\x02" +
		"\x02\x02>3\x03\x02\x02\x02>8\x03\x02\x02\x02?\x0E\x03\x02\x02\x02@A\x07" +
		"^\x02\x02AG\x071\x02\x02BC\x07^\x02\x02CD\x07n\x02\x02DE\x07q\x02\x02" +
		"EG\x07t\x02\x02F@\x03\x02\x02\x02FB\x03\x02\x02\x02G\x10\x03\x02\x02\x02" +
		"HI\x07/\x02\x02IJ\x07@\x02\x02J\x12\x03\x02\x02\x02KL\x07>\x02\x02LM\x07" +
		"/\x02\x02MN\x07@\x02\x02N\x14\x03\x02\x02\x02\b\x02\x1C#/>F\x03\b\x02" +
		"\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PierceLexer.__ATN) {
			PierceLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(PierceLexer._serializedATN));
		}

		return PierceLexer.__ATN;
	}

}

