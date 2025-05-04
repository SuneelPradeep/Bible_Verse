'use client';
import QuoteGeneratorElement from '../components/QuoteGenerator/QuoteGeneratorElement';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
       <QuoteGeneratorElement />
    </main>
  );
}


