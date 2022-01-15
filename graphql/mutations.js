const { GraphQLString, GraphQLID } = require("graphql");

const { UserModel, PostModel, CommentModel } = require("../models");
const { createJwt } = require("../utils/auth");
const { postType, commentType } = require("./types");

const register = {
    type: GraphQLString,
    description: "register a new user and return to token",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    async resolve(_, args) {
        const { username, email, password, displayName } = args;
        const newUser = {
            username,
            email,
            password,
            displayName,
        };
        const resUser = await UserModel.create(newUser);
        const resToken = createJwt(resUser);
        return resToken;
    },
};

const login = {
    type: GraphQLString,
    description: "login to user with email and password and return a token",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(_, args) {
        const { email, password } = args;
        const resUser = await UserModel.findOne({ email, password });
        if (!resUser) throw new Error("Invalid credentials");
        const resToken = createJwt(resUser);
        return resToken;
    },
};

const createPost = {
    type: postType,
    description: "Create a new post",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    async resolve(_, args, { verified_token }) {
        const { title, body } = args;
        const newPost = {
            userId: verified_token._id,
            title,
            body,
        };
        const resPost = await PostModel.create(newPost);
        return resPost;
    },
};

const updatePost = {
    type: postType,
    description: "Update a post for one id",
    args: {
        postId: { type: GraphQLString },
        newTitle: { type: GraphQLString },
        newBody: { type: GraphQLString },
    },
    async resolve(_, args, { verified_token }) {
        const { postId, newTitle, newBody } = args;

        if (!verified_token) throw new Error("No autizado");

        const resPost = await PostModel.findOneAndUpdate(
            {
                _id: postId,
                userId: verified_token._id,
            },
            {
                title: newTitle,
                body: newBody,
            },
            {
                new: true,
            }
        );

        return resPost;
    },
};

const deletePost = {
    type: GraphQLString,
    description: "delete a post",
    args: {
        postId: { type: GraphQLID },
    },
    async resolve(_, args, { verified_token }) {
        const { postId } = args;

        if (!verified_token) throw new Error("No autizado");

        const resPost = await PostModel.findOneAndRemove({
            _id: postId,
            userId: verified_token._id,
        });

        if (!resPost) throw new Error("Post no encontrado");

        return `post delete`;
    },
};

const addCommentToPost = {
    type: commentType,
    description: "add comment to post for id user y id post",
    args: {
        postId: { type: GraphQLID },
        comment: { type: GraphQLString },
    },
    async resolve(_, args, { verified_token }) {
        const { postId, comment } = args;

        if (!verified_token) throw new Error("No autizado");

        const resComment = await CommentModel.create({
            postId,
            comment,
            userId: verified_token._id,
        });

        return resComment;
    },
};

const updateComment = {
    type: commentType,
    description: "Update a comment for one id",
    args: {
        commentId: { type: GraphQLString },
        newComment: { type: GraphQLString },
    },
    async resolve(_, args, { verified_token }) {
        const { commentId, newComment } = args;

        if (!verified_token) throw new Error("No autizado");

        const resComment = await CommentModel.findOneAndUpdate(
            {
                _id: commentId,
                userId: verified_token._id,
            },
            {
                comment: newComment,
            },
            {
                new: true,
            }
        );

        return resComment;
    },
};

const delateComment = {
    type: GraphQLString,
    description: "delete a comment",
    args: {
        commentId: { type: GraphQLID },
    },
    async resolve(_, args, { verified_token }) {
        const { commentId } = args;

        if (!verified_token) throw new Error("No autorizado");

        const resPost = await CommentModel.findOneAndRemove({
            _id: commentId,
            userId: verified_token._id,
        });

        if (!resPost) throw new Error("Post no encontrado");

        return "post delete";
    },
};

module.exports = {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addCommentToPost,
    updateComment,
    delateComment,
};
