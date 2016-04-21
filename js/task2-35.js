

/*游戏开始时，方块的位置*/
function init(){
	var col =parseInt(Math.random()*9+1);
	var row =parseInt(Math.random()*9+1);
	var colorBlock = document.getElementById("corBlock");	

	var rotateObj = colorBlock.style.transform;	
	var bottom = parseFloat(colorBlock.style.bottom);
	var left = parseFloat(colorBlock.style.left);

	colorBlock.style.bottom =(bottom + (10-row)*45) + "px";
	colorBlock.style.left = (left + col*45) + "px";

	codeNumDisplay();
}

window.onload = init();
/*根据蓝色面的方向前进*/
function GoByBlue(i){
		var colorBlock = document.getElementById("corBlock");	
		var rotateObj = colorBlock.style.transform;
		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 

		switch(pre){
					case 0:GO("up",45*i,9);	
							break;
					case 90:GO("right",45*i,9);								
							break;
					case -90:GO("left",45*i,9);								
							break;
					case 180:GO("bottom",45*i,9);								
							break;
					case -180:GO("bottom",45*i,9);								
							break;
					default:GO("up",45*i,9);								
					}
}

/*前进，R和C分别是到达的行和列*/
function GO(direct,s,step){	

		var colorBlock = document.getElementById("corBlock");	

		var rotateObj = colorBlock.style.transform;	
		var bottomObj = colorBlock.style.bottom;
		var leftObj = colorBlock.style.left;

		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
		var bottom = parseFloat(bottomObj.substring(0,bottomObj.indexOf("p"))); 
		var left = parseFloat(leftObj.substring(0,leftObj.indexOf("p"))); 

		var interval = 20;	
		//var s = 45;//每次移动的距离
		//var step = 9;//每调用一次goUp移动的像素	
		var speed = s/step;

		function goUp(){
			

				if((bottom + s) > 450)
				{
					colorBlock.style.bottom = 450 + "px"; 
				}
				else if((bottom + s) < 45)
				{
					colorBlock.style.bottom = 45 + "px"; 
				}
				else
				{
					if( parseFloat(colorBlock.style.bottom) < (bottom + s))
					{
						//console.log(parseFloat(colorBlock.style.bottom));
						colorBlock.style.bottom = parseFloat(colorBlock.style.bottom)+ speed +"px";
						setTimeout(goUp,interval);//只会执行一次				
					}
				}
							
		}
		
		function goDown(){		
				if((bottom - s) > 450)
				{
					colorBlock.style.bottom = 450 + "px"; 
				}
				else if((bottom - s) < 45)
				{
					colorBlock.style.bottom = 45 + "px"; 
				}
				else
				{
					if( parseFloat(colorBlock.style.bottom) > (bottom - s))
					{
						//console.log(parseFloat(colorBlock.style.bottom));
						colorBlock.style.bottom = parseFloat(colorBlock.style.bottom) - speed +"px";
						setTimeout(goDown,interval);//只会执行一次				
					}
				}
				
			}
		

		function goLeft(){
			if((left - s) > 454)
			{
					colorBlock.style.left = 454 + "px"; 
			}
			else if((left - s) < 49)
			{
					colorBlock.style.left = 49 + "px"; 
			}
			else
			{
				if( parseFloat(colorBlock.style.left) > (left - s))
				{
					//console.log(parseFloat(colorBlock.style.left));
					colorBlock.style.left = parseFloat(colorBlock.style.left) - speed +"px";
					setTimeout(goLeft,interval);//只会执行一次				
				}
			}
						
		}

		function goRight(){
			if((left + s) > 454)
			{
					colorBlock.style.left = 454 + "px"; 					
			}
			else if((left + s) < 49)
			{
					colorBlock.style.left = 49 + "px"; 
			}
			else
			{
				if( parseFloat(colorBlock.style.left) < (left + s))
				{
				//console.log(parseFloat(colorBlock.style.left));
				colorBlock.style.left = parseFloat(colorBlock.style.left) + speed +"px";
				setTimeout(goRight,interval);//只会执行一次				
				}
			}
			
		}
		
		switch(direct)
		{
			case "up":				
				goUp();		
				break;

			case "right":
				goRight();				
				break;

			case "left":
				goLeft();			
				break;

			case "down":
				goDown();			
				break;
		}	
		
}

/*旋转到某一个角度，d是要旋转到的角度，step是旋转的步数*/
function rotateTo(d,step){
		var colorBlock = document.getElementById("corBlock");	
		var rotateObj = colorBlock.style.transform;
		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
		
		var interval = 20;	
		var dt = (Math.abs(d-pre))/step;

		function rotateR(){
			
			var rotateObjR = colorBlock.style.transform;
			
			var preR = parseFloat(rotateObjR.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")")));
			console.log(rotateObjR);
			console.log(preR);
			if( preR < d)
			{								   
				colorBlock.style.transform = "rotate(" + (preR +dt) + "deg)";
				console.log(preR +dt);						
				setTimeout(rotateR,interval);//只会执行一次		
			}
		}

		function rotateL(){
			var rotateObjL = colorBlock.style.transform;
			var preL = parseFloat(rotateObjL.substring(rotateObjL.indexOf("(")+1,rotateObjL.indexOf(")")));
			if( preL > d)
			{	

				colorBlock.style.transform = "rotate(" + (preL-dt) + "deg)";
				setTimeout(rotateL,interval);//只会执行一次

			}
		}

		if(d > pre)
		{
			rotateR();
		}
		else
		{
			rotateL();
		}
		
}

/*删除显示代码的block*/
function removeBlock(obj)
{
	   
	while(obj.hasChildNodes()) //当div下还存在子节点时 循环继续
	{
		        obj.removeChild(obj.firstChild);
	}
}

/*获取输入代码的行数，显示在左边*/
function codeNumDisplay(){
	var codeInput = document.getElementById("input");
	var numDisplay = document.getElementById("numDiv");
	
	var top = codeInput.scrollTop;

	codeInput.oninput = function(){		
		var inputValue = codeInput.value;
		var codeContent = inputValue.split("\n");
		var codeNum = inputValue.split("\n").length;
		var numTd = [];
		
		removeBlock(numDisplay);
		for(var i=0;i < codeNum;i++)
		{
			var TR = document.createElement("tr");
			var TD = document.createElement("td");
			numTd.push(numDisplay.appendChild(TR).appendChild(TD));
			numTd[i].innerHTML = i + 1;
			
		}    			
	}

	/*给文本框添加滚动条监听事件，让文本框的scrollTop和显示代码行数的div的滚动条的scrollTop相等*/
	codeInput.onscroll = function(){
		var top = codeInput.scrollTop;
		console.log(top);
		numDisplay.parentNode.parentNode.scrollTop = top;
	}
}

/*根据游戏的几种指令来做出相应的变化*/
function startGame(){
	
	var codeInput = document.getElementById("input");
	var numDisplay = document.getElementById("numDiv");
	var inputValue = codeInput.value;
	var codeContent = inputValue.split("\n");
	var codeNum = inputValue.split("\n").length;
	var numTr = numDisplay.children;
	var i = 0;

	var timer = setInterval(function(){
		if(i < codeNum)
		{
				
				var lastChar = codeContent[i].substring(codeContent[i].length-1,codeContent[i].length);
				startBycode(lastChar,codeContent[i],numTr[i]);
				console.log(codeContent[i]);
				i++;															
		}
		else
		{	
				clearInterval(timer);
		}

	},400);
			

	//console.log(codeContent[i]);	
		
}

/*游戏的每种指令对应的操作*/
function startBycode(c,con,n){
			if(isNaN(c))//如果指令中没有数字
			{
				switch(con){
					case "GO":
						{
						  GoByBlue(1);					  										
						  break;
						};

					case "TUN LEF":
						{
						  var colorBlock = document.getElementById("corBlock");	
						  var rotateObj = colorBlock.style.transform;
						  var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
						  var newRotate = pre - 90;
						  rotateTo(newRotate,10);				  										
						  break;
						};

					case "TUN RIG":
						{
						  var colorBlock = document.getElementById("corBlock");	
						  var rotateObj = colorBlock.style.transform;
						  var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
						  var newRotate = pre + 90;
						  rotateTo(newRotate,10);					  										
						  break;
						};

					case "TUN BAC":
						{
						  var colorBlock = document.getElementById("corBlock");	
						  var rotateObj = colorBlock.style.transform;
						  var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
						  var newRotate = pre + 180;
						  rotateTo(newRotate,10);				  										
						  break;
						};

					case "TRA LEF":
						{
						  GO("left",45,9);					  										
						  break;
						};	
						
					case "TRA TOP":
						 {		 				 	
							GO("up",45,9);
							break;
						 };
					case "TRA RIG":
						 {			 	
							GO("right",45,9);
							break;
						 };
					case "TRA BOT":
						 {			 	
							GO("down",45,9);
							break;
						 };
					case "MOV LEF":
						 {			 	
							GO("left",45,9);
							rotateTo(-90,10);
							break;
						 };
					case "MOV TOP":
						 {			 	
							GO("up",45,9);
							rotateTo(0,10);
							break;
						 };
					case "MOV RIG":
						 {			 	
							GO("right",45,9);
							rotateTo(90,10);
							break;
						 };
					case "MOV BOT":
						 {			 	
							GO("down",45,9);
							var colorBlock = document.getElementById("corBlock");	
							var rotateObj = colorBlock.style.transform;
							var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
							if(pre >= 0)
							{
								rotateTo(180,10);
							}
							else
							{
								rotateTo(-180,10);
							}
							break;
						 };
					default:
						n.firstChild.style.background = "red";
				}
			}
			else
			{
				var num = con.replace(/[^0-9]/ig,"");//获得指令中的数字 						
				var str = con.replace(num,"");//获得指令中的字符
				switch(str){
					case "GO ":
						{
						  GoByBlue(num);					  										
					 	  break;
						};
									
					case "TRA LEF ":
						{
						  GO("left",45*num,9);					  										
						  break;
						};	
						
					case "TRA TOP ":
						 {		 				 	
							GO("up",45*num,9);
							break;
						 };
					case "TRA RIG ":
						 {			 	
							GO("right",45*num,9);
							break;
						 };
					case "TRA BOT ":
						 {			 	
							GO("down",45*num,9);
							break;
						 };
					case "MOV LEF ":
						 {			 	
							GO("left",45*num,9);
							rotateTo(-90,10);
							break;
						 };
					case "MOV TOP ":
						 {			 	
							GO("up",45*num,9);
							rotateTo(0,10);
							break;
						 };
					case "MOV RIG ":
						 {			 	
							GO("right",45*num,9);
							rotateTo(90,10);
							break;
						 };
					case "MOV BOT ":
						 {			 	
							GO("down",45*num,9);
							var colorBlock = document.getElementById("corBlock");	
							var rotateObj = colorBlock.style.transform;
							var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 
							if(pre >= 0)
							{
								rotateTo(180,10);
							}
							else
							{
								rotateTo(-180,10);
							}
							break;
						 };
					default:
						n.firstChild.style.background = "red";


				} 
			}

}	

/*删除文本框里面的代码*/
function clearAll(){
	var codeInput = document.getElementById("input");
	var numDisplay = document.getElementById("numDiv");
	codeInput.value = "";
	removeBlock(numDisplay);
}


/*给执行按钮添加点击事件*/
var submitButton = document.getElementById("submit");
var refreshButton = document.getElementById("refresh");
submitButton.onclick = startGame;
refreshButton.onclick = clearAll;
