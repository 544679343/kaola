const user = $('#username');
const pass = $('#password');
const btn = $('#btn');


// http: //localhost:8088/JS2004/Day%2024_cookie/login&registry/php/login.php

//点击登录按钮，将用户名和密码传入后端。

btn.onclick = function () {
    $ajaxpromise({
        type: 'post',
        url: 'http://localhost/H5-2003/program/interface/eg04.login.php',
        data: {
            name: user.value,
            pass: pass.value
        }
    }).then(function (data) {
        if (!data) {
            alert('用户名或者密码错误');
            pass.value = '';
        } else {
            cookie.set('username', user.value, 7); //存储用户名
            location.href = "index.html"; //首页
        }
    })
}