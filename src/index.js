const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {connect} = require('mongoose');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const bodyParser = require('body-parser');
const {ApolloServerPluginLandingPageProductionDefault} = require('apollo-server-core');

//conexion a la base de datos
const db = process.env.MONGODB || 'mongodb://localhost:27017/crudComercio'

const connectdb = () =>{
    try {
        connect(db);
        console.log('db connected...')
    } catch (error) {
        return error;
    }
}

//conexion de la app
const app = express();
app.use(bodyParser.json());

//puerto
const PORT = process.env.PORT || 3000

// typedefs y resolvers
const typeDefs = require('./merge/mergeSchema');
const resolvers = require('./merge/mergeResolvers');

//routes
app.use('/api/user/', require('./routes/auth.route'));
app.use('/api/category/', require('./routes/Category'));

//pagina de inicio
app.get('/', (req, res) =>{
    res.send('🚀')
});

//Apollo-server
async function start(){
    const schema = makeExecutableSchema({typeDefs, resolvers});
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageProductionDefault({
                embed: true,
              }),
        ]
    });
    await apolloServer.start();
    //conexion del apolloSerever con la app
    apolloServer.applyMiddleware({app});
    
    app.listen(PORT, (req, res) =>{
        console.log(`Servidor en linea en el puerto ${PORT}`);
        connectdb();
    });
}

start();