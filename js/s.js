window.onload=function () {
	var banner=$(".banner")[0];
	var imgs=$("img",banner);
	var tubottom=$(".tu-bottom")[0];
	var lis=$("li",tubottom);
	var lislen=lis.length;
	var imgslen=imgs.length;
	var btnl=$(".btnl")[0];
	var btnr=$(".btnr")[0];
	var t=setInterval(move,4000);
	//滑动
	for (var i = 0; i < lislen; i++) {
		lis[i].index=i;
		hover(lis[i],function(){
			clearInterval(t);
			for (var j = 0; j < imgslen; j++) {
				lis[j].className="";
				imgs[j].style.zIndex=4;
			};
			lis[this.index].className="a";
			imgs[this.index].style.zIndex=6;
		},function(){
			t=setInterval(move,4000)
		})
	};
	//自动
	var num=0;
	function move(){
		if (num==5) {
			num=0;
		};
		for (var i = 0; i < imgslen; i++) {
			// animate(imgs[i],{zIndex:4},500,Tween.Linear);
			imgs[i].style.zIndex=4;
			lis[i].className="";
		};
		// animate(imgs[num],{zIndex:6},400,Tween.Linear);
		imgs[num].style.zIndex=6;
		lis[num].className="a"
		num++;
	}

	btnr.onclick=function(){
		move();
	}
	/*btnl.onclick=function(){
		if (num==0) {
			num=imgslen-1;
		};
		
		for (var i = 0; i < imgslen; i++) {
			// animate(imgs[i],{zIndex:4},500,Tween.Linear);
			imgs[i].style.zIndex=4;
			lis[i].className="";
		};
		// animate(imgs[num],{zIndex:6},400,Tween.Linear);
		imgs[num].style.zIndex=6;
		lis[num].className="a"
		num--;
		
	}*/

	var mingtop=$(".ming-top")[0];
	var leftbtn=$(".leftbtn")[0];
	var rightbtn=$(".rightbtn")[0];
	var topa=$("a",mingtop);
	var mings=$(".mings")[0];
	var lm=mings.style.marginLeft
	var flag=true;
	/*var t1=setInterval(moves,2000);
	function moves(){
		
		if (lm==""||lm=="0") {
			animate(mings,{marginLeft:-1240},800,Tween.Linear,function(){
				
			})
		}else if(lm=="-1240px"){
			animate(mings,{marginLeft:0},800,Tween.Linear,function(){

			})
		};
	}*/
	leftbtn.onclick=function(){
		if (!flag) {
			return;
		};
		flag=true;
		animate(mings,{marginLeft:-1240},800,Tween.Linear)
	}
	rightbtn.onclick=function(){
		if (!flag) {
			return;
		};
		flag=true;
		animate(mings,{marginLeft:0},800,Tween.Linear)
	}

	//下拉
	var yiji=$(".yiji");
	var erji=$(".erji");
	for (var i = 0; i < yiji.length; i++) {
		yiji[i].index=i;
		hover(yiji[i],function(){
			animate(erji[this.index],{height:230},800,Tween.Linear)
		},function(){
			animate(erji[this.index],{height:0},800,Tween.Linear)
		})
	};


	//侧边栏
	var zu=$(".zu");
	var cemian=$(".cemian");
	for (var i =0; i< zu.length ;  i++) {
		zu[i].index=i;
		hover(zu[i],function(){
			var uls=$("ul",cemian[this.index]);
			var W=uls[0].offsetWidth;
			animate(cemian[this.index],{width:W*uls.length},100)
		},function(){
			animate(cemian[this.index],{width:0},100)
		})
	};


	//评价信息
	var pinglun=$(".pinglun");
	var pingjia=$(".pingjia");
	for (var i = 0; i < pinglun.length; i++) {
		pinglun[i].index=i;
		hover(pinglun[i],function(){
			animate(pingjia[this.index],{top:200},200)
		},function(){
			animate(pingjia[this.index],{top:300},200)
		})
	};


	//为你推荐
	var tieba=$(".tieb")[0];
	var tieb=$(".ti-eb");
	var btnR=$(".btnR")[0];
	var btnL=$(".btnL")[0];
	var tiebW=tieb[0].offsetWidth;
	var tieblen=tieb.length;
	for (var i = 0; i < tieblen ; i++) {
		if(i!=0){
			tieb[i].style.left=tiebW+"px";
		}
	};
	var now=0;
	var next=0;
	var flag2=true;
	btnL.onclick=function(){
		if (!flag2) {
			return;
		};
		flag2=false;
		next++;
		/*if (next==tieblen) {
			return;
		};*/
		animate(tieba[now],{left:-tiebW},800,Tween.Linear);
		animate(tieba[next],{left:0},800,Tween.Linear,function(){
			flag2=true;
		});
		now=next;
	}
	// btnR.onclick=function(){
	// 	if (!flag2) {
	// 		return;
	// 	};
	// 	flag2=true;
	// 	animate(tieba,{left:-tiebW},800,Tween.Linear)
	// }




}