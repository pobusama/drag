//drag组件.
//branch master
function Drag(){
	this.obj = null;
	this.disX =0;
	this.disY =0;
	this.scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
	this.settings = {
		//默认参数
		'toDown': function(){console.log('defaulttoDown')},
		'toUp' : function(){console.log('defaultToUp')}
	};

};
//options为配置参数 
Drag.prototype.init=function(options){
	var _this = this;

	//this.settings = copy(options);//deepCopy(options);
	extend(this.settings,options);//覆盖设置
	console.log(this.settings);
	_this.obj = document.getElementById(options.id);
	this.obj.onmousedown=function(ev){
		if(_this.obj.setCapture){
			_this.obj.setCapture();
		}
		
		_this.settings.toDown();
		
		_this.fnDown(ev);
		return false;
	}
}
//鼠标按下执行的函数
Drag.prototype.fnDown = function(ev){
	var ev = ev||window.event;
	var _this = this;
	this.disX = ev.clientX-this.obj.offsetLeft;
	this.disY = ev.clientY-this.obj.offsetTop;
	//console.log(ev.clientX-_this.obj.offsetLeft );
	document.onmousemove = function(ev){
		_this.fnMove(ev);
	}
	document.onmouseup = function(){
		_this.settings.toUp();
		_this.fnUp(_this);
	}
}
Drag.prototype.fnMove = function(ev){
	var ev = ev||window.event;
	var left = this.scrollLeft+ev.clientX - this.disX;
	var top = this.scrollTop+ev.clientY - this.disY;
	//console.log(ev.clientX);

	this.obj.style.cssText = 'left:'+left+'px;top:'+top+'px;';
}
Drag.prototype.fnUp = function(_this){
	document.onmousemove = document.onmouseup = null;
	if(_this.obj.releaseCapture){
		_this.obj.releaseCapture();
	}



}

//继承
function extend(child,father){
	for(var attr in father)
	{
		child[attr] = father[attr];
	}
}

//浅拷贝
function copy(obj){
	var newObj = {};
	for(var attr in obj)
	{
		newObj[attr] = obj[attr];
	}
	return newObj;
}
//深拷贝
function deepCopy(obj){
	if(typeof obj !== 'object')
	{
		return obj;
	}
	var newObj = new Object();
	for(var attr in obj)
	{
		newObj[attr] = deepCopy(obj[attr]);
	}
	return newObj;
}