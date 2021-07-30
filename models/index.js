const User = require("./user")
const Post = require("./post")
const Comment = require("./comments")

User.hasMany(Post, {
    foreignKey: { allowNull: false}, onDelete: "CASCADE",
});
Post.belongsTo(User, {
    foreignKey: { allowNull: false}, onDelete: "CASCADE",
});

User.hasMany(Comment, {
    foreignKey: { allowNull: false}, onDelete: "CASCADE",
});
Comment.belongsTo(User, {
    foreignKey: { allowNull: false}, onDelete: "CASCADE",
});

Post.hasMany(Comment, {
    foreignKey: { allowNull: false}, onDelete: "CASCADE",
});
Comment.belongsTo(Post, {
    foreignKey: { allowNull: false}, onDelete: "CASCADE",
});

module.exports = {
    User,
    Post,
    Comment,
};