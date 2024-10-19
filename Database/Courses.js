const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    course_id:Number,
    title: String,
    description: String,
    duration: String,
    category: String,
    faq: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('courses', CourseSchema);
