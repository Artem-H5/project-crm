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
    console.log(e.target.value);
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
            console.log('video')
            const obj = {
                productName: 'string',
                poster: 'string',
                url: 'string',
                description: 'string',
                keywords: 'string array',
            }

            inputs.forEach(el => {
                console.log(el.value)
                obj[el.dataset.type] = el.value;
                el.value = '';
            })

            const video = JSON.parse(localStorage.video);

            video.push(new videoElementCrm(obj.productName, obj.poster, obj.url, obj.description, obj.keywords, dateNow, generationId));
            localStorage.video = JSON.stringify(video);

        } else if (isCategory.value === 'Рестаран') {
            console.log('restrant')
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
    /*
     const pre = document.createElement("pre");
     pre.classList.add("text-block")
     const div = document.createElement("div");

     const rest =  JSON.parse(localStorage.restorationBD);
     const store = JSON.parse(localStorage.store);
     const video = JSON.parse(localStorage.video);
     //div.innerHTML = JSON.stringify([rest, store, video]);
     //pre.append(div)
     */

    //showModalEvent()
    //document.querySelector(".modal").innerHTML = ""
    //document.querySelector(".modal").append(pre);

    let windowData = open("/window", "test");
    console.log(document.querySelector(".show-json"));

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
        video.push(new videoElementCrm('Jellyfish', '', '/video/jellyfish.mp4', 'swimming jellyfish', 'медузи, jellyfish', dateNow, generationId));
        video.push(new videoElementCrm('Sheeps', '', '/video/sheep.mp4', 'sheeps in the field', 'вівці, мала вівця', dateNow, generationId));
        video.push(new videoElementCrm('Beach', '', '/video/beach.mp4', 'view on the beachside', 'пляж, beach, beachside', dateNow, generationId));
        video.push(new videoElementCrm('Star Wars: The Bad Batch', '', 'https://gallium.stream.voidboost.cc/d9fddfbdf94ac1daa3ca75dc629568d3:2023031515:UmpWcVJESzNUSmRIUTRLdDdRK0s0ZWw2TnE4UDVWMlpZRHVxVXlhelBOcUlHcEFoeDdSSFdCbjI4WCtYWVE4dEtqVWFXMXhTVEtUdC8xR3ZJejlaOGc9PQ==/7/4/2/2/6/1/gtf7f.mp4', 'Star Wars: The Bad Batch s1', 'Fiction, Fantasy, Action', dateNow, generationId));
        video.push(new videoElementCrm('Teenage Mutant Ninja Turtles', '', 'https://phoenix.stream.voidboost.cc/ba231e05c326c261abec66e860be2209:2023031517:UmpWcVJESzNUSmRIUTRLdDdRK0s0ZWw2TnE4UDVWMlpZRHVxVXlhelBOcUlHcEFoeDdSSFdCbjI4WCtYWVE4dDdGU2piRG5GeGc4b3NLcCttbFVjK1E9PQ==/1/7/6/2/4/4/g1d63.mp4', 'Teenage Mutant Ninja Turtles s1', 'Fantasy, Action, Comedies', dateNow, generationId));
        video.push(new videoElementCrm('Star Wars: The Clone Wars', '', 'https://acheron.stream.voidboost.cc/bb2e846f7bc53cd49d2905c085263636:2023031517:UmpWcVJESzNUSmRIUTRLdDdRK0s0ZWw2TnE4UDVWMlpZRHVxVXlhelBOcUlHcEFoeDdSSFdCbjI4WCtYWVE4dHNpbjNwQ2FwUVZZRTJSQ25PUVpFcVE9PQ==/4/7/5/5/6/3/gh0sp.mp4', 'Star Wars: The Clone Wars s1', 'Fiction, Fantasy, Action', dateNow, generationId));
        localStorage.video = JSON.stringify(video);
    }
    if (store.length === 0) {
        store.push(new StoreElementCRM('Ліхтарик-брелок', 300, '/img/store_coblight.jpg', 'Ліхтарик-брелок з магнітом', 2, 'магніт, ліхтарик, брелок', dateNow, generationId))
        store.push(new StoreElementCRM('Ліхтар Sofirn', 1800, '/img/store_sofirn.jpg', 'EDC-ліхтар', 5, 'ліхтарик, 18650', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2000, '/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2100, '/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 1800, '/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2100, '/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 1900, '/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        store.push(new StoreElementCRM('Повербанк Baseus Adaman 22.5w', 2100, '/img/store_powerbank.jpg', 'Повербанк 22.5w', 1, 'повербанк, Baseus', dateNow, generationId))
        localStorage.store = JSON.stringify(store);
    }
    if (rest.length === 0) {
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 400, 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 360, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId))
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 200, 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 350, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId));
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 400, 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 320, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId));
        rest.push(new restoranElementCrm('Вино', 200, 'виноград, вода', 'Алкогольний напій із винограду', 180, 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQ5BrsZDe3_lF6qhzq4SdNBfaJW68Aou7GQdwoKfGKQSvs3pXdIvYgLPSAvF8SAICFg', "вино, алкоголь", dateNow, generationId))
        rest.push(new restoranElementCrm('Піца', 400, 'тісто, соус, шинка, ананаси, салямі', 'Продукт з тіста', 350, 'https://citypizza.com.ua/wp-content/uploads/2019/07/Pitsa-Asorti-500.jpg', "піца, тісто", dateNow, generationId));
        localStorage.restorationBD = JSON.stringify(rest)
    }
}

