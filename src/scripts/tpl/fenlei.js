// 引入模板
var searchTpl = require('../views/fenlei.string');

// 定义一个视图
SPA.defineView('fenlei', {
  // 将模板写在body里
  html: searchTpl,

  plugins: [
    'delegated'
  ],

  bindActions: {

  }
});
