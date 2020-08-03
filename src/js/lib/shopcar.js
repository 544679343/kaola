;
! function () {
    //1.获取cookie进行渲染。
    if (cookie.get('cookiesid') && cookie.get('cookienum')) { //cookie存在
        arrsid = cookie.get('cookiesid').split(','); //[1,3,5]
        arrnum = cookie.get('cookienum').split(','); //[10,140,50]
        for (let i = 0; i < arrsid.length; i++) {
            rendercart(arrsid[i], arrnum[i]);
        }
    }

    function rendercart(sid, num) {
        $ajaxpromise({
            url: 'http://localhost/H5-2003/program/interface/getall.php',
            async: false
        }).then(function (data) {
            // console.log(JSON.parse(data));
            let arrdata = JSON.parse(data);
            let strhtml = '';
            for (let value of arrdata) {
                if (value.sid == sid) {
                    strhtml += `
                    <li class="item" id="${sid}">
                        <div class="c-box">
                            <input type="checkbox" id="p1">
                        </div>
                        <div class="p-pic">
                            <img src="${value.url}" alt="small">
                        </div>
                        <div class="p-title">
                            ${value.title}
                        </div>
                        <div class="p-num">
                            数量: <input type="number" value="${num}" min="1" max="999">
                        </div>
                        <div class="p-price">单价: ${value.price}
                        </div>
                        <div class="p-price-sum">总价: ${(value.price * num).toFixed(2)}
                        </div>
                        <div class="p-del">
                            <a href="#">删除</a>
                        </div>
                    </li>
                    `;

                    $('.productlist').innerHTML += strhtml;
                }
            }
            // callback(data);

        });

    }
    window.onload = function () {
        let cnum = document.querySelectorAll('.p-num input');
        let csum = document.querySelectorAll('.p-price-sum');
        let cprice = document.querySelectorAll('.p-price');
        let all = document.querySelectorAll('.u-chk');
        let inputs = document.querySelectorAll('#p1') //选中所有的input，排除含有.allselect类
        let pnum = document.querySelector('.allnum');
        let psum = document.querySelector('.pricenum');
        let sum = [], num = [];
        let summ = 0, numm = 0;
        let allnum = 0;
        // console.log(cnum.length);
        cook();

        //全选按钮的功能
        ! function () {
            //点击全选按钮，所有的选择框勾选
            all.forEach(function (v, i) {
                v.onclick = function () {
                    if (v.checked == true) {
                        all[0].checked = true;
                        all[1].checked = true;
                        inputs.forEach(function (v, i) {
                            v.checked = true;
                            numm = v.parentElement.parentElement.children[3].children[0].value;
                            summ = Number(v.parentElement.parentElement.children[5].innerHTML.slice(3)).toFixed(2);
                            // console.log(summ);
                            num[i] = parseInt(numm);
                            sum[i] = Number(summ);
                            // console.log(num);
                            v.parentElement.parentElement.children[3].children[0].onchange = function () {
                                numm = v.parentElement.parentElement.children[3].children[0].value;
                                num[i] = parseInt(numm);
                                getnum(num);
                            }
                            getnum(num);
                            arr++;
                            if (arr == inputs.length) {
                                all[0].checked = true;
                                all[1].checked = true;
                            } else {
                                all[0].checked = false;
                                all[1].checked = false;
                            }
                        })
                        // getnum(cnum);
                    }
                    if (v.checked == false) {
                        all[0].checked = false;
                        all[1].checked = false;
                        inputs.forEach(function (v, i) {
                            // console.log(v);
                            v.checked = false;
                            // console.log(v);
                            v.parentElement.parentElement.children[3].children[0].onchange = function () {
                                numm = v.parentElement.parentElement.children[3].children[0].value;
                                num[i] = 0;
                                getnum1(num);
                                csum[i].innerHTML = `总价: ${(numm * cprice[i].innerHTML.slice(4)).toFixed(2)}`
                            }
                            num[i] = 0;
                            // console.log(num);
                            cook()
                            getnum1(num);
                            csum[i].innerHTML = `总价: ${(numm * cprice[i].innerHTML.slice(4)).toFixed(2)}`
                            arr--;
                            if (arr == inputs.length) {
                                all[0].checked = true;
                                all[1].checked = true;
                            } else {
                                all[0].checked = false;
                                all[1].checked = false;
                            }
                        })
                    }

                }
            })
            //所有的选择框勾选，全选框勾选，若有一个选择框没有勾选，全选按钮则不勾选
            let arr = 0;
            
            inputs.forEach(function (v, i) {
                v.onclick = function () {
                    if (v.checked == true) {
                        numm = v.parentElement.parentElement.children[3].children[0].value;
                        summ = Number(v.parentElement.parentElement.children[5].innerHTML.slice(3)).toFixed(2);
                        // console.log(summ);
                        num[i] = parseInt(numm);
                        sum[i] = Number(summ);
                        // console.log(num);
                        v.parentElement.parentElement.children[3].children[0].onchange = function () {
                            numm = v.parentElement.parentElement.children[3].children[0].value;
                            num[i] = parseInt(numm);
                            getnum(num);
                        }
                        getnum(num);
                        arr++;
                        if (arr == inputs.length) {
                            all[0].checked = true;
                            all[1].checked = true;
                        } else {
                            all[0].checked = false;
                            all[1].checked = false;
                        }
                    } else if (v.checked == false) {
                        v.parentElement.parentElement.children[3].children[0].onchange = function () {
                            numm = v.parentElement.parentElement.children[3].children[0].value;
                            num[i] = 0;
                            getnum1(num);
                            csum[i].innerHTML = `总价: ${(numm * cprice[i].innerHTML.slice(4)).toFixed(2)}`
                        }
                        num[i] = 0;
                        // console.log(num);
                        cook()
                        getnum1(num);
                        csum[i].innerHTML = `总价: ${(numm * cprice[i].innerHTML.slice(4)).toFixed(2)}`
                        arr--;
                        if (arr == inputs.length) {
                            all[0].checked = true;
                            all[1].checked = true;
                        } else {
                            all[0].checked = false;
                            all[1].checked = false;
                        }
                    }
                }
            })
        }();

        //选择框勾选显示出数量
        // !function () {
        //     //选择框勾选显示出数量
        //     inputs.forEach(function (v, i) {
        //         v.onclick = function () {
        //             if (v.checked == true) {
        //                 numm = v.parentElement.parentElement.children[3].children[0].value;
        //                 summ = Number(v.parentElement.parentElement.children[5].innerHTML.slice(3)).toFixed(2);
        //                 console.log(summ);
        //                 num[i] = parseInt(numm);
        //                 sum[i] = Number(summ);
        //                 console.log(sum);
        //                 v.parentElement.parentElement.children[3].children[0].onchange = function () {
        //                     numm = v.parentElement.parentElement.children[3].children[0].value;
        //                     num[i] = parseInt(numm);
        //                     getnum(num);
        //                 }
        //                 getnum(num);
        //             } else if (v.checked == false) {
        //                 num[i] = 0;
        //                 console.log(num);
        //                 getnum1(num);
        //             }
        //         }
        //     });
        //     all.forEach(function (v, i) {
        //         v.addEventListener('click', function () {
        //             inputs.forEach(function (v, i) {
        //                 if (v.checked == true) {
        //                     numm = v.parentElement.parentElement.children[3].children[0].value;
        //                     // summ = parseInt(v.parentElement.parentElement.children[5].innerHTML.slice(3)).toFixed(2);
        //                     // console.log(summ);
        //                     num[i] = parseInt(numm);
        //                     v.parentElement.parentElement.children[3].children[0].onchange = function () {
        //                         numm = v.parentElement.parentElement.children[3].children[0].value;
        //                         num[i] = parseInt(numm);
        //                         getnum(num);
        //                     }
        //                     getnum(num);
        //                 } else if (v.checked == false) {
        //                     num[i] = 0;
        //                     getnum(num);
        //                 }
        //             });
        //         })
        //     })
        // }();

        //选择框勾选显示出价格

        function getnum1(num) {
            let n = 0;
            num.forEach(function (v, i) {
                n += v;
            })

            pnum.innerHTML = n;
        }
        function getnum(num) {
            let n = 0;
            num.forEach(function (v, i) {
                n += v;
            })
            cook(num);
            pnum.innerHTML = n;
        }
        function cook(num) {
            if (cookie.get('cookiesid') && cookie.get('cookienum')) {
                let idarr = cookie.get('cookiesid').split(','),
                    numarr = cookie.get('cookienum').split(',');
                if (num) {
                    cnum.forEach(function (v, i) {
                        v.onchange = function () {
                            idarr.forEach((v, i) => {
                                if (this.parentElement.parentElement.id === idarr[i]) {
                                    numarr[i] = this.value;
                                    cookie.set('cookienum', numarr.toString(), 7)
                                    num.forEach(function (v, i) {
                                        num[i] = parseInt(numarr[i])
                                    })
                                    console.log(num);
                                    getnum(num);
                                }
                            })
                            csum[i].innerHTML = `总价: ${(this.value * cprice[i].innerHTML.slice(4)).toFixed(2)}`
                        }
                    });
                } else {
                    cnum.forEach(function (v, i) {
                        v.onchange = function () {
                            idarr.forEach((v, i) => {
                                if (this.parentElement.parentElement.id === idarr[i]) {
                                    numarr[i] = this.value;
                                    console.log(numarr);
                                    cookie.set('cookienum', numarr.toString(), 7)
                                }
                            })
                            csum[i].innerHTML = `总价: ${(this.value * cprice[i].innerHTML.slice(4)).toFixed(2)}`
                        }
                    });
                }
            }
        }
        // csum.forEach(function (v, i) {
        //     sum += v;
        // })
        // console.log(cpsum);
        // cpsum.innerHTML = `${sum}`

    }

}();