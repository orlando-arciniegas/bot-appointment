const { chromium } = require('playwright');
const { sendEmail } = require('./services/emailService');
const cron = require('node-cron');

const url = 'https://titulosvalidez.educacion.gob.ar/validez/detitulos';
const cssSelector = 'span';
const emailTo = process.env.USER_EMAIL;
const emailSubject = 'Turnos Ministerio de Educación';

cron.schedule('0 9,15,21 * * *', () => {
   
(async () => {
    
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const texts = await page.locator(cssSelector).allTextContents();
    const result = texts.join(' ');
    sendEmail(emailTo, emailSubject, result)
    await browser.close();

})();

});