/*需求：
    点击全选多选框，可以将所有内容选中，再次点击可以取消全选。
    点击反选多选框，可以将所有内容反选，再次点击再次反选。
    */
window.onload = () => {
    let allCheckCbx = document.querySelector("#all-check-cbx");
    let reCheckCbx = document.querySelector("#re-check-cbx");
    let users = document.querySelectorAll("input[name = 'user']");

    allCheckCbx.onclick = () => {
        for (let i = 0, j = users.length; i < j; i++) {
            users[i]["checked"] = allCheckCbx["checked"];
        }
    };

    reCheckCbx.onclick = () => {
        for (let i = 0, j = users.length; i < j; i++) {
            users[i]["checked"] = !users[i]["checked"];
        }
    };
};