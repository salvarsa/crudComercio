const review = require('../models/Review');
const { generateId, handlePagination } = require('@codecraftkit/utils');

const avgRating = {
    "1":{_id:"1",  name: "✩"},
    "2":{_id:"2",  name: "✩✯"},
    "3":{_id:"3",  name: "✩✯⭑"},
    "4":{_id:"4",  name: "✩✯⭑⭑"},
    "5":{_id:"5",  name: "✩✯⭑⭑⭑"}
}

const Review_Create = async (_, {reviewInput}) => {
    try {
        const ID = generateId();
        const {
            description,
            rating,
            productId,
        } = reviewInput;

        await new review({
            _id: ID,
            description,
            rating,
            productId,
        }).save()

        return ID;

    } catch (error) {
        return error;
    }
}

const Review_Update = async (_, {reviewInput}) => {
    try {
        await review.findByIdAndUpdate(reviewInput._id, {$set: reviewInput}, {new: true});
        return reviewInput._id;
    } catch (error) {
        return error;
    }
}

const Review_Save = async (_, {reviewInput}) =>{
    try {
        if (reviewInput._id){
            return await Review_Update(_, {reviewInput});
        }else {
            return await Review_Create(_, {reviewInput});
        }
    } catch (error) {
        return error;
    }
}

const Review_Delete = async (_, {_id}) => {
    try {
        await reviews.findByIdAndUpdate(_id, {$set: {isRemove: true}});
        return true;
    } catch (error) {
        return error;
    }
}

const Review_Get = async (_, {filter = {}, option = {}}) => {
    try {
        let query = {isRemove: false};
        let {
            _id,
            description,
            rating,
            productId,
        } = filter;

        let {skip, limit} = handlePagination(option);
        if(_id) query._id = id;
        if(description) query.description = {$regex: description, $options: 'i'};
        if(rating) query.rating = rating;
        if(productId) query.productId = productId;

        const find = review.find(query);

        if(skip) {find.skip(skip)};
        if(limit) {find.limit(limit)};
        let result = await find.lean();
        return result; 

    } catch (error) {
        return error;
    }
}

const Review_Count = async (_, {filter = {}}) => {
    try {
       const counter = await Review_Get (_, {filter});
       return counter.length; 
    } catch (error) {
        return error;
    }
}

const Review_Rating = async () => {
    try {
      return Object.values(avgRating);
    } catch (error) {
      return error;
    }
  };

module.exports = {
    Query: {
        Review_Get,
        Review_Count,
        Review_Rating
    },
    Mutation: {
        Review_Save,
        Review_Delete
    }
}
