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
                var message = {
                    id:node.parentNode.dataset.id,
                    cmd:node.dataset.cmd
                };

                Commander.Create(message);
                Commander.Destroy(message);
                Commander.BroadCast(message);
                Commander.UpdateUI();
            }
        });
        this.UpdateUI();
        //默认增加1/2两艘飞船
        Commander.AddShip({id:1});
        Commander.AddShip({id:2});
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