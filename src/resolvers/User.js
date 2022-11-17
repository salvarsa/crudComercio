const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const { handlePagination } = require('@codecraftkit/utils');

const User_Update = async (_, {userInput}) => {
    try {
        if (userInput.password){
            const salt = await bcrypt.genSalt(10);
            let {password} = userInput;
            userInput.password = await bcrypt.hash(password, salt);
        }
        await userModel.findByIdAndUpdate(
            userInput._id, 
            {$set: userInput},
            {new: true}
        );
        return userInput._id;
    } catch (error) {
        console.log('error update' +e);
        return error;
    }
};

const User_Get = async (_,  { filter = {}, option = {} }) => {
    try {
        let query = { isRemove: false };
        let { _id, email } = filter;
        let { skip, limit } = handlePagination(option);
    
        if (_id) query._id = _id;
        if (email) query.email = { $regex: email, $Options: 'i' };
    
        const find = userModel.find(query);
        //console.log(await find);
    
        if (skip) {
          find.skip(skip);
        }
        if (limit) {
          find.limit(limit);
        }
        return await find.exec();s
    } catch (error) {
       return error
    }
};

const User_Delete = async (_, { _id }) => {
    try {
        await userModel.findByIdAndUpdate(_id, {
            $set: { isRemove: true },
          });
          return true;
    } catch (error) {
        return error;
    }
};

const User_Count = async (_, { filter = {} }) => {
    try {
        const count = await User_get(_, { filter });
        return count.length;
    } catch (error) {
        return error;
    }
}
module.exports = {
    Query: { 
        User_Get, 
        User_Count 
    },
    Mutation: { 
        User_Update, 
        User_Delete 
    },
  };