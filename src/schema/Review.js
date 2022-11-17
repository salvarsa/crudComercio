const {GraphQLDateTime} = require('graphql-iso-date');

const reviewSchema = [`
    
    scalar GraphQLDateTime

    type Review {
        _id: String,
        description: String,
        rating: Int,
        productId: String,
        createdAt: GraphQLDateTime,
        updatedAt: GraphQLDateTime,
        isRemove: Boolean
    }

    type Review_Rating{
        _id: String,
        name: String
    }

    input Review_Input{
        _id: String,
        description: String,
        rating: Int,
        productId: String
    }

    input Review_Filter{
        _id: String,
        productId: String,
    }

    type Query{
        Review_Get(filter: Review_Filter, option:Option):[Review]
        Review_Rating:[Review_Rating]
        Review_Count(filter: Review_Filter):Int
    }

    type Mutation{
        Review_Save(reviewInput: Review_Input):ID
        Review_Delete(_id: String! ): Boolean
      }
`]

module.exports = reviewSchema;