const store = JSON.parse(localStorage.store);
console.log(store);

if (!Array.isArray(store)) throw new Error('З серверу прийшов не масив');

const storeEl = store.map(({ productDescription, productImage, productName, porductPrice }) => {
    return `
       <div class="store_item col-xl-3 col-lg-4 col-md-4 col-sm-6">
            <img src="${productImage}" alt="" class="item_img">
            <div class="item_body">
                <h4 class="item_name">${productName}</h4>
                <p class="item_description">${productDescription}</p>
                <p class="item_price">${porductPrice} грн</p>
                </div>
    </div>
    `
})

document.querySelector('.row').insertAdjacentHTML("beforeend", storeEl.join(""));