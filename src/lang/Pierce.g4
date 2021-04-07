grammar Pierce;

// $antlr-format on
// $antlr-format true 
// $antlr-format columnLimit 150
// $antlr-format allowShortBlocksOnASingleLine true, indentWidth 8

WHITESPACE: [ \t\r\n]+ -> skip;
// ================== EXPRESSIONS ==================

expr:
	LOWERCASE_IDENT									# name
	| '(' exp = expr ')'							# parenthesis
	| prefixOp = PREFIX_OP exp = expr				# unaryOp
	| left = expr infixOp = INFIX_OP right = expr	# binaryOp;

// ================== LEXICAL CONVENTIONS ==================

LOWERCASE_IDENT: ('a' .. 'z')+;

PREFIX_OP: '\\neg' | '\\lnot' | '~';

INFIX_OP: '/\\' | '\\land' | '\\wedge';