const mongoose = require("mongoose");

const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const request = require("request");
const rp = require("request-promise");
const cheerio = require("cheerio");

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
        let news = "";
        request(
          `https://www.stockbiz.vn/Stocks/HPG/Overview.aspx`,
          (err, resp, body) => {
            if (!error && resp.statusCode == 200) {
              console.log(body);

              const data = {
                news,
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
              console.log(err);
            }
          }
        );
      } else {
        console.log(error);
      }
    }
  );
});
