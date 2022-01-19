const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Store",
      version: "1.0.0",
      description: "API of Book Store",
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
module.exports = options;
