const mongoose = require('mongoose');
const ChapterSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('chapters', ChapterSchema);
