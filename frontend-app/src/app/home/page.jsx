"use client";

import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push("./aeronaves");
  };

  return (
    <>
      <header className={styles.cabecalho}>
        <img
          src="/images/logoCLEAN.png"
          alt="logo aerocode pequeno"
          className={styles.logo}
        />
        <Link href="/" className={styles.retornoLogin}>
          RETORNAR AO LOGIN
        </Link>
      </header>

      <main className={styles.principal}>
        <div className={styles.textoCentral}>
          <h1 className={styles.titulo}>
            BEM-VINDO AO <span className={styles.marca}>
            &nbsp;&nbsp;&nbsp;&nbsp;AEROCODE      </span>
          </h1>
          <p className={styles.subtitulo}>
            Onde tecnologia e o céu se encontram.
          </p>
          <button type="button" onClick={handleClick} className={styles.botao}>
            ACESSAR O SITE
          </button>
        </div>
      </main>
    </>
  );
}