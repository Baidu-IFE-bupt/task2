/**
 * Created by liushunan on 2016/4/20.
 */
$(document).ready(function(){
    $(".tab-menu").on("click",".cate-type",function(){
        var index=$(this).index();
        $(".tab-box").children().hide();
        $(".tab-box").children().eq(index).show();
    })
    $(".parent").change(function(){
        var data={
            "1":["请选择"],
            "2":["北京邮电大学","清华大学"],
            "3":["上海复旦","上海财经"]
        }
        var city=$(this).val();
        var s_attr="";
        for(var key in data){
            if(city==key){
                var school_data=data[key];
                for(var i=0;i<school_data.length;i++){
                    s_attr= s_attr+"<option>"+school_data[i]+"</option>";
                }
                $(".child").empty().append(s_attr);
               break
            }
        }
        return false
    })
})