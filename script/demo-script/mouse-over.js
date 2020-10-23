/*需求：当鼠标经过 [记住密码] 的多选框时，提示"请不要再公共场合勾选此项！"，当鼠标移出 [记住密码] 的多选框时，提示取消。*/
onload = () => {
    let rememberPwdCbx = document.querySelector("#remember-pwd-cbx");
    let rememberPwdMsg = document.querySelector("#remember-pwd-msg");
    rememberPwdCbx.onmouseover = () => {
        rememberPwdMsg["style"]["display"] = "inline";
    };
    rememberPwdCbx.onmouseout = () => {
        rememberPwdMsg["style"]["display"] = "none";
    };
};