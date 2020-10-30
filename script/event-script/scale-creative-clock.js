// JavaScript Document

let c = document.getElementById("myCanvas");

let ctx = c.getContext("2d");

let ww = c.width = $(window).outerWidth();
let wh = c.height = $(window).outerHeight();

let center = {x: ww / 2, y: wh / 2};


function getWindowSize() {
    ww = c.width = $(window).outerWidth();
    wh = c.height = $(window).outerHeight();

    center = {x: ww / 2, y: wh / 2};

    ctx.restore();
    ctx.translate(center.x, center.y);
}

$(window).resize(getWindowSize);
getWindowSize();

let time = 0;
setInterval(draw, 10);

function draw() {

    ctx.fillStyle = "#111";
    ctx.beginPath();

    ctx.rect(-2000, -2000, 4000, 4000);
    ctx.fill();


    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;

    ctx.moveTo(-ww / 2, 0);
    ctx.lineTo(ww / 2, 0);

    ctx.moveTo(0, -wh / 2);
    ctx.lineTo(0, wh / 2);
    ctx.stroke();

    let r = 200;

    let deg_to_pi = Math.PI / 180;

    //重新開始繪製
    ctx.beginPath();
    ctx.lineWidth = 1;
    for (let i = 0; i <= 200; i++) {
        let var_r = r + Math.sin(Math.PI * 2 * i / 10 + time / 20) * 2;
        let deg = (i / 200) * 360 * deg_to_pi;
        ctx.lineTo(
            var_r * Math.cos(deg),
            var_r * Math.sin(deg)
        );
    }

    ctx.strokeStyle = "#FFF";
    ctx.stroke();

    let r2 = 220;
    let r4 = 20;
    let r3 = r2 + r4;
    let count = 240;
    for (let i = 0; i <= count; i++) {
        if (i % 10 === 0) {
            r3 = r2 + 30;
        } else {
            r3 = r2 + 20
        }

        let deg = i / count * 360 * deg_to_pi;
        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(
            r2 * Math.cos(deg),
            r2 * Math.sin(deg)
        );
        ctx.lineTo(
            r3 * Math.cos(deg),
            r3 * Math.sin(deg)
        );

        ctx.strokeStyle = "#FFF";
        ctx.stroke();
    }


    for (let i = 0; i <= 60; i++) {
        let deg = i / 60 * 360 * deg_to_pi;
        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(
            350 * Math.cos(deg),
            350 * Math.sin(deg)
        );
        ctx.lineTo(
            360 * Math.cos(deg),
            360 * Math.sin(deg)
        );

        ctx.strokeStyle = "#9FF781";
        ctx.stroke();
    }

    let now = new Date;
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hour = now.getHours();
    let deg_sec = (-6 * sec + 90) * deg_to_pi;
    let deg_min = (-6 * min + 90) * deg_to_pi;
    let deg_hur = (-30 * (hour + min / 60) + 90) * deg_to_pi;
    pointer(250, deg_sec, 1);
    pointer(200, deg_min, 1);
    pointer(150, deg_hur, 4);


    function pointer(r, deg, linewidth) {
        ctx.beginPath();
        ctx.lineWidth = linewidth;
        ctx.strokeStyle = "rgba(255,255,255,0.5)";

        ctx.moveTo(
            0, 0
        );
        ctx.lineTo(
            r * Math.cos(deg),
            r * Math.sin(deg)
        );
        ctx.stroke();

    }


    $('.time').text("+00:" + hour + ":" + min + ":" + sec)
    time += 1;
}