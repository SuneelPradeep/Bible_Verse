import '@/app/globals.css';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import VerseSelect from './VerseSelect';

const QuoteModal = () => {

  const [loading,setLoading] = useState(false)
   
   const handleVerse =async (e:any)=>{
                e.preventDefault();
               
                try {
                    setLoading(true)
                  const response = await axios.get('/api/findverse',{
                    responseType: 'blob', 
                  });
              
                  if(response.status === 200 && response?.data){
                  const url = window.URL.createObjectURL(new Blob([response?.data]));
              
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `bible_verse.jpg`); 
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
    }

  return (
    <QuoteContent>
        <QuoteSubContent>
            <QuoteTitle> Daily Bible Verses Generator </QuoteTitle>
            <QuoteSubTitle>
                Looking for devotional verses from the Bible ? Generate a bible faithful verse in Telugu & English
                 {/* provided by <FooterLink href="https://www.instagram.com/Suneel_Pradeep" target="_blank" rel="noopener noreferrer" > Bible API </FooterLink> */}
            </QuoteSubTitle>
            <QuoteButton onClick={handleVerse}> 
                <QuoteButtonText> {loading ? 'Loading...' : 'Daily Mannah Verse'}
                </QuoteButtonText> </QuoteButton>
                <VerseSelect />
        </QuoteSubContent>
    </QuoteContent>
  )
}

export default QuoteModal

const QuoteContent = styled.div`
background: rgba( 0, 0, 70,0.3 );
min-height: 350px;
min-width: 350px;
height: 70vh;
width: 70vw;
position: absolute;
 transform: translate(-50%, -50%);         /*  handle a div to make it center */
top: 50%;
left: 50%;
z-index: 2;
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 20px );
-webkit-backdrop-filter:  blur( 20px );
border-radius: 15px;
border: 2px solid #ffffff22;
`
const QuoteSubContent = styled.div`
top: 50%;
left : 50%;
width: 100%;
transform: translate(-50%, -50%);
position :absolute;
    
`
const FooterLink = styled(Link)`
    color : white;
   
`
const QuoteTitle = styled.div`
font-family: 'Permanent Marker',cursive;
text-align: center;
font-size: 36px;
color: white;
padding : 0px 20px 0px 20px;
position: relative;
@media only screen and (max-width :600px) {
    font-size: 25px;
    
}
`
const QuoteSubTitle = styled.div`
    color : white;
    font-size : 25px;
    font-family: 'Caveat',cursive;
    width : 100%;
    text-align : center;
    padding : 0px 20px 0 20px;
    @media only screen and (max-width : 600px){
        font-size : 15px
    }
`
const QuoteButton = styled.div`
    height : 100px;
    position : relative;
    transition : 0.2s all ease-in-out;
    width : 300px;
    border : 1px solid transparent;
    margin-top : 20px;
    border-radius : 10px;
    transform-origin: center;
    text-align:center;
    justify-content: center;
    top: 20px;
    margin : auto; 
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 20px );
    -webkit-backdrop-filter:  blur( 20px );
    &:hover{
        filter : brightness(3);
        transition : 0.2s all ease-in-out;
        transform : scale(1.1);
        transform-origin : center;
    }
`
const QuoteButtonText = styled.div`
color: white;
font-family: 'Caveat',cursive;
font-size: 30px;
left : 50%;
top :50%;
transform : translate(-50%,-50%);
position : absolute;
width : 100%;
text-align : center;

`