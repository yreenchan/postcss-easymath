const postcss = require('postcss');

function per(val) {
	try {
		eval('var val = ' + val);
	} catch(e) {
		console.log('[Error] in Math.per ', e);
	}
	return val.toFixed(5) * 100 + '%';
}


var precision = postcss.plugin('postcss-precision', function() {
	var mathTest = /Math\.([a-z]+)\(([^\)]+)\)/;

	return function(style) {
		style.eachDecl(function(decl) {
			if (decl.value && mathTest.test(decl.value)) {
				var rs = decl.value.match(mathTest);
				if (rs) {
					if (rs[1] === 'per' && rs[2]) {
						decl.value = per(rs[2]);
					} else {
						decl.value = Math[rs[1]](rs[2])
					}
				}
			}

		});
	};
});