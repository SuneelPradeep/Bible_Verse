
import React from 'react'
import Lottie from 'react-lottie-player'
import styled from 'styled-components'
import Easterbible from './EasterBible.lottie.json'

const AnimatedDownload = ({handleDownload} : {handleDownload : ()=> void;}) => {
  return (
    <div>
        <DownloadVerseContainer onClick={handleDownload}>
            <CenteredLottie loop animationData={Easterbible} play />
    
              <DownloadVerseText> Download your verse</DownloadVerseText>  
        </DownloadVerseContainer>
    </div>
  )
}

export default AnimatedDownload

const DownloadVerseContainer = styled.div`
    border : 2px solid darkgrey;
    width : 250px;
    border-radius: 20px;
    position: relative;
    cursor:  pointer;
    margin-top: 20px;
    transform: scale(0.7);
    width: calc()(70vw/2);
    margin: auto;

    &:hover {
        background: rgb(193 193 255 /3%);
        box-shadow: 0 8px 32px  0 rgb(31 38 135 /37%);
        -webkit-backdrop-filter : blur(20px);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter : blur(20px);
    }
`
const CenteredLottie = styled(Lottie)`
     width : 200px;
     height: 200px;
     left : 50%;
     position : relative ;
     transform: translateX(-50%);
     margin-top: 1rem;
     pointer-events: none;
`
const DownloadVerseText = styled.div`
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