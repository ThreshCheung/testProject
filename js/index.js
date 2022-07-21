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
            console.log(1);
        }
        rightButton.onclick = function () {
             start += step
            if(start < endPosition){
                ul.style.left += -start + 'px'
            }else{
                ul.style.left = endPosition
            }
        }
    }


    navPathDataBind()
    thumbnailData()
    bigGlassBind()
    thumbnailClick()
    thumbnailLeftRightClick()

}