const {GraphQLDateTime} = require('graphql-iso-date')

const productSchema = [`

    scalar GraphQLDateTime

    type Product {
        _id: String,
        name: String,
        price: Float,
        quantity: Int,
        description: String,
        onSale: Boolean,
        categoryId: String,
        createdAt: GraphQLDateTime,
        updatedAt: GraphQLDateTime, 
        isRemove: Boolean
        review: Review
    }

    input Product_Input{
        _id: String,
        name: String,
        price: Int,
        quantity: Int,
        description: String,
        onSale: Boolean,
        categoryId: String,
    }

    input Product_Filter{
        _id: String,
        name: String,
        price: Int,
        quantity: Int,
        description: String,
        onSale: Boolean,
        categoryId: String,
    }

    input Option{
        limit: Int,
        page: Int
    }

    type Query{
        Product_Get(filter: Product_Filter, option:Option):[Product]
        Product_Count(filter: Product_Filter):Int
    }

    type Mutation{
        Product_Save(productInput: Product_Input):ID
        Product_Delete(_id: String!):Boolean
    }

`]

module.exports = productSchema;