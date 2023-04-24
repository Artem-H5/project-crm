import { hideModalEvent, showModalEvent } from "./events.js";
import { createHTMLElement, createEditProductInput, sort } from "./functions.js";
import { modalClose, modalSave } from "./var.js";

// Вивід на сторінку елементів
export function showData(arr = []) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""

    if (location.pathname.includes('restoran')) {
        arr.forEach(function ({ productName, quantity, price, stopList, date, id }, i) {
            //Назва	Залишок	Ціна	Редагувати	Статус	Дата додавання	Видалити
            const tr = createHTMLElement("tr");
            const element = [
                createHTMLElement("td", undefined, i + 1),
                createHTMLElement("td", undefined, productName),
                createHTMLElement("td", undefined, quantity),
                createHTMLElement("td", undefined, price),
                createHTMLElement("td", undefined, `<span data-key="${id}" class="icon">&#9998;</span>`, undefined, editItemEvent),
                createHTMLElement("td", undefined, stopList ? "<span class='icon green'>&#10004;</span>" : "<span class='icon red'>&#10008;</span>"),
                createHTMLElement("td", undefined, date),
                createHTMLElement("td", undefined, `<span data-key="${id}" class='icon'>&#10006;</span>`, undefined, delItemEvent),
            ]
            tbody.append(tr);
            tr.append(...element)
        })
    } else if (location.pathname.includes('video')) {
        arr.forEach(({ videoName, date, url, id }, i) => {
            // #	Назва	Дата публікації	Посилання	Редагувати	Видалити
            const tr = createHTMLElement('tr');
            const element = [
                createHTMLElement("td", undefined, i + 1),
                createHTMLElement("td", undefined, videoName),
                createHTMLElement("td", undefined, date),
                createHTMLElement("td", undefined, url),
                createHTMLElement("td", undefined, `<span data-key="${id}" class="icon">&#9998;</span>`, undefined, editItemEvent),
                createHTMLElement("td", undefined, `<span data-key="${id}" class='icon'>&#10006;</span>`, undefined, delItemEvent),
            ]

            element[3].style.whiteSpace = 'normal'
            element[3].style.wordBreak = 'break-word'
            tbody.append(tr);
            tr.append(...element);
        })
    } else if (location.pathname.includes('store')) {
        arr.forEach(function ({ productName, productQuantity, porductPrice, status, date, id }, i) {
            //#	Назва	Залишок	Ціна	Редагувати	Статус	Дата додавання	Видалити
            const tr = createHTMLElement("tr");
            const element = [
                createHTMLElement("td", undefined, i + 1),
                createHTMLElement("td", undefined, productName),
                createHTMLElement("td", undefined, productQuantity),
                createHTMLElement("td", undefined, porductPrice),
                createHTMLElement("td", undefined, `<span data-key="${id}" class="icon">&#9998;</span>`, undefined, editItemEvent),
                createHTMLElement("td", undefined, status ? "<span class='icon green'>&#10004;</span>" : "<span class='icon red'>&#10008;</span>"),
                createHTMLElement("td", undefined, date),
                createHTMLElement("td", undefined, `<span data-key="${id}" class='icon'>&#10006;</span>`, undefined, delItemEvent),
            ]
            tbody.append(tr);
            tr.append(...element)
        })
    }

}

// Читаємо з localStorage
if (location.pathname.includes('restoran') && localStorage.restorationBD) {
    showData(JSON.parse(localStorage.restorationBD))
} else if (location.pathname.includes('video') && localStorage.video) {
    showData(JSON.parse(localStorage.video))
} else if (location.pathname.includes('store') && localStorage.store) {
    showData(JSON.parse(localStorage.store))
}

// Змінюємо об'єкт з БД
function editItemEvent(e) {

    if (e.target.tagName !== 'SPAN') return;
    showModalEvent();

    const modalWindow = document.querySelector(".modal");
    const modalBody = createHTMLElement("div", "modal-body");
    modalWindow.append(modalBody);

    // Робота з кнопками 
    const btns = createHTMLElement('div', 'btns-save');

    modalSave.addEventListener('click', () => {
        newSaveMenuInfo(modalBody, rez);
        hideModalEvent()
        modalBody.remove()
        if (location.pathname.includes('restoran') && localStorage.restorationBD) {
            showData(JSON.parse(localStorage.restorationBD))
        } else if (location.pathname.includes('video') && localStorage.video) {
            showData(JSON.parse(localStorage.video))
        } else if (location.pathname.includes('store') && localStorage.store) {
            showData(JSON.parse(localStorage.store))
        }
    })

    modalClose.addEventListener("click", () => {
        hideModalEvent()
        modalBody.remove()
    });

    btns.append(modalSave, modalClose);
    modalWindow.append(btns);

    //Визначення об'єкта для редагування
    if (location.pathname.includes('restoran')) {
        const rest = JSON.parse(localStorage.restorationBD);
        var rez = rest.find(({ id }) => e.target.dataset.key === id);
    } else if (location.pathname.includes('video')) {
        const video = JSON.parse(localStorage.video);
        var rez = video.find(({ id }) => e.target.dataset.key === id);
    } else if (location.pathname.includes('store')) {
        const store = JSON.parse(localStorage.store);
        var rez = store.find(({ id }) => e.target.dataset.key === id);
    }

    const data = Object.entries(rez);

    const inputsElements = data.map(([props, value]) => {
        return createEditProductInput(props, value)
    })
    modalBody.append(...inputsElements)
}

function newSaveMenuInfo(newObj, oldObj) {
    const inputs = newObj.querySelectorAll('input');

    const obj = {
        id: oldObj.id,
        date: oldObj.date,
        status: false
    }

    if (location.pathname.includes('restoran')) {
        inputs.forEach(input => {
            switch (input.key) {
                case "productName": obj.productName = input.value;
                    return
                case "productWeigth": obj.productWeigth = input.value;
                    return
                case "ingridients": obj.ingridients = input.value;
                    return
                case "description": obj.description = input.value;
                    return
                case "price": obj.price = input.value;
                    return
                case "productimageUrl": obj.productimageUrl = input.value;
                    return
                case "keywords": obj.keywords = input.value;
                    return
            }
        })
        if (obj.productQuantity > 0) {
            obj.status = true;
        } else {
            obj.status = false;
        }
        const rest = JSON.parse(localStorage.restorationBD);
        rest.splice(rest.findIndex(el => oldObj.id === el.id), 1, obj);
        localStorage.restorationBD = JSON.stringify(rest);
    } else if (location.pathname.includes('video')) {
        inputs.forEach(input => {
            switch (input.key) {
                case "videoName": obj.videoName = input.value;
                    return
                case "poster": obj.poster = input.value;
                    return
                case "url": obj.url = input.value;
                    return
                case "description": obj.description = input.value;
                    return
                case "keywords": obj.keywords = input.value;
                    return
            }
        })

        const video = JSON.parse(localStorage.video);
        video.splice(video.findIndex(el => oldObj.id === el.id), 1, obj);
        localStorage.video = JSON.stringify(video);
    } else if (location.pathname.includes('store')) {
        inputs.forEach(input => {
            switch (input.key) {
                case "porductPrice": obj.porductPrice = input.value;
                    return
                case "productDescription": obj.productDescription = input.value;
                    return
                case "productImage": obj.productImage = input.value;
                    return
                case "productName": obj.productName = input.value;
                    return
                case "productQuantity": obj.productQuantity = input.value;
                    return
            }
        })
        if (obj.productQuantity > 0) {
            obj.status = true;
        } else {
            obj.status = false;
        }
        const store = JSON.parse(localStorage.store);
        store.splice(store.findIndex(el => el.id === oldObj.id), 1, obj);
        localStorage.store = JSON.stringify(store);
    }


}

function delItemEvent(e) {
    if (e.target.tagName !== 'SPAN') return;
    if (location.pathname.includes('restoran')) {
        const rest = JSON.parse(localStorage.restorationBD);

        e.target.closest('tr').remove();
        rest.splice(rest.findIndex(({ id }) => e.target.dataset.key === id), 1)
        localStorage.restorationBD = JSON.stringify(rest);
    } else if (location.pathname.includes('video')) {
        const video = JSON.parse(localStorage.video);

        e.target.closest('tr').remove();
        video.splice(video.findIndex(({ id }) => e.target.dataset.key === id), 1)
        localStorage.video = JSON.stringify(video);
    } else if (location.pathname.includes('store')) {
        const store = JSON.parse(localStorage.store);

        e.target.closest('tr').remove();
        store.splice(store.findIndex(({ id }) => e.target.dataset.key === id), 1)
        localStorage.store = JSON.stringify(store);
    }
}

sort()