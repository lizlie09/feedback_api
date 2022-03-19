module.exports = {
  env: {
    dev: process.env.NODE_ENV !== "production",
  },
  mongodb: {
    ip: "127.0.0.1",
    port: "27017",
    db: "feedback",
    username: "lizlie",
    password: "YXikECBuWtdjpsRL",
    clusterUrl: "cluster0.omlqw.mongodb.net",
  },
  crypto: {
    privateKey:
      "37LvDSasdfasfsaf3a3IEIA;3r3oi3joijpjfa3a3m4XvjYOh9Yaa.p3id#IEYDNeaken",
    tokenExpiry: 1 * 30 * 1000 * 60, //1 hour
  },
  auth: {
    password: "algotechdigtalsolutionsrockinrolltotheworldsmashciotechky",
  },
};
