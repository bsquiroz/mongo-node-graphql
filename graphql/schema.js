const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addCommentToPost,
    updateComment,
    delateComment,
} = require("./mutations");
const {
    getUsers,
    getUser,
    getPost,
    getPosts,
    getCommentes,
    getCommente,
} = require("./queries");

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        getUsers,
        getUser,
        getPost,
        getPosts,
        getCommentes,
        getCommente,
    },
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost,
        addCommentToPost,
        updateComment,
        delateComment,
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

module.exports = schema;
