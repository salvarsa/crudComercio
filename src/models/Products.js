const {Schema, model} = require('mongoose');

const collectionName = 'Products';

const productSchema = Schema({
    _id: String,
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    onSale: Boolean,
    categoryId: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now }, 
    isRemove: {type: Boolean, default: false}
},{
    collection: collectionName,
    _id: false
})

module.exports = model(collectionName, productSchema);