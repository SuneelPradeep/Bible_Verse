import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'
import '../../../app/globals.css'
import awsmobile from '../../../src/aws-exports'

Amplify.configure({...awsmobile})
//ssr : true not added as its showing error 
export default function App ({ Component, pageProps} : AppProps) {
    return <Component {...pageProps} />
}