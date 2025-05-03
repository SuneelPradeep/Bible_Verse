



/* Amplify Params - DO NOT EDIT
	API_BIBLEVERSE_GRAPHQLAPIIDOUTPUT
	API_BIBLEVERSE_VERSESAPPDATATABLE_ARN
	API_BIBLEVERSE_VERSESAPPDATATABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


// image gen packs
const sharp = require('sharp')
const fetch = require('node-fetch')
const fs= require('fs')
const path = require('path')
const dbConnection = require('./db/dbConnect');
const {EnglishBibleVerse,TeluguBibleVerse} = require('./db/bibleverseSchema')
const {telugu_books,english_books} = require('./db/Booksnames')
//AWS packs
const AWS  = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()


 async function updateDynamoDBObject(){ 
    const quoteTableName = process.env.API_BIBLEVERSE_VERSESAPPDATATABLE_NAME // from above Docmment
    const quoteObjectID = process.env.API_QUOTE_OBJECT_ID
   try {
       let quoteParams = {
        TableName : quoteTableName, 
        Key : {
             "id" : quoteObjectID
        },
        // UpdateExpression : "SET #versesGenerated = #versesGenerated + :inc",
        UpdateExpression : "ADD #versesGenerated :inc" ,
        ExpressionAttributeValues : {
            ":inc" : 1
        },
        ExpressionAttributeNames : {
            "#versesGenerated" : "versesGenerated"
        },
        ReturnValues : "UPDATED_NEW"
       };
       const updatedVerseObject = await docClient.update(quoteParams).promise();
        return updatedVerseObject;
   } catch (error) {
    // //console.error("error updating dynamoDB ",error);
  }}

exports.handler = async (event) => {

     async function GETRandomBibleVerse(){
        try {
          try {
            const conn = await dbConnection();  
        } catch (error) {
            console.error('Connection error:', error);
        }
        //     // const data = await EnglishBibleVerse.findOne();
        //      const randomVerse = await TeluguBibleVerse.aggregate([ {$sample : {size : 1}}])
        //      const sameEnglishVerse  = randomVerse ? await EnglishBibleVerse.find({book : randomVerse[0]?.book, chapter:randomVerse[0]?.chapter,verse: randomVerse[0]?.verse}) : {book: '',chapter:'',verse : '',verseText : ''}
         
        //     let book = randomVerse && randomVerse[0].book
        //     let findbookname = telugu_books.filter((i)=>( i.id===book));
        //     let quoteText = ""; let quoteAuthor = "";let quoteText2=''; let quoteAuthor2 ='';let findenglishbookname = '';let englishbook = ''
        //     if(randomVerse){      
        //            // 
        //             quoteText = randomVerse[0]?.verseText;
        //     
        //             quoteAuthor = `${findbookname[0]?.name} ${parseInt(randomVerse[0]?.chapter)+1}:${parseInt(randomVerse[0]?.verse)+1} `;
        //             if(sameEnglishVerse){
        //               englishbook = sameEnglishVerse[0]?.book
        //               findenglishbookname = english_books.filter((i)=> i.id === englishbook);
        //               quoteText2 = sameEnglishVerse[0]?.verseText;
        //               quoteAuthor2 = `${findenglishbookname[0]?.name} ${parseInt(sameEnglishVerse[0]?.chapter)+1}:${parseInt(sameEnglishVerse[0]?.verse)+1} `; 
        //             }
        //           
        //             const words = quoteText?.split(" ")
        //             const words2 = quoteText2?.split(" ")
        //             const width = 1500; const height = 840;
        //             const lineBreak =5; const lineBreak2= 8
        //             let newText = ""; let newText2 = ''
        //             let tspanElements = ""; let tspanElements2 = "";
    
        //        for(let i =0;i<words.length;i++){
        //                   newText += words[i] + " ";
        //                   if((i+1) % lineBreak ===0){
        //                     tspanElements += `<tspan x="${width/2}" dy="1em" >${newText}</tspan>`
        //                     newText =''
        //                 }
        //             }
        //             if(newText !==""){
        //                 tspanElements += `<tspan x="${width/2}" dy="1em" >${newText}</tspan>`
                            
        //             }
        //             if(sameEnglishVerse){
        //               for(let j =0;j<words2.length;j++){
        //               newText2 += words2[j] + " ";
        //               if((j+1) % lineBreak2 ===0){
        //                 tspanElements2 += `<tspan x="${width/2}" dy="1em">${newText2}</tspan>`
        //                 newText2 = ""
        //             }
        //         }
        //         if(newText2 !==""){
        //             tspanElements2 += `<tspan x="${width/2}" dy="1em"  >${newText2}</tspan>`
                        
        //         }}
      
        
      
          
          //process.env.FONTCONFIG_PATH = '/tmp/nonexistent';
      
            // tspan is used to give lines of text in svg pic 
       // usually in svg making we have <svg> insdie we have <text> <circle> <g> which is google tag and <rect for rectange and width height to get that and fontsize we can give 
         //const fontPath =  path.join( __dirname,'/backgrounds/NTR-Regular.ttf');
                  
        //  const svgImage = `
        //           <svg width="${width}" height="${height}" >
        //             <style>
        //             .quoteTitleStyles {
        //               font-size: 45px;
        //               font-family: 'Arial', 'Helvetica', 'Sans-Serif'; 
        //             }
                    
        //             .text-container {
        //               word-wrap: break-word; /* Standard syntax */
        //               overflow-wrap: break-word; /* Vendor-prefixed syntax for older browsers */
        //           }
        //             .title {
        //                 fill : #ffffff;
        //                 font-size : 20px;
        //                 font-weight : bold;
        //             }
        //             .quoteAuthorStyles {
        //                 font-size : 40px;
        //                 font-weight : bold;
        //                 padding : 50px;
        //             }
        //             .footerStyles {
        //                 font-size : 15px;
        //                 font-weight :bold;
        //                 fill : lightgrey;
        //                 text-anchor : middle;
        //                 font-family: 'Arial', 'Helvetica', 'Sans-Serif';
        //             }
        //             </style>
        //             <circle cx="382" cy="76" fill="rgba(255,255,255,0.155)"  />
                    
        //             <g>
        //             <rect x="0" y="0" width="${width}" height="auto" fill="none" ></rect>
                   
        //           <text id="lastLineOfQuote" class="quoteTitleStyles" x="400"  text-length="1200" y="250" text-anchor="middle" font-size="50" fill="white"  >
        //            ${tspanElements2}
        //            <tspan class="quoteAuthorStyles" x="650" dy="2.5em" font-size="30" > - ${quoteAuthor2} </tspan>
        //            </text>
        //             </g>
                     
        //             <text x="${width/2}" y="${height -10}" class="footerStyles"> Developed by @ernest_solomon_world </text>                  
        //             </svg> `

          
                  
                    // const bgImages = ["backgrounds/Ibiza Sunset.jpg", "backgrounds/EasyMed.jpg",
                    // "backgrounds/Jodhpur.jpg", "backgrounds/Vice City.jpg"]

                   
                   
                   
                   
                   
                    // const conn = await dbConnection()     
                    // const data = await EnglishBibleVerse.findOne();
                   //  const randomVerse = await TeluguBibleVerse.aggregate([  {$sample : {size : 1}}])
                   //  const sameEnglishVerse : any = randomVerse ? await EnglishBibleVerse.find({book : randomVerse[0]?.book, chapter:randomVerse[0]?.chapter,verse: randomVerse[0]?.verse}) : {book: '',chapter:'',verse : '',verseText : ''}
                   const sameEnglishVerse = await EnglishBibleVerse.aggregate([ {$sample : {size : 1}}])
                  
                     let book = sameEnglishVerse && sameEnglishVerse[0].book
                    let findbookname = english_books.filter((i)=>( i.id===book));
                    let quoteText = ""; let quoteAuthor = "";let quoteText2=''; let quoteAuthor2 ='';
                    let findenglishbookname = '';let englishbook = ''
                    if(sameEnglishVerse){      
                             quoteText = sameEnglishVerse[0]?.verseText;
           
                            quoteAuthor = `${findbookname[0]?.name} ${parseInt(sameEnglishVerse[0]?.chapter)+1}:${parseInt(sameEnglishVerse[0]?.verse)+1} `;
                           
                           const words = quoteText?.split(" ")
                            // const words2 = quoteText2?.split(" ")
                            const width = 1500; const height = 840;
                            const lineBreak =5; 
                            // const lineBreak2= 8
                            let newText = "";
                            //  let newText2 = ''
                            let tspanElements = ""; 
                            // let tspanElements2 = "";
            
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
                            .quoteTitleStyles {
                               font-size : 45px;
                              //  font-family :'NTR', 'Noto Sans Telugu', sans-serif ;
                              font-family : 'Permanent',cursive;
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
                          
                          <text id="lastLineOfQuote" class="quoteTitleStyles" x="150" text-length="1500" y="180" text-anchor="middle" font-size="55" fill="white"  >
                           ${tspanElements}
                           <tspan class="quoteAuthorStyles" x="750" dy="2.5em" font-size="30" > - ${quoteAuthor} </tspan>
                           </text>
                            </g>
                            <text x="${width/2}" y="${height -10}" class="footerStyles"> Developed by @ernest_solomon_world </text>
                           </svg> `
                         
                    const bgImages = ["/var/task/backgrounds/Ibiza Sunset.jpg", "/var/task/backgrounds/EasyMed.jpg",
                      "/var/task/backgrounds/Jodhpur.jpg", "/var/task/backgrounds/Vice City.jpg","/var/task/backgrounds/Summer Dog.jpg",
                      "/var/task/backgrounds/Witching Hour.jpg","/var/task/backgrounds/Visions of Grandeur.jpg",
                      "/var/task/backgrounds/Yoda.jpg","/var/task/backgrounds/Cosmic Fusion.jpg","/var/task/backgrounds/Metapolis.jpg",
                      "/var/task/backgrounds/Moonlit Asteroid.jpg","/var/task/backgrounds/Anwar.jpg"]
                     
                   const randomIndex = Math.floor(Math.random() * bgImages.length)
                   const selectedBg = bgImages[randomIndex]
                
                //    let timeStamp = new Date().toLocaleDateString().replace(/[^\d]/g,"")
                let timeStamp = JSON.stringify(new Date()).replace(/[^\d]/g,"")
                  const svgBuffer = Buffer.from(svgImage)  
                  const imagePath = path.join('/tmp',`quote-card-${timeStamp}.png`) 
                 const image = await sharp(selectedBg).composite([ {input : svgBuffer, top:0,left : 0}]).toFile(imagePath)
                  // const imageBuffer = await sharp(selectedBg).composite([ {input : svgBuffer, top:0,left : 0}]).png().toBuffer()
                  //  const imageBuffer = await sharp(selectedBg).composite([ {input : svgBuffer, top:0,left : 0}]).toBuffer()

                
                  const getdatafs = fs.readFileSync(imagePath);
                   const finalBody =  getdatafs?.toString('base64')
                   // updateDynamoDBObject()
                   try {
                    //  const base64Data = fs.readFileSync(imagePath).toString('base64');
                    //  const base64Data = imageBuffer?.toString('base64')
                    
                      return {
                          statusCode: 200,
                          headers: {
                              "Content-Type": "image/png",
                              "Access-Control-Allow-Origin": "*",
                          },
                          // body: base64Data,
                          body : finalBody,
                           isBase64Encoded: true,
                          // isBase64encoded : true
                      };
                   } catch (error) {
                      console.error('Error reading file:', error);
                      return {
                          statusCode: 500,
                          body: JSON.stringify({ message: 'Failed to read file' }),
                      }
                      }                                                  
  }}
            catch(e){
                return JSON.stringify(e,{status:500}) 
            }}
   return GETRandomBibleVerse()
          }
          
        


