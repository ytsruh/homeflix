// Azure Table Storage docs
// https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs

// Azure Async
// https://github.com/halioris/azure-table-storage-async

const { tableService, azure, filterResults } = require("../helpers");
const azureTS = require("azure-table-storage-async");

module.exports = async (context, req) => {
  const id = context.bindingData.id;
  const episodesQuery = new azure.TableQuery().where("ShowId eq ?", id.toString());
  const showQuery = new azure.TableQuery().where("RowKey eq ?", id.toString());
  try {
    const episodes = await azureTS.queryCustomAsync(tableService, "episodes", episodesQuery);
    const show = await azureTS.queryCustomAsync(tableService, "shows", showQuery);
    context.res.status(200).json({
      show: filterResults(show),
      episodes: filterResults(episodes),
    });
  } catch (err) {
    context.res.status(500).json({ err });
  }
};
