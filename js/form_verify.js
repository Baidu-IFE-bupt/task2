/**
 * Created by liushunan on 2016/4/19.
 */
$(document).ready(function(){
  $("#ver-frm").click(function(){
      ver_frm("frm-input");
      return false;
  })
    function ver_frm(id){
        var len=count($("#"+id).val());
        if(len==0){
            $("#"+id).css("border-color","red").focus();
            $("#tips").empty().html("姓名不能为空").css("color","red");
        }
        else if(len>=4&&len<=16){
            $("#"+id).css("border-color","green").focus();
            $("#tips").empty().html("名称格式正确").css("color","green");
        }else{
            $("#"+id).css("border-color","grey").empty().focus();
            $("#tips").empty().html("必填，长度为4-16字符").css("color","grey");
        }

    }
})
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

