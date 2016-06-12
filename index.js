const postcss = require('postcss');
function per(val) {
	var rs = (val || '').toString().split(',');
	if (!rs || rs.length < 1) return '';

	var regDotNum = new RegExp('[0-9]+(\.[0-9]{0,'+ (rs[1] || 5) +'})?');
	var result = (exec(rs[0]) * 100).toString().match(regDotNum);
	return result && result[0] ? parseFloat(result[0]) + '%' : '';
}

function exec(val) {
	try {
		val = new Function('return ' + val)();
	} catch(e) {
		console.log('[Error] in Math.per ', e);
	}
	return val;
}


module.exports = postcss.plugin('postcss-precision', function() {
	var mathTest = /Math\.([a-z]+)\(([^\)]+)\)/g;
	var unitTest = /px|em|rem/;

	return function(style) {
		style.walkDecls(function(decl) {
			if (decl.value && mathTest.test(decl.value)) {
				var rs = decl.value.match(mathTest);
				if (rs) {
					decl.value = decl.value.replace(mathTest, function(origin, func, val) {
						if (func === 'per') {
							return per(val);
						} else {
							var unit = rs[2].match(/px|em|rem/) || [''];
							return Math[rs[1]](exec(rs[2].replace(unitTest, ''))) + unit;
						}
					});
				}
			}
		});
	};
});