

import dbConnection from "@/db/dbConnect";
import {  NextResponse ,NextRequest} from "next/server";
import sharp from "sharp";
import path from 'path'
import {EnglishBibleVerse, TeluguBibleVerse} from '@/db/bibleverseSchema'
// import telugu_books from '@/public/telugu_books.json'
// import english_books from '@/public/english_books.json'
import { telugu_books,english_books } from "@/src/utils/Booksnames";
import fs from 'fs'

export async function POST(req : NextRequest){
    const {book, chapter,verse} = await req.json()
    const assetsDir = path.join(process.cwd(), 'public', 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    try {
        const conn = await dbConnection()     
        // const data = await EnglishBibleVerse.findOne({book :book ,chapter : chapter,verse : verse});
         const specificVerse = await TeluguBibleVerse.findOne({book  , chapter, verse})
         const sameEnglishVerse = await EnglishBibleVerse.findOne({book ,chapter,verse})
     let findbookname = telugu_books.filter((i)=>( i.id===parseInt(book)));
        let quoteText = ""; let quoteAuthor = "";let quoteText2=''; let quoteAuthor2 ='';let findenglishbookname :any= '';
       
        if(specificVerse){      
                quoteText = specificVerse?.verseText;
               quoteAuthor = `${findbookname[0]?.name} ${parseInt(specificVerse?.chapter)+1}:${parseInt(specificVerse?.verse)+1} `;
                if(sameEnglishVerse){
                 findenglishbookname = english_books.filter((i : any)=> i.id === parseInt(book));
                  quoteText2 = sameEnglishVerse?.verseText;
                  quoteAuthor2 = `${findenglishbookname[0]?.name} ${parseInt(sameEnglishVerse?.chapter)+1}:${parseInt(sameEnglishVerse?.verse)+1} `; 
                }
               const words = quoteText?.split(" ")
                const words2 = quoteText2?.split(" ")
                const width = 1500; const height = 840;
                const lineBreak =5; const lineBreak2= 8
                let newText = ""; let newText2 = ''
                let tspanElements = ""; let tspanElements2 = "";

        


            for(let i =0;i<words.length;i++){
                      newText += words[i] + " ";
                      if((i+1) % lineBreak ===0){
                        tspanElements += `<tspan x="${width/2}" dy="1em" >${newText}</tspan>`
                        newText =''
                    }
                }
                if(newText !==""){
                    tspanElements += `<tspan x="${width/2}" dy="1em" >${newText}</tspan>`
                        
                }
                if(sameEnglishVerse){
                  for(let j =0;j<words2.length;j++){
                  newText2 += words2[j] + " ";
                  if((j+1) % lineBreak2 ===0){
                    tspanElements2 += `<tspan x="${width/2}"  dy="1em">${newText2}</tspan>`
                    newText2 = ""
                }
            }
            if(newText2 !==""){
                tspanElements2 += `<tspan x="${width/2}" dy="1em"  >${newText2}</tspan>`
                    
            }}
  
        // tspan is used to give lines of text in svg pic
   // usually in svg making we have <svg> insdie we have <text> <circle> <g> which is google tag and <rect for rectange and width height to get that and fontsize we can give 
             const svgImage = `
              <svg width="${width}" height="${height}" >
                <style>
                .text-container {
                  word-wrap: break-word; /* Standard syntax */
                  overflow-wrap: break-word; /* Vendor-prefixed syntax for older browsers */
              }
                .title {
                    fill : #ffffff;
                    font-size : 20px;
                    font-weight : bold;
                }
                .quoteAuthorStyles {
                    font-size : 40px;
                    font-weight : bold;
                    padding : 50px;
                }
                .footerStyles {
                    font-size : 15px;
                    font-weight :bold;
                    fill : lightgrey;
                    text-anchor : middle;
                    font-family : Verdana;
                }
                </style>
                <circle cx="382" cy="76" fill="rgba(255,255,255,0.155)"  />
                
                <g>
                <rect x="0" y="0" width="${width}" height="auto" fill="none" ></rect>
               <text id="lastLineOfQuote" text-length="1200" x="400" y="50" font-family="'NTR', 'Noto Sans Telugu', sans-serif"  text-anchor="middle" font-size="45" fill="white"  >
               ${tspanElements}
               <tspan class="quoteAuthorStyles" x="750" dy="1.5em" font-size="30" > - ${quoteAuthor} </tspan>
               </text>
              <text id="lastLineOfQuote" x="400"  text-length="1200" y="450" font-family="'Permanent Marker',cursive" text-anchor="middle" font-size="50" fill="white"  >
               ${tspanElements2}
               <tspan class="quoteAuthorStyles" x="750" dy="2.5em" font-size="30" > - ${quoteAuthor2} </tspan>
               </text>
                </g>
                 
                <text x="${width/2}" y="${height -10}" class="footerStyles"> Developed by @ernest_solomon_world </text>
               
                </svg> `
              
                const bgImages = ["assets/Ibiza Sunset.jpg", "assets/EasyMed.jpg",
                "assets/Jodhpur.jpg", "assets/Vice City.jpg",]
               const randomIndex = Math.floor(Math.random() * bgImages.length)
               const selectedBg = bgImages[randomIndex]
  
           let timeStamp = JSON.stringify(new Date()).replace(/[^\d]/g,"")
              const svgBuffer = Buffer.from(svgImage)
            const outputPath = path.join(assetsDir, `verse_card_${timeStamp}${randomIndex}.jpg`)
              // await sharp(selectedBg).composite([ {input : svgBuffer, top:0,left : 0}]).toFile(outputPath)
              const imageBuffer = await sharp(selectedBg).composite([{ input: svgBuffer, top: 0, left: 0 }]).jpeg({ quality: 100 }).toBuffer(); // 👈 preserve HD quality.toBuffer();
              // const fileUrl = `/assets/verse_card_${timeStamp}${randomIndex}.jpg`;
              return new NextResponse(imageBuffer, {
                headers: {
                  'Content-Type': 'image/jpeg',
                  'Content-Disposition': `attachment; filename="verse_card_${timeStamp}${randomIndex}.jpg"`,
                },
              });
            }       
        }
        catch(e : any){
            return NextResponse.json({message : e.message},{status:500})
        }
    }