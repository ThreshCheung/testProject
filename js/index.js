//需要将所有的DOM元素对象以及相关的资源全部加载完毕之后，再来实现的事件函数
window.onload = function () {

    var imgIndex = 0;

    function navPathDataBind() {
        var navPath = document.querySelector('#wrappper #content .contentMain #navPath')
        var path = goodData.path
        for (let i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                var aNode = document.createElement('a')
                aNode.href = path[i].url
                aNode.innerText = path[i].title

                navPath.appendChild(aNode)
            } else {
                var aNode = document.createElement('a')
                aNode.href = path[i].url
                aNode.innerText = path[i].title

                var iNode = document.createElement('i')
                iNode.innerText = '/'

                navPath.appendChild(aNode)
                navPath.appendChild(iNode)
            }
        }
    }

    function bigGlassBind() {
        var smallPic = document.querySelector('#wrappper #content .contentMain #center #left #leftTop #smallPic')
        var leftTop = document.querySelector('#wrappper #content .contentMain #center #left #leftTop')
        var src = goodData.imagesSrc
        smallPic.onmouseenter = function () {
            var maskDiv = document.createElement('div')
            maskDiv.className = "mask"
            var bigPic = document.createElement('div')
            bigPic.id = "bigPic"
            var bigImg = document.createElement('img')
            bigImg.src = src[imgIndex].b
            smallPic.appendChild(maskDiv)
            bigPic.appendChild(bigImg)
            leftTop.appendChild(bigPic)

            smallPic.onmousemove = function (event) {
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetWidth / 2
                if (left < 0) {
                    left = 0
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if (top < 0) {
                    top = 0
                } else if (top > smallPic.clientHeight - maskDiv.offsetWidth) {
                    top = smallPic.clientHeight - maskDiv.offsetWidth
                }
                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth)
                bigImg.style.left = -left / scale + 'px'
                bigImg.style.top = -top / scale + 'px'
            }

            smallPic.onmouseleave = function () {
                smallPic.removeChild(maskDiv)
                bigPic.removeChild(bigImg)
                leftTop.removeChild(bigPic)
            }
        }
    }

    function thumbnailData() {
        var ul = document.querySelector('#wrappper #content .contentMain #center #left #leftBottom #picList ul')
        src = goodData.imagesSrc

        for (let i = 0; i < src.length; i++) {
            var liNode = document.createElement('li')
            var imgNode = document.createElement('img')
            imgNode.src = src[i].s
            liNode.appendChild(imgNode)
            ul.appendChild(liNode)
        }
    }

    function thumbnailClick() {
        var liNodes = document.querySelectorAll('#wrappper #content .contentMain #center #left #leftBottom #picList ul li')
        var smallPic_img = document.querySelector('#wrappper #content .contentMain #center #left #leftTop #smallPic img')
        var imgSrc = goodData.imagesSrc
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].index = i
            liNodes[i].onclick = function () {
                var idx = this.index
                imgIndex = idx
                smallPic_img.src = imgSrc[idx].s
            }
        }
    }

    function thumbnailLeftRightClick() {
        var leftButton = document.querySelector('#wrappper #content .contentMain #center #left #leftBottom a:first-child')

        var rightButton = document.querySelector('#wrappper #content .contentMain #center #left #leftBottom a:last-child')

        var picList = document.querySelector('#wrappper #content .contentMain #center #left #leftBottom #picList')

        var ul = document.querySelector('#wrappper #content .contentMain #center #left #leftBottom #picList ul')

        var liNodes = document.querySelectorAll('#wrappper #content .contentMain #center #left #leftBottom #picList ul li')

        var start = 0

        var step = (liNodes[0].offsetWidth + 20) * 2

        var endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)

        leftButton.onclick = function () {
            start -= step
            if (start > 0) {
                ul.style.left = -start + 'px'
            } else {
                start = 0
            }
        }//understand
        rightButton.onclick = function () {
            start += step
            if (start > endPosition) {
                start = endPosition
            } else {
                ul.style.left = -start + 'px'
            }
        }//understand
    }

    function rightTopData() {
        var rightTop = document.querySelector('#wrappper #content .contentMain #center #right .rightTop')
        goodsDetail = goodData.goodsDetail
        var s = `<h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div class="priceWrap">
            <div class="priceTop">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <span>￥</span>
                    <p>${goodsDetail.price}</p>
                    <i>降价通知</i>
                </div>
                <p>
                    <span>累计评价</span>
                    <span>${goodsDetail.evaluateNum}</span>
                </p>
            </div>
            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <p>
                    <span>${goodsDetail.promoteSales.type}</span>
                    <span>${goodsDetail.promoteSales.content}</span>
                </p>
            </div>
        </div>
        <div class="support">
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
            <p>${goodsDetail.support}</p>
        </div>
        <div class="address">
            <span>配&nbsp;送&nbsp;至</span>
            <p>${goodsDetail.address}</p>
        </div>`
        rightTop.innerHTML = s
    }

    function rightBottomData() {
        var chooseWrap = document.querySelector('#wrappper #content .contentMain #center #right .rightBottom .chooseWrap')
        var crumbData = goodData.goodsDetail.crumbData

        for (let i = 0; i < crumbData.length; i++) {
            var dlNode = document.createElement('dl')
            var dtNode = document.createElement('dt')
            dtNode.innerHTML = crumbData[i].title
            dlNode.appendChild(dtNode)
            for (let j = 0; j < crumbData[i].data.length; j++) {
                var ddNode = document.createElement('dd')
                ddNode.innerHTML = crumbData[i].data[j].type
                ddNode.setAttribute('price', crumbData[i].data[j].changePrice)
                dlNode.appendChild(ddNode)
            }
            chooseWrap.appendChild(dlNode)
        }
    }

    // function clickDdBind() {
    //     var dlNode = document.querySelectorAll('#wrappper #content .contentMain #center #right .rightBottom .chooseWrap dl')
    //     for (let i = 0; i < dlNode.length; i++) {
    //         (function (i) {
    //             var ddNode = dlNode[i].querySelectorAll('dd')
    //             for (let j = 0; j < ddNode.length; j++) {
    //                 ddNode[j].onclick = function () {
    //                     for (let n = 0; n < ddNode.length; n++) {
    //                         ddNode[n].style.color = '#666'
    //                     }
    //                     this.style.color = 'red'
    //                 }
    //             }
    //         })(i)
    //     }
    // }
    function clickDdBind() {
        var dlNode = document.querySelectorAll('#wrappper #content .contentMain #center #right .rightBottom .chooseWrap dl')
        var choose = document.querySelector('#wrappper #content .contentMain #center #right .rightBottom .choose')
        var arr = new Array(dlNode.length)
        arr.fill(0)
        for (let i = 0; i < dlNode.length; i++) {
            (function (i) {
                var ddNode = dlNode[i].querySelectorAll('dd')
                for (let j = 0; j < ddNode.length; j++) {
                    ddNode[j].onclick = function () {
                        choose.innerHTML = ''
                        for (let n = 0; n < ddNode.length; n++) {
                            ddNode[n].style.color = '#666'
                        }
                        this.style.color = 'red'

                        arr[i] = this
                        changePriceBind(arr)

                        arr.forEach(function (value, index) {
                            if (value) {
                                var markDiv = document.createElement('div')
                                markDiv.innerText = value.innerText
                                markDiv.className = 'mark'
                                var aNode = document.createElement('a')
                                aNode.innerText = 'X'
                                aNode.setAttribute('index', index)
                                markDiv.appendChild(aNode)
                                choose.appendChild(markDiv)
                            }
                        });
                        var aNodes = document.querySelectorAll('#wrappper #content .contentMain #center #right .rightBottom .choose .mark a')
                        for (let k = 0; k < aNodes.length; k++) {
                            aNodes[k].onclick = function () {
                                var idx1 = this.getAttribute('index')
                                arr[idx1] = 0
                                var ddList = dlNode[idx1].querySelectorAll('dd')
                                for (let m = 0; m < ddList.length; m++) {
                                    ddList[m].style.color = '#666'
                                }
                                ddList[0].style.color = 'red'
                                choose.removeChild(this.parentNode)
                                changePriceBind(arr)
                            }
                        }
                    }
                }
            })(i)
        }
    }

    function changePriceBind(arr) {
        var oldPrice = document.querySelector('#wrappper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p')
        var price = goodData.goodsDetail.price
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                var changePrice = Number(arr[i].getAttribute('price'))
                price += changePrice
            }
        }
        oldPrice.innerText = price
        var leftPrice = document.querySelector('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
        leftPrice.innerText = '￥' + price
        var newPrice = document.querySelector('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')
        var ipts = document.querySelectorAll('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
        for (let j = 0; j < ipts.length; j++) {
            if (ipts[j].checked) {
                price += Number(ipts[j].value)
            }
        }
        newPrice.innerText = '￥' + price
    }

    function choosePrice() {
        var ipts = document.querySelectorAll('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input')
        var leftPrice = document.querySelector('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
        var newPrice = document.querySelector('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')

        for (let i = 0; i < ipts.length; i++) {
            ipts[i].onclick = function () {
                var oldPrice = Number(leftPrice.innerText.slice(1))
                for (let j = 0; j < ipts.length; j++) {
                    if (ipts[j].checked) {
                        oldPrice = oldPrice + Number(ipts[j].value)
                    }
                }
                newPrice.innerText = "￥" + oldPrice
            }
        }
    }

    //封装一个公共的选项卡函数
    function tab(tabBtns, tabConts) {
        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].index = i
            tabBtns[i].onclick = function () {
                for (let j = 0; j < tabBtns.length; j++) {
                    tabBtns[j].className = ''
                    tabConts[j].className = ''
                }
                this.className = 'active'
                tabConts[this.index].className = 'active'
            }
        }
    }

    function leftTab(){
        var h4s = document.querySelectorAll('#wrappper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4')
        var divs = document.querySelectorAll('#wrappper #content .contentMain .goodsDetailWrap .leftAside .asideContent>div')
        tab(h4s,divs)
    }

    function rightTab(){
        var lis = document.querySelectorAll('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabBtns li')
        var divs = document.querySelectorAll('#wrappper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabContent div')
        tab(lis,divs)
    }


    navPathDataBind()
    thumbnailData()
    bigGlassBind()
    thumbnailClick()
    thumbnailLeftRightClick()
    rightTopData()
    rightBottomData()
    clickDdBind()
    choosePrice()
    leftTab()
    rightTab()

}