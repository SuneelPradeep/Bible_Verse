// import dbConnection from "./dbConnect";
// import BibleVerse from "./bibleverseSchema";
// import Book from '@/public/telugu_bible.json'


// export const insertBibledata = async()=>{
//     try {
//         const conn = await dbConnection()
//         await Promise.all(Book.map(async (verse : any)=>{
//             const book = verse.Verseid.slice(0,2)
//             const chapter = verse.Verseid.slice(2,5)
//             const verseNumber = verse.Verseid.slice(5)
//        const IBibleVerse = await BibleVerse.create({
//             book, chapter : parseInt(chapter), verse : parseInt(verseNumber), verseText : verse.Verse
//         })
//         }))
//     } catch (error) {
//         console.error('Error is',error)
//     }
// }
