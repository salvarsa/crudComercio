const {Schema , model} = require('mongoose');
const collectionName = 'User';

const userSchema = Schema(
    {
        _id: String,
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        avatar: { type: String },
        role: { type: Number, default: 0 },
        history: { type: Array, default: [] },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        isRemove: { type: Boolean, default: false }
    }
)

module.exports = model(collectionName, userSchema)