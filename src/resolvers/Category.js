const category = require('../models/Category');
const {generateId, handlePagination} = require('@codecraftkit/utils');

const Category_Create = async (_, {categoryInput}) => {
    try {
        const ID = generateId();
        const {
            name,
            stock
        } = categoryInput;
        await new category({_id: ID, name, stock}).save();
        return ID;
        
    } catch (error) {
        return error;
    }
}

const Category_Update = async (_, {categoryInput}) => {
    try {
        await category.findByIdAndUpdate(categoryInput._id, {$set: categoryInput}, {new: true})
        return categoryInput._id;
    } catch (error) {
        return error;
    }
}

const Category_Save = async (_, {categoryInput = {}}) => {
    try {
        if(categoryInput._id){
            return await Category_Update(_, {categoryInput});
        }else {
            return await Category_Create(_, {categoryInput});
        }
    } catch (error) {
        return error;
    }
}

const Category_Delete = async (_, {_id}) => {
    try {
        await category.findByIdAndUpdate(_id, {$set: {isRemove: true}})
        return true;
    } catch (error) {
        return error;
    }
}

const Category_Get = async (_, {filter = {}, option = {}}) => {
    try {
        let query = {isRemove: false};
        let {
            _id,
            name,
            stock
        } = filter;

        let {skip, limit} = handlePagination(option);

        if (_id) query.id = id;
        if (name) query.name = { $regex: name, $options: 'i' }
        if (stock) query.stock = stock;

        const find = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "result"
                },
            },
            {
                $unwind: {
                    path: "$result",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]


        if (skip) {find.skip(skip)};
        if (limit) {find.limit(limit)};

        
        let result = await category.aggregate(find);
        return result;

    } catch (error) {
        return error;
    }
}

const Category_Count = async (_, {filter = {}}) => {
    try {
        const counter = await Category_Get (_, {filter});
        return counter.length
    } catch (error) {
        return error;
    }
}

module.exports = {
    Query: {
        Category_Get,
        Category_Count,
    },
    Mutation: {
        Category_Save,
        Category_Delete  
    }
}