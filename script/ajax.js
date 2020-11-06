/*
url：AJAX请求目标地址，必写。
type：AJAX发送请求的方式，默认为 `GET`。
async：AJAX是否开启异步，默认为异步 `true`，改为 `false` 则表示同步。
data：POST方式使用JSON类型的data传值，GET方式使用查询串进行传值。
dataType：表示本次请求允许接受的响应类型。
success：回调函数，ajax帮我们调用的一个函数，函数的第一个参数中包含了响应的数据。
*/
function ajax(params) {
    let url = params["url"];
    if (!url) {
        alert("参数url不能为空！");
        return;
    }

    let xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXobject('Microsoft.xmlHTTP');
    let type = params["type"] ? params["type"].toUpperCase() : "GET";
    let async = params["async"] ? params["async"] : true;
    let dataType = params["dataType"] ? params["dataType"].toUpperCase() : "TEXT";
    let success = params["success"] ? params["success"] : null;

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 1) console.log("1：通信通道建立成功，即 open() 已被成功调用...");
        if (xhr.readyState === 2) console.log("2：请求已被服务器接收，即 send() 已被成功调用，此时头部和状态信息均可获得...");
        if (xhr.readyState === 3) console.log("3：请求处理中，此时 `responseText` 属性已经包含部分数据...");
        if (xhr.readyState === 4) console.log("4：请求已完成，表示响应已就绪...");
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("200：响应成功...");

            if ("TEXT" === dataType && success) {
                success(xhr.responseText);
            } else if ("XML" === dataType && success) {
                success(xhr.responseXML);
            }
        }
    };

    if ("GET" === type) {
        xhr.open(type, url, async);
        xhr.send();
    } else {
        xhr.open(type, url, async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params["data"]);
    }
}