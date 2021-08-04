import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schemaExample = new Schema({
    name: String,
    email: String,
    phone_number: String,
    gender: String,
    user_id: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Users', schemaExample);
