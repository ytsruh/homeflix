// Azure Table Storage docs
// https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs

var azure = require("azure-storage");
var tableSvc = azure.createTableService("myaccount", "myaccesskey");
var tableSvc = azure.createTableService();

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Hello from the other side",
  };
};
