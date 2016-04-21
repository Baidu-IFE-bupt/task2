/**
 * Created by liushunan on 2016/4/19.
 */
$(document).ready(function(){
   $(".form-box").on("focus",".frm-input",function(){
       $(this).next().show();
       $(this).css("border-color","grey");
       var type=$(this).attr("name");
       var t=$(this).next().text(form_remind(type)).css("color","grey");
   })
    $(".form-box").on("blur",".frm-input",function(){
        var type=$(this).attr("name");
        var val=$(this).val();
        var len=count(val);//表单的长度
        form_verify(type);
    })
    $("body").on("click",".submit",function(){
        var len=$(".frm-input").length;
        var $input=$(".frm-input");
        var f=[];
       for(var i=0;i<len;i++){
           var name=$input.eq(i).attr("name");
           $(".frm-tips").show();
           f.push(form_verify(name));
       }
       for(var j=0;j< f.length;j++ ){
           if(!f[j]){
               alert("输入错误");
               return false;
           }
       }
        alert("输入正确");
    })
})
//表单聚焦样式
function form_remind(type){
    switch(type){
        case "name":return "必填，长度为4-16字符";break;
        case "password":return "必填，长度为6-20字符";break;
        case "password_repeat":return "请再次输入相同密码";break;
        case "mailbox":return "必填，请输入正确的邮箱格式";break;
        case "phone":return "必填，请输入正确的手机格式";break;
    }
}
//表单格式验证
function form_verify(name){
    var len=$("[name="+name+"]").val().length;
    var val=$("[name="+name+"]").val();
    if(len==0){
       var type=$("[for="+name+"]").text();
        $("[name="+name+"]").css("border-color","red");
        $("[name="+name+"]").next().text(type+"不能为空").css("color","red");
        return false;
    }
    else{
        switch(name){
            case "name":return count_char(name,len,4,16); break;
            case "password":return count_char(name,len,6,20);break;
            case "password_repeat":return password_repeat();break;
            case "mailbox":return CheckMail(val,name);break;
            case "phone":return checkPhone(val,name);break;
        }

    }
}
//字符个数的验证
function count_char(name,len,min,max){
    if(len>=min&&len<=max){
        $("[name="+name+"]").css("border-color","green");
        $("[name="+name+"]").next().text("格式正确").css("color","green");
        return true;
    }
    else{
        $("[name="+name+"]").css("border-color","grey");
        $("[name="+name+"]").next().text("长度必须为"+min+"-"+max+"个字符").css("color","red");
        return false;
    }
}
//密码重复的验证
function password_repeat(){
    var password_repeat=$("[name=password_repeat]").val();
    var password=$("[name=password]").val();
    if(password==password_repeat){
        $("[name=password_repeat]").next().text("密码确定通过").css("color","green");
        return true;
    }
    else{
        $("[name=password_repeat]").next().text("密码两次输入不正确").css("color","red");
        return false;
    }
}
//邮箱的验证
function CheckMail(mail,name) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) {
        $("[name=" + name + "]").next().text("邮箱格式正确通过").css("color", "green");
        return true;
    }
    else {
        $("[name=" + name + "]").next().text("邮箱格式错误").css("color", "red");
        return false;
    }
}
//手机验证
function checkPhone(mobile,name){
    if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(mobile))
    {
        $("[name=" + name + "]").next().text("手机号码格式错误").css("color", "red");
        return false;
    }
    else{
        $("[name=" + name + "]").next().text("手机号码格式正确通过").css("color", "green");
        return true;
    }
}
//表单长度
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