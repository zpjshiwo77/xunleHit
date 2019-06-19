var API = new importAPI();

function importAPI () {
	var _self = this;

	var requestDomain = "http://wechat.dhteam.net/jzinterface/ajax/add.ashx?method=";
	var loadBox=$('aside.loadBox');

	function _Ajax(opts){
	    // icom.fadeIn(loadBox);
	    var type = opts.type || "POST";
	    $.ajax({
	        type: type,
	        url: requestDomain + opts.API,
	        dataType: 'json',
	        async: true,
	        data: opts.data,
	        success: function(data){
	        	// icom.fadeOut(loadBox);
                if (opts.onSuccess) opts.onSuccess(data);
	        },
	        error: function(){
	        	icom.alert("网络可能存在问题，请刷新试试！");
	        }
	    });
	}

	/**
     * 记录游戏人数
     */
	_self.PlayRecord = function(data,onSuccess){
		_Ajax({
            API:"PlayRecord",
            data:data,
            onSuccess:onSuccess
        });
    }//end func
    
    /**
     * 记录用户得分
     */
	_self.ScoreRecord = function(data,onSuccess){
		_Ajax({
            API:"ScoreRecord",
            data:data,
            onSuccess:onSuccess
        });
	}//end func
}//end import