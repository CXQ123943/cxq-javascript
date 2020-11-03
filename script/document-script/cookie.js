/*设置cookie的方法，eDay代表过期天数*/
function setCookie(key, value, eDay = 1) {
    let now = new Date();
    let new_data = now.getDate() + eDay;
    now.setDate(new_data);
    document.cookie = `${key}=${value};expires=${now}`;
}

function getCookie(key) {
    let result = null;
    let cookies = document.cookie.split("; ");
    for (let i = 0, j = cookies.length; i < j; i++) {
        let kvs = cookies[i].split("=");
        if (kvs[0] === key) {
            result = kvs[1];
            break;
        }
    }
    return result;
}

function delCookie(key) {
    if (getCookie(key)) {
        setCookie(key, "", -1);
    }
}