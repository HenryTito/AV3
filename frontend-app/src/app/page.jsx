"use client";

import React, { useState } from "react";
import styles from "./page.module.css"; // seu CSS original
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function Page() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/funcionarios/login", {
        usuario,
        senha,
      });

      console.log("Resposta do backend:", res.data);

      const { nome, cargo, usuario: userName } = res.data;

      login(nome, cargo, userName);
      router.push("/home");
    } catch (err) {
      console.error(err);
      if (err.response) alert(err.response.data.error || "Erro ao logar");
      else alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <img
          src="/images/LOGOFRASE.png"
          alt="imagem aerocode logo"
          className={styles.imgPlaceholder}
        />
      </aside>

      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginh}>LOGIN - CADASTRAR</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <button type="submit" className={styles.submitButton}>
              CONTINUAR
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
