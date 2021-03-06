/**
 * Created by PC on 2016/4/15.
 */
BUS = {};

Util.extend(BUS,Mediator);

BUS.BroadCast = function(message){
    var rnd=Math.random();
    while(rnd<0.1){
        Util.Log(message,'#f00','命令传送失败');
        Util.Log(message,'#f00','准备重试');
        rnd = Math.random();
    }
    setTimeout(this.SendMessage(message),300);
};

//创建的飞船为升级版
BUS.AddShip=function(message){
    this.ships[message.id-1] = new SpaceShip2(message);
};

BUS.SendMessage = function(message){
    var that = this;
    return function(){
        if(message.cmd === "Create"){
            that.AddShip(message);
        }else{
            //将命令广播给所有飞船
            for(var i=0;i<that.ships.length;i++){
                if(that.ships[i]!=null){
                    that.ships[i].ReceiveCommand(Adapter.Encode(message));
                }
            }
        }
        if(message.cmd === "Destroy"){
            that.RemoveShip(message);
        }
        Util.Log(message,'green','命令传送成功');
    }
};


