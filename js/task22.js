/**
 * Created by Jiera on 2016/4/10.
 */
/*
 * 前序遍历
 * */
var preOrder = function (root, nodeArr) {
    if (root) {
        nodeArr.push(root);
        preOrder(root.firstElementChild, nodeArr);
        preOrder(root.lastElementChild, nodeArr);
    }
}
/*
 * 中序遍历
 * */
var inOrder = function (root, nodeArr) {
    if (root) {
        inOrder(root.firstElementChild, nodeArr);
        nodeArr.push(root);
        inOrder(root.lastElementChild, nodeArr);
    }
}
/*
 * 后序遍历
 * */
var postOrder = function (root, nodeArr) {
    if (root) {
        postOrder(root.firstElementChild, nodeArr);
        postOrder(root.lastElementChild, nodeArr);
        nodeArr.push(root);
    }
}
/*
 * 点击进行遍历搜索操作
 * @param [orderType] 遍历类型 'preOrder':前序遍历 'inOrder':中序遍历 'postOrder':后序遍历
 * */
var order = function (orderType) {
    var root = document.getElementById("root");
    var nodeArr = [];
    window[orderType](root, nodeArr);
    var length = nodeArr.length, i = 0;
    nodeArr[i++].style.backgroundColor = "rgb(134, 217, 254)";
    var interval = setInterval(function () {
        if (i < length) {
            nodeArr[i - 1].style.backgroundColor = '#fff';
            nodeArr[i++].style.backgroundColor = "rgb(134, 217, 254)";
        } else {
            clearInterval(interval);
            nodeArr[i - 1].style.backgroundColor = '#fff';
        }
    }, document.getElementById('interval').value);
}