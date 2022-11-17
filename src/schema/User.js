const userSchema = [`
    type User{
        _id: String
        name: String
        email: String
        password: String
        avatar: String
        role: Int
        history: [String]
        createdAt: GraphQLDateTime
        updatedAt: GraphQLDateTime
        isRemove: Boolean
    }

    input User_Filter{
        _id: String
        email: String
    }

    input User_Input{
        _id: String
        name: String
        email: String
        password: String
        avatar: String
        role: Int
        history: [String]
    }

    type Query{
        User_Get(filter: User_Filter, option:Option):[User]
        User_Count(filter: User_Filter):Int
      }
      type Mutation{
        User_Update(userInput: User_Input):ID
        User_Delete(_id: String!): Boolean
      }
`]

module.exports = userSchema;