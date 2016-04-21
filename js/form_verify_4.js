// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
 var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }
        else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }
        else{
            element["on"+type]=handler;
        }
    },
     removeHandler:function(element,type,handler){
         if(element.removeEventListener){
             element.removeEventListener(type,handler,false);
         }
         else if(element.detachEvent){
             element.detach("on"+type,handler);
         }
         else{
             element["on"+type]=null;
         }
     }
 }
/*function addEvent(element, event, listener, isCorrect) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, isCorrect);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}*/
function count(val){
    var len=0;
    for(var i=0;i<val.length;i++){
        if(val.charCodeAt(i)>255){
            len=len+2;
        }
        else{
            len=len+1;
        }
    }
    return len;
}

var validate = {
    //将name中的所有中文字符替换（1中文字符长度=2英文字符长度）
    nameVali: function (str) {
        var len=count(str);
        if (len>= 4&&len<=16) {
            return true;
        }
        else{
              return false;
        }
    },
    //密码验证
    passwordVali: function (str) {
        var len=count(str);
        if (len>= 8&&len<=20) {
            return true;
        }
        else{
            return false;
        }
    },

    //再次输入的密码验证
    repasswordVali: function (str, id) {
        var password = document.querySelector("#" + id).value;
        if(str.length>0){
            return (str === password);
        }
        else{
            return false;
        }
    },

    // 判断是否为邮箱地址
    emailVali: function (str) {
        var regex =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(str);
    },

    // 判断是否为手机号
    telephoneVali: function (str) {
        var regex = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
        return regex.test(str);
    },

    allVali: function () {
       /* var inputArray = document.querySelectorAll("input");
        var count = 0;

        for (var cur = 0; cur < inputArray.length; cur++) {
            if (inputArray[cur].className == "correctInput") {
                count++;
            }
        }
        return (count === inputArray.length);*/
        var inputs=document.querySelectorAll("input");
        var p=document.querySelectorAll(".status");
        var count=0
        for(var i=0;i<inputs.length;i++){
          var verify=data[i].validator(inputs[i].value);
            if(verify){
                count++;
            }
            else{
                inputs[i].className = "wrongInput";
                p[i].className = "status wrongSta";
                if (inputs[i].value.length == 0) {
                    p[i].innerText = data[i].empty;
                }
                else p[i].innerText = data[i].fail;
            }
        }
        if(count==inputs.length){
            return true;
        }
        else{
            return false;
        }
    }

}

function formFactory(data) {
    var whole = {
        settings: {
            label: data.label,
            name: data.name,
            type: data.type,
            validator: data.validator,//匿名函数
            rules: data.rules,
            success: data.success,
            empty: data.empty,
            fail: data.fail
        },
        generateInput: function() {
            var that = this;
            var container = document.getElementById("father");
            var span = document.createElement("span");
            span.innerText = that.settings.label;
            var p = document.createElement("p");
            p.className = "status";
            var label = document.createElement("label");
            var input = document.createElement("input");
            input.name = that.settings.name;
            input.type = that.settings.type;
            input.id = that.settings.name;
            EventUtil.addHandler(input,"focus",function(){
                input.className = "inputFocus";
                p.className="status";
                p.innerText = that.settings.rules;
            })
            EventUtil.addHandler(input,"blur",function(){
                var verify = "";
                verify=that.settings.validator(this.value)
                if (verify) {
                    input.className = "correctInput";
                    p.className = "status correctSta";
                    p.innerText = that.settings.success;
                }
                else {
                    input.className = "wrongInput";
                    p.className = "status wrongSta";
                    if (this.value.length == 0) {
                        p.innerText = that.settings.empty;
                    }
                    else p.innerText = that.settings.fail;
                }
            })
            container.appendChild(label);
            label.appendChild(span);
            label.appendChild(input);
            container.appendChild(p);
        },

        generateButton: function() {
            var that = this;
            var container = document.getElementById("father");
            var button = document.createElement("button");
            button.innerHTML = that.settings.label;
            EventUtil.addHandler(button,"click",function(){
                if (that.settings.validator()) {
                    alert("提交成功!");
                }
                else alert("提交失败!");
            })
            container.appendChild(button);
        },

        init: function() {
            var that = this;
            if(that.settings.name=="submit"){
                that.generateButton();
            }
            else{
                that.generateInput();
            }
            //判断类型
           /* switch (that.settings.name) {
                case 'name':
                    that.generateInput('single');
                    break;
                case 'password':
                    that.generateInput('single');
                    break;
                case 'repassword':
                    that.generateInput('verify');
                    break;
                case 'email':
                    that.generateInput('single');
                    break;
                case 'telephone':
                    that.generateInput('single');
                    break;
                case 'submit':
                    that.generateButton();
                    break;
            }*/
        }
    }
    return whole.init();
}

window.onload = function() {
    for (var i = 0; i < data.length; i++) {
        formFactory(data[i]);
    }
}/**
 * Created by liushunan on 2016/4/20.
 */
