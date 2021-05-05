/* User mongoose model */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    },
    crafts: {
        type: [{type: String}],
        required: false // allow admin have no tags
    },
    likes: {
        type: [{type: String}],
        required: false,
        default: []
    },
    comments: {
        type: [{type: String}],
        required: false,
        default: []
    },
    tries: {
        type: [{type: String}],
        required: false,
        default: []
    },
    bannerPic: {
        type: String,
        default: 'https://res.cloudinary.com/dwrelgysk/image/upload/v1607656276/banner_alccml.jpg',
        required: false
    },
    profilePic: {
        type: String,
        default: 'https://res.cloudinary.com/dwrelgysk/image/upload/v1607656149/defaultprofile_rstays.jpg',
        required: false
    },
    totalCrafts: {
        type: Number,
        required: false,
        default: 0        
    },
    totalLikes: {
        type: Number,
        required: false,
        default: 0        
    },
    totalComments: {
        type: Number,
        required: false,
        default: 0        
    },
    totalTries: {
        type: Number,
        required: false,
        default: 0        
    },
    muted: {
        type: Boolean,
        default: false,
        required: false // allow admin have no tags
    },
    userType: {
        type: String,
        enum: ["user", "admin"],// user type should be one of the user/admin
        required: true
    }
    // registerTime: {
    //     type: Date,
    //     default: Date.now,
    //     required: true
    // }
})

// hash password when creating a new user
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// hash password when updating password
UserSchema.pre("findOneAndUpdate", function(next) {
    const password = this.getUpdate().$set.password;
    if (!password) {
        return next();
    }
    try {
        bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				this.getUpdate().$set.password = hash;
				next()
			})
		})
    } catch (error) {
        return next(error);
    }
});


// authenticate the user by username and password
UserSchema.statics.findUserByPassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
                    // reject if password is wrong
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }
