;(function(window,$){
		
	var _merge = function(source,dest){
		for(var p in dest){
			if(source[p] === undefined){
				source[p] = dest[p];
			}
		}
		
	}
	
	var valitip = function(options){
		options = options || {};
		_merge(options,valitip._settings);
		var _tip = valitip.list[options.target];
		if(_tip){
		    _tip.init(options);
			_tip.show();
		 }
		return  _tip || new valitip.fn.init(options);
	};
	valitip.fn = valitip.prototype = {
		init : function(options){
			var that = this,DOM;
			that.options = options;
			that.DOM = DOM = that.DOM || that._getDOM();
			
			that.errorMsg(options.errorMsg)
			    .size(options.width,options.height).
				position(options.target);
				
			return that;
		},
		show : function(){
			this.DOM.wrap.show();
			return this;
		},
		hide : function(){
			this.DOM.wrap.hide();
			return this;
		},
		errorMsg : function(msg){
			var that = this,
			    DOM = that.DOM,
				wrap = DOM.warp,
				$content = DOM.content,
				content = $content[0];
			if(msg === undefined){
				return content;
			}
			if(typeof msg === 'string'){
				$content.html(msg);
			}
		    return that;
		},
		size : function(width,height){
			var that = this,
				DOM = that.DOM,
				$msg = DOM.msg,
				msgStyle = $msg[0].style;
				
				if(width){
					if(typeof width === 'string'){
						msgStyle.width = width;
					}
				
				}
				
				if(height){
					if(typeof height === 'string'){
						msgStyle.height = height;
					}
				}
				
				return that;
		
		},
		position : function(target){
			var that = this,
				DOM = that.DOM,
				$wrap = DOM.wrap,
			    options = that.options;
			if(target){
				if(typeof target === 'string'){
					var $target = $('#'+target);
					$wrap.css({
						left : $target.offset().left + $target.width()+8,
						top : $target.offset().top
						});
				   valitip.list[target] = that;
				}
			}
		},
		_getDOM : function(){
			var wrap = document.createElement('div'),
				body = document.body;
				wrap.style.cssText = 'position:absolute;left:0;top:0';
				wrap.innerHTML = valitip.defaultTmp;
			body.insertBefore(wrap,body.firstChild);
			
			var name, i = 0,
			DOM = {wrap:$(wrap)},
			els = wrap.getElementsByTagName('*'),
			elsLen = els.length;
			for(;i < elsLen;i++){
				name = els[i].className.split('vali_')[1];
				if(name){
					DOM[name] = $(els[i]);
				}
			}
			return DOM;
		}
		
	
	};
	

	valitip.list = {};
	//default tmp
	valitip.defaultTmp = '<div id="id_msg" class="vali_msg"><div class="vali_content"></div></div>';
	
	valitip.fn.init.prototype = valitip.fn;
	//default settings
	valitip._settings = {
		errorMsg : 'invalid',
		width : 'auto',
		height : 'auto',
		target : null
	};
    window.valitip = valitip;
})(this,this.jQuery);