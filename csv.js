let csvToJson = require("convert-csv-to-json");
let fileInputName = "csv.csv";
// let fileOutputName = "csvout.json";
// csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(fileInputName);

// console.log(json);
for (let i = 0; i < json.length; i++) {
  console.log(json[i].URL);
}
