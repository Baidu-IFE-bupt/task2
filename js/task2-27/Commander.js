/**
 * Created by PC on 2016/4/14.
 */

Commander = {
    //记录四个飞船的状态
    status:[true,true,false,false],
    Init:function(){
        var controls = document.getElementById('control');
        controls.addEventListener('click',function(){
            var node = event.target;
            if(node.tagName.toLowerCase() == "input"){
                if(node.dataset.cmd === undefined){
                    return;
                }
                var message = {
                    id:node.parentNode.dataset.id,
                    cmd:node.dataset.cmd
                };

                //需要增加动力和能源参数
                if(message.cmd === 'Create'){
                    var ps = document.getElementsByName('PowerSystem');
                    for(var p=0;p<ps.length;p++){
                        if(ps[p].checked){
                            message.speed = parseFloat(ps[p].dataset.speed) ;
                            message.consume = parseFloat(ps[p].dataset.consume);
                        }
                    }
                    var es = document.getElementsByName('EnergySystem');
                    for(var e=0;e<es.length;e++){
                        if(es[e].checked){
                            message.supplyRate = parseFloat(es[e].dataset.supplyrate) ;
                        }
                    }
                }

                Commander.Create(message);
                Commander.Destroy(message);
                Commander.BroadCast(message);
                Commander.UpdateUI();
            }
        });
        this.UpdateUI();
        //默认增加1/2两艘飞船
        Commander.AddShip({id:1,speed:3,consume:0.5,supplyRate:0.2});
        Commander.AddShip({id:2,speed:8,consume:0.9,supplyRate:0.2});
    },
    //创建飞船后，更新status状态
    Create:function(message){
        if(message.cmd == 'Create'){
            //如果轨道满了，则不创建
            if(this.status.every(function(s){return s;})){
                return;
            }

            for(var i=0;i<this.status.length;i++){
                if(!this.status[i]){
                    this.status[i] = true;
                    message.id = i+1;
                    break;
                }
            }
        }
    },
    //销毁飞船后，更新status状态
    Destroy:function(message){
        if(message.cmd == 'Destroy'){
            this.status[message.id-1] = false;
        }
    },
    //根据status更新控件状态
    UpdateUI:function(){
        for(var i=0;i<this.status.length;i++){
            var node = document.getElementById('control'+(i+1));
            node.style.display = this.status[i] ? "block" : "none";
        }
    }
};