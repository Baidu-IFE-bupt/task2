/**
 * Created by PC on 2016/4/15.
 */
/**
 * 编码解码器
 * @type {{Encode: Function, Decode: Function}}
 */
Adapter = {
    Encode:function(message){
        var text = this.AddZero(parseInt(message.id).toString(2),4);
        switch (message.cmd){
            case "Start":
                text+="0001";
                break;
            case "Stop":
                text +="0010";
                break;
            case "Destroy":
                text += "1100";
                break;
        }
        return text;
    },
    Decode:function(text){
        var id = parseInt(text.substr(0,4),2);
        var cmd = "";
        switch (text.substr(4,4)){
            case "0001":
                cmd="Start";
                break;
            case "0010":
                cmd="Stop";
                break;
            case "1100":
                cmd="Destroy";
                break;
        }
        return {
            id:id,
            cmd:cmd
        };
    },
    AddZero:function(str,length){
        return new Array(length - str.length + 1).join("0") + str;
    }
};