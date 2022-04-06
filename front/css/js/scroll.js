window.addEventListener('DOMContentLoaded',init)

function init(){
    
    //배너 스크롤 내리면 나오게하기.
    let trans_box = document.querySelector('#Transparency')

    window.addEventListener('scroll', function(){
        let currentscroll = window.scrollY

        if (currentscroll>20){
            trans_box.classList.add('trans')

        }else{
            trans_box.classList.remove('trans')
        }
    })
}