//获取类名的兼容函数
function getClass(classname,father){//classname 是要查找的类名   father  代表的是父容器的名字
    var obj=father || document;//进行判断  
    if (obj.getElementsClassNme) {//FF
        return obj.getElementsByClassNme(classname);
    }else{//IE
        var alls=obj.getElementsByTagName("*");//获取所有的元素
        var arr=[];
        for (var i = 0; i < alls.length; i++) {//进行遍历
        	if (Check(alls[i].className,classname)) {//值为真时，把这个类名添加进空数组中
        		arr.push(alls[i]);
        	};
        };  
    };
    return arr;
}
function Check(str,classname){//str  类名
    var newarr=str.split(" ");//把字符串的名字以空格作为分割符，分割成数组
    for (var i = 0; i < newarr.length; i++) {//进行遍历
        if (newarr[i]==classname) {//如果数组元素与要查找的类名相同，那么返回true；
            return true;
        };
    };
    return false;//如果数组中的数组元素没有与类名相同的值，那么返回假
}



//2.获取与设置对象的纯文本的兼容函数
//obj：从哪个对象里来获取纯文本
//val：表示要设置的文本
//弊端：如果对象的内容为空时，火狐设置不成功
//FF   obj.textContent
//IE   obj.innerText
function getText(obj,val){
    if (val!=undefined) {//设置
        if (obj.textContent || obj.textContent=="") {//为真时，表示是W3C的浏览器
           
            obj.textContent=val;
            //return obj.textContent;
        } else{//表示IE
            obj.innerText=val;
            //return obj.innerText

        };
    } else{//获取
        if (obj.textContent) {//为真时，表示是W3C的浏览器
            return obj.textContent;
        } else{//表示IE
            return obj.innerText;
        };
    };
}




//3.获取外部样式的兼容函数
//FF：window.getComputedStyle(对象,null).属性
//IE：对象.currentStyle.属性
function getStyle(obj,Attr){//Attr 属性
    if (window.getComputedStyle) {//为真时，表示是FF
        return window.getComputedStyle(obj,null)[Attr]
    } else{//表示IE
        return obj.currentStyle[Attr]
    };
}


//4.获取document对象的方法的函数
//  $(".one");  slice(0,1)   charAt(0)=""
//  $("#first");
//  $("div");div a input img ul li h1 h2 h3 h4 h5 h6
function $(selector,father){
    var obj=father || document;
    if (typeof selector=="string") {//判断selector是否是字符串
    // /^\s*|\s*$/g   找出字符串前后的空格
    //"      a      "   "a"
        var selector=selector.replace(/^\s*|\s*$/g,"");
        // /^\s*|\s*$/g   找出字符串前后的空格  用空字符串代替
        //置换后的结果会覆盖以前的字符串
        if(selector.slice(0,1)=="."){//判断字符串的第一个字符是否是 . 
            return getClass(selector.slice(1),obj);
            //如果是，那么调用获取类名的兼容函数
        }else if (selector.slice(0,1)=="#") {//判断字符串的第一个字符是否是#
            return obj.getElementById(selector.slice(1))
            //如果是就使用id
        }else if (/^[a-z|1-10]{1,10}$/g.test(selector)) {
            return obj.getElementsByTagName(selector);
        };
    }else if (typeof selector=="function") {
        window.onload=function(){
            selector();
        }
    };
} 
//5.获取对象的子节点的兼容函数
//a:之获取元素节点  b:获取元素+文本节点
function getChlid(father,type){
    var type=type||"a";//type没有赋值时，默认为"a"(也就是第二个参数省略时，默认只获取元素节点)
    var childs=father.childNodes;//找到所有的子节点
    var arr=[];//声明一个容器
    for (var i = 0; i < childs.length; i++) {
        if (type=="a") {
            if (childs[i].nodeType==1) {//获取所有元素节点
                arr.push(childs[i]);
            };
        } else if (type=="b") {
            if (childs[i].nodeType==1||(childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && childs[i].nodeType!=8)) {
            //获取所有元素节点
                arr.push(childs[i]);
            };
        };
                
    };
    return arr;
}  
//6.获取第一个子节点
function getFirst(father){
    return getChlid(father)[0];
}
//7.获取最后一个子节点
function getLast(father){
    return getChlid(father)[getChlid(father).length-1]
}
//8.获取指定的子节点
function getNum(father,num){
    return getChlid(father)[num]
}
//9.获取下一个兄弟节点
function getDown(obj){
    var down=obj.nextSibling;
    while(down.nodeType==3|| down.nodeType==8){
        down=down.nextSibling;
        if (down==null) {
            return false;
        };
    }
    return down;
}
//10.获取上一个兄弟节点
function getUp(obj){
    var up=obj.previousSibling;
    if (up==false) {
        return false;
    };
    while(up.nodeType==3||up.nodeType==8){
        up=up.previousSibling;
        if (up==null) {
            return false;
        };
    }
    return up;
} 
//11.要插入到某个对象之后
//newobj:要追加的对象
//obj:在哪个对象之前
//对象共有的方法一般是加在原型上的，而原型只能给构造函数添加，所以共有的方法是添加到对象的构造函数的原型上
//this:指的是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象。
Node.prototype.insertAfter=function(newobj,obj){
    var down=getDown(obj);//获取obj的下一个兄弟节点
    if (down) {//如果这个兄弟节点存在
        this.insertBefore(newobj,down)//就把newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
    }else{//如果这个兄弟节点不存在，表示obj就是最后一个节点了
        this.appendChild(newobj);//直接追加到父对象的后面
    };
}


//12.漂浮窗
//pao:漂浮窗本身
//close:关闭按钮
//sleepX:漂浮窗每次向左移动的距离
//sleepY:漂浮窗每次向下移动的距离
//times:多长时间循环一次
function windowFixed(pao,close,sleepX,sleepY,times){
    var sleepX=sleepX||5;
    var sleepY=sleepY||5;
    var cheight=document.documentElement.clientHeight;//浏览器的高度
    var cwidth=document.documentElement.clientWidth;//浏览器的宽度
    var sheight=pao.offsetHeight;//自身的高度
    var swidth=pao.offsetWidth;//自身的宽度          
    window.onresize=function(){//时刻刷新
        cheight=document.documentElement.clientHeight;
        cwidth=document.documentElement.clientWidth;
    }
    var t=setInterval(move,times);
    function move(){
                
        var selfleft=pao.offsetLeft;//自身到浏览器左边的距离
        var selftop=pao.offsetTop;//自身到浏览器上边的距离
        var newleft=selfleft+sleepX;//当前自身到浏览器左边的距离
        var newtop=selftop+sleepY;//当前自身到浏览器上边的距离
        pao.style.marginLeft=newleft+"px";
        pao.style.marginTop=newtop+"px";
        if (newtop>=(cheight-sheight)) {//当浏览器的宽和它本身的宽的差小于当前自身到浏览器左边的距离时
            newtop=cheight-sheight;
            sleepY*=-1;                    
        };
        if (newleft>=(cwidth-swidth)) {
            newleft=cwidth-swidth;
            sleepX*=-1;
        };
        if (newtop<=0) {//上
            newtop=0;
            sleepY*=-1;
        };
        if (newleft<=0) {
            newleft=0;
            sleepX*=-1;
        };
    }
    pao.onmouseover=function(){
        clearInterval(t);
    }
    pao.onmouseout=function(){
        t=setInterval(move,times);
    }
    close.onclick=function(){
        // pao.style.display="none";
        document.body.removeChild(pao)
    }
    window.onscroll=function(){
        //document.write(document.documentElement.scrollTop)
        //兼容问题
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        document.write(obj.scrollTop)
    }
}
//13.通过节点做轮播
function jdlb(imgbox,leftbtn,rightbtn,imgs){
    var imgbox=$(imgbox)[0];
    var leftbtn=$(leftbtn)[0];
    var rightbtn=$(rightbtn)[0];
    var imgs=$(imgs)[0];
    var t=setInterval(moveleft,2000);
    function moveleft(){//左移
        animate(imgbox,{left:-600},800,Tween.Linear,function(){
            imgbox.style.left=0;
            var first=getFirst(imgbox);
            imgbox.appendChild(first);
        })
    }
    function moveright(){
        imgbox.style.left="-600px";//位置变化               
        var last=getLast(imgbox);//获取最后一个元素
        imgbox.insertBefore(last,getFirst(imgbox));//把获取到的元素插入到第一个元素之前
        animate(imgbox,{left:0},800,Tween.Linear)
    }
    leftbtn.onmouseover=rightbtn.onmouseover=function(){//当鼠标滑入
        clearInterval(t);
    }
    leftbtn.onmouseout=rightbtn.onmouseout=function(){//当鼠标滑出
        t=setInterval(moveleft,2000);
    }
    leftbtn.onclick=function(){
        moveleft();
    }
    rightbtn.onclick=function(){
        moveright();
    }
}
//14.同一事件添加多个处理程序的兼容函数
function addEvent(obj,event,fun){
    if (obj.addEventListener) {
        return obj.addEventListener(event,fun,false);
    } else{
        return obj.attachEvent("on"+event,fun)
    };
}
//15.同一事件移除多个处理程序的兼容函数
function removeEvent(obj,event,fun){
    if (obj.removeEventListener) {
        return obj.removeEventListener(event,fun,false);
    } else{
        return obj.detachEvent("on"+event,fun)
    };
}
//16.解决鼠标滚轮事件的兼容函数
function mouseWheel(obj,upfun,downfun){
    
    if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit
        obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
    }
    function scrollFn(e){
        var ev=e||window.event;
        if (ev.detail==-3||ev.wheelDelta==120) {
            if (upfun) {
                upfun.call(obj);
            };
        }
        if (ev.detail==3||ev.wheelDelta==-120) {
            if (downfun) {
                downfun.call(obj);
            };
        };
        //阻止浏览器的默认行为
        if (ev.preventDefault ){
            ev.preventDefault(); //阻止默认浏览器动作(W3C)
        }else{
            ev.returnValue = false;//IE中阻止函数器默认动作的方式
        }
    }
}
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
 function getObj(obj){
    return obj=document.documentElement.scrollTop?document.documentElement:document.body;
 }
//阻止事件流的兼容函数
//obj：事件对象
function stopEvent(obj){
    if (obj.stopPropagation) {
        obj.stopPropagation();
    } else{
        obj.cancelBubble=true;
    };
}
//阻止浏览器的默认样式
function stopClient(obj){
    if (obj.preventDefault ){
        obj.preventDefault(); //阻止默认浏览器动作(W3C)
    }else{
        obj.returnValue = false;//IE中阻止函数器默认动作的方式
    }
}
//按需加载

function axjz(obj){
    var floor=$(obj);
    var ch=document.documentElement.clientHeight;
    window.onscroll=function(){
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        for (var i = 0; i < floor.length; i++) {
            if (floor[i].offsetTop<obj.scrollTop+ch) {
                var imgs=$("img",floor[i]);
                for(j=0;j<imgs.length;j++){
                    imgs[j].src=imgs[j].getAttribute("aa");
                }
            };
        };
    }
}


/*
    获取具有定位属性的父元素   相对于body的left  top值
    offset(obj).left   相对于body  left
    offset(obj).top    相对于body  top
*/
function offset(obj){
    var parent=obj.parentNode;
    var arr=[];
    var x=0;
    var y=0;
    while(parent.nodeName!=="BODY"){
        var position=getStyle(parent,"position");
        if (position=="relative"||position=="absolute"||position=="fixed") {
            arr.push(parent);
        };
        parent=parent.parentNode;
    }
    for (var i = 0; i < arr.length; i++) {
        var left=arr[i].offsetLeft;
        var blw=parseInt(getStyle(arr[i],"borderLeftWidth"));
        x+=left+blw;
        var top=arr[i].offsetTop;
        var btw=parseInt(getStyle(arr[i],"borderTopWidth"));
        y+=top+btw;
    };
    return {left:x,top:y};
}
function stopClient(obj){
    if (obj.preventDefault ){
        obj.preventDefault(); //阻止默认浏览器动作(W3C)
    }else{
        obj.returnValue = false;//IE中阻止函数器默认动作的方式
    }
}