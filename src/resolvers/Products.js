const products = require('../models/Products');
const {generateId, handlePagination} = require('@codecraftkit/utils');

const Product_Create = async (_, {productInput}) => {
    try {
        const ID =  generateId();
        const {
            name,
            price,
            quantity,
            description,
            onSale,
            categoryId
        } = productInput;
        await new products({
            _id: ID,
            name,
            price,
            quantity,
            description,
            onSale,
            categoryId
        }).save();
        return ID;

    } catch (error) {
        return error;
    }
}

const Product_Update = async (_, {productInput}) => {
    try {
        await products.findByIdAndUpdate(productInput._id, {$set: productInput}, {new: true})
        return productInput._id;
    } catch (error) {
        return error;
    }
}

const Product_Save = async (_, {productInput}) => {
    try {
        if (productInput._id){
            return await Product_Update(_, {productInput});
        }else {
            return await Product_Create(_, {productInput})
        }
    } catch (error) {
        return error;
    }
}

const Product_Delete = async (_, {_id}) => {
    try {
        await products.findByIdAndUpdate(_id, {$set: {isRemove: true, onSale: false, quantity: 0}});
        return true;
    } catch (error) {
        return error;
    }
}

const Product_Get = async (_, {filter = {}, option = {}}) => {
    try {
        let query = {isRemove: false};
        let {
            _id,
            name,
            price,
            quantity,
            description,
            onSale,
            categoryId
        } = filter;

        let {skip, limit} = handlePagination(option);
        if(_id) query._id = id;
        if(name) query.name = {$regex: name, $options: 'i'};
        if(price) query.price = price;
        if(quantity) query.quantity = quantity;
        if(description) query.description = {$regex: quantity, $options: 'i'};
        if(onSale) query.onSale = onSale;
        if(categoryId) query.categoryId = categoryId;
        
        // const find = products.find(query);
        const aggregate = [
            {
                $lookup:{
                    from: "review",
                    localField: "_id",
                    foreignField: "productId",
                    as: "review"
                }
            },{
                $unwind: {
                    path: "$review",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]

        if(skip) {find.skip(skip)};
        if(limit) {find.limit(limit)};

        // let result = await find.lean();
        // return result;
        return await products.aggregate(aggregate)
    } catch (error) {
        return error;
    }
}

const Product_Count = async (_, {filter = {}}) => {
    try {
        const counter = await Product_Get (_, {filter});
        return counter.length;
    } catch (error) {
        return error;
    }
}

module.exports = {
    Query: {
        Product_Get,
        Product_Count
    },
    Mutation: {
        Product_Save,
        Product_Delete
    }
}