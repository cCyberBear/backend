const mongoose = require("mongoose");

const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const request = require("request");
const rp = require("request-promise");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.scrath = catchAsync(async (req, res) => {
  const { word } = req.query;

  //   request(`http://tratu.soha.vn/dict/en_vn/${word}`, (err, req, body) => {
  //     const $ = cheerio.load(body);
  //     const data = $(".section-h3").eq(1).text();
  //     res.json({
  //       success: true,
  //       data,
  //     });
  //   });

  request(
    `https://www.bsc.com.vn/Companies/Overview/${word}`,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const name = $("b").eq(0).text();
        const branch = $("em").eq(0).text();
        const symbol = $(".text-right").eq(0).text();
        const lastPrice = $(".text-right").eq(2).find("font").text();
        const EPS = $(".text-right").eq(16).text();
        const PE = $(".text-right").eq(17).text();
        const PB = $(".text-right").eq(18).text();
        if (!name) {
          throw new ApiError(404, "Symbol not found");
        }
        const data = {
          name,
          branch,
          symbol,
          lastPrice,
          EPS,
          PE,
          PB,
        };
        res.json({
          success: true,
          data,
        });
      } else {
        console.log(error);
      }
    }
  );
});

exports.all = catchAsync(async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
  });
  const page = await browser.newPage();
  await page.goto("https://banggia.vndirect.com.vn/chung-khoan/vn30", {
    waitUntil: "networkidle2",
  });
  const body = await page.content();
  const $ = cheerio.load(body);
  var data = [];
  $(".ui-sortable-handle").each((idx, element) => {
    const symbol = $(element).find(".symbol").text();
    const reflex = $(element).find("td:eq(1)").find("span").text();
    const max = $(element).find("td:eq(2)").find("span").text();
    const min = $(element).find("td:eq(3)").find("span").text();
    const volumn = $(element).find("td:eq(4)").find("span").text();
    const buy3 = $(element).find("td:eq(5)").find("span").text();
    const volBuy3 = $(element).find("td:eq(6)").find("span").text();
    const buy2 = $(element).find("td:eq(7)").find("span").text();
    const volBuy2 = $(element).find("td:eq(8)").find("span").text();
    const buy1 = $(element).find("td:eq(9)").find("span").text();
    const volBuy1 = $(element).find("td:eq(10)").find("span").text();
    const Price = $(element).find("td:eq(11)").find("span").text();
    const Nowvol = $(element).find("td:eq(12)").find("span").text();
    const sell1 = $(element).find("td:eq(14)").find("span").text();
    const volSell1 = $(element).find("td:eq(15)").find("span").text();
    const sell2 = $(element).find("td:eq(16)").find("span").text();
    const volSell2 = $(element).find("td:eq(17)").find("span").text();
    const sell3 = $(element).find("td:eq(18)").find("span").text();
    const volSell3 = $(element).find("td:eq(19)").find("span").text();
    const highest = $(element).find("td:eq(20)").find("span").text();
    const average = $(element).find("td:eq(21)").find("span").text();
    const lowest = $(element).find("td:eq(22)").find("span").text();
    data.push({
      symbol,
      reflex,
      max,
      min,
      volumn,
      buy3,
      volBuy3,
      buy2,
      volBuy2,
      buy1,
      volBuy1,
      Price,
      Nowvol,
      sell1,
      volSell1,
      sell2,
      volSell2,
      sell3,
      volSell3,
      highest,
      average,
      lowest,
    });
  });
  await browser.close();
  res.json({ success: true, data });
});
