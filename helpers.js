const azure = require("azure-storage");
const tableSvc = azure.createTableService(
  "homeflix",
  "qNzl7mniYqq7w4GRX3rz4t/CxER2Y4i1x3E/qhJPkOe5drSQoM8rAqCg+pyH+3JGXsLKjd7ro/BNn/wvCkcFeA=="
);

const filterResults = (array) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    let newObj = {};
    for (const prop in el) {
      newObj[prop] = el[prop]["_"];
    }
    delete newObj[".metadata"];
    newArray.push(newObj);
  }
  return newArray;
};

module.exports = {
  tableService: tableSvc,
  azure,
  filterResults,
};
