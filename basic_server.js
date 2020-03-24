var express = require("express");
var express_graphql = require("express-graphql");
var {buildSchema} = require("graphql");

// add schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// add resolver
var root = {
    message: () => "Hello World"
}

// setup server
var app = express();
app.use('/graphiql', express_graphql({
    schema: schema, 
    rootValue: root, 
    graphiql: true
}))

app.listen(4000, () => console.log("Express GraphQL Server is listening on port localhost:4000/graphiql"))
