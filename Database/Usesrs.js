const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String},
    password: String,    
    social_auth_provider: String,
    social_auth_id: String,
    jwt_access_token: String,
    jwt_refresh_token: String,
    devices: [String],  
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('users', UserSchema);
