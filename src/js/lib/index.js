$(function () {
    function banner() {
        const $img = $("#show_pic img")
        const $li = $(".listp li");
        const $banner = $('#picBox');
        const $prev = $('.control .prev');
        const $next = $('.control .next');
        const $item = $('.itemgroup');
        const $idx = $('.idxicon');
        let myTimer = null;

        // console.log($li.length)
        let ord = 0;
        function autoplay() {
            myTimer = setInterval(() => {
                goImg(ord + 1)
                // console.log(1)
            }, 2300);
        }

        function stopplay() {
            window.clearInterval(myTimer);
            myTimer = null;
        }

        function goImg(tandord) {

            let outord = ord;
            ord = tandord

            if (ord >= $img.length) {
                ord = 0
            } else if (ord < 0) {
                ord = $img.length
            }

            $img.eq(outord).animate({ "opacity": "0" }, 1000)
            $img.eq(ord).animate({ "opacity": "1" }, 1000)

            $li.eq(outord).removeClass('active');
            $li.eq(ord).addClass('active');


            $item.eq(outord).animate({ "opacity": "0" }, 2000)
            $item.eq(ord).animate({ "opacity": "1" }, 2000)

            $idx.eq(outord).removeClass('active');
            $idx.eq(ord).addClass('active');
            // console.log($li)
        }
        // $banner.on('mouseover', function () {
        //     stopplay();
        // })
        // $idx.on('click', function () {
        //     goImg($(this).index())
        //     // console.log($(this).index())
        // })
        // $banner.on('mouseout', function () {
        //     autoplay();
        // })

        autoplay();

        $banner.on('mouseover', function () {
            stopplay();
        })
        $li.on('click', function () {
            goImg($(this).index())
            // console.log($(this).index())
        })
        $banner.on('mouseout', function () {
            autoplay();
        })
        $prev.on('click', function () {
            let p = ord - 1;
            if (p < 0) {
                p = 2
            }
            goImg(p);
            // console.log(p);
        })
        $next.on('click', function () {
            let n = ord + 1;
            if (n < 0) {
                n = 2
            }
            goImg(n);
            // console.log(n);
        })
    }
    function login() {
        const login = document.querySelector('.login');
        const admin = document.querySelector('.admin');
        const use = document.querySelector('.use');
        const close = document.querySelector('.admin a');
        if (cookie.get('username')) { //存在
            login.style.display = 'none';
            admin.style.display = 'block';
            use.innerHTML = cookie.get('username');
        }

        close.onclick = function () {
            login.style.display = 'block';
            admin.style.display = 'none';
            cookie.remove('username');
        }
    }
    function init() {
        banner();
        login();
    }
    init();
})