
'use client';
import rawbibledata from '@/src/utils/teluguBibleBooksData.json';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface BibleChapter {
    chapter: string;
    verses: string;
}

interface BibleBook {
    id: number;
    abbr: string;
    book: string;
    chapters: BibleChapter[];
}

const bibleData: BibleBook[] = rawbibledata as BibleBook[];

const VerseSelect = () => {
    const [selectedBook, setSelectedBook] = useState<string>('');
    const [selectedChapter, setSelectedChapter] = useState<string>('');
    const [selectedVerse, setSelectedVerse] = useState<string>('');
    const [chaptersCount, setChaptersCount] = useState<number>(0);
    const [versesCount, setVersesCount] = useState<number>(0);
    const [loading,setLoading] = useState(false)
    
   
 
    const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBook(e.target.value);
        setSelectedChapter('');
        setSelectedVerse('');
    };

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedChapter(e.target.value);
        setSelectedVerse('');
    };

    const handleVerseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVerse(e.target.value);
    };

    // useEffect(() => {
    //     const selectedBookData = bibleData.find((book,id) => id === parseInt(selectedBook));
    //     if (selectedBookData) {
    //         setChaptersCount(selectedBookData.chapters.length);
    //         setSelectedChapter(''); 
    //         setSelectedVerse('');
    //     }
    // }, [selectedBook]);

    // useEffect(() => {
    //     if (selectedBook && selectedChapter) {
    //         const selectedBookData = bibleData.find((book,id) => id === parseInt(selectedBook));
    //         const selectedChapterData = selectedBookData?.chapters[parseInt(selectedChapter)];
            
    //         if (selectedChapterData) {
    //             setVersesCount(parseInt(selectedChapterData.verses));
    //         }
    //     }
    // }, [selectedBook, selectedChapter]);

    useEffect(() => {
        const selectedBookData = bibleData.find((book, id) => id === parseInt(selectedBook));
        
        if (selectedBookData) {
            setChaptersCount(selectedBookData.chapters.length);
    
            if (selectedChapter) {
                const selectedChapterData = selectedBookData.chapters[parseInt(selectedChapter)];
                selectedChapterData && setVersesCount(parseInt(selectedChapterData.verses));
                
            }else {
                setSelectedChapter('');
                setSelectedVerse('');
            }
        }
    }, [selectedBook, selectedChapter]);
    
    const handleMakeVerse = async (e: any) => {
        e.preventDefault();
        const bookName = (bibleData as any)[selectedBook]?.book?.split('/')[0]
    
        const datatosend = {
          book: selectedBook,
          chapter: selectedChapter,
          verse: selectedVerse,
        };
       
        try {
            setLoading(true)
          const response = await axios.post('/api/makespecificverse', datatosend, {
            responseType: 'blob', 
          });
      
          if(response.status === 200 && response?.data){
          const url = window.URL.createObjectURL(new Blob([response?.data]));
      
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${bookName} ${Number(selectedChapter)+1}:${Number(selectedVerse)+1}.jpg`); 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setLoading(false)
        }
        } catch (error) {
            setLoading(false)
          console.error('Error generating verse image:', error);
        }
        setLoading(false)
      }; 
   
//     const handleMakeVerse = async(e : any)=>{
//     e.preventDefault();
//     const datatosend = {book : selectedBook,chapter : selectedChapter, verse : selectedVerse}
//     
//     try {
//         const data = await axios.post('/api/makespecificverse', datatosend)
//         
//         if(data?.statusText=== 'OK' || [200,201].includes(data?.status)){
//                   const  {url} = data?.data
//                  
                  
//                   if(url){
//                         window.open(url, '_blank')                     
//                   }
//             }  
//     } catch (error) {
//         console.error(error);
        
//     }
    

//    }  


  
    return (
        <MainSection>
        <SelectContainer>
            <Select value={selectedBook} onChange={handleBookChange}>
                <option value="">Select Book</option>
                {bibleData.map((i: BibleBook) => (
                    <option value={i.id} key={i.id}>{i.book}</option>
                ))}
            </Select>

            <Select value={selectedChapter} onChange={handleChapterChange} disabled={!selectedBook}>
                <option value="">Select Chapter</option>
                {Array.from({ length: chaptersCount }, (_, i) => (
                    <option value={(i).toString()} key={i + 1}>{i + 1}</option>
                ))}
            </Select>

            <Select value={selectedVerse} onChange={handleVerseChange} disabled={!selectedChapter}>
                <option value="">Select Verse</option>
                {Array.from({ length: versesCount }, (_, i) => (
                    <option value={(i).toString()} key={i + 1}>{i + 1}</option>
                ))}
            </Select>
         
        </SelectContainer>
           <QuoteButton disabled={!selectedBook || !selectedChapter || !selectedVerse || loading} onClick={handleMakeVerse}> 
           <QuoteButtonText> {loading ? 'Loading...'  : 'Make Verse'}
           </QuoteButtonText> </QuoteButton>
           </MainSection>
    );
};

export default VerseSelect;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 1rem;
    width: 100%;
    /*max-width: 900px;  */
    padding: 0 1rem;
    box-sizing: border-box;
`;

const SelectContainer = styled.div`
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;

    @media (min-width: 900px) {
        flex-direction: row;
    }
`;

const Select = styled.select`
    width: 100%;
    max-width: 300px;
    padding: 8px;
    background: rgba(0, 0, 70, 0.3);
    margin: 8px;
    color: white;
    border-radius: 0.5rem;
    outline: none;
    border: 2px solid rgba(0, 0, 70, 0.3);
    font-size: 16px;
    font-family: 'Noto Sans Telugu', sans-serif;
    box-sizing: border-box;
    flex: 1;

    @media (max-width: 600px) {
        padding: 6px;
        font-size: 14px;
    }
`;

const QuoteButton = styled.button<{ disabled: boolean }>`
    height: 4rem;
    position: relative;
    transition: 0.2s all ease-in-out;
    width: 100%;
    max-width: 300px;
    border: 1px solid transparent;
    margin-top: 20px;
    border-radius: 10px;
    transform-origin: center;
    text-align: center;
    justify-content: center;
    top: 20px;
    margin: auto;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    cursor: pointer;
    background: transparent;

    &:hover {
        filter: ${({ disabled }) => (disabled ? 'none' : 'brightness(3)')};
        transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.1)')};
        transition: 0.2s all ease-in-out;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        pointer-events: none;
    }
`;

const QuoteButtonText = styled.div`
    color: white;
    font-family: 'Caveat', cursive;
    font-size: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 100%;
    text-align: center;
`;


// const MainSection = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// gap : 8px;
//  margin : 1rem;
// `
// const SelectContainer = styled.div`
//   display: flex;
//   margin-top: 2rem;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
  
//   @media (min-width: 900px) {
//     flex-direction: row;
//   }
// `;

// const Select = styled.select`
//   padding: 8px;
//   background: rgba( 0, 0, 70,0.3 );
//   margin: 8px;
//   color :white;
//   border-radius: 0.5rem;
//   outline:none;
//   border : 2px solid  rgba( 0, 0, 70,0.3 );
//   font-size: 16px;
//   font-family: 'Noto Sans Telugu',sans-serif;
//   flex: 1;
// `;
// const QuoteButton = styled.button`
//     height : 4rem;
//     position : relative;
//     transition : 0.2s all ease-in-out;
//     width : 10rem;
//     border : 1px solid transparent;
//     margin-top : 20px;
//     border-radius : 10px;
//     transform-origin: center;
//     text-align:center;
//     justify-content: center;
//     top: 20px;
//     margin : auto; 
//     box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
//     backdrop-filter: blur( 20px );
//     -webkit-backdrop-filter:  blur( 20px );
//     &:hover{
//         filter : brightness(3);
//         transition : 0.2s all ease-in-out;
//         transform : scale(1.1);
//         transform-origin : center;
//     }
// `
// const QuoteButtonText = styled.div`
// color: white;
// font-family: 'Caveat',cursive;
// font-size: 30px;
// left : 50%;
// top :50%;
// transform : translate(-50%,-50%);
// position : absolute;
// width : 100%;
// text-align : center;

// `


// const QuoteButton = styled.button<{ disabled: boolean }>`
//     height: 4rem;
//     position: relative;
//     transition: 0.2s all ease-in-out;
//     width: 10rem;
//     border: 1px solid transparent;
//     margin-top: 20px;
//     border-radius: 10px;
//     transform-origin: center;
//     text-align: center;
//     justify-content: center;
//     top: 20px;
//     margin: auto;
//     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//     backdrop-filter: blur(20px);
//     -webkit-backdrop-filter: blur(20px);
//     cursor: pointer;
//     background: transparent;

//     &:hover {
//         filter: ${({ disabled }) => (disabled ? 'none' : 'brightness(3)')};
//         transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.1)')};
//         transition: 0.2s all ease-in-out;
//     }

//     &:disabled {
//         cursor: not-allowed;
//         opacity: 0.5;
//         pointer-events: none;
//     }
// `;

// const QuoteButtonText = styled.div`
//     color: white;
//     font-family: 'Caveat', cursive;
//     font-size: 30px;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, -50%);
//     position: absolute;
//     width: 100%;
//     text-align: center;
// `;


// <QuoteButton disabled={!selectedBook || !selectedChapter || !selectedVerse}>
//     <QuoteButtonText>Make Verse</QuoteButtonText>
// </QuoteButton>


// 'use client';
// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import rawbibledata from '@/src/utils/TeluguBibleBookData.json'

// interface BibleChapter {
//     chapter : string;
//     verses : string;
// }
// interface BibleBook {
//     id : number;
//     abbr : string;
//     book : string;
//     chapters : BibleChapter[]
// }

// const bibleData : BibleBook[] =  rawbibledata as BibleBook[];
// // const English_bibleData: BibleType = English_Bible as BibleType;

// const VerseSelect = () => {
 
//     const [selectedBook, setSelectedBook] = useState<string>('')
//     const [selectedChapter, setSelectedChapter] = useState<string>('')
//     const [selectedVerse, setSelectedVerse] = useState<string>('')
   
//     const handleBookChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedBook(e.target.value);
//         setSelectedChapter('');
//         setSelectedVerse('');
//       };
    
//       const handleChapterChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedChapter(e.target.value);
//         setSelectedVerse('');
//       };
    
//       const handleVerseChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedVerse(e.target.value);
//       };

      
//       useEffect(() => {
//         const selectedBookData = bibleData.find(book => book.book === selectedBook);
//         if (selectedBookData) {
//             setSelectedChapter(String(selectedBookData.chapters.length))
//         //   setSelectedChapter(''); // reset chapter when book changes
//           setSelectedVerse(''); // reset verse when book changes
//         }
//       }, [selectedBook]);
    
//       useEffect(() => {
//         if (selectedBook && selectedChapter) {
//           const selectedBookData = bibleData.find(book => book.book === selectedBook);
//           const selectedChapterData = selectedBookData?.chapters[parseInt(selectedChapter) - 1];
//           if (selectedChapterData) {
//             setSelectedVerse(String(selectedChapterData.verses));
//           }
//         }
//       }, [selectedBook, selectedChapter]);
//     
//   return (
//     <div>
//             <Select value={selectedBook} onChange={handleBookChange}> 
//             <option value="">Select Book</option>
//                 {bibleData.map((i : BibleBook,id : number)=>(
//                     <option value={i.id} key={i.id}>{i.book} </option>
//                 ))}
//             </Select>

//             <Select value={selectedChapter} onChange={handleChapterChange}> 
//             <option value="">Select chapter </option>
//                 {Array.from({length : parseInt(selectedChapter)}, (_,i : number)=> (
//                     <option value={i+1}>{i+1} </option>
//                 ))}
//             </Select>

//             <Select value={selectedVerse} onChange={handleVerseChange}> 
//             <option value="">Select verse</option>
//                 {Array.from({length : parseInt(selectedVerse)}, (_, i : number)=>(
//                     <option value={i+1}> {i+1}</option>
//                 ))}
//             </Select>
//     </div>
//   )
// }

// export default VerseSelect

// const Select = styled.select`
//   padding: 8px;
//   margin: 8px;
//   font-size: 16px;
// `;

