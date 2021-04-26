require("dotenv").config();
const azure = require("azure-storage");
const tableSvc = azure.createTableService("homeflix", process.env.STORAGE_KEY);

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
