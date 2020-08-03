;
! function () {
    //1.渲染首页列表
    //后端提供接口
    //前端获取接口数据，进行渲染。
    const goodslist = $('.m-goods');
    //http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php
    $ajaxpromise({
        url: 'http://localhost/H5-2003/program/interface/getall.php'
    }).then(function (data) {
        let taobaoarr = JSON.parse(data); //数据转对象。
        // console.log(taobaoarr);
        let strhtml = '<ul class="goods-list">';
        for (let value of taobaoarr) {
            strhtml += `
                <a href="product.html?sid=${value.sid}" target="_blank">
                    <li class="g-col">
                        <div class="goods-bd">
                            <div class="goods-bd-border">
                                <div class="goods-img">
                                    <a href="product.html?sid=${value.sid}" target="_blank">
                                        <img class="img" src="${value.url}" alt="small">
                                    </a>
                                    <div class="m-tagitem"> </div>
                                    <div class="m-tagitem2">
                                        <div class="u-tagbtn">热销</div>
                                    </div>
                                    <div class="m-tagitem3">
                                        <div class="u-tagbtn u-tagbtn-1">每满200减45 | 特价</div>
                                    </div>
                                </div>
                                <h5 class="goods-title">
                                    <a href="product.html?sid=${value.sid}" target="_blank">
                                        ${value.title}
                                    </a>
                                </h5>
                                <h6 class="goods-introduce"> 白金配方，营养保障 </h6>
                                <div class="m-priceitem">
                                    <span class="price">
                                        <i class="rmb">¥</i>
                                        ${value.price}
                                    </span>
                                    <del>¥${value.sailnumber}</del>
                                    </span>
                                </div>
                                <a href="product.html?sid=${value.sid}" target="_blank" class="goods-btn">
                                    <img class="goods-btn-img" src="../images/shopcar.jpg" alt="加购物车"> 
                                </a>
                            </div>
                        </div>
                    </li>
                </a>
            `;
        }
        strhtml += '</ul>';
        goodslist.innerHTML = strhtml;
    })

}();