const {Schema, model} = require('mongoose');
const collectionName = 'Invoice'

const invoiceSchema = Schema(
    {
        _id: String,
        number:  Number,
        iva: Number,
        subtotal: Number,
        products: Array,
        numProduct: Number,
        total: Number,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        isRemove: { type: Boolean, default: false }
    },  {
        collection: collectionName,
        _id: false,
      }
);

module.exports = model (collectionName,invoiceSchema);