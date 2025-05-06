import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { EnglishBibleVerse, TeluguBibleVerse } from '../../db/bibleverseSchema';
import dbConnection from "../../db/dbConnect";
import { english_books, telugu_books } from '../../src/utils/Booksnames';


// const fontPath = path.join(__dirname, 'fonts/NTR-Regular.ttf');
// const fontData = fs.readFileSync(fontPath);
// const base64Font = fontData.toString('base64');
const fontsDir = path.join(__dirname, 'fonts');
const fontPath = path.join(fontsDir, 'NotoSansTelugu.ttf');
const fontData = fs.readFileSync(fontPath);
const base64font = fontData.toString('base64');
export const handler = async (event: any) => {
   const assetsDir = path.join(__dirname, 'assets');



  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  try {
    await dbConnection();

    const randomEnglishVerse = await EnglishBibleVerse.aggregate([{ $sample: { size: 1 } }]);
    const verseObj = randomEnglishVerse[0];

    const book = verseObj?.book ?? 0;
    const chapter = verseObj?.chapter ?? 0;
    const verse = verseObj?.verse ?? 0;

    const specificVerse = await TeluguBibleVerse.findOne({ book, chapter, verse });

    const findbookname = telugu_books.find(i => i.id === parseInt(book));
    const findenglishbookname = english_books.find(i => i.id === parseInt(book));

    const quoteText = specificVerse?.verseText || '';
    const quoteText2 = verseObj?.verseText || '';

    const quoteAuthor = `${findbookname?.name} ${parseInt(chapter) + 1}:${parseInt(verse) + 1}`;
    const quoteAuthor2 = `${findenglishbookname?.name} ${parseInt(chapter) + 1}:${parseInt(verse) + 1}`;

    const words = quoteText.split(" ");
    const words2 = quoteText2.split(" ");

    const width = 1500;
    const height = 840;
    const lineBreak = 5;
    const lineBreak2 = 8;

    let tspanElements = "";
    let tspanElements2 = "";
    let newText = "";
    let newText2 = "";

    for (let i = 0; i < words.length; i++) {
      newText += words[i] + " ";
      if ((i + 1) % lineBreak === 0) {
        tspanElements += `<tspan x="${width / 2}" dy="1em">${newText}</tspan>`;
        newText = '';
      }
    }
    if (newText) {
      tspanElements += `<tspan x="${width / 2}" dy="1em">${newText}</tspan>`;
    }

    for (let j = 0; j < words2.length; j++) {
      newText2 += words2[j] + " ";
      if ((j + 1) % lineBreak2 === 0) {
        tspanElements2 += `<tspan x="${width / 2}" dy="1em">${newText2}</tspan>`;
        newText2 = '';
      }
    }
    if (newText2) {
      tspanElements2 += `<tspan x="${width / 2}" dy="1em">${newText2}</tspan>`;
    }
   

    // const svgImage = `
    //   <svg width="${width}" height="${height}">
    //     <style>
    //       .quoteAuthorStyles {
    //         font-size: 40px;
    //         font-weight: bold;
    //         padding: 50px;
    //       }
    //       .footerStyles {
    //         font-size: 15px;
    //         font-weight: bold;
    //         fill: lightgrey;
    //         text-anchor: middle;
    //         font-family: Verdana;
    //       }
    //     </style>
    //     <g>
    //       <rect x="0" y="0" width="${width}" height="auto" fill="none"></rect>
    //       <text x="400" y="50" font-family="'NTR', 'Noto Sans Telugu', sans-serif" text-anchor="middle" font-size="45" fill="white">
    //         ${tspanElements}
    //         <tspan class="quoteAuthorStyles" x="750" dy="1.5em" font-size="30">- ${quoteAuthor}</tspan>
    //       </text>
    //       <text x="400" y="450" font-family="'Permanent Marker', cursive" text-anchor="middle" font-size="50" fill="white">
    //         ${tspanElements2}
    //         <tspan class="quoteAuthorStyles" x="750" dy="2.5em" font-size="30">- ${quoteAuthor2}</tspan>
    //       </text>
    //     </g>
    //     <text x="${width / 2}" y="${height - 10}" class="footerStyles">Developed by @ernest_solomon_world</text>
    //   </svg>
    // `;

    // Background image handling similar to makespecificverse.ts
    // const fontBase64 = fs.readFileSync(path.join(assetsDir, 'NotoSansTelugu.ttf.base64.txt'), 'utf-8');

//     const svgImage = `
//   <svg width="${width}" height="${height}"  xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <style type="text/css">
//        @font-face {
//           font-family: 'NotoSansTelugu';
//           src: url('data:font/truetype;charset=utf-8;base64,${base64font}') format('truetype');
//           font-weight: normal;
//           font-style: normal;
//         }

//         .teluguText {
//           font-family: 'NotoSansTelugu';
//           font-size: 45px;
//           fill: white;
//           text-anchor: middle;
//         }

//         .englishText {
//           font-family: 'Permanent Marker', cursive;
//           font-size: 50px;
//           fill: white;
//           text-anchor: middle;
//         }

//         .quoteAuthorStyles {
//           font-size: 30px;
//           font-weight: bold;
//         }

//         .footerStyles {
//           font-size: 15px;
//           font-weight: bold;
//           fill: lightgrey;
//           text-anchor: middle;
//           font-family: Verdana;
//         }
//       </style>
//     </defs>

//     <g>
//       <rect x="0" y="0" width="${width}" height="${height}" fill="none"></rect>

//       <text x="${width / 2}" y="50" class="teluguText">
//         ${tspanElements}
//         <tspan class="quoteAuthorStyles" x="${width / 2}" dy="1.5em">- ${quoteAuthor}</tspan>
//       </text>

//       <text x="${width / 2}" y="450" class="englishText">
//         ${tspanElements2}
//         <tspan class="quoteAuthorStyles" x="${width / 2}" dy="2.5em">- ${quoteAuthor2}</tspan>
//       </text>
//     </g>

//     <text x="${width / 2}" y="${height - 10}" class="footerStyles">
//       Developed by @ernest_solomon_world
//     </text>
//   </svg>
// `;
// Load font base64 string once (put the .base64 string inline or load from file)

// const svgImage = `
// <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
//   <defs>
//     <style type="text/css">
//       @font-face {
//         font-family: 'NotoTelugu';
//         src: url('data:font/truetype;charset=utf-8;base64,${fontBase64}') format('truetype');
//         font-weight: normal;
//         font-style: normal;
//       }

//       .telugu {
//         font-family: 'NotoTelugu', sans-serif;
//         font-size: 45px;
//         fill: white;
//         text-anchor: middle;
//       }

//       .english {
//         font-family: 'Arial', sans-serif;
//         font-size: 50px;
//         fill: white;
//         text-anchor: middle;
//       }

//       .quote-author {
//         font-size: 30px;
//         font-weight: bold;
//       }

//       .footer {
//         font-size: 15px;
//         font-weight: bold;
//         fill: lightgrey;
//         text-anchor: middle;
//         font-family: Verdana;
//       }
//     </style>
//   </defs>

//   <rect x="0" y="0" width="${width}" height="${height}" fill="none" />
//   <text x="${width / 2}" y="50" class="telugu">
//     ${tspanElements}
//     <tspan class="quote-author" x="${width / 2}" dy="1.5em">- ${quoteAuthor}</tspan>
//   </text>
//   <text x="${width / 2}" y="450" class="english">
//     ${tspanElements2}
//     <tspan class="quote-author" x="${width / 2}" dy="2.5em">- ${quoteAuthor2}</tspan>
//   </text>
//   <text x="${width / 2}" y="${height - 10}" class="footer">Developed by @ernest_solomon_world</text>
// </svg>
// `;

const fontPath = path.join(__dirname, 'assets', 'NotoSansTelugu.ttf');
const fontData = fs.readFileSync(fontPath).toString('base64');
const fontBase64Url = `data:font/ttf;base64,${fontData}`;
const svgImage = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    @font-face {
      font-family: 'NotoSansTelugu';
      src: url('${fontBase64Url}') format('truetype');
    }
    .teluguText {
      font-family: 'NotoSansTelugu', sans-serif;
      font-size: 45px;
      fill: white;
      text-anchor: middle;
    }
    .englishText {
      font-family: 'Permanent Marker', cursive;
      font-size: 50px;
      fill: white;
      text-anchor: middle;
    }
    .quoteAuthorStyles {
      font-size: 30px;
      font-weight: bold;
    }
    .footerStyles {
      font-size: 15px;
      fill: lightgrey;
      text-anchor: middle;
      font-family: Verdana;
    }
  </style>
  <g>
    <text x="${width / 2}" y="50" class="teluguText">
      ${tspanElements}
      <tspan class="quoteAuthorStyles" x="${width / 2}" dy="1.5em"> - ${quoteAuthor}</tspan>
    </text>
    <text x="${width / 2}" y="450" class="englishText">
      ${tspanElements2}
      <tspan class="quoteAuthorStyles" x="${width / 2}" dy="2.5em"> - ${quoteAuthor2}</tspan>
    </text>
  </g>
  <text x="${width / 2}" y="${height - 10}" class="footerStyles">Developed by @ernest_solomon_world</text>
</svg>`;

    const bgImages = [
      "Ibiza Sunset.jpg", "EasyMed.jpg", "Jodhpur.jpg", "Vice City.jpg",
      "Witching Hour.jpg", "Visions of Grandeur.jpg", "Yoda.jpg",
      "Cosmic Fusion.jpg", "Metapolis.jpg", "Moonlit Asteroid.jpg", "Anwar.jpg"
    ];

    const randomIndex = Math.floor(Math.random() * bgImages.length);
    const selectedBgPath = path.join(assetsDir, bgImages[randomIndex]);

    const svgBuffer = Buffer.from(svgImage);

    const imageBuffer = await sharp(selectedBgPath)
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .jpeg({ quality: 100 })
      .toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; filename="randomverse.jpg"`,
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
