//2018.5.18
(function($) {	
	jQuery.fn.extend({
		gifOn: function(options){
			if(options.path && options.path!=''){
				var $this=$(this);
				var defaults = {num:1,type:'image',filetype:'png',speed:100,repeat:-1,yoyo:false,endStart:false,pause:false,first:0};
				var opts = $.extend(defaults,options);
				var $path=options.path;
				var $now=opts.first,$last=-1,$timer,$repeat=0,$chd,$dir=1;
				load_handler();
			}//end if
			
			function load_handler(){
				var loader = new PxLoader();
				for(var i=0; i<opts.num; i++) loader.addImage($path+i+'.'+opts.filetype);
				loader.addCompletionListener(function() {
					console.log('gif loaded');
					loader=null;
					if(opts.onLoaded) opts.onLoaded($this);
					init();
				});			
				loader.start();	
			}//end func
			
			function init(){
				if(opts.type=='image'){
					for(var i=0; i<opts.num; i++) $('<img>').attr({src:$path+i+'.'+opts.filetype}).appendTo($this);
				}//edn if
				else{
					for(var i=0; i<opts.num; i++) $('<'+opts.type+'>'+'</'+opts.type+'>').css({backgroundImage:'url('+($path+i+'.'+opts.filetype)+')'}).appendTo($this);
				}//end for
				$chd=$this.children();
				$this.on('off',this_off).on('pause',this_pause).on('resume',this_resume).on('goto',this_goto).on('speed',this_speed);
				this_switch(opts.pause);
				if(opts.onLoaded) opts.onLoaded();
			}//end init
			
			function this_off(e){
				console.log('this_off')
				$this.off('off pause resume goto speed');
				clearTimeout($timer);
			}//end if
			
			function this_pause(e){
				clearTimeout($timer);
			}//end func
			
			function this_resume(e){
				clearTimeout($timer);
				this_play();
			}//end func
			
			function this_goto(e,id,stop){
				stop=stop||0;
				if(id>=0 && id<=opts.num-1){
					$now=id;
					clearTimeout($timer);
					this_switch(stop);
				}//end if
			}//end func
			
			function this_speed(e,speed){
				opts.speed=speed;
			}//end func
			
			function this_play(){
				$now+=$dir;
				if($now==opts.num && $dir==1){
					if(opts.yoyo){
						$dir=-1;
						$now=opts.num-2;
						this_switch();
					}//edn if
					else{
						$repeat++;
						if(opts.onComplete) opts.onComplete($repeat);
						if(opts.repeat>=0){
							if($repeat<=opts.repeat){
								$now=0;
								this_switch();
							}//end if
							else this_off();
						}//end if
						else{
							$now=0;
							this_switch();
						}//end else
					}//edn else
				}//end if
				else if($now==-1 && $dir==-1){
					$repeat++;
					if(opts.onComplete) opts.onComplete($repeat);
					if(opts.repeat>=0){
						if($repeat<=opts.repeat){
							$now=1;
							$dir=1;
							this_switch();
						}//end if
						else this_off();
					}//end if
					else{
						$now=1;
						$dir=1;
						this_switch();
					}//end else
				}//end if
				else this_switch();
			}//end func
			
			function complete_handler(){
				
			}//edn func
			
			function this_switch(stop){
				stop=stop||0;
				$chd.eq($now).show();
				if($last!=-1 && $last!=$now) $chd.eq($last).hide();
				$last=$now;
				if(opts.onFrame) opts.onFrame($now+1);
				if(!stop) $timer=setTimeout(this_play,opts.speed);
			}//end func

		},//end fn
		gifPause: function(id) {
			$(this).triggerHandler('pause',[id]);
		},//end fn
		gifResume: function() {
			$(this).triggerHandler('resume');
		},//end fn
		gifGoto: function(id,stop) {
			id=Math.abs(id);
			stop=stop||0;
			$(this).triggerHandler('goto',[id,stop]);
		},//end fn
		gifSpeed: function(speed) {
			if(speed && speed>0) $(this).triggerHandler('speed',[speed]);
		},//end fn
		gifOff: function() {
			$(this).triggerHandler('off');
		}//end fn			
	});//end extend
})(jQuery);//闭包