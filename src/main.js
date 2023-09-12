import { Telegraf } from "telegraf"
import { message } from "telegraf/filters"
import config from "config"
import { getMainMenu, getProductMenu, getOtherArea, getBuy, yesNoKeyboard} from "./keyboard.js";
import { getCurrentCnyRubCourse } from "./currentValueCourse.js";

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
    handlerTimeout: Infinity,
});

bot.command('start', async (ctx) => {
    await ctx.replyWithPhoto({source: './img/IMG_main.png'})
    await ctx.reply(`Здравствуйте, ${ctx.message.chat.first_name}! \nЯ ваш личный бот-помощник, ниже можете увидеть мой функционал:`, getMainMenu())
});

//bot hears

bot.hears('Рассчитать стоимость вашего заказа 💵', async ctx => {
    await ctx.reply('Выберите площадку, с которой вы хотели бы оформить заказ:', getOtherArea())
    await ctx.reply('Для того чтобы ознакомиться с инструкцией по установке приложения Poizon, нажмите на кнопку "Как скачать Poizon? 🤔"')
})

bot.hears('Poizon 💰', ctx => {
    ctx.reply('Выберете категорию к которой относится выбранная вами вещь:', getProductMenu())
})

bot.hears('Пошаговая инструкция оформления заказа товара на Poizon: 📝', async ctx => {
    await ctx.replyWithPhoto({source: './img/IMG_01.png'}, {caption: 'Шаг 1 ✅'}, {disable_notification: true})
    await ctx.replyWithPhoto({source: './img/IMG_02.png'}, {caption: 'Шаг 2 ✅'})
    await ctx.replyWithPhoto({source: './img/IMG_03.png'}, {caption: 'Шаг 3 ✅'})
    await ctx.replyWithPhoto({source: './img/IMG_04.png'}, {caption: 'Шаг 4 ✅'})
    await ctx.replyWithPhoto({source: './img/IMG_05.png'}, {caption: 'Шаг 5 ✅'})
    await ctx.replyWithPhoto({source: './img/IMG_06.png'}, {caption: 'Шаг 6 ✅'})
    await ctx.reply('Теперь можете отправить ссылку нашему менеджеру для окончательного оформления заказа: 🔽\nhttps://t.me/freshPlayerShop\n\nШаг 7 ✅')
})

bot.hears('Обувь 👟', async ctx => {
    await ctx.reply('Введите стоимость желаемой вещи в юанях (стоимость каждой вещи рассчитывается отдельно)\n\n1.Выберете нужный товар на Poizon и нажмите на правую нижнюю кнопку\n2.Выберете нужный размер и напишите цену,которая показана первой')
})

bot.hears('Кофты/штаны 👖', async ctx => {
    await ctx.reply('Введите стоимость желаемой вещи в юанях (стоимость каждой вещи рассчитывается отдельно)\n\n1.Выберете нужный товар на Poizon и нажмите на правую нижнюю кнопку\n2.Выберете нужный размер и напишите цену,которая показана первой')
})

bot.hears('Аксессуары/футболки/белье 👕', async ctx => {
    await ctx.reply('Введите стоимость желаемой вещи в юанях (стоимость каждой вещи рассчитывается отдельно)\n\n1.Выберете нужный товар на Poizon и нажмите на правую нижнюю кнопку\n2.Выберете нужный размер и напишите цену,которая показана первой')
})

bot.hears('Верхняя одежда 🦺', async ctx => {
    await ctx.reply('Введите стоимость желаемой вещи в юанях (стоимость каждой вещи рассчитывается отдельно)\n\n1.Выберете нужный товар на Poizon и нажмите на правую нижнюю кнопку\n2.Выберете нужный размер и напишите цену,которая показана первой')
})

bot.hears('Оформить заказ ✅', ctx => {
    ctx.reply('Для оплаты заказа пришлите нужный размер и фото нашему менеджеру:\n\nhttps://t.me/freshPlayerShop', getMainMenu())
})

bot.hears('Посмотреть текущий курс: 💴', async ctx => {
    let currentPriceCourse = await getCurrentCnyRubCourse() + 0.6
    ctx.replyWithHTML(`Текущий курс Юаня к Рублю: ${currentPriceCourse.toFixed(1)}₽`)
})

bot.hears('Вернуться назад 🔚',  ctx => {
    ctx.reply('Выберете интересующую вас категорию:', getMainMenu())
})

bot.hears('Другие товары 🧢', ctx => {
    ctx.reply('Если вашего товара нет в списке, свяжитесь с нашим менеджером:\nhttps://t.me/freshPlayerShop', getMainMenu())
})


// bot on

bot.on(message('text'), async ctx => {
    switch(ctx.message.text){
        case 'Оформить заказ или перевести на менеджера 🙋‍♂️': 
        ctx.reply('Наш менеджер поможет вам подобрать любой образ, определиться с размером, а так же сориентирует вас по товарам в наличии. Не стесняйтесь и задавайте любой интересующий вас вопрос 🔽\nhttps://t.me/freshPlayerShop')
        break;
        case 'Акции и промокоды 😍' :
        ctx.reply('Скоро мы добавим этот функционал ☺️')
        break;
        case 'Как скачать Poizon? 🤔' :
        ctx.reply('Ссылки для скачивания Poizon представлены ниже: 🔽', yesNoKeyboard())
        break;
        case 'Отзывы 💌': 
        ctx.reply('Оставляй отзыв и получай скидку 5% на следующий заказ!\n\nОтзывы вы можете посмотреть в нашем чате, перейдя по ссылке ниже: 🔽\nhttps://t.me/+8LmtumijfagxYWJi')
        break;
    }

    let current = await getCurrentCnyRubCourse() + 0.6
    if(ctx.message.text > 0) {
        let finalPrice = Math.ceil(current.toFixed(1) * ctx.message.text + 400)
        ctx.replyWithHTML(`Итоговая стоимость: ${finalPrice}₽ (с учётом доставки) + доставка в ваш регион (Почта России, СДЭК)\n\n<b>Стоимость доставки оплачивается один раз за весь заказ</b>`, getBuy())
    }
})


bot.launch();