"use client";
import styles from "./Modal.module.css";
import { useState } from "react";
import axios from "axios";

export default function ModalFinalizar({ close, onSuccess }) {
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
      const res = await axios.post(`http://localhost:3001/api/etapas/finalizar/${etapaId}`);
      alert(`Etapa "${res.data.nome}" finalizada com sucesso!`);

 
      if (onSuccess) onSuccess(res.data);

      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Finalizar Etapa</h2>
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
            <button type="submit" className={styles.submit}>Finalizar</button>
            <button type="button" className={styles.cancel} onClick={close}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
