require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');
require('./lib/fx.js');

// require views
require('./tpl/guide.js');
require('./tpl/home.js');
require('./tpl/danpin.js');
require('./tpl/my.js');
require('./tpl/index.js');
require("./tpl/fenlei.js");


// 定义默认视图
SPA.config({
  indexView: 'guide'
});
