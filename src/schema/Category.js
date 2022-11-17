const categorySchema = [`

    type Category{
        _id: String,
        name: String,
        stock: Int,
        createdAt: GraphQLDateTime,
        updatedAt: GraphQLDateTime, 
        isRemove: Boolean,
        result: Product
    }

    input Category_Input{
        _id: String,
        name: String,
        stock: Int
    }

    input Category_Filter{
        _id: String
        name: String
        stock: Int
    }

    type Query{
        Category_Get(filter: Category_Filter, option:Option, _id: ID):[Category]
        Category_Count(filter: Category_Filter):Int 
    }

    type Mutation{
        Category_Save(categoryInput: Category_Input):ID
        Category_Delete(_id: String!):Boolean
    }  
`]

module.exports = categorySchema;