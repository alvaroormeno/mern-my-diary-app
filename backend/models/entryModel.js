// FILE MAIN NOTE:
// - Here we define our schema which is the fields for this particular resource (Entry Resource). For each entry we will only one content field aside from a time stamp, the id and user. The user will be a relationship with the user resource.

const mongoose = require('mongoose')


const EntrySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    content: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
  
)


// Export the schema with mongoose.model. First param is the name (Entry), second is the schema we are exporting with the name of Goal.
module.exports = mongoose.model('Entry', EntrySchema)