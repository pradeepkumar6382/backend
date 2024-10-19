const mongoose = require('mongoose');
const TopicSchema = new mongoose.Schema({
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    title: String,
    description: String,
    content: String,
    attachments: [String],   
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Topics', TopicSchema);
