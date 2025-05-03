import Image from 'next/image';
import React from 'react'
import { blob } from 'stream/consumers';

interface ImageBlobProps {
    verseReceived : String | null; 
    blobUrl : string | null
}
const ImageBlob = ({verseReceived,blobUrl} : ImageBlobProps) => {
  
  if(!blobUrl){
    return null;
  }
 else return (
   
    <Image src={blobUrl} alt='Random Verse' width={150} height={100}  />
  )
}

export default ImageBlob