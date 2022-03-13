module.exports = {
  env: {
    dev: process.env.NODE_ENV !== "production",
  },
  mongodb: {
    ip: "127.0.0.1",
    port: "27017",
    app: "feedback",
    username: "lizlie",
    password: "*whatsthepassw0rd",
  },
  crypto: {
    privateKey:
      "37LvDSasdfasfsaf3a3IEIA;3r3oi3joijpjfa3a3m4XvjYOh9Yaa.p3id#IEYDNeaken",
    tokenExpiry: 1 * 30 * 1000 * 60, //1 hour
  },
  auth: {
    password: "algotechdigtalsolutionsrockinrolltotheworldsmashciotechky",
  },
  aws_credentials: {
    region: "ap-southeast-1",
    accessKeyId: "AKIAX2OJJ4ZGNT4T2IGF",
    secretAccessKey: "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",
    bucket:
      process.env.NODE_ENV === "production" ? "visitour" : "visitour-staging",
  },
};
