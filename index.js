const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const result = excelToJson({
  sourceFile: "FAQ.xlsx",
  columnToKey: {
    A: "qtn",
    B: "ans",
  },
});

const parsedData = (data = []) => {
  return data.map((item, index) => {
    const updatedQtn = item.qtn.includes("?") ? item.qtn : `${item.qtn}?`;
    return {
      id: `${index + 1}`,
      qtn: updatedQtn,
      answer: {
        type: "PARAGRAPH",
        text: item.ans.split("\r"),
      },
    };
  });
};

try {
  //   fs.writeFileSync(
  //     "./FAQ-both.json",
  //     JSON.stringify(parsedData(result.Both), undefined, 2)
  //   );
  fs.writeFileSync(
    "./FAQ-web.json",
    JSON.stringify(parsedData(result.Web.concat(result.Both)), undefined, 2)
  );
  fs.writeFileSync(
    "./FAQ-mobile.json",
    JSON.stringify(parsedData(result.Mobile.concat(result.Both)), undefined, 2)
  );
} catch (err) {
  console.error(err);
}
