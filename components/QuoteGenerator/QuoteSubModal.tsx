'use client';
import { Backdrop, Box, CircularProgress, Fade, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ImageBlob from '../animations/ImageBlob';
import AnimatedDownload from '../animations/AnimatedDownload';

interface VerseModal {
   open : boolean;
   close : ()=> void;
   processingVerse : boolean;
   setProcessingVerse : React.Dispatch<React.SetStateAction<boolean>>;
   verseReceived : String | null;
   setVerseReceived :  React.Dispatch<React.SetStateAction<String | null>>

}
const QuoteSubModal = ({open,close,processingVerse,setProcessingVerse,verseReceived,setVerseReceived } : VerseModal) => {
   
  const [blobUrl, setBlobUrl] = useState<string | null>('')

  const handleDownload = ()=>{
    const link = document.createElement('a')
    if(typeof blobUrl ==='string'){
      link.href = blobUrl;
      link.download = 'verse.png'
      link.click()
    }
    

  }
  useEffect(()=>{
    if(verseReceived){
      const binaryData = Buffer.from(verseReceived,'binary')
      const blob = new Blob([binaryData],{type : 'image/png'})
      const blobUrlGen = URL.createObjectURL(blob)
      setBlobUrl(blobUrlGen)
    }

  },[verseReceived])

  return (
    <div>
      <Modal id="VerseModal" aria-labelledby="verses modal" aria-describedby="verses modal" 
       open={open} onClose={close} BackdropComponent={Backdrop} 
       BackdropProps={{timeout : 500}} closeAfterTransition
      >
       <Fade in={open}>
        <QuoteGeneratorModalContainer >
         <QuoteGeneratorModalInnerContainer>
          {(processingVerse && verseReceived ===null) &&
          <>
          <ModalCircularProgress size='8rem' thickness={2.5} />

          <VerseGeneratorTitle>
            Creating your verse
          </VerseGeneratorTitle>
          </>
          }

        {(verseReceived !== null) && 
        <>
        <VerseGeneratorTitle>
          Download your Verse
        </VerseGeneratorTitle>
        <VerseGeneratorSubTitle> see a preview </VerseGeneratorSubTitle>
        <ImageBlobContainer>
          <ImageBlob verseReceived={verseReceived} blobUrl={blobUrl} />
        </ImageBlobContainer>
        <AnimatedDownload handleDownload={handleDownload} />
        </>
        }



         </QuoteGeneratorModalInnerContainer>
        </QuoteGeneratorModalContainer>
       </Fade>
      </Modal>
    </div>
  )
}

export default QuoteSubModal

const QuoteGeneratorModalContainer = styled(Box)`
        position:absolute;
        top : 50%;
        left : 50%;
        transform:  translate(-50%,-50%);
        width : 70vw;
        height : 70vh;
        box-shadow: 24;
        background: rgb(193 193 255 / 19%);
        box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        border-radius: 10px;
        border : 1px solid rgb(255 255 255 / 0.18);

        &:focus{
          outline : none !important;
        }
   `

const QuoteGeneratorModalInnerContainer = styled.div`
    position: relative;
    top  :50%;
    left : 50%;
    transform: translate(-50%, -50%);

`
const ModalCircularProgress = styled(CircularProgress)`
     color : white !important;
     position : relative;
     stroke-linecap: round;
     margin-left: -55px;
     left :50%;
     transform : translateX(-50%);
`
const VerseGeneratorTitle = styled.div`
    font-family: 'Permanent Marker',cursive;
    font-size:40px;
    text-align: center;
    position: relative;
    padding : 0 20 0 20;
    color :white;
    @media  only screen and (max-width:600px) {
           font-size : 30px;
    }

`
const VerseGeneratorSubTitle = styled.div`
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

const ImageBlobContainer = styled.div`
     position: relative;
     text-align: center;
     top:10px;
     margin-top: 20px;
     transition : 0.3s all ease-in-out;
     width : fit-content;
     margin:auto;
     height : 100px;
     z-index : 9999;

     &:hover {
      transform : scale(4.5);
      z-index : 99999;
      transition: 0.3s ease-in-out;
      box-shadow: 0 0 80px 90px;

      @media only screen and (max-width : 800px) {
        transform : scale(3.5);
      z-index : 99999;
      transition: 0.3s ease-in-out;
      box-shadow: 0 0 80px 90px;
        
      }
      @media only screen and (max-width : 600px) {
        transform : scale(2.5);
      z-index : 99999;
      transition: 0.3s ease-in-out;
      box-shadow: 0 0 80px 90px;
        
      }
     }

`