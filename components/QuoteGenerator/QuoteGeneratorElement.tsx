import { GraphQLResult } from "aws-amplify/api"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import styled from "styled-components"
import bible from '../../assets/bible.png'
import cross from '../../assets/cross.png'
import QuoteModal from "./QuoteModal"

// Amplify.configure(config)

 interface UpdateVerseInfoData{
    id : string;
    queryName : string;
    versesGenerated : number;
    createdAt : string;
    updatedAt : string;
 }

 interface GenerateaVerseData {
    generateAQuote :{
        statusCode : number,
        headers : {[key : string] : string},
        body : string
    }
 }
 // typeguard for fetch
 function isGraphQLResultForverseQueryName (res : any) : res is GraphQLResult<
 {versesQueryName :
    { items : [UpdateVerseInfoData];
  }}
  > 
 { return res.data && res.data.verseQueryName }



const QuoteGeneratorElement = () => {

  const [numofverses, setNumofverses] = useState<number | null>(0)
  const [openModal,setOpenModal] = useState<boolean>(false)
  const [processingVerse, setProcessingVerse] =  useState<boolean>(false);
  const [verseReceived, setVerseReceived] = useState<String | null>(null)

//   const toggleModal = async()=>{
//     setOpenModal(!openModal)
//     setProcessingVerse(true)
//     try {
//             // run lambda here
//             
//             const runFunction = JSON.stringify("runFunction")
//         const res = await generateClient().graphql<GenerateaVerseData>({
//            query : generateAQuote,
//            authMode : "iam",
//            variables :{
//             input : runFunction
//            }
//         })
//     //     const res = await generateClient().graphql<UpdateVerseInfoData>({
//     //         query : verseQueryName,
//     //         authMode : "iam",
//     //         variables : {
//     //           queryName : "LIVE"
//     //         }
             
//     //    })
//        
//         // as lot of data will be there its better to get the body substring instead of data.data.data.
//         if(res){
//             const resstring= JSON.stringify(res)
//             const bodyIndex = resstring.indexOf('body=') + 5;
//             const base64data = resstring?.substring(bodyIndex)
//             const finalbody = base64data?.split(',')[0]

//             // const resstring= JSON.stringify(res)
//             // const bodyIndex = resstring.indexOf('body=') + 5;
//             // const base64data = resstring?.substring(bodyIndex)
//             // let finalbody2 = Buffer.from(base64data)
//             // let finalbody3 = finalbody2.toString('base64')
//             //  setVerseReceived(finalbody3)
//             setVerseReceived(finalbody)
//             setProcessingVerse(false)
//         }
        
        

//         //fetch for any new quotes
//         updateVerseInfo()
//         // setTimeout(()=>{
//         //     setProcessingVerse(false)
//         // },2000) 
//     } catch (error) {
//         setProcessingVerse(false)
//     }
//   }
//   const updateVerseInfo = async()=>{
//      try {
//         // const res = await API.graphql({
//         //     query: verseQueryName,
//         //     authMode: 'AWS_IAM',
//         //     variables: {
//         //       queryName: 'LIVE',
//         //     },
//         //   });
//          const res = await generateClient().graphql<UpdateVerseInfoData>({
//               query : verseQueryName,
//               authMode : "iam",
//               variables : {
//                 queryName : "LIVE"
//               }
               
//          })
//          if(res){
//             if(!isGraphQLResultForverseQueryName(res)){
//                 throw new Error('Unexpected response from API.graphql')
//             }
//             if(!res.data){
//                 throw new Error('Response data is undefined')
//             }
//            
//             if(res.data.versesQueryName?.items && res.data.versesQueryName?.items[0] !==null ){
//             const receivedData = res.data.versesQueryName.items[0].versesGenerated
//             setNumofverses(receivedData)
//             }
        
//          }
         
         
//      } catch (error) {
//         console.error('error is',error);
//      }
//   }

//  useEffect(()=>{
//   updateVerseInfo()
//  },[])

  return (
    <GradientBg>
       <BgImage src={bible} alt="cloudpic"
      width={300} height={300} />
         <BgImage2 src={cross} alt="cloudpic"
       height={300} />
       
       {/* <QuoteSubModal
        open={openModal}
        close={toggleModal}
        processingVerse={processingVerse}
        setProcessingVerse={setProcessingVerse}
        verseReceived={verseReceived}
        setVerseReceived = {setVerseReceived}

        /> */}
        
      <QuoteModal />
     <FooterContent>
        <> Quotes Generated : {numofverses} </>
        <br />
        Developed with <RedSpan 
        // onClick={toggleModal}
        > ❤︎ </RedSpan> by <FooterLink href="https://www.instagram.com/Suneel_Pradeep" target='_blank' rel="noopenernoreferrer">
              Ernest Solomon
             </FooterLink>
       </FooterContent>
    </GradientBg>
    
  )
}

export default QuoteGeneratorElement

const GradientBg = styled.div`
    background: linear-gradient(to right, #6A0DAD, #1cb5e0,#DC143C,#FFBF00);
    animation: gradient 6s ease infinite;
    background-size : 400% 400%;
    height: 100vh;
    width: 100vw;
    @keyframes gradient {
        0%{
            background-position : 0% 50%;
        }
        50%{
            background-position : 100% 50%;
        }
        100%{
            background-position : 0% 50%;
        }

    }
`
const BgImage = styled(Image)`
    position: relative;
    z-index : 1;
    margin-left: -20px;
    margin-top: -10px;
`
const BgImage2 = styled(Image)`
    position: fixed;
    z-index : 1;
    right: 0;
    bottom: 0;
`
const FooterContent = styled.footer`
    width: 100vw;
    height: 50px;
    text-align: center;
    font-family: 'Source Code Pro',;
    font-size: 15px;
    position: absolute;
    bottom: 0;
    color: white;
    z-index: 999999;
`
const FooterLink = styled(Link)`
    color : white;
    text-decoration: none;
`
const RedSpan = styled.span`
    color: red;
`