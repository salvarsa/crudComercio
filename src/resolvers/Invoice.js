const { generateId, handlePagination } = require('@codecraftkit/utils');

const invoiceModel = require('../models/Invoice');

const Invoice_Create = async (_, {invoiceInput = {}}) => {
    try {
        let { iva, products = [], subtotal = 0 } = invoiceInput;

        if (!products.length) throw new Error('PRODUCTS_ARE_REQUIRED');
    
        for (let i = 0; i < products.length; i++) {
          let product = products[i];
          product.subtotal = product.price * product.quantity;
          subtotal += product.subtotal;
        }
        
        const number = await invoiceModel.countDocuments();
        const totalIva = subtotal * (iva / 100);
        const total = subtotal + totalIva;
    
        const ID = generateId();
        const newInvoice = await new InvoiceModel({
            _id: ID,
            number: number + 1,
            iva,
            subtotal,
            products,
            total,
        }).save();
    
        return newInvoice._id; 
    } catch (error) {
       return error; 
    }
};

const Invoice_Get = async (_, { filter = {}, Option = {}}) => {
    try {
        let query = {isRemove: false};

        let { _id, number } = filter;
        let { skip, limit } = handlePagination(option);

        if (_id) query._id = _id;
        if(number) query.number;

        const find = invoiceModel.find(query);

        if (skip) {
            find.skip(skip);
          }
          if (limit) {
            find.limit(limit);
          }

         return await find.exec();  
    } catch (error) {
        return error;
    }
};

const Invoice_Delete = async (_, {_id}) => {
    try {
        await invoice.findByIdAndUpdate(_id, {
            $set: { isRemove: true },
          });
      
          return true;
    } catch (error) {
        return error;
    }
};

const Invoice_Count = async (_, {filter = {}}) => {
    try {
        const count = await Invoice_Get(_, { filter });
        return count.length;
    } catch (error) {
        return error;
    }
};

module.exports = {
    Query: {
        Invoice_Get,
        Invoice_Count
    },

    Mutation: {
        Invoice_Create,
        Invoice_Delete
    }
};