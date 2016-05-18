// 引入模板
var homeTpl = require('../views/home.string');

// 定义一个视图
SPA.defineView('home', {
  // 将模板写在body里
  html: homeTpl,

plugins: [
    'delegated',
    {
      name: 'avalon',
      options: function (vm) {
        vm.homeList = [];
        vm.homeTempList = [];
      }
    }
],

  // 给视图定义公共的属性和方法
init: {
	
		hei:null,
    // 定义视图公共的最大的swiper对象 
    myBigSwiper: null,

   
},
//给导航绑定点击事件
bindActions: {
    'tap.hot.slide': function (e) {
      // 点击导航栏     获得每一个index, 跳转到对应的slider
     this.myBigSwiper.slideTo($(e.el).index())
    },
//  "tap.more":function(){
//  	if($("#hideNav").css("top")!=0){
//  		$("#hideNav").animate({top:0},[1000]);
//  	}
//  	else if($("#hideNav").css("top")==0){
//  		console.info(1111);
//  		$("#hideNav").animate({top:-parseInt(hei)},[1000])
//  	}
//  	 
//  },
    
},

bindEvents: {
    beforeShow: function () {
      // 保存视图对象
      var that = this;
			hei =$("#Big-swiper").height();
			$("#hideNav").css({height:hei,top:-parseInt(hei)});
			
			$("#xsj").click(function(){
				if($("#hideNav").css.top!=0){
    			$("#hideNav").animate({top:0},[1000]);
    			$("#hideNav").css.top=0;
    		}
    		else if($("#hideNav").css.top==0){
    			$("#hideNav").animate({top:-parseInt(hei)},[1000]);
    			$("#hideNav").css.top=-parseInt(hei);
    		}
				
				
			})
      // 获得avalon的vm
    	var vm = that.getVM();

      // 渲染数据
	    $.ajax({
	      url: '/BoheiApp/mock/home.json',
	      success: function (res) {
	      	 vm.homeTempList = res.data;
	         vm.homeList=res.data;
	        
	      }
	    });
      // 定义home hot swiper，注意这里的that.mySwiper
      that.myBigSwiper = new Swiper('#Big-swiper', {
        loop: false,
        onSlideChangeStart: function () {
          $('#nav-swiper .txt').eq(that.myBigSwiper.activeIndex).addClass('active').siblings().removeClass('active');
        }
      });

     that.miniSwiper = new Swiper('#mini-swiper',{
		     	effect : 'cube',
		     	cube : {
		     		slideShadows : false,
		     		shadow : false,
		     	},
		     	loop:true,
		     	autoplay : 4000,
		     	speed:1000,
     });
     
     	
     	//点击
	     	$("#xsj").click(function(){
	     		
	     		
	     	});
	  			
	     	
	     //下拉加载数据	
	     setTimeout(function () {
        // 获得SAP里定义的scroll对象，homeHotScroll通过data-scroll-id实现绑定的
        var myScroll = that.widgets.homeHotScroll;
        var gapSize = 26;
        myScroll.scrollBy(0, -gapSize);

        var head = $('.head img'),
            topImgHasClass = head.hasClass('up');
        var foot = $('.foot img'),
            bottomImgHasClass = head.hasClass('down');
        myScroll.on('scroll', function () {
            var y = this.y,
                maxY = this.maxScrollY - y;
            if (y >= 0) {
                !topImgHasClass && head.addClass('up');
                return '';
            }
            if (maxY >= 0) {
                !bottomImgHasClass && foot.addClass('down');
                return '';
            }
        });

        myScroll.on('scrollEnd', function () {
            if (this.y >= -100 && this.y < 0) {
                myScroll.scrollTo(0, -gapSize);
                head.removeClass('up');
            } else if (this.y >= 0) {
                head.attr('src', '/BoheiApp/images/ajax-loader.gif');
                //TODO ajax下拉刷新数据

                setTimeout(function () {
                    myScroll.scrollTo(0, -gapSize);
                    head.removeClass('up');
                    head.attr('src', '/BoheiApp/images/arrow.png');
                }, 1000);
            }

            var maxY = this.maxScrollY - this.y;
            if (maxY > -gapSize && maxY < 0) {
                var self = this;
                myScroll.scrollTo(0, self.maxScrollY + gapSize);
                foot.removeClass('down')
            } else if (maxY >= 0) {
                foot.attr('src', '/BoheiApp/images/ajax-loader.gif');
                //TODO ajax上拉加载数据

                $.ajax({
                  url: '/BoheiApp/mock/more.json',

//                // 请求参数，get：放置的url上，post:request体里
//	                data: {
//	                  page: pageNo,
//	                  pageSize: pageSize
//	                },	

                  success: function (res) {
                    vm.homeTempList.pushArray(res.data);
                    console.log( vm.homeTempList);
                    vm.homeList = vm.homeTempList;
                   
                    
                  }
               });
            }
        });
      }, 0);
    }
	}
});
