import awsExports from '@/src/aws-exports'
import '@/styles/globals.css'
import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'

Amplify.configure({...awsExports})
//ssr : true not added as its showing error 
export default function App ({ Component, pageProps} : AppProps) {
    return <Component {...pageProps} />
}