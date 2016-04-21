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
}

window.onload = init();
/*根据蓝色面的方向前进*/
function GoByBlue(){
		var colorBlock = document.getElementById("corBlock");	
		var rotateObj = colorBlock.style.transform;
		var pre = parseFloat(rotateObj.substring(rotateObj.indexOf("(")+1,rotateObj.indexOf(")"))); 

		switch(pre){
					case 0:GO("up",45,9);	
							break;
					case 90:GO("right",45,9);								
							break;
					case -90:GO("left",45,9);								
							break;
					case 180:GO("bottom",45,9);								
							break;
					case -180:GO("bottom",45,9);								
							break;
					default:GO("up",45,9);								
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
		var s = 45;//每次移动的距离
		var step = 9;//每调用一次goUp移动的像素	
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

/*根据游戏的几种指令来做出相应的变化*/
function startGame(){
	
	var input = document.getElementById("input");
	var inputValue = input.value;
	//var index = getNowRC();

	switch(inputValue){
		case "GO":
			{
			  GoByBlue();					  										
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
		
	}
}

/*文件被加载之后调用createBlock(5,5,0)函数*/
/*window.onload = createBlock(5,5,0);*/

/*给执行按钮添加点击事件*/
var submitButton = document.getElementById("submit");
submitButton.onclick = startGame;
