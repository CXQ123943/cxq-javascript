/*需求：提交表单前，对表单的账号密码进行空值校验，登录按钮为提交按钮。*/
window.onload = () => {
    /*抓取账号框*/
    let usernameIpt = document.querySelector("#username-ipt");

    /*让账号框自动获取焦点*/
    usernameIpt.focus();

    /*抓取登录按钮*/
    let loginForm = document.querySelector("#login-form");
    loginForm["method"] = "get";
    loginForm["action"] = "#";
    loginForm.onsubmit = () =>{

        /*账号为空直接返回，账号框重设焦点*/
        if ("" === usernameIpt["value"]  || null === usernameIpt["value"]) {
            alert("账号不能为空!");
            usernameIpt.focus();
            return false;
        }

        /*密码为空直接返回，密码框重设焦点*/
        let passwordIpt = document.querySelector("#password-ipt");
        if (passwordIpt["value"] === "" || passwordIpt["value"] === null) {
            alert("密码不能为空！");
            passwordIpt.focus();
            return false;
        }
    };
};
