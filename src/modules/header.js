export default function header() {
    const btnDegreeEx = document.querySelectorAll('.btn-degree');
    const body = document.querySelector('body');
    const reloadBtn = document.querySelector('.btn_reload');
    const loader = document.querySelector('.loader');
   
    btnDegreeEx.forEach(item => {
        item.addEventListener('click', () => {
            btnDegreeEx.forEach(item1 => {
                item1.classList.remove('active')
            })
            item.classList.add('active')
        })
    })

    function changePic() {
        loader.style.display = 'inline-block';
        let url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=nBDthCxOgU66Hr9NSQosLt4Lx8dwzRiIpzd7OMfgB7A';
       let pic = '' 
       fetch(url)
        .then(res => res.json())
        .then(res => {          
                pic = body.style.backgroundImage = `url(${res.urls.regular})`
                loader.style.display = 'none';           
        })   
    }

    reloadBtn.addEventListener('click', () => {
        changePic()
    })
    
    changePic()

}




