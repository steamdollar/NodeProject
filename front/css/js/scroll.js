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

    let menu_open = document.querySelector('.menu_open')
    let db_list = document.querySelector('#bd_list')

    menu_open.addEventListener('mouseover', ()=>{
        db_list.setAttribute('class', 'menu_on')
    })

    db_list.addEventListener('mouseover', ()=>{
        db_list.setAttribute('class', 'menu_on')
    })
    menu_open.addEventListener('mouseout', ()=>{
        db_list.setAttribute('class', '')
    })
    db_list.addEventListener('mouseout', ()=>{
        db_list.setAttribute('class', '')
    })

}
