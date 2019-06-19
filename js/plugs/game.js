var hitGame = function () {
    var _self = this;

    var box, Voice;
    var eleArr = [];
    var gameEndFlag = true;
    var score = 0;
    var gameTimer;
    var interval = 1000;
    var level = 1;
    var voiceId = 1;

    /**
     * 初始化
     */
    _self.init = function (container, voice) {
        box = container;
        Voice = voice;

        _htmlInit();
    }

    /**
     * 游戏开始
     */
    _self.gameStart = function () {
        gameEndFlag = false;
        
        _choseEgg();
        gameTimer = setInterval(function(){
            _choseEgg();
        },interval);

        setTimeout(function(){
            _reSetInterval(600);
            level = 2;
        },3000);
        setTimeout(function(){
            _reSetInterval(350);
            level = 3;
        },5000);
        setTimeout(function(){
            _reSetInterval(250);
            level = 4;
        },10000);
    }

    /**
     * 游戏结束
     */
    _self.gameEnd = function (callback) {
        gameEndFlag = true;
        clearTimeout(gameTimer);
        if (callback) callback(score);
    }

    /**
     * 游戏重置
     */
    _self.gameReset = function () {
        score = 0;
        interval = 1000;
        for (var i = 0; i < eleArr.length; i++) {
            var item = eleArr[i];
            item.dialog.css({opacity:0});
            item.egg.css({y:"100%"});
            item.eggMove = false;
            item.dialogShow = false;
            item.animing = false;
            item.scoreFlag = false;
        }
    }

    /**
     * 重新设置间隔
     */
    function _reSetInterval(time){        
        interval = time;
        clearTimeout(gameTimer);
        gameTimer = setInterval(function(){
            _choseEgg();
        },interval);
    }

    /**
     * 随机选择一个鸡蛋
     */
    function _choseEgg(){
        if(!gameEndFlag){
            var id = imath.randomRange(0,8);
            var item = eleArr[id];
            if(!item.eggMove && !item.animing){
                _eggMove(item);
            }
            else _choseEgg();
        }
    }

    /**
     * 鸡蛋移动
     */
    function _eggMove(item){
        var index = imath.randomRange(1, 3);
        var time = 1200 - level * 200;
        var moveTime = 600 - level * 100;
        item.egg[0].src = "images/game/"+index+".png";
        item.eggBox.css({opacity:1});
        item.egg.transition({y:0},moveTime);
        item.eggMove = true;
        item.scoreFlag = true;

        item.egg.transition({y:"100%",delay:time},moveTime,function(){
            item.eggMove = false;
            item.scoreFlag = false;
        })
    }

    /**
     * 打蛋
     */
    function _hitEgg(){
        if(!gameEndFlag){
            var id = parseInt($(this).attr("data-id"));
            var item = eleArr[id];
            if(item.scoreFlag){
                _getScoreAnime(item);
                if(!item.dialogShow) _showEggDialog(item,true);
                Voice["hit00"+voiceId].play();
                voiceId = voiceId < 4 ? voiceId + 1 : 1;
            }
            else if(!item.dialogShow){
                _showEggDialog(item,false);
            }
        }
    }

    /**
     * 得分的动画
     */
    function _getScoreAnime(item){
        score++;
        item.scoreFlag = false;
        item.animing = true;
        item.eggBox.transition({opacity:0},200);
        item.animeBox.transition({opacity:1},200);

        var i = 0;
        item.animeImg[0].src = "images/game/gif/"+i+".png";
        var timer = setInterval(function(){
            if(i < 5){
                i++;
                item.animeImg[0].src = "images/game/gif/"+i+".png";
            }
            else{
                clearTimeout(timer);
                item.animeBox.transition({opacity:0},200);
                item.animing = false;
            }
        },66);
    }

    /**
     * 显示对话框的动画
     */
    function _showEggDialog(item,type){
        var index = type ? imath.randomRange(2, 4) : imath.randomRange(1, 10);
        if((!type && index >= 1 && index <= 3) || (type && index == 4)){
            item.dialogShow = true;
            item.dialog[0].src = "images/game/d"+index+".png";
            item.dialog.transition({opacity:1},200);
            item.dialog.transition({opacity:0,delay:1000},200,function(){
                item.dialogShow = false;
            })
        }
    }

    /**
     * 页面元素初始化
     */
    function _htmlInit() {
        var cont = "";
        for (var i = 0; i < 9; i++) {
            
            cont += '<div class="item" data-id="' + i + '"><img src="images/game/d1.png" class="dialog hide"><img src="images/game/x.png" class="up"><div class="danBox"><img src="images/game/1.png" class="dan"></div><img src="images/game/s.png" class="down"><div class="animeBox"><img src="images/game/gif/0.png"></div></div>';
        }
        box.append(cont);
        _DataInit();
        _EventInit();
    }

    /**
     * 事件初始化
     */
    function _EventInit(){
        box.find(".item").on("touchend",_hitEgg);
    }

    /**
     * 数据初始化
     */
    function _DataInit() {
        for (var i = 0; i < 9; i++) {
            var ele = box.find(".item").eq(i);
            var item = {
                id: i,
                ele: ele,
                dialog: ele.find(".dialog"),
                egg: ele.find(".dan"),
                eggBox: ele.find(".danBox"),
                animeBox: ele.find(".animeBox"),
                animeImg: ele.find(".animeBox img"),
                eggMove: false,
                dialogShow: false,
                animing: false,
                scoreFlag: false
            }
            eleArr.push(item);
        }
    }
}