/**
 * Created by PC on 2016/4/14.
 */
/**
 * 观察者模式
 * @type {{ships: null[], BroadCast: Function, SendMessage: Function, AddShip: Function, RemoveShip: Function, Make: Function}}
 */
Mediator = {
    ships:[null,null,null,null],
    //广播
    BroadCast:function(message){
        var rnd=Math.random();
        if(rnd<0.3){
            Util.Log(message,'#f00','命令传送失败');
            return;
        }
        setTimeout(this.SendMessage(message),1000);
    },
    //准备消息
    SendMessage:function(message){
        var that = this;
        return function(){
            if(message.cmd === "Create"){
                that.AddShip(message);
            }else{
                //将命令广播给所有飞船
                for(var i=0;i<that.ships.length;i++){
                    if(that.ships[i]!=null){
                        that.ships[i].ReceiveCommand(message);
                    }
                }
            }
            if(message.cmd === "Destroy"){
                that.RemoveShip(message);
            }
            Util.Log(message,'green','命令传送成功');

        }
    },
    //创建接收命令的飞船
    AddShip:function(message){
        this.ships[message.id-1] = new SpaceShip(message);
    },
    //删除飞船
    RemoveShip:function(message){
        this.ships[message.id-1] = null;
    },
    //将方法扩展给o
    Make:function(o){
        Util.extend(o,this);
    }
};

