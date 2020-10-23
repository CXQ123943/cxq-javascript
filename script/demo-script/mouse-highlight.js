/*需求：当鼠标经过某一行内容的时候，文本可以高亮显示，当鼠标开某一行内容的时候，高亮取消。*/
window.onload = () => {
    let lyrics = document.querySelector("#lyrics");
    let lis = lyrics.querySelectorAll("li");
    for (let i = 0, j = lis.length; i < j; i++) {
        lis[i].onmouseover = () => {
            lis[i]["style"]["backgroundColor"] = "yellow";
            lis[i]["style"]["fontSize"] = "50px";
        };
        lis[i].onmouseout = () => {
            lis[i]["style"]["backgroundColor"] = "";
            lis[i]["style"]["fontSize"] = "";
        };
    }
};