const postcss = require('postcss');

function per(val) {
	val = val.split(',');
	return (resolve(val[0]) * 100).toFixed(val[1] || 5) + '%';
}

function resolve(val) {
	try {
		eval('var val = ' + val);
	} catch(e) {
		console.log('[Error] in Math.per ', e);
	}
	return val;
}


module.exports = postcss.plugin('postcss-precision', function() {
	var mathTest = /Math\.([a-z]+)\(([^\)]+)\)/;
	var unitTest = /px|em|rem/;

	return function(style) {
		style.walkDecls(function(decl) {
			if (decl.value && mathTest.test(decl.value)) {
				var rs = decl.value.match(mathTest);
				if (rs) {
					if (rs[1] === 'per' && rs[2]) {
						decl.value = per(rs[2]);
					} else {
						var unit = rs[2].match(/px|em|rem/) || [''];
						var val = rs[2].replace(unitTest, '');
						decl.value = Math[rs[1]](resolve(val)) + unit;
					}
				}
			}
		});
	};
});