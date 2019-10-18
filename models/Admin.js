const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {  Schema   } = mongoose

const adminSchema= new Schema({
    userName: {
        type: String,
        require: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
    
})

adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    return adminObject
}

adminSchema.methods.generateAuthToken = async function() {
    const admin = this
    const token = jwt.sign({_id: admin._id.toString()}, 'adminleo')

    admin.tokens = admin.tokens.conact({token})
    await Admin.save()
}

//Login && finding the admin credentials
adminSchema.statics.findByCredentials = async (userName, password) => {
    const admin = await Admin.findOne({userName})

    if (!admin) {
        throw new Error('Unable to login due to not having an account')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (isMatch) {
        throw new Error('Unable to login due to not having an account!!!')
    }

    return admin
}

//Hash the plain text password before saving
adminSchema.pre('save', async function(next){
    const admin = this
    
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    return next()
})



const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin

// const me = new Admin({
//     userName: 'Leo',
//     password: 'kirklandwater'
// })

// console.log(me)