
const cart = () => {
    const buttonCart = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    const close = modalCart.querySelector('.close')
    const bodyCart = modalCart.querySelector('.modal-body')
    const buttonSend = modalCart.querySelector('.button-primary')
    const buttonClear = modalCart.querySelector('.clear-cart')

    const resetCart = () => {
        bodyCart.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }


    const incCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map((item) => {
            if (item.id === id) {
                item.count++
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(JSON.parse(localStorage.getItem('cart')))
        
    }

    const decCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(JSON.parse(localStorage.getItem('cart')))
    }

    const renderItems = (data) => {
        bodyCart.innerHTML = ''
        data.forEach(({name, price, id, count}) => {
            const cartElem = document.createElement('div')
            cartElem.classList.add('food-row')

            cartElem.innerHTML = `
                    <span class="food-name">${name}</span>
                    <strong class="food-price">${price} ₽</strong>
                    <div class="food-counter">
                        <button class="counter-button btn-dec" data-index="${id}">-</button>
                        <span class="counter">${count}</span>
                        <button class="counter-button btn-inc" data-index="${id}">+</button>
                    </div>
            `

            bodyCart.append(cartElem)
        })
    }

    bodyCart.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.classList.contains('btn-inc')) {
            incCount(e.target.dataset.index)
        } else if (e.target.classList.contains('btn-dec')){
            decCount(e.target.dataset.index)
        }
        
    })

    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart')
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                resetCart()
            }
        })
        .catch(e => {
            console.error(e)
        })
    })

    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }
        
        modalCart.classList.add('is-open')
    })

    buttonClear.addEventListener('click', () => {
        resetCart()
    })

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}
cart()
