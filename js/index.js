$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var windowScale=window.innerWidth/750;
	var Voice;
	
	//----------------------------------------页面初始化----------------------------------------
	icom.init(init);//初始化
	icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为
	
	function init(){
		requestAnimationFrame(function(){
			loadBox.show();
			if(os.screenProp < 0.54) articleBox.addClass("screen189");
			if(os.screenProp > 0.64) articleBox.addClass("screen159");
			load_handler();
			sound_handler();
		});
	}//edn func

	function sound_handler(){
		if(os.weixin){
			var wsb = window;
			if (wsb.WeixinJSBridge) {
				try {
					wsb.WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
				}
				catch (e) {
					wx.ready(sound_creat);
				}
			}
			else {
				document.addEventListener("WeixinJSBridgeReady", sound_creat, false);
			}
		}else{
			sound_creat();
		}
		
	}//edn func

	function sound_creat(){
		document.removeEventListener("WeixinJSBridgeReady", sound_creat);
		Voice = iaudio.on([{
			src:"audio/fall.mp3",
			autoplay:false,
			loop:0
		},{
			src:"audio/hit.mp3",
			autoplay:false,
			loop:0
		},{
			src:"audio/wxtips.mp3",
			autoplay:false,
			loop:0
		}]);
	}//end func
	

	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/share.jpg');
		loader.addImage('images/result/1.png');
		loader.addImage('images/result/2.png');
		loader.addImage('images/result/3.png');
		loader.addImage('images/result/btns.png');
		loader.addImage('images/result/d.png');
		loader.addImage('images/result/score.png');
		loader.addImage('images/result/t1.png');
		loader.addImage('images/result/t2.png');
		loader.addImage('images/result/t3.png');
		loader.addImage('images/result/tips.png');
		loader.addImage('images/intro/b.png');
		loader.addImage('images/intro/bg.png');
		loader.addImage('images/intro/bt.png');
		loader.addImage('images/intro/bt2.png');
		loader.addImage('images/intro/d.png');
		loader.addImage('images/intro/dan.png');
		loader.addImage('images/intro/pd.png');
		loader.addImage('images/intro/t.png');
		loader.addImage('images/intro/w.png');
		loader.addImage('images/index/bg.jpg');
		loader.addImage('images/index/d1.png');
		loader.addImage('images/index/d2.png');
		loader.addImage('images/index/d3.png');
		loader.addImage('images/index/d4.png');
		loader.addImage('images/index/down.png');
		loader.addImage('images/index/lock.png');
		loader.addImage('images/index/time.png');
		loader.addImage('images/index/tips.png');
		loader.addImage('images/index/up.png');
		loader.addImage('images/game/1.png');
		loader.addImage('images/game/2.png');
		loader.addImage('images/game/3.png');
		loader.addImage('images/game/d.png');
		loader.addImage('images/game/d1.png');
		loader.addImage('images/game/d2.png');
		loader.addImage('images/game/d3.png');
		loader.addImage('images/game/d4.png');
		loader.addImage('images/game/s.png');
		loader.addImage('images/game/time.png');
		loader.addImage('images/game/title.png');
		loader.addImage('images/game/x.png');
		loader.addImage('images/common/bgm_off.png');
		loader.addImage('images/common/bgm_on.png');
		loader.addImage('images/common/close.png');
		loader.addImage('images/common/share.png');
		loader.addImage('images/common/turn_lock.png');
		loader.addImage('images/common/turn_no.png');
		loader.addImage('images/common/turn_phone.png');
		loader.addImage('images/common/turn_unlock.png');
		loader.addImage('images/common/turn_yes.png');
		
		loader.addCompletionListener(function() {
			icom.fadeOut(loadBox);
			articleBox.show();
			pageInit();
			loader=null;
		});
		loader.start();	
	}//end func

	//----------------------------------------页面逻辑代码----------------------------------------
	var indexBox =  $("#indexBox");
	var introBox =  $("#introBox");
	var gameBox =  $("#gameBox");
	var resultBox =  $("#resultBox");
	var shareBox =  $("#shareBox");
	var timeBox = gameBox.find(".time");

	var iHitGame;
	var gameTime = 30000;

	/**
	 * 页面初始化
	 */
	function pageInit(){
		eventInit();
		setTimeout(function(){
			indexAnime();
			gameInit();
		},500);
		// DevelopTest();
		monitor_handler();
	}//end func
	
	/**
	 * 开发测试使用
	 */
	function DevelopTest(){
		// indexBox.hide();
		// gameBox.show();
		// introBoxAnime();
		indexBox.hide();
		// gameBox.show();
		gameBoxShow();
		// showGame();
		// renderResultBox(15);
	}

	/**
	 * 事件初始化
	 */
	function eventInit(){
		introBox.find(".btn").on("touchend",fallAnime);
		resultBox.find(".againBtn").on("touchend",againGame);
		resultBox.find(".shareBtn").on("touchend",showShare);

		$(".limitBtn").on("touchend",limitClick);
	}

	/**
	 * 再玩一次游戏
	 */
	function againGame(){
		iHitGame.gameReset();
		gameTime = 30000;

		gameBox.find(".readyBox").show();
		timeBox.html("30:00");
		gameBox.find(".num").html(3);
		icom.fadeIn(gameBox,500,function(){
			resultBox.hide();
			gameBoxShow(true);
		});
	}

	/**
	 * 显示分享页面
	 */
	function showShare(){
		icom.popOn(shareBox);
	}

	/**
	 * 游戏初始化
	 */
	function gameInit(){
		iHitGame = new hitGame();
		iHitGame.init($("#game"),Voice.hit);
	}

	/**
	 * 游戏页面显示
	 */
	function gameBoxShow(type){
		var numBox = gameBox.find(".num");
		var num = 3;

		if(!type){
			gameBox.show();
			icom.fadeOut(introBox);
		}
		
		var timer = setInterval(function(){
			num--;
			numBox.html(num);
			if(num == 0){
				clearTimeout(timer);
				showGame();
			}
		},1000);
	}

	/**
	 * 显示游戏
	 */
	function showGame(){
		icom.fadeOut(gameBox.find(".readyBox"));
		iHitGame.gameStart();
		countTime();
	}

	/**
	 * 开始计时
	 */
	function countTime(){
		requestAnimationFrame(function(){
			gameTime -= 16;
			if(gameTime <= 0){
				gameTime = 0;
				gameEnd();
			}
			else countTime();
			updateTime();
		});
	}

	/**
	 * 更新时间
	 */
	function updateTime(){
		var time = gameTime + "";
		time = time.split("");
		if(time.length == 5){
			timeBox.html(time[0]+time[1]+":"+time[2]+time[3]);
		}
		else if(time.length == 4){
			timeBox.html("0"+time[0]+":"+time[1]+time[2]);
		}
		else if(time.length == 3){
			timeBox.html("00:"+time[0]+time[1]);
		}
		else if(time.length == 2){
			timeBox.html("00:0"+time[0]);
		}
		else{
			timeBox.html("00:00");
		}
	}

	/**
	 * 游戏结束
	 */
	function gameEnd(){
		iHitGame.gameEnd(function(score){
			renderResultBox(score);
		});
	}

	/**
	 * 渲染结果页面
	 */
	function renderResultBox(score){
		var title = resultBox.find(".title");
		var scoreBox = resultBox.find(".score");
		var word = resultBox.find(".word");
		var dan = resultBox.find(".dan");
		var tips = resultBox.find(".tips");
		var btnBox = resultBox.find(".btnBox");
		var level = 3;

		if(score < 20) level = 3;
		else if(score >= 20 && score <= 40) level = 2;
		else level = 1;
		
		title.removeClass("tentering")
		.attr("src","images/result/t"+level+".png");
		word.removeClass("tentering2")
		.attr("src","images/result/"+level+".png");
		scoreBox.html(score);
		dan.css({opacity:0});
		tips.css({opacity:0});
		btnBox.css({opacity:0});
		
		setTimeout(function(){
			resultBox.show();
			icom.fadeOut(gameBox);
			title.addClass("tentering");
			word.addClass("tentering2");
			dan.transition({opacity:1,delay:1000});
			tips.transition({opacity:1,delay:1300});
			btnBox.transition({opacity:1,delay:1300});
		},500);
	}

	/**
	 * 下落动画
	 */
	function fallAnime(){
		var dan = introBox.find(".dan");
		var danP = introBox.find(".danP");
		var word = introBox.find(".word");

		icom.fadeOut(word);
		icom.fadeOut(introBox.find(".btn"));

		dan.show().addClass("falling");
		danP.transition({opacity:1,delay:1000},800,function(){
			setTimeout(function(){
				gameBoxShow();
			},1000);
		});

		if(Voice) Voice.fall.play();
	}

	/**
	 * 首页动画
	 */
	function indexAnime(){
		var boxA = indexBox.find(".boxA");
		var boxB = indexBox.find(".boxB");
		var tips = boxA.find(".tips");
		
		tips.css({y:"-0.5rem"})
		.transition({y:0,opacity:1,delay:500},500);
		if(Voice) Voice.wxtips.play();

		boxA.transition({opacity:0,delay:2000});
		
		for (var i = 1; i <= 4; i++) {
			var ele = boxB.find(".d"+i);
			ele.transition({opacity:1,delay:2000+i*800},200);
		}

		setTimeout(function(){
			introBoxAnime();
		},6000);		
	}
	
	/**
	 * 介绍页面的动画播放
	 */
	function introBoxAnime(){
		var title = introBox.find(".title");
		var word = introBox.find(".word");
		var btn = introBox.find(".btn");

		introBox.show();
		icom.fadeOut(indexBox);
		
		title.addClass("tentering");

		word.transition({opacity:1,delay:1000},function(){
			icom.fadeIn(btn);
		});
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
