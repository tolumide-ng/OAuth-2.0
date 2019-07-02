require("dotenv").config();

module.exports = {
  google: {
    clientId: process.env.clientID,
    clientSecret: process.env.clientSecret,
    mongodb: {
      dbURI: process.env.dbURI
    }
  },
  session: {
    cookieKey: process.env.cookieKey
  }
};
