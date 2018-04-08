define(function(require, exports, module) {
    require('jquery');
    require('common');
    const moduleA = require('./moduleA.js');
    const moduleB = require('./moduleB.js');
    const moduleC = require('./moduleC.js');

    var init = function() {
        const boxHtml = `我最好的朋友叫${moduleA.name}，她今年${moduleB.age}岁，从事${moduleC.job}工作`;
        $('.box').html(boxHtml);
    }
    // exports.init = init;
    // return { init };
    module.exports = { init };
});