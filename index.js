const IronTree = require('./src/tree');

typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = IronTree :
typeof define === 'function' && define.amd ? define(IronTree) :
this.IronTree = IronTree;
