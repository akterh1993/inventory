const {Schema, model} = require('mongoose');
const  bcrypt  = require('bcrypt');
const  defaultInage  = require('bcrypt');
const config = require('../config/config');

const imagePath = config.img.url;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valied Email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength:[8, 'Minimum 8 Characters length'],
        mmaxLength:[15, 'Minimum 15 Characters length'],
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    mobile: {
        type: String,
        required: true,
        minLength:[11, 'Minimum 8 Characters length'],
        mmaxLength:[11, 'Minimum 8 Characters length'],
    },
    image: {
        type: String,
        default: imagePath,
    },
    address: {
        type: String,
        default: ''
    },
    shopName: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: String,
        default: false,
    },
    isBanned: {
        type: String,
        default: false
    },
}, {timestamps: true});

const User = model('Users', userSchema);
module.exports = User;
