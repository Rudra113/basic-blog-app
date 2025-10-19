// alert('hello')
document.addEventListener('DOMContentLoaded', function () {
    const allButtons = document.querySelectorAll('.searchBtn')
    const searchBar = document.querySelector('.searchBar')
    const searchInput = document.getElementById('searchInput')
    const searchClose = document.getElementsByClassName('searchClose')

    for (let i = 0; i < allButtons.length; i++) {
        const element = allButtons[i];
        element.addEventListener('click', function () {
            searchBar.style.visibility = 'visible'
            searchBar.classList.add('open')
            this.setAttribute('aria-expanded', 'true')
            searchInput.focus()
        })
    }

    searchClose[0].addEventListener('click', function () {
        // console.log('Clicked')
        searchBar.style.visibility = 'hidden'
        searchBar.classList.remove('open')
        this.setAttribute('aria-expanded', 'false')
    })
})