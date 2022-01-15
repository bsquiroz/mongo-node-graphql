const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require("graphql");
const { UserModel, PostModel, CommentModel } = require("../models");

const userType = new GraphQLObjectType({
    name: "UserType",
    description: "the user type",
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
});

const postType = new GraphQLObjectType({
    name: "postType",
    description: "the post type",
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        user: {
            type: userType,
            async resolve(parent) {
                return await UserModel.findById(parent.userId);
            },
        },
        comments: {
            type: new GraphQLList(commentType),
            async resolve(parent) {
                return await CommentModel.find({ postId: parent._id });
            },
        },
    }),
});

const commentType = new GraphQLObjectType({
    name: "commentType",
    description: "the comment type",
    fields: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        postId: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: userType,
            async resolve(parent) {
                return await UserModel.findById(parent.userId);
            },
        },
        post: {
            type: postType,
            async resolve(parent) {
                return await PostModel.findById(parent.postId);
            },
        },
    },
});

module.exports = {
    userType,
    postType,
    commentType,
};
