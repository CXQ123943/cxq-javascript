/*利用多选框选择要删除的内容，点击删除按钮，可以将选择的内容删除，如果没有选中任何内容，则提示"至少选择一项！"*/
window.onload  = () => {
    let deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.onclick  = () => {
        let users = document.querySelectorAll("input[name=user]:checked");
        let length = users.length;
        if (length <= 0) {
            alert("您至少要选择一项！");
            return;
        }
        let result = confirm("您将要删除" + length + "个用户，确认吗？");
        if (result) {
            alert("删除成功！");
        }
    }
};