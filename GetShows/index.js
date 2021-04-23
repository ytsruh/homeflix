// Azure Table Storage docs
// https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs

// Azure Async
// https://github.com/halioris/azure-table-storage-async

const { tableService, azure, filterResults } = require("../helpers");
const azureTS = require("azure-table-storage-async");

module.exports = async (context, req) => {
  const query = new azure.TableQuery();
  try {
    const shows = await azureTS.queryCustomAsync(tableService, "shows", query);
    context.res.status(200).json({
      shows: filterResults(shows),
    });
  } catch (err) {
    context.res.status(500).json({ err });
  }
};
