"use client";
import styles from "./Modal.module.css";
import { useState } from "react";
import axios from "axios";

export default function ModalIniciar({ close, onSuccess }) {
  const [etapaId, setEtapaId] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!etapaId) {
      setErro("Por favor, informe o ID da etapa.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3001/api/etapas/iniciar/${etapaId}`);
      const etapaAtualizada = res.data;

      alert(`Etapa "${etapaAtualizada.nome}" iniciada com sucesso!`);

      // Atualizar tabela no page.jsx
      if (onSuccess) onSuccess(etapaAtualizada);

      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Iniciar Etapa</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="number"
            placeholder="ID da Etapa"
            value={etapaId}
            onChange={(e) => setEtapaId(e.target.value)}
            required
          />
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>Iniciar</button>
            <button type="button" className={styles.cancel} onClick={close}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
