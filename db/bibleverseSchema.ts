
import mongoose from 'mongoose'

const bibleVerseSchema = new mongoose.Schema({
    book : {
         type : Number,
         required : true
    },
      chapter : {
        type : Number,
        required : true
      },
      verse : {
        type :Number,
        required: true
      }
      ,verseText : {
        type: String
        
      }
})

const EnglishBibleVerse =  mongoose.models.English_Bible ||  mongoose.model('English_Bible',bibleVerseSchema)
const TeluguBibleVerse = mongoose.models.Telugu_Bible || mongoose.model('Telugu_Bible',bibleVerseSchema)
export {EnglishBibleVerse,TeluguBibleVerse};