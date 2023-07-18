const { chromium } = require('playwright');
const { sendEmail } = require('./services/emailService');

const url = 'https://titulosvalidez.educacion.gob.ar/validez/detitulos';
const cssSelector = 'span';
const emailTo = process.env.USER_EMAIL;
const emailSubject = 'Turnos Ministerio de Educación';

cron.schedule('0 9,15,21 * * *', () => {

(async () => {

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const cssSelector = 'span';
    const texts = await page.evaluate((selector) => {
        const elements = Array.from(document.querySelectorAll(selector));
        return elements.map((element) => element.textContent);
    }, cssSelector);
    const result = texts.join(' ');
    console.log(texts);

    sendEmail(emailTo, emailSubject, result)

    await browser.close();
})();

});