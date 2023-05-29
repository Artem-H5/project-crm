import { getLogin, getPassword } from "./var.js";
import { generationId, validate, createInputSring, dateNow } from "./functions.js";
import { StoreElementCRM, videoElementCrm, restoranElementCrm } from "./class.js";


//changeInputEvent Object
const isDisabledBtn = {
    flagLogin: false,
    flagPassword: false
}

function changeInputEvent(e) {
    if (e.target.dataset.type === "login" && validate(new RegExp("^" + getLogin + "$"), e.target.value)) {
        e.target.classList.remove("error")
        isDisabledBtn.flagLogin = true;
    } else if (e.target.dataset.type === "password" && validate(new RegExp("^" + getPassword + "$"), e.target.value)) {
        e.target.classList.remove("error")
        isDisabledBtn.flagPassword = true;
    } else {
        e.target.classList.add("error");
        if (e.target.dataset.type === "login") {
            isDisabledBtn.flagLogin = false;
        } else if (e.target.dataset.type === "password") {
            isDisabledBtn.flagPassword = false;
        }
    }

    if (isDisabledBtn.flagLogin && isDisabledBtn.flagPassword) {
        document.getElementById("disabled").disabled = false;
    } else {
        document.getElementById("disabled").disabled = true;
    }
}

function userLoginEvent() {
    sessionStorage.isLogin = true;
    document.location = "/project-crm/"
}

function showModalEvent() {
    const modal = document.querySelector(".container-modal").classList.remove("hide")
}

function hideModalEvent() {
    const modal = document.querySelector(".container-modal").classList.add("hide")
}

function changeCategoryEvent(e) {
    const modal__body = document.querySelector(".modal__body");
    modal__body.innerHTML = "";

    if (e.target.value === "Магазин") {
        modal__body.insertAdjacentHTML("beforeend", `
       <form>
        ${createInputSring("text", "Назва продукту", generationId(), "productName")}
        ${createInputSring("number", "Вартість продукту", generationId(), "porductPrice")}
        ${createInputSring("url", "Картинка продукту", generationId(), "productImage")}
        ${createInputSring("text", "Опис продукту", generationId(), "productDescription")}
        ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
       </form>
       `)

    } else if (e.target.value === "Відео хостинг") {
        modal__body.insertAdjacentHTML("beforeend", `
        <form>
         ${createInputSring("text", "Назва відео", generationId(), "productName")}
         ${createInputSring("url", "Постер", generationId(), "poster")}
         ${createInputSring("url", "Посилання на відео", generationId(), "url")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
         ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
        </form>
        `)
    } else if (e.target.value === "Рестаран") {
        modal__body.insertAdjacentHTML("beforeend", `
        <form>
         ${createInputSring("text", "Назва Страви", generationId(), "productName")}
         ${createInputSring("text", "Грамовка", generationId(), "productWeiht")}
         ${createInputSring("text", "Склад", generationId(), "ingredients")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
         ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
         ${createInputSring("text", "Вартість продукту", generationId(), "price")}
         ${createInputSring("url", "Забраження продукту", generationId(), "productimageUrl")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
        </form>
        `)
    }
}

function saveData() {
    try {
        const [isCategory] = document.querySelector("select").selectedOptions;
        const [...inputs] = document.querySelectorAll("form input");
        if (isCategory.value === "Магазин") {
            const obj = {
                productName: "string",
                porductPrice: "number",
                productImage: "string",
                productDescription: "string",
                keywords: "string array",
            };

            inputs.forEach(e => {
                obj[e.dataset.type] = e.value;
                e.value = ''
            })

            const store = JSON.parse(localStorage.store);
            store.push(new StoreElementCRM(
                obj.productName,
                obj.porductPrice,
                obj.productImage,
                obj.productDescription,
                undefined,
                obj.keywords,
                dateNow,
                generationId));

            localStorage.store = JSON.stringify(store);

        } else if (isCategory.value === 'Відео хостинг') {
            const obj = {
                productName: 'string',
                poster: 'string',
                url: 'string',
                description: 'string',
                keywords: 'string array',
            }

            inputs.forEach(el => {
                obj[el.dataset.type] = el.value;
                el.value = '';
            })

            const video = JSON.parse(localStorage.video);

            video.push(new videoElementCrm(obj.productName, obj.poster, obj.url, obj.description, obj.keywords, dateNow, generationId));
            localStorage.video = JSON.stringify(video);

        } else if (isCategory.value === 'Рестаран') {
            const obj = {
                productName: 'string',
                productWeigth: 'number',
                ingridients: 'string',
                description: 'string',
                price: 'number',
                productimageUrl: 'string',
                keywords: 'string array',
            }

            inputs.forEach(el => {
                obj[el.dataset.type] = el.value;
                el.value = '';
            })

            const rest = JSON.parse(localStorage.restorationBD);
            rest.push(new restoranElementCrm(obj.productName, obj.productWeigth, obj.ingridients, obj.description, obj.price, obj.productimageUrl, obj.keywords, dateNow, generationId))
            localStorage.restorationBD = JSON.stringify(rest);
        }
    } catch (e) {
        console.error(e)
    }
}

export function exportDataEvent() {
    let windowData = open("/project-crm/window", "test");

    setTimeout(() => {
        windowData.close()
    }, 5000)
}

export { changeInputEvent, userLoginEvent, showModalEvent, changeCategoryEvent, hideModalEvent, saveData }


export const defaultItems = () => {
    const video = JSON.parse(localStorage.video);
    const store = JSON.parse(localStorage.store);
    const rest = JSON.parse(localStorage.restorationBD);
    if (video.length === 0) {
        video.push(new videoElementCrm('Jellyfish', '', '/project-crm/video/video/jellyfish.mp4', 'swimming jellyfish', 'медузи, jellyfish', dateNow, generationId));
        video.push(new videoElementCrm('Sheeps', '', '/project-crm/video/video/sheep.mp4', 'sheeps in the field', 'вівці, мала вівця', dateNow, generationId));
        video.push(new videoElementCrm('Beach', '', '/project-crm/video/video/beach.mp4', 'view on the beachside', 'пляж, beach, beachside', dateNow, generationId));
        video.push(new videoElementCrm('Lions', '', '/project-crm/video/video/lions.mp4', 'a pack of lions', 'Lion, Animal, Wildlife video', dateNow, generationId));
        video.push(new videoElementCrm('Highland cows', '', '/project-crm/video/video/highland-cows.mp4', 'a high mountain cow is chewing', 'Highland cows, Cows, Cattle video', dateNow, generationId));
        video.push(new videoElementCrm('Road next to river', '', '/project-crm/video/video/road-next-to-river.mp4', 'Republika Srpska, Bosnia and Herzegovina', 'River, Road, Mountain video', dateNow, generationId));
        localStorage.video = JSON.stringify(video);
    }
    if (store.length === 0) {
        store.push(new StoreElementCRM('Ліхтарик-брелок', 300, '/project-crm/img/store_coblight.jpg', 'Ліхтарик-брелок з магнітом', 2, 'магніт, ліхтарик, брелок', dateNow, generationId))
        store.push(new StoreElementCRM('Ліхтар Sofirn', 1800, '/project-crm/img/store_sofirn.jpg', 'EDC-ліхтар', 5, 'ліхтарик, 18650', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2000, '/project-crm/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2100, '/project-crm/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 1800, '/project-crm/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2100, '/project-crm/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 1900, '/project-crm/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2100, '/project-crm/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        localStorage.store = JSON.stringify(store);
    }
    if (rest.length === 0) {
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 400, 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 360, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId))
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 200, 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 350, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId));
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 400, 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 320, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId));
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 180, 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 350, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId));
        localStorage.restorationBD = JSON.stringify(rest)
    }
}

