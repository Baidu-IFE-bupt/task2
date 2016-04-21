/**
 * Created by Jiera on 2016/4/14.
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
            depthFirst(root.children[i], nodeArr);
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
 * */
document.getElementById('root').addEventListener('click', function (e) {
    var current = e.target;
    if (current.className.indexOf('active') > -1) {
        current.style.backgroundColor = '#fff';
        current.className = current.className.replace('active ', '');
    } else {
        current.style.backgroundColor = 'yellow';
        current.className = 'active ' + current.className;
    }
})
/*
 * 添加节点
 * @param [node] 操作的节点
 * @param [content] 添加节点的内容
 * */
add = function (node, content) {
    var addNode = document.createElement('div');
    addNode.innerText = content;
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
        nodes[i].style.backgroundColor = '#fff';
        nodes[i].className = nodes[i].className.replace('active ', '');
    }
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
        nodeArr = [],
        key = document.getElementById("search").value,
        keyIndex = -1;
    if (key && search || !search) {
        window[orderType](root, nodeArr);
        var length = nodeArr.length, i = 0;
        nodeArr[i++].style.backgroundColor = "rgb(134, 217, 254)";
        var interval = setInterval(function () {
            if (i < length) {
                if (i != keyIndex) {
                    nodeArr[i - 1].style.backgroundColor = '#fff';
                }
                if (nodeArr[i].firstChild.nodeValue.replace(/^\s+|\s+$/g, "") == key && search) {
                    nodeArr[i++].style.backgroundColor = "red";
                    keyIndex = i;
                } else {
                    nodeArr[i++].style.backgroundColor = "rgb(134, 217, 254)";
                }
            } else {
                clearInterval(interval);
                if (i != keyIndex) {
                    nodeArr[i - 1].style.backgroundColor = '#fff';
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
 * @param [operation] 添加或删除操作 'add':添加节点 'del':删除节点
 * */
operateNode = function (operation) {
    var activeNodes = document.getElementsByClassName('active'),
        content = document.getElementById('text').value;
    if (activeNodes.length > 0 && ((content != '' && operation == 'add') || operation == 'del')) {
        for (var i = activeNodes.length - 1; i >= 0; i--) {
            window[operation](activeNodes[i], content);
        }
    } else if (activeNodes.length <= 0) {
        alert('请选择操作节点');
    } else {
        alert('请输入添加内容');
    }
}