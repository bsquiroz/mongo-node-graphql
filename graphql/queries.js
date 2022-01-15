const { GraphQLList, GraphQLID } = require("graphql");
const { userType, postType, commentType } = require("./types");
const { UserModel, PostModel, CommentModel } = require("../models");

const getUsers = {
    type: new GraphQLList(userType),
    description: "List of users of the db",
    async resolve() {
        const resUsers = await UserModel.find();
        return resUsers;
    },
};

const getUser = {
    type: userType,
    description: "return to user for id",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args;
        const resUser = await UserModel.findById(id);
        return resUser;
    },
};

const getPosts = {
    type: new GraphQLList(postType),
    description: "List of post of the db",
    async resolve() {
        const resPosts = await PostModel.find();
        return resPosts;
    },
};

const getPost = {
    type: postType,
    description: "return to post for id",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args;
        const resPost = await PostModel.findById(id);
        return resPost;
    },
};

const getCommentes = {
    type: new GraphQLList(commentType),
    description: "List of comment of the db",
    async resolve() {
        const resPosts = await CommentModel.find();
        return resPosts;
    },
};

const getCommente = {
    type: commentType,
    description: "return to comment for id",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args;
        const resPost = await CommentModel.findById(id);
        return resPost;
    },
};

module.exports = {
    getUsers,
    getUser,
    getPosts,
    getPost,
    getCommentes,
    getCommente,
};
