window.addEventListener('DOMContentLoaded',init)

function init(){

    //배너 스크롤 내리면 나오게하기.
    let trans_box = document.querySelector('#Transparency')

    window.addEventListener('scroll', function(){
        console.log(window.scrollY)
        let currentscroll = window.scrollY

        if (currentscroll>20){
            trans_box.classList.add('trans')

        }else{
            trans_box.classList.remove('trans')
        }
    })

    // 슬라이드
    let imgPos = 0
    let position = 0
    // img-area 크기
    const imgWidth = 1200
    const images = document.querySelector('#pic_box')

    function plusposition() {
        console.log('plus호출')
        imgPos = imgPos + 1
        console.log('이미지 번호 = ' + imgPos)
        position -= imgWidth
        images.style.transform = `translateX(${position}px)`
    }

    function minusposition() {
        console.log('minus호출')
        imgPos = imgPos - 3
        position += imgWidth * 3
        images.style.transform = `translateX(${position}px)`
    }

    function loop() {
        setTimeout(loop, 3000)
        if (imgPos >= 0 && imgPos < 3) {
            plusposition()
        } else if (imgPos === 3) {
            minusposition()
        }
    }

    function go() {
        setTimeout(loop,3000)
    }
    go()


}