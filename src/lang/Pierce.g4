grammar Pierce;

// $antlr-format on
// $antlr-format true 
// $antlr-format columnLimit 150
// $antlr-format allowShortBlocksOnASingleLine true, indentWidth 8

WHITESPACE: [ \t\r\n]+ -> skip;
// ================== EXPRESSIONS ==================

expr:
	LOWERCASE_IDENT											# name
	| '(' exp = expr ')'									# parenthesis
	| prefixOp = PREFIX_OP exp = expr						# unaryOp
	| left = expr infixOp = INFIX_OP right = expr			# binaryOp
	| left = expr infixOp = OR_OP right = expr				# OrOp
	| left = expr infixOp = IMPLICATION_OP right = expr		# ImplicationOp
	| left = expr infixOp = BIIMPLICATION_OP right = expr	# BiImplicationOp;

// ================== LEXICAL CONVENTIONS ==================

LOWERCASE_IDENT: ('a' .. 'z')+;

PREFIX_OP: '\\neg' | '\\lnot' | '~';

INFIX_OP: '/\\' | '\\land' | '\\wedge';
OR_OP: '\\/' | '\\lor';
IMPLICATION_OP: '->';
BIIMPLICATION_OP: '<->';