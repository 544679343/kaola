(function () {

    ;
    !function () {

        var movebox = $('.movebox'),
            bigpic = $('.bigpic'),
            big = $('.big'),
            smallpic = $('.smallpic'),
            a = $('.ul>li>a');
        // 1. 绑定事件
        smallpic.on('mouseover', function () {
            // 让元素显示
            movebox.addClass('show');
            big.addClass('show');

            // movebox的大小计算
            movebox.css({
                width: big.offset().width / bigpic.offset().width * smallpic.offset().width + 'px',
                height: big.offset().height / bigpic.offset().height * smallpic.offset().height + 'px'
            })


            // 2.让movebox跟随鼠标移动
            smallpic.on('mousemove', function (ev) {
                let top = ev.pageY - smallpic.offset().top - movebox.offset().height / 2 - 205;//减去盒子距离顶端的值
                let left = ev.pageX - smallpic.offset().left - movebox.offset().width / 2 - $('#main').offset().left;//减去盒子距离可视区域左边的值

                // 3.比例
                let bl = bigpic.offset().width / smallpic.offset().width;

                // 边界
                if (top < 0) {
                    top = 0;
                } else if (top > smallpic.offset().height - movebox.offset().height) {
                    top = smallpic.offset().height - movebox.offset().height ;
                }
                if (left < 0) {
                    left = 0;
                } else if (left > smallpic.offset().height - movebox.offset().width) {
                    left = smallpic.offset().height - movebox.offset().width ;
                };

                movebox.css({
                    top: top + 'px',
                    left: left + 'px'
                });
                bigpic.css({
                    top: -top * bl + 'px',
                    left: -left * bl + 'px'

                })
            });
        });

        smallpic.on('mouseout', function () {
            movebox.removeClass('show');
            big.removeClass('show');
        });

        a.tabs({
            ev: 'mouseover',
        });
    }();



    ;
    ! function (arrowmove) {
        //1.获取地址栏sid
        let sid = location.search.substring(1).split('=')[1]; //获取地址栏sid
        console.log(sid);
        //将sid传给后端。
        $ajaxpromise({
            url: 'http://localhost/H5-2003/program/interface/getitem.php',
            data: {
                sid: sid
            }
        }).then(function (data) { //2.获取后端返回的对应的数据进行渲染。
            let taobaoobj = JSON.parse(data);
            // console.log(taobaoobj);
            //渲染
            $('.smallpic img')[0].src = taobaoobj.url;
            // console.log($('.smallpic img')[0].src);
            $('.bigpic')[0].src = taobaoobj.url;

            $('.product-title span')[0].innerHTML = taobaoobj.title;
            $('.subTit')[0].innerHTML = taobaoobj.title;

            $('.currentPrice span')[0].innerHTML = taobaoobj.price;
            $('.marketPrice span')[0].innerHTML = (taobaoobj.price * 1.2).toFixed(2);


            let listurl = taobaoobj.piclisturl;
            // console.log(listurl.split(','));
            let picarr = listurl.split(',');
            let strhtml = `<li><a href="#"><img src="${taobaoobj.url}"></a></li>`;
            for (let value of picarr) {
                strhtml += `<li><a href="#"><img src="${value}"></a></li>`;
            }
            $('.ul')[0].innerHTML = strhtml;
            // console.log($('.smallpic img')[0].src);
            let lis = $('.ul li');
            // console.log(lis[0])
            $(lis[0]).addClass('actived');
            lis.on('mouseover', function () {
                lis.removeClass('actived')
                $(this).addClass('actived');
                // console.log(($(this)[0].children)[0].children);
                $('.smallpic img')[0].src = (($(this)[0].children)[0].children)[0].src;
                $('.bigpic')[0].src = (($(this)[0].children)[0].children)[0].src;
            })
            arrowmove();
        });




        //3.购物车操作 - cookie
        //3.1.cookie里面存储商品的sid和商品的数量
        //3.2.利用两个数组分别存储sid和数量。先将sid和数量放入数组，然后存储cookie

        let arrsid = []; //存储商品的sid
        let arrnum = []; //商品的数量

        //3.3.如何确定商品的提交次数，第一次添加商品，创建购物车列表，从第二次开始只需要商品的数量进行累加。
        //商品如果是从第二次开始添加，cookie中应该存在商品的编号sid。利用存在的cookie进行判断，必须先获取cookie。
        //一开始约定好cookie里面存储sid和数量的key值。
        //cookiesid   cookienum key值分别表示存储cookie的编号和数量。

        //3.4提前获取cookie值，将其转换成数组。
        function cookietoarray() {
            if (cookie.get('cookiesid') && cookie.get('cookienum')) { //cookie存在
                arrsid = cookie.get('cookiesid').split(',');
                arrnum = cookie.get('cookienum').split(',');
            } else {
                arrsid = [];
                arrnum = [];
            }
        }

        $('.j-add2cart-btn').on('click', function () {
            cookietoarray(); //每次点击，重新获取cookie,转换成数组
            //先判断当前的商品是第一次存储，还是第二次或者多次存在。
            if (arrsid.indexOf(sid) === -1) { //第一次
                //将当前商品的sid添加到数组中
                arrsid.push(sid);
                //将当前商品的数量添加到数组中
                arrnum.push($('.ctrnum-qty')[0].value);

                //存储cookie
                cookie.set('cookiesid', arrsid.toString(), 7);
                cookie.set('cookienum', arrnum.toString(), 7);
            } else { //第二次或者多次
                //第二次或者多次无需创建商品列表，商品的编号不会发生变化。
                //对应的商品的数量进行累加。
                //随时获取当前商品的sid，通过sid的位置获取数量。
                let num = arrsid.indexOf(sid); //当前sid在数组中的位置。
                arrnum[num] = parseInt(arrnum[num]) + parseInt($('.ctrnum-qty')[0].value); //获取sid对应的数量+新加的值，再赋值给对应的位置

                //重新添加cookie
                cookie.set('cookienum', arrnum.toString(), 7);
            }
            alert('按钮被触发了');
        })



        function arrowmove() {
            let $num = 4;//显示的小图数量
            // console.log($('.ul li').offset().width);
            $('.scrollRight').on('click', () => {
                let $len = $('.ul li').length;
                let $liwidth = $('.ul li').offset().width + 5;//移动距离75px
                if ($len > $num) {
                    $num++;
                    $('.scrollleft').css({ color: '#666' });
                    if ($num === $len) {
                        $('.scrollRight').css({ color: '#ddd' });
                    }
                    $('.ul').css({
                        left: `${-$liwidth * ($num - 4)}px`
                    })
                }
            });

            $('.scrollleft').on('click', () => {
                let $liwidth = $('.ul li').offset().width + 5;
                if ($num > 4) {
                    $num--;
                    $('.scrollRight').css({ color: '#666' });
                    if ($num === 4) {
                        $('.scrollleft').css({ color: '#ddd' });
                    }
                    $('.ul').css({
                        left: `${-$liwidth * ($num - 4)}px`
                    })
                }
            });
        }

    }();
})();