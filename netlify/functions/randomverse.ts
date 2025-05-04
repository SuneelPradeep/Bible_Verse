import { EnglishBibleVerse, TeluguBibleVerse } from '@/db/bibleverseSchema';
import dbConnection from "@/db/dbConnect";
import { english_books, telugu_books } from '@/src/utils/Booksnames';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

    const svgImage = `
      <svg width="${width}" height="${height}">
        <style>
          .quoteAuthorStyles {
            font-size: 40px;
            font-weight: bold;
            padding: 50px;
          }
          .footerStyles {
            font-size: 15px;
            font-weight: bold;
            fill: lightgrey;
            text-anchor: middle;
            font-family: Verdana;
          }
        </style>
        <g>
          <rect x="0" y="0" width="${width}" height="auto" fill="none"></rect>
          <text x="400" y="50" font-family="'NTR', 'Noto Sans Telugu', sans-serif" text-anchor="middle" font-size="45" fill="white">
            ${tspanElements}
            <tspan class="quoteAuthorStyles" x="750" dy="1.5em" font-size="30">- ${quoteAuthor}</tspan>
          </text>
          <text x="400" y="450" font-family="'Permanent Marker', cursive" text-anchor="middle" font-size="50" fill="white">
            ${tspanElements2}
            <tspan class="quoteAuthorStyles" x="750" dy="2.5em" font-size="30">- ${quoteAuthor2}</tspan>
          </text>
        </g>
        <text x="${width / 2}" y="${height - 10}" class="footerStyles">Developed by @ernest_solomon_world</text>
      </svg>
    `;

    // Background image handling similar to makespecificverse.ts
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
