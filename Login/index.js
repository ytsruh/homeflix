const { tableService, azure, filterResults } = require("../helpers");
const azureTS = require("azure-table-storage-async");
const jwt = require("jsonwebtoken");

module.exports = async (context, req) => {
  const query = new azure.TableQuery();
  if (!req.body) {
    context.res.status(500).json({ err: "Nothing submitted" });
  }
  try {
    //Get user list
    const allUsers = await azureTS.queryCustomAsync(tableService, "users", query);
    const users = filterResults(allUsers);
    //Loop over array and look for user
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      if (
        //Check username & password match database
        element.PartitionKey === req.body.username.toString() &&
        element.password === req.body.password.toString()
      ) {
        //Set token expiry
        const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 12; //Expires in 12 hours
        //Create JWT
        const token = jwt.sign(
          {
            element,
            exp: expires,
          },
          "SuperSecret123"
        );
        //Send response
        context.res.status(200).json({ token, expires });
      }
    }
    context.res.status(500).json({ err: "No user found or wrong password" });
  } catch (err) {
    context.res.status(500).json({ err });
  }
};
