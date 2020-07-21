const user = document.querySelector('.username');
const pass = document.querySelector('.password');
const btn = document.querySelector('.btn');


// http: //localhost:8088/JS2004/Day%2024_cookie/login&registry/php/login.php

//点击登录按钮，将用户名和密码传入后端。

btn.onclick = function() {
    $ajaxpromise({
        type: 'post',
        url: 'http://localhost/JS2004/Day%2024_cookie/login&registry/php/login.php',
        data: {
            name: user.value,
            pass: hex_sha1(pass.value)
        }
    }).then(function(data) {
        if (!data) {
            alert('用户名或者密码错误');
            pass.value = '';
        } else {
            cookie.set('username', user.value, 7); //存储用户名
            location.href = "index.html"; //首页
        }
    })
}