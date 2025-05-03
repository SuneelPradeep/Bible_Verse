


// import dbConnection from "@/db/dbConnect";
// import { NextFetchEvent, NextResponse } from "next/server";
// import {EnglishBibleVerse, TeluguBibleVerse} from "@/db/bibleverseSchema";
// // import Telugu_Bible from '@/public/telugu_bible.json'
// import English_Bible from '@/public/english_bible.json'

// interface Verse {
//   Verseid: string;
//   Verse: string;
// }

// interface Chapter {
//   Verse: Verse[];
// }

// interface Book {
//   Chapter: Chapter[];
// }

// type BibleType = Book[];
// const English_bibleData: BibleType = English_Bible as BibleType;
// // const Telugu_bibleData: BibleType = Telugu_Bible as BibleType;
// export async function GET(){
//     try {

//         const conn = await dbConnection()
//         const batchSize = 10000; // Set the size of each batch
//   let batchInserts = [];

//   for (let i = 0; i < English_bibleData?.length; i++) {
//     const book = English_bibleData[i];

//     const chapters = book.Chapter;

//     for (let j = 0; j < chapters.length; j++) {
//       const verses = chapters[j].Verse;

//       for (let k = 0; k < verses.length; k++) {
//         const verse = verses[k];
//         const { Verseid, Verse } = verse;
//         const bookId = Verseid.substring(0, 2);
//         const chapterId = Verseid.substring(2, 5);
//         const verseNumber = Verseid.substring(5);

//         batchInserts.push({
//           verse: verseNumber,
//           book: bookId,
//           chapter: chapterId,
//           verseText: Verse
//         });
//       if (batchInserts.length === batchSize || (i === English_bibleData?.length - 1 && j === chapters.length - 1 && k === verses.length - 1)) {
//           // Insert the batch into MongoDB
//           await EnglishBibleVerse.insertMany(batchInserts);
//          
//           // Clear the batch array for the next batch
//           batchInserts = [];
//         }}}}

//         // await Promise.all(English_Bible?.map(async (verse : any)=>{
//         //     let finalVerse = verse.Chapter.Verse
//         //     const book = finalVerse.Verseid.slice(0,2)
//         //     const chapter = finalVerse.Verseid.slice(2,5)
//         //     const verseNumber = finalVerse.Verseid.slice(5)
//         // await BibleVerse.create({
//         //     book, chapter : parseInt(chapter), verse : parseInt(verseNumber), verseText : verse.Verse
//         // })
        
//         // }))
//         return NextResponse.json({msg : 'hey added successfully'})
//     } 
//     catch (error) {
//         console.error('Error is',error)
//     }
// }


// // import axios from "axios";
// // import { NextFetchEvent, NextResponse } from "next/server";
// // import sharp from "sharp";
// // import mongoose from 'mongoose'


// // const apiURL = "https://zenquotes.io/api/random"

// // export async function GET(){
// //     try{
// //         let quoteText = ""; let quoteAuthor = "";
// //         const res = await axios.get(apiURL)
// //         if(res && res?.statusText==="OK"){
// //             const data = res.data;
// //             quoteText = data[0].q;
// //             quoteAuthor = data[0].a;
// //             const words = quoteText?.split(" ")
// //             const width = 1500; const height = 860;
// //             const lineBreak =4;
// //             let newText = ""
// //             let tspanElements = ""
            
// //             for(let i =0;i<words.length;i++){
// //                   newText += words[i] + " ";
// //                   if((i+1) % lineBreak ===0){
// //                     tspanElements += `<tspan x="${width/2}" dy="1.2em" >${newText}</tspan>`
// //                     newText =''
// //                 }
// //             }
// //             if(newText !==""){
// //                 tspanElements += `<tspan x="${width/2}" dy="1.2em" >${newText}</tspan>`
                    
// //             }
// //           
// //             // usually in svg making we have <svg> insdie we have <text> <circle> <g> which is google tag and <rect for rectange and width height to get that and fontsize we can give 
          
// //           const svgImage = `
// //           <svg width="${width}" height="${height}" >
// //             <style>
// //             .title {
// //                 fill : #ffffff;
// //                 font-size : 20px;
// //                 font-weight : bold;
// //             }
// //             .quoteAuthorStyles {
// //                 font-size : 75px;
// //                 font-weight : bold;
// //                 padding : 50px;
// //             }
// //             .footerStyles {
// //                 font-size : 20px;
// //                 font-weight :bold;
// //                 fill : lightgrey;
// //                 text-anchor : middle;
// //                 font-family : Verdana;
// //             }
// //             </style>
// //             <circle cx="382" cy="76" fill="rgba(255,255,255,0.155)"  />
            
// //             <g>
// //             <rect x="0"  y="0" width="${width}" height="auto" ></rect>
// //            <text id="lastLineOfQuote" x="375" y="100" font-family="Verdana" text-anchor="middle" font-size="70" fill="white" >
// //            ${tspanElements}
// //            <tspan class="quoteAuthorStyles" x="750" dy="1.5em"> - ${quoteAuthor} </tspan>
// //            </text>
// //             </g>
             
// //             <text x="${width/2}" y="${height -10}" class="footerStyles"> Developed by @Ernest_Solomon_World </text>
           
// //             </svg> `
          
// //             const bgImages = ["assets/Ibiza Sunset.jpg", "assets/EasyMed.jpg",
// //             "assets/Jodhpur.jpg", "assets/Vice City.jpg",]
// //            const randomIndex = Math.floor(Math.random() * bgImages.length)
// //            const selectedBg = bgImages[randomIndex]


// //            let timeStamp = new Date().toLocaleDateString().replace(/[^\d]/g,"")
// //           const svgBuffer = Buffer.from(svgImage)
// //           const image = await sharp(selectedBg).composite([ {input : svgBuffer, top:0,left : 0}]).toFile(`assets/quote_card_${timeStamp}${randomIndex}.png`)
// //           return NextResponse.json({tspan : tspanElements},{status: 200})
// //         }
        
       
// //     }
// //     catch(e : any){
// //         return NextResponse.json({message : e.message},{status:500})
// //     }
// // }

// // // <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white"  >"</text>
// // //         //    English