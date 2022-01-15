require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { dbConnection } = require("./db");
const { authMid } = require("./middlewares/auth");

dbConnection();
const app = express();

app.use(authMid);

app.get("/", function (req, res) {
    res.send("Welcome to my graphql api");
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`http://localhost:${PORT} || http://localhost:${PORT}/graphql`);
