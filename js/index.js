//需要将所有的DOM元素对象以及相关的资源全部加载完毕之后，再来实现的事件函数
window.onload = function () {
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
        smallPic.onmouseenter = function () {
            var maskDiv = document.createElement('div')
            maskDiv.className = "mask"
            var bigPic = document.createElement('div')
            bigPic.id = "bigPic"
            var bigImg = document.createElement('img')
            bigImg.src = "./images/b1.png"
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
                }else if (top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }
                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'
            }

            smallPic.onmouseleave = function () {
                smallPic.removeChild(maskDiv)
                bigPic.removeChild(bigImg)
                leftTop.removeChild(bigPic)
            }
        }
    }

    navPathDataBind()
    bigGlassBind()

}