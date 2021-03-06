/**
 * Created by PC on 2016/4/14.
 * 飞船类
 * @param message 飞船初始化的信息，包含飞船的编号
 */
function SpaceShip(message){
    this.id = message.id;
    this.Init();
}

//飞船初始化函数
SpaceShip.prototype.Init = function(){
    this.node = document.querySelector('#spaceship'+this.id);
    console.log(this.id +  ' '+this.node.scrollHeight);
    this.radius = this.node.scrollHeight/2;

    this.node.firstElementChild.style.display = 'block';
    //飞船显示或被销毁
    this.show = true;
    //飞船飞行或停止
    this.status = 'stop';
    //飞船当前的角度
    this.degree = this.id;
    //飞船的飞行速度
    this.speed = 10/this.radius;
    //飞船的能量
    this.energy = 100;

    this.node.style.transform = 'rotate('+this.degree+'rad)';
};

SpaceShip.prototype.Start = function(){
    if(this.show){
        this.status = 'fly';
    }
};

SpaceShip.prototype.Stop = function(){
    if(this.show){
        this.status = 'stop';
    }
};

SpaceShip.prototype.Destroy = function(){
    if(this.show) {
        this.Init();

        this.node.firstElementChild.style.display = 'none';
        this.show = false;
    }
};

SpaceShip.prototype.Fly = function(){
    if(this.energy<=0){
        this.status = 'stop';
    }
    if(this.status == 'fly' && this.energy>0){
        this.degree += this.speed;
        this.node.style.transform = 'rotate('+this.degree+'rad)';

        this.energy--;
    }else if(this.energy<100){
        this.energy++;

    }
    this.node.firstElementChild.firstElementChild.innerHTML =this.id + '号-' + this.energy +'%';
    this.node.firstElementChild.lastElementChild.style.width =(100-this.energy) +'%';

};

SpaceShip.prototype.ReceiveCommand = function(message){
    //判断是否是给自己的命令
    if(message.id.toString() !== this.id.toString()){
        return;
    }
    switch (message.cmd){
        case "Start":
            this.Start();
            break;
        case "Stop":
            this.Stop();
            break;
        case "Destroy":
            this.Destroy();
            break;
    }
};


















