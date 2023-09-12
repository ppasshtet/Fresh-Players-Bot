import { Markup } from "telegraf";

export function getMainMenu() {
    return Markup.keyboard([
        ['Рассчитать стоимость вашего заказа 💵', 'Оформить заказ или перевести на менеджера 🙋‍♂️'], 
        ['Акции и промокоды 😍', 'Как скачать Poizon? 🤔'], 
        ['Пошаговая инструкция оформления заказа товара на Poizon: 📝'],
        ['Посмотреть текущий курс: 💴', 'Отзывы 💌']
    ]).resize()
}

export function getProductMenu() {
    return Markup.keyboard([
        ['Обувь 👟', 'Кофты/штаны 👖'], 
        ['Аксессуары/футболки/белье 👕', 'Верхняя одежда 🦺'], 
        ['Другие товары 🧢', 'Вернуться назад 🔚']
    ]).resize()
}

export function getOtherArea() {
    return Markup.keyboard([
        ['Poizon 💰'], 
        ['Как скачать Poizon? 🤔'],
        ['Вернуться назад 🔚']
    ]).resize()
}

export function getBuy() {
    return Markup.keyboard([
        ['Оформить заказ ✅'],
        ['Вернуться назад 🔚']
    ]).resize()
}

export function yesNoKeyboard() {
    return Markup.inlineKeyboard([
        Markup.button.url('Android 🤖', 'https://apkcombo.com/ru/毒-得物-专属你的客户端/com.mj.dewu/'),
        Markup.button.url('Apple 👾', 'https://apps.apple.com/ru/app/%E5%BE%97%E7%89%A9-%E6%9C%89%E6%AF%92%E7%9A%84%E8%BF%90%E5%8A%A8-%E6%BD%AE%E6%B5%81-%E5%A5%BD%E7%89%A9/id1012871328'),
    ], {columns: 2})
}