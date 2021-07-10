const puppeteer = require("puppeteer");
let csvToJson = require("convert-csv-to-json");
let fileInputName = "csv.csv";
let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(fileInputName);

async function run() {
  console.log("STARTING SCRIPT...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let errorArray = [];
  let recordCt = 0;

  for (let i = 0; i < json.length; i++) {
    try {
      await page.goto(json[i].URL);
      let data = await page.evaluate(() => {
        try {
          let price = document.querySelector("#book-price").innerText;
          return price;
        } catch {
          return null;
        }
      });
      // console.log(data);
      if (data) {
        await page.screenshot({
          path: "file/file" + json[i].Record + ".jpeg",
          type: "jpeg",
          quality: 30,
          fullPage: true,
        });
        recordCt++;
        console.log("Success: file", json[i].Record);
      } else {
        // console.log("Error - No Price: file", json[i].Record);
        console.log(
          "\x1b[31m%s\x1b[0m",
          "Error - No Price: file " + json[i].Record
        );
        errorArray.push({
          location: i,
          file: json[i].Record,
          error: "No Price",
        });
      }
    } catch (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Error - Bad URL: file " + json[i].Record
      );
      errorArray.push({ location: i, file: json[i].Record, error: "Bad URL" });
    }
  }
  browser.close();
  console.log("FINISHED EXPORTING " + recordCt + " FILES");
  console.log(errorArray.length + " ERRORS: ", errorArray);
}
run();
