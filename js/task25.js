/**
 * Created by Jiera on 2016/4/15.
 */

/*
 * 深度优先遍历
 * @param [root] 根节点
 * @param [nodeArr] 节点遍历数组
 * */
var depthFirst = function (root, nodeArr) {
    if (root) {
        nodeArr.push(root);
        for (var i = 0; i < root.children.length; i++) {
            if(root.children[i].tagName=='UL' || root.children[i].tagName=='LI'){
                depthFirst(root.children[i], nodeArr);
            }
        }
    }
}
/*
 * 广度优先遍历
 * @param [root] 根节点
 * @param [nodeArr] 节点遍历数组
 * */
var breadthFirst = function (root, nodeArr) {
    var arr = [];
    if (root) {
        arr.push(root);
    }
    while (arr.length > 0) {
        var p = arr.shift();
        nodeArr.push(p);
        for (var i = 0; i < p.children.length; i++) {
            arr.push(p.children[i]);
        }
    }
}
/*
 * 点击选择或取消选择节点
 * 点击展开或者收起
 * */
document.getElementById('root').addEventListener('click',function(e){
    var current= e.target;
    var next= current.nextElementSibling;
    var temp=current.parentNode.childNodes;
    if(current.className.indexOf('folder_open')>-1
        || current.className.indexOf('folder_close')>-1
        || current.className.indexOf('line_first')>-1
        || current.className.indexOf('line_middle')>-1
        || current.className.indexOf('line_last')>-1
        || current.className.indexOf('lowest')>-1
        || current.className.indexOf('data')>-1 ){
        current=current.parentNode;
    }
    if(current.className.indexOf('open')>-1 && current.className.indexOf('folder_open')<0){
        //收起
        current.className = current.className.replace('open', 'close');
        next.className = next.className.replace('folder_open', 'folder_close');
        for(var j=0;j<temp.length;j++){
            //console.log(temp[j].tagName)
            if(temp[j].tagName=='UL'){
                temp[j].style.display='none';
                return false;
            }
        }
    }else if(current.className.indexOf('close')>-1 && current.className.indexOf('folder_close')<0){
        //展开
        current.className = current.className.replace('close', 'open');
        next.className = next.className.replace('folder_close', 'folder_open');
        for(var j=0;j<temp.length;j++){
            if(temp[j].tagName=='UL'){
                temp[j].style.display='block';
                return false;
            }
        }
    }
    //选择或取消选择
    if (current.className.indexOf('active') > -1) {
        current.style.backgroundColor = '#fff';
        current.className = current.className.replace('active', '');
    }else if(current.tagName=='UL'){

    } else {
        current.style.backgroundColor = 'yellow';
        current.className += ' active';
    }
})
/*
 * 添加节点
 * @param [node] 操作的节点
 * @param [content] 添加节点的内容
 * */
add = function (node, content) {
    var addNode = document.createElement('li');
    //addNode.innerText = content;
    addNode.innerHTML='<span class="icon line_last"></span><span class="icon lowest"></span><span class="data">'+content+'</span>';
    node.appendChild(addNode);
}
/*
 * 删除节点
 * @param [node] 操作的节点
 * */
del = function (node) {
    node.parentNode.removeChild(node);
}
/*
 * 重置颜色
 * */
resetColor = function () {
    var root = document.getElementById("root"),
        nodes = root.getElementsByTagName('*');
    for (var i = 0; i < nodes.length; i++) {
        if(nodes[i].tagName=='LI'){
            nodes[i].style.backgroundColor = '#fff';
            nodes[i].className = nodes[i].className.replace('active', '');
        }
    }
}
/*
* 筛选出LI标签元素
* */
var filterElements=function(node){
    var newNode=[];
    for(var i = 0; i < node.length; i++)
    {
        if(node[i].tagName =='LI') {
            newNode.push(node[i]);
        }
    }
    return newNode;
}
/*
 * 点击进行遍历搜索操作
 * @param [orderType] 遍历类型 'depthFirst':深度优先遍历 'breadthFirst':广度优先遍历
 * @param [search] 是否进行搜索 true:搜索 false:不搜索 默认不写不搜索
 * */
order = function (orderType, search) {
    resetColor();
    search = arguments[1] ? arguments[1] : false;
    var root = document.getElementById("root"),
        nodeArrNew = [],
        key = document.getElementById("search").value,
        keyIndex = -1;
    if (key && search || !search) {
        window[orderType](root, nodeArrNew);
        var nodeArr=filterElements(nodeArrNew);
        //console.log(nodeArr);
        nodeArr.unshift(nodeArr[0])
        var length = nodeArr.length, i = 0;
        nodeArr[i++].style.backgroundColor = "#fff";
        var interval = setInterval(function () {
            if (i < length) {
                if (i != keyIndex) {
                    nodeArr[i - 1].style.backgroundColor = '#fff';
                }
                if (nodeArr[i].children[2].innerText.replace(/^\s+|\s+$/g, "") == key && search) {
                    nodeArr[i++].style.backgroundColor = "red";
                    keyIndex = i;
                    //找到则打开文件
                    var specialNode=nodeArr[i-1];
                    specialNode.style.display='block';
                    if(specialNode.children[0].className.indexOf('close')>-1){
                        specialNode.children[0].className=specialNode.children[0].className.replace('close','open');
                        specialNode.children[1].className=specialNode.children[1].className.replace('close','open');
                    }
                    console.log(specialNode);
                    while (specialNode.parentNode.tagName!='DIV'){
                        specialNode=specialNode.parentNode;
                        specialNode.style.display='block';
                        if(specialNode.children[0].className.indexOf('close')>-1){
                            specialNode.children[0].className=specialNode.children[0].className.replace('close','open');
                            specialNode.children[1].className=specialNode.children[1].className.replace('close','open');
                        }
                        console.log(specialNode);
                    }
                } else {
                    nodeArr[i++].style.backgroundColor = "rgb(134, 217, 254)";
                }
            } else {
                clearInterval(interval);
                if (i != keyIndex) {
                    nodeArr[i-1].style.backgroundColor = '#fff';
                }
                if (keyIndex == -1 && search) {
                    alert('未找到搜索内容');
                }
            }
        }, document.getElementById('interval').value);
    } else {
        alert('请输入搜索内容');
    }
}
/*
 * 点击操作添加或删除节点
 * 添加或删除操作 'add':添加节点 'del':删除节点
 * */
operateNode = function (operation) {
    var activeNodes = document.getElementsByClassName('active'),
        content = document.getElementById('text').value;
    if (activeNodes.length > 0 && ((content != '' && operation == 'add') || operation == 'del')) {
        if(operation == 'add'){
            for (var i = 0; i <activeNodes.length; i++) {
                //console.log(activeNodes[i].lastElementChild.tagName)
                //console.log(activeNodes[i].lastElementChild)
                //console.log(activeNodes[i].lastElementChild.lastElementChild)
                if(activeNodes[i].lastElementChild.tagName=='UL'){//已有子元素
                    if(activeNodes[i].lastElementChild.lastElementChild.lastElementChild.tagName=="UL"){
                        //console.log(activeNodes[i].lastElementChild.lastElementChild.lastElementChild.tagName)
                        activeNodes[i].lastElementChild.lastElementChild.lastElementChild.className='line';
                    }else if(activeNodes[i].lastElementChild.lastElementChild.lastElementChild.tagName=="SPAN"){
                        //console.log(activeNodes[i].lastElementChild.lastElementChild.lastElementChild.tagName)
                        activeNodes[i].lastElementChild.lastElementChild.firstElementChild.className='icon line_middle';
                    }
                    add(activeNodes[i].lastElementChild,content)
                }else if(activeNodes[i].lastElementChild.tagName=='SPAN'){
                    activeNodes[i].children[0].className='icon open';
                    activeNodes[i].children[1].className='icon folder_open';
                    var addNode=document.createElement('ul');
                    if(activeNodes[i].nextElementSibling!=null){
                        addNode.className+=' line';
                    }
                    add(addNode,content);
                    activeNodes[i].appendChild(addNode);
                }
            }
        }else {
            for (var i = activeNodes.length - 1; i >= 0; i--) {
                if(activeNodes[i].nextElementSibling==null) {//如果是最后一个元素
                    if (activeNodes[i].previousElementSibling != null) {//但不是唯一元素
                        //console.log(activeNodes[i].previousElementSibling.lastElementChild.className)
                        if (activeNodes[i].previousElementSibling.lastElementChild.tagName == 'UL') {
                            activeNodes[i].previousElementSibling.lastElementChild.className='';
                            //console.log(activeNodes[i].previousElementSibling.lastElementChild.className)
                        } else if (activeNodes[i].previousElementSibling.lastElementChild.tagName == 'SPAN') {
                            activeNodes[i].previousElementSibling.children[0].className = 'icon line_last';
                        }
                        del(activeNodes[i]);
                    }else{//是唯一元素
                        var ulNode=activeNodes[i].parentNode;
                        //console.log(ulNode)
                        //console.log(ulNode.parentNode.children[0])
                        if(ulNode.parentNode.nextElementSibling==null){
                            ulNode.parentNode.children[0].className='icon line_last';
                        }else {
                            ulNode.parentNode.children[0].className='icon line_middle';
                        }
                        ulNode.parentNode.children[1].className='icon lowest';
                        ulNode.parentNode.removeChild(ulNode);
                    }
                }else {
                    del(activeNodes[i]);
                }
            }
        }
    } else if (activeNodes.length <= 0) {
        alert('请选择操作节点');
    } else {
        alert('请输入添加内容');
    }
}

