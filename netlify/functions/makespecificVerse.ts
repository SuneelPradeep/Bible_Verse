
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { EnglishBibleVerse, TeluguBibleVerse } from '../../db/bibleverseSchema';
import dbConnection from '../../db/dbConnect';
import { english_books, telugu_books } from '../../src/utils/Booksnames';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { book, chapter, verse } = JSON.parse(event.body);

    const assetsDir = path.join(__dirname, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    await dbConnection();

    const specificVerse = await TeluguBibleVerse.findOne({ book, chapter, verse });
    const sameEnglishVerse = await EnglishBibleVerse.findOne({ book, chapter, verse });

    const findbookname = telugu_books.filter((i) => i.id === parseInt(book));
    const findenglishbookname = english_books.filter((i) => i.id === parseInt(book));

    let quoteText = specificVerse?.verseText || '';
    let quoteAuthor = `${findbookname[0]?.name} ${parseInt(specificVerse?.chapter) + 1}:${parseInt(specificVerse?.verse) + 1}`;
    let quoteText2 = sameEnglishVerse?.verseText || '';
    let quoteAuthor2 = `${findenglishbookname[0]?.name} ${parseInt(sameEnglishVerse?.chapter) + 1}:${parseInt(sameEnglishVerse?.verse) + 1}`;

    const width = 1500, height = 840, lineBreak = 5, lineBreak2 = 8;
    const words = quoteText.split(' ');
    const words2 = quoteText2.split(' ');
    let newText = '', newText2 = '', tspanElements = '', tspanElements2 = '';

    for (let i = 0; i < words.length; i++) {
      newText += words[i] + ' ';
      if ((i + 1) % lineBreak === 0) {
        tspanElements += `<tspan x="${width / 2}" dy="1em">${newText}</tspan>`;
        newText = '';
      }
    }
    if (newText) tspanElements += `<tspan x="${width / 2}" dy="1em">${newText}</tspan>`;

    for (let j = 0; j < words2.length; j++) {
      newText2 += words2[j] + ' ';
      if ((j + 1) % lineBreak2 === 0) {
        tspanElements2 += `<tspan x="${width / 2}" dy="1em">${newText2}</tspan>`;
        newText2 = '';
      }
    }
    if (newText2) tspanElements2 += `<tspan x="${width / 2}" dy="1em">${newText2}</tspan>`;

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
        .quoteAuthorStyles { font-size: 30px; font-weight: bold; }
        .footerStyles { font-size: 15px; fill: lightgrey; text-anchor: middle; font-family: Verdana; }
      </style>
      <g>
        <text x="400" y="50" font-family="'NTR', 'Noto Sans Telugu'" text-anchor="middle" font-size="45" fill="white">
          ${tspanElements}
          <tspan class="quoteAuthorStyles" x="750" dy="1.5em"> - ${quoteAuthor}</tspan>
        </text>
        <text x="400" y="450" font-family="'Permanent Marker', cursive" text-anchor="middle" font-size="50" fill="white">
          ${tspanElements2}
          <tspan class="quoteAuthorStyles" x="750" dy="2.5em"> - ${quoteAuthor2}</tspan>
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
      const selectedBg = path.join(assetsDir, bgImages[randomIndex]);

    const timeStamp = Date.now();
    const svgBuffer = Buffer.from(svgImage);
    const imageBuffer = await sharp(selectedBg)
      .composite([{ input: svgBuffer, top: 0, left: 0 }])
      .jpeg({ quality: 100 })
      .toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; filename="verse_card_${timeStamp}${randomIndex}.jpg"`,
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e.message }),
    };
  }
};
