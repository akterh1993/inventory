const fs = require('fs')
const User = require('../models/userModel');
const { successResponse } = require('../middlewares/responseHandler');
const { findWithId } = require('../helper/findWithId');
const { delateImage } = require('../helper/deleteImage');
const createError = require('http-errors');

const getUsers = async(req, res, next) =>{
    try {

        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            isAdmin: { $ne : true },
            $or: [
                {name: {$regex: searchRegExp}},
                {email: {$regex: searchRegExp}},
                {mobile: {$regex: searchRegExp}},
            ]
        };
        const options = { password: 0 };
        const users = await User.find(filter, options)
        .limit(limit)
        .skip((page-1) * limit);

        const count = await User.find(filter).countDocuments();


        res.status(200).send({
            message: 'Users ware returned',
            users,
            pagination: {
                totalPage: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page -1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit ) ? page + 1 : null,
            }
        })
    } catch (error) {
        next(error);
    }
};
const getUserById = async(req, res, next)=>{

    try {
        const id = req.params.id;
        const options = { password: 0};
        const user = await findWithId(User, id, options);
        return successResponse(res, {
            statusCode: 200,
            message: 'User ware Returned Successfully',
            payload: { user },
        });
    } catch (error) {
        
        next(error);
    }
};
const deleteUserById = async(req, res, next)=>{

    try {
        const id = req.params.id;
        const options = { password: 0};
        const user = await findWithId(User, id, options);

        const userImagePath = user.image;
        delateImage(userImagePath);

// Old System image delete 
        // fs.access(userImagePath, (err) =>{
        //     if (err) {
        //         console.error('User image does not exist')
                
        //     } else {
        //         fs.unlink(userImagePath, (err)=>{
        //             if (err) throw err;
        //             console.log('User Image was Deleted');
                    
        //         });
                
        //     }
        // });

        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });

        return successResponse(res, {
            statusCode: 200,
            message: 'User was Deleted Successfully',
        });
    } catch (error) {
        
        next(error);
    }
};

const register = async(req, res, next) =>{
    try {
        const {name, email, mobile, password, address} = req.body;

        const userExists = await User.exists({emai: email});

        if (userExists) {
            throw createError(409,'User Already Exist. Please Login Now!')
            
        }

        const newUser = {
            name,
            email,
            mobile,
            password,
            address,
        };
        return successResponse(res, {
            statusCode:200,
            message: 'User was Created Successfull',
            payload: { newUser },
        })
    } catch (error) {
        next(error);
    }
};

module.exports = { register, getUsers, getUserById, deleteUserById }