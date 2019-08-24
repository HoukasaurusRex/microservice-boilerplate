const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

async function shot(url, type){
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })
  console.log({browser})
  const page = await browser.newPage()
  await page.goto(url)
  const file = await page.screenshot({ type })
  await browser.close()
  return file
}

/**
 * Send screenshot
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async(req, res) => {
  const { type = 'png', page = 'jt.houk.space' } = req.query
  const url = `https://${page}`
  const file = await shot(url, type)
  res.statusCode = 200
  res.setHeader('Content-Type', `image/\${type}`)
  res.end(file)
}