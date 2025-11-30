"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalDeletar({ close, onPecaDeletada }) {
  const [id, setId] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!id) {
      setErro("ID da peça é obrigatório.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/pecas/${id}`);
      alert(`Peça deletada com sucesso!`);

      // Atualiza tabela automaticamente
      if (typeof onPecaDeletada === "function") {
        onPecaDeletada(Number(id));
      }

      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao deletar peça.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Deletar Peça</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="id"
            placeholder="ID da Peça (*OBRIGATÓRIO)"
            value={id}
            onChange={handleChange}
            required
          />
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>
              Deletar
            </button>
            <button type="button" className={styles.cancel} onClick={close}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
