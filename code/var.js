import { createHTMLElement } from "./functions.js";

export const dayEN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const dayUK = ["Неділя", "Понеділок","Вівторок","Середа","Четвер","П’ятниця","Субота"];
export const getLogin = `${dayEN[new Date().getDay()]}${new Date().getHours()}`.toLowerCase();
export const getPassword = `${dayUK[new Date().getDay()]}${new Date().getHours()}${new Date().getMinutes()}${new Date().getFullYear()}`.toLowerCase();
export const modalSave = createHTMLElement("button", "btn-save", "Зберегти", [{ "type": "button" }, { "data-type": "button" }]);
export const modalClose = createHTMLElement("button", "btn-close", "Скасувати", [{ "type": "button" }, { "data-type": "button" }]);