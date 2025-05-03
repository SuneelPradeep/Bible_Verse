
import axios from "axios";
import { NextResponse } from "next/server";
import sharp from "sharp";


// fetech a random quote
// turn text of quote into lines (quote tet received)
// turn text of author into lines (quote author)
// add a quote image
// turn theseelements --> SVG
// SVG --> image as PNG (/base64 in aws lambda)

const apiURL = "https://zenquotes.io/api/random"
export async function GET(){
    try{
        let quoteText = ""; let quoteAuthor = "";
        const res = await axios.get(apiURL)
        if(res && res?.statusText==="OK"){
            const data = res.data;       
            quoteText = data[0].q;
            quoteAuthor = data[0].a;
            const words = quoteText?.split(" ")
            const width = 1500; const height = 860;
            const lineBreak =4;
            let newText = ""
            let tspanElements = ""
            
            for(let i =0;i<words.length;i++){
                  newText += words[i] + " ";
                  if((i+1) % lineBreak ===0){
                    tspanElements += `<tspan x="${width/2}" dy="1.2em" >${newText}</tspan>`
                    newText =''
                }
            }
            if(newText !==""){
                tspanElements += `<tspan x="${width/2}" dy="1.2em" >${newText}</tspan>`
                    
            }
          
            // usually in svg making we have <svg> insdie we have <text> <circle> <g> which is google tag and <rect for rectange and width height to get that and fontsize we can give 
          
          const svgImage = `
          <svg width="${width}" height="${height}" >
            <style>
            .title {
                fill : #ffffff;
                font-size : 20px;
                font-weight : bold;
            }
            .quoteAuthorStyles {
                font-size : 75px;
                font-weight : bold;
                padding : 50px;
            }
            .footerStyles {
                font-size : 20px;
                font-weight :bold;
                fill : lightgrey;
                text-anchor : middle;
                font-family : Verdana;
            }
            </style>
            <circle cx="382" cy="76" fill="rgba(255,255,255,0.155)"  />
            
            <g>
            <rect x="0"  y="0" width="${width}" height="auto" ></rect>
           <text id="lastLineOfQuote" x="375" y="100" font-family="Verdana" text-anchor="middle" font-size="70" fill="white" >
           ${tspanElements}
           <tspan class="quoteAuthorStyles" x="750" dy="1.5em"> - ${quoteAuthor} </tspan>
           </text>
            </g>
             
            <text x="${width/2}" y="${height -10}" class="footerStyles"> Developed by @Ernest_Solomon_World </text>
           
            </svg> `
          
            const bgImages = ["assets/Ibiza Sunset.jpg", "assets/EasyMed.jpg",
            "assets/Jodhpur.jpg", "assets/Vice City.jpg",]
           const randomIndex = Math.floor(Math.random() * bgImages.length)
           const selectedBg = bgImages[randomIndex]


           let timeStamp = new Date().toLocaleDateString().replace(/[^\d]/g,"")
          const svgBuffer = Buffer.from(svgImage)
          const image = await sharp(selectedBg).composite([ {input : svgBuffer, top:0,left : 0}]).toFile(`assets/quote_card_${timeStamp}${randomIndex}.png`)
          return NextResponse.json({tspan : tspanElements},{status: 200})
        }
        
       
    }
    catch(e : any){
        return NextResponse.json({message : e.message},{status:500})
    }
}

// <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white"  >"</text>
//         //    






// fetech a random quote
// turn text of quote into lines (quote tet received)
// turn text of author into lines (quote author)
// add a quote image
// turn theseelements --> SVG
// SVG --> image as PNG (/base64 in aws lambda)

