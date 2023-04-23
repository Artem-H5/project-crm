const rest = JSON.parse(localStorage.restorationBD);
console.log(rest);

if (!Array.isArray(rest)) throw new Error('З серверу прийшов не масив');

const restEl = rest.map(({ description, productimageUrl, productName, price, productWeigth }) => {
    return `
       <div class="menu_wrap col-xl-3 col-lg-4 col-md-4 col-sm-6">
            <div class='menu_item'>
                <div class='img_wrap'>
                    <img src="${productimageUrl}" alt="" class="menu_item_img">
                </div>
                <div class="menu_item_body">
                    <h4 class="menu_item_name">${productName}</h4>
                    <p class="menu_item_description">${description}</p>
                    <div class='menu_price_weight'>
                        <p class="menu_item_price">${price} грн</p>
                        <p class="menu_item_weigth">${productWeigth} г</p>
                    </div>
                </div>
            </div>
    </div>
    `
})

document.querySelector('.row').insertAdjacentHTML("beforeend", restEl.join(""));