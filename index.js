const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const result = excelToJson({
  sourceFile: "FAQ.xlsx",
  header: {
    rows: 1,
  },
  columnToKey: {
    A: "category",
    B: "qtn",
    C: "ans",
  },
});

const parseMobileData = (data = []) => {
  return data.map((item, index) => {
    const updatedQtn = item.qtn.includes("?") ? item.qtn : `${item.qtn}?`;
    return {
      id: `${index}`,
      category: [item.category],
      qtn: updatedQtn,
      answer: {
        type: "PARAGRAPH",
        text: item.ans.split("\r\n"),
      },
    };
  });
};

const parseWebData = (data = []) => {
  return data.map((item, index) => {
    const updatedQtn = item.qtn.includes("?") ? item.qtn : `${item.qtn}?`;
    return {
      id: `${index + 1}`,
      category: [item.category],
      qtn: updatedQtn,
      answer: {
        type: "PARAGRAPH",
        text: item.ans.split("\r"),
      },
    };
  });
};

try {
  fs.writeFileSync(
    "./FAQ-web.json",
    JSON.stringify(parseWebData(result.Web.concat(result.Both)), undefined, 2)
  );
  fs.writeFileSync(
    "./FAQ-mobile.json",
    JSON.stringify(
      parseMobileData(result.Mobile.concat(result.Both)),
      undefined,
      2
    )
  );
} catch (err) {
  console.error(err);
}
