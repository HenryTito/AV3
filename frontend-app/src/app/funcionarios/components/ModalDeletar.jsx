"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalDeletar({ close }) {
  const [id, setId] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      await axios.delete(`http://localhost:3001/api/funcionarios/${id}`);
      setSucesso(`Funcionário com ID ${id} deletado com sucesso!`);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErro(err.response.data.error || "Erro ao deletar funcionário.");
      } else {
        setErro("Erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Deletar Funcionário</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="id"
            placeholder="ID (*OBRIGATÓRIO)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>Deletar</button>
            <button type="button" className={styles.cancel} onClick={close}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
