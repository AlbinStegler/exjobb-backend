const mongoose = require("mongoose");
const { eventNames } = require("../app");

const database = {
    getDb: async function getDb() {
        let dsn;
        if (process.env.NODE_ENV === "test") {
            dsn = "mongodb://localhost:27017/lan";
        } else {
            dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@egamenight.dkzmkdw.mongodb.net/?retryWrites=true&w=majority&appName=EgameNight`;
        }
        await mongoose.connect(dsn)
            .then(() => {
                console.log("Connected to database");
            })
            .catch((error) => {
                console.log("Couldn't connect to MongoDB: ", error);
            });




        return mongoose.connection;
    }
};


const adminSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    }
});

const admin = mongoose.model("admin", adminSchema);

// Define a schema for dynamic data
const DynamicSchema = new mongoose.Schema({}, { strict: false });

// Define a schema for the main document
const eventSchema = new mongoose.Schema({
    "eventName": {
        type: String,
        required: true
    },
    "eventDate": {
        type: Date,
        required: true
    },
    "seats": DynamicSchema,
    "active": { type: Boolean, default: false }
});

// Define a model using the schema
const event = mongoose.model('event', eventSchema);

const memberSchema = new mongoose.Schema({
    "member": {
        "firstname": {
            type: String,
            required: true
        },
        "renewed": {
            type: String,
            required: true
        },
        "lastname": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            unique: true,
            required: true
        },
        "phone1": {
            type: String,
            required: true
        },
        "member_nick": {
            type: String,
            unique: true,
            required: true
        }
    },
    "seat": {
        "row": String,
        "seat": String
    },
    "checked_in": {
        type: Boolean,
        default: false
    },
    "event": {
        type: String,
        ref: 'event.eventName',
        required: true
    }
});

memberSchema.pre('save', async function (next) {
    try {
        // Check if the username already exists
        const existingEmail = await this.constructor.findOne({ 'user.email': this.member.email });
        const existingUser = await this.constructor.findOne({ 'user.username': this.member.member_nick });
        if (existingUser) {
            throw new Error("Username is already taken");
        }
        if (existingEmail) {
            throw new Error("Email is already taken");
        }
        next();
    } catch (error) {
        next(error);
    }
});

const pastEvent = new mongoose.Schema({
    "eventName": [memberSchema]
});

const past = mongoose.model("past", pastEvent);

const member = mongoose.model("member", memberSchema);
module.exports = { database, member, event, admin, past };