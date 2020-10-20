window.onload = () => {
    let openWindowBtn = document.querySelector("#open-window");
    openWindowBtn.onclick = () => {
        let newWindow = window.open("about:blank", "_blank");
        newWindow.document.write("abc");
    }
};