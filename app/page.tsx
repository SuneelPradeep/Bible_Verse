'use client';
import Image from "next/image";
import styles from "./page.module.css";
import styled from "styled-components";
import QuoteGeneratorElement from "@/components/QuoteGenerator/QuoteGeneratorElement";

export default function Home() {
  return (
    <main className={styles.main}>
       <QuoteGeneratorElement />
    </main>
  );
}


