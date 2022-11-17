const invoiceSchema = [`

    type Invoice{
        _id: String,
        number:  Int,
        iva: Float,
        subtotal: Float,
        products: [Products]
        numProduct: Int,
        total: Float,
        createdAt: GraphQLDateTime,
        updatedAt: GraphQLDateTime,
        isRemove: Boolean
    }

    type Products{
        productId: String
        price: Float
        quantity: Int
    }

    input Products_Input{
        productId: String
        price: Float
        quantity: Int
    }

    input Invoice_Filter{
        _id: String
        number: Int
    }

    input Invoice_Input{
        _id: String,
        number:  Int,
        iva: Float,
        subtotal: Float,
        products: [Products_Input],
        numProduct: Int,
        total: Float,  
    }

    type Query{
        Invoice_Get(filter: Invoice_Filter, option:Option): [Invoice]
        Invoice_Count(filter: Invoice_Filter):Int
      }
    
      type Mutation{
        Invoice_Create(invoiceInput: Invoice_Input):ID
        Invoice_Delete(_id: String!): Boolean
      }
`]

module.exports = invoiceSchema;