$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var windowScale=window.innerWidth/750;
	
	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	
	function init(){
		requestAnimationFrame(function(){
			loadBox.show();
			if(os.screenProp < 0.54) articleBox.addClass("screen189");
			if(os.screenProp > 0.64) articleBox.addClass("screen159");
			load_handler();
		});
	}//edn func
	

	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn_phone.png');
		
		loader.addCompletionListener(function() {
			pageInit();
			icom.fadeOut(loadBox);
			icom.fadeIn(articleBox);
			loader=null;
		});
		loader.start();	
	}//end func

	//----------------------------------------页面逻辑代码----------------------------------------
	var indexBox =  $("#indexBox");
	var introBox =  $("#introBox");
	var gameBox =  $("#gameBox");
	var resultBox =  $("#resultBox");	

	/**
	 * 页面初始化
	 */
	function pageInit(){
		eventInit();
		DevelopTest();
		monitor_handler();
	}//end func
	
	/**
	 * 开发测试使用
	 */
	function DevelopTest(){
		indexBox.hide();
		gameBox.show();
	}

	/**
	 * 事件初始化
	 */
	function eventInit(){
		$(".limitBtn").on("touchend",limitClick);
	}

	/**
	 * 限制点击
	 */
	function limitClick(){
		$(".limitBtn").addClass('noPointer');
		setTimeout(function(){$(".limitBtn").removeClass('noPointer')},500);
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
	}//end func
});//end ready
