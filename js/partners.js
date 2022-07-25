const partners = () => {
    const cardsRestaurants = document.querySelector('.cards-restaurants')


const renderItems = (data) => {
    data.forEach((item) => {
        const {image, kitchen, name, price, products, stars, time_of_delivery} = item
        const a = document.createElement('a')

        a.setAttribute('href', '/restaurant.html')
        a.classList.add('card')
        a.classList.add('card-restaurant')

        a.dataset.products = products

        a.innerHTML = `
                <img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
                                    ${stars}
								</div>
								<div class="price">От ${price}</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
                        `
        a.addEventListener('click', (e) => {
            
            if(localStorage.getItem('user')) {
                e.preventDefault()
                localStorage.setItem('restaurant', JSON.stringify(item))
                window.location.href = "/restaurant.html"
            } else {
                e.preventDefault()
                modalAuth.style.display = 'flex'
            }
        })                
        cardsRestaurants.append(a)
    });
}


fetch('https://test-55cab-default-rtdb.firebaseio.com/db/partners.json')
.then((response) => response.json())
.then((data) => {
    renderItems(data)
})
.catch((error) => {
    console.log(error)
})
}

partners()