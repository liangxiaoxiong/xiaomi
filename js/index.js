window.onload=function () {
	var banner=$(".banner")[0];
	var imgs=$("img",banner);
	var tubottom=$(".tu-bottom")[0];
	var lis=$("li",tubottom);
	var lislen=lis.length;
	var imgslen=imgs.length;
	var btnl=$(".btnl")[0];
	var btnr=$(".btnr")[0];
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
			
			t=setInterval(move,4000);
			num=this.index+1;
		})
	};


	var t=setInterval(move,4000);
	//自动
	var num=1;
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
		lis[num] .className="a";
		num++;
	}
	
	

	btnr.onclick=function(){
		move();
	}
	btnl.onclick=function(){
		
		if (num==-1) {
			num=imgslen-1;
		};
		for (var i = 0; i < imgslen; i++) {
			imgs[i].style.zIndex=4;
			lis[i].className="";
		};
		imgs[num].style.zIndex=6;
		lis[num].className="a";
		num--;
	}

	tubottom.onmouseover=function(){
		clearInterval(t);
	}
	tubottom.onmouseout=function(){
		t=setInterval(move,4000);
	}

	var mingtop=$(".ming-top")[0];
	var leftbtn=$(".leftbtn")[0];
	var rightbtn=$(".rightbtn")[0];
	var topa=$("a",mingtop);
	var mings=$(".mings")[0];
	var lm=mings.style.marginLeft
	var flag=true;
	var t1=setInterval(moves,3000);
	var nm=0
	function moves(){
		nm++;
		if (nm==2) {
			nm=0;
		};
		animate(mings,{marginLeft:-1240*nm},800);
	}
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
	leftbtn.onmouseover=rightbtn.onmouseover=function(){
		clearInterval(t1);
	}
	leftbtn.onmouseout=rightbtn.onmouseout=function(){
		t1=setInterval(moves,3000);
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
	for (var i =0; i<zu.length; i++) {
		zu[i].index=i;
		hover(zu[i],function(){
			var uls=$("ul",cemian[this.index]);
			var W=uls[0].offsetWidth;
			animate(cemian[this.index],{width:W*uls.length},100)
		},function(){
			animate(cemian[this.index],{width:0},100)
		})
	};
	//搭配
	function xuan(tibaus,tibbboxs,tibbs,classMing){
		var tibau=$(tibaus)[0];
		var lid=$("li",tibau);
		var tibbbox=$(tibbboxs)[0];
		var tibb=$(tibbs,tibbbox);
		for (var i = 0; i < lid.length; i++) {
			lid[i].index=i;
			hover(lid[i],function (){
				for (var j = 0; j < tibb.length; j++) {
					tibb[j].style.display="none";
					lid[j].className=""
				};
				tibb[this.index].style.display="block";
				lid[this.index].className=classMing;
			})
		};
	}
	xuan(".ti-bau",".tibb-box",".ti-bb","hot");
	xuan(".ti-cau",".ticb-box",".ti-cb","hos");
	xuan(".ti-dau",".tidb-box",".ti-db","hoh");
	//评价信息
	var pinglun=$(".pinglun");
	var pingjia=$(".pingjia");
	for (var i = pinglun.length - 1; i >= 0; i--) {
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
		if (!flag2||next==tieblen-1) {
			return;
		};
		flag2=false;
		next++;
		animate(tieb[now],{left:-tiebW},800,Tween.Linear);
		animate(tieb[next],{left:0},800,Tween.Linear,function(){
			flag2=true;
		})
		now=next;
	}
	btnR.onclick=function(){
		if (!flag2||next==0) {
			return;
		};
		flag2=false;
		next--;
		animate(tieb[now],{left:tiebW},800,Tween.Linear);
		animate(tieb[next],{left:0},800,Tween.Linear,function(){
			flag2=true;
		})
		now=next;
	}

	/*内容*/
	function neirong(btnl1,btnr1,tigbabox,tigbae){
		var btnl1=$(btnl1)[0];
		var btnr1=$(btnr1)[0];
		var tigbabox=$(tigbabox);
		var tigbae=$(tigbae)[0];
		var lia=$('li',tigbae);
		var tigbaboxW=tigbabox[0].offsetWidth;
		var tigbaboxlen=tigbabox.length;
		for (var i = 0; i < tigbaboxlen ; i++) {
			if(i!=0){
				tigbabox[i].style.left=tigbaboxW+"px";
			}
		};
		var ab=0;
		var ac=0;
		var flag3=true;
		btnl1.onclick=function(){
			if (!flag3||ac==tigbaboxlen-1) {
				return;
			};
			flag3=false;
			ac++;
			animate(tigbabox[ab],{left:-tigbaboxW},800,Tween.Linear);
			animate(tigbabox[ac],{left:0},800,Tween.Linear,function(){
				flag3=true;
			})
			lia[ab].className='';
			lia[ac].className='a';
			ab=ac;
		}
		btnr1.onclick=function(){
			if (!flag3||ac==0) {
				return;
			};
			flag3=false;
			ac--;
			animate(tigbabox[ab],{left:tigbaboxW},800,Tween.Linear);
			animate(tigbabox[ac],{left:0},800,Tween.Linear,function(){
				flag3=true;
			})
			lia[ab].className='';
			lia[ac].className='a';
			ab=ac;
		}
	}
	neirong('.btnl1','.btnr1','.tigbabox',".ti-gb-ae")
	neirong('.btnl2','.btnr2','.tigbbbox',".ti-gb-be")
	neirong('.btnl3','.btnr3','.tigbcbox',".ti-gb-ce")
	neirong('.btnl4','.btnr4','.tigbdbox',".ti-gb-de")
	/*文本框*/
	// var sousuob=$(".dd")[0];
 //    var yincang=$(".logo-right-right-a")[0];
 //    var dda=$('.dda')[0]
	// sousuob.onfocus=function(){//获得焦点
 //        // if (sousuob.value=="共度七夕，商品促销大狂欢！") {
 //        //     sousuob.value=""
           	
 //        // }; 
 //        yincang.style.display="none";
 //        dda.style.display="none";
        
 //    }
 //    sousuob.onblur=function(){//失去焦点
 //        // if (sousuob.value) {

 //        // } else{
 //        //     sousuob.value="共度七夕，商品促销大狂欢！"
            
 //        // };
 //        yincang.style.display="block";
 //        dda.style.display="block";
 //   }
}