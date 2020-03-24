var express = require("express");
var express_graphql = require("express-graphql");
var {buildSchema} = require("graphql");

// add schema
var schema = buildSchema(`
    type Simpson {
        name: String, 
        age: Int, 
        description: String
    }
    
    type Mutation {
        concatenateFields(name: String!, age: Int!): String
    }
    type Query {
        simpson(name: String!): Simpson,
        simpsons(name: String): [Simpson]
    }
`);

var simpsonsData = [
    {
        name: "Homer", 
        age: 40, 
        description: "mmmm Beer"
    },
    {
        name: "Marge", 
        age: 40, 
        description: "Blue hair"
    },
    {
        name: "Bart", 
        age: 10, 
        description: "Trouble maker"
    },
    {
        name: "Lisa", 
        age: 8, 
        description: "Saxamaphone"
    }
];

var getSimpson = function(args) {
    var name = args["name"];
    var simpson = simpsonsData.filter(s => s.name == name)[0];
    return simpson;
}

var getSimpsons = function() {
    return simpsonsData;
}

var concatenateFields = function(name, age) {
    return name + ": ";
}

// add resolver
var root = {
    simpson: getSimpson, 
    simpsons: getSimpsons,
    concatenateFields: concatenateFields, 
}

// setup server
var app = express();
app.use('/graphiql', express_graphql({
    schema: schema, 
    rootValue: root, 
    graphiql: true
}))

app.listen(4000, () => console.log("Express GraphQL Server is listening on port localhost:4000/graphiql"))
