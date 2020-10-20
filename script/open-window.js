window.onload = () => {
    /*从DOM树种获取节点元素斌返回*/
    let openWindowBtn = document.querySelector("#open-window");
    /*为元素挂载点击事件*/
    openWindowBtn.onclick = () => {
        let newWindow = window.open("about:blank", "_blank");
        newWindow.document.write("abc");
    }
};