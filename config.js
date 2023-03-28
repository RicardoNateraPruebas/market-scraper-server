let config = {
    dbUrl:
     process.env.MONGODB?.URI || "mongodb+srv://ricardo:27202818@scraper-market.06vzj0i.mongodb.net/?retryWrites=true&w=majority",
  };
  
  module.exports = config;
