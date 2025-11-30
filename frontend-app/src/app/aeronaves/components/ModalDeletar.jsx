"use client";

import { useState } from "react";
import styles from "./Modal.module.css";

export default function ModalDeletar({ close }) {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");

  const API = "http://localhost:3001/api/aeronaves";

  const handleChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigo) {
      setErro("Digite um código válido.");
      return;
    }

    try {
      // Primeiro busca a aeronave pelo código para obter o ID
      const resBusca = await fetch(`${API}/${codigo}`);
      if (!resBusca.ok) {
        setErro("Aeronave não encontrada.");
        return;
      }

      const aeronave = await resBusca.json();
      const id = aeronave.id;

      // Deleta pelo ID
      const resDelete = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!resDelete.ok) {
        const errData = await resDelete.json();
        alert(errData.error || "Erro ao deletar aeronave.");
        return;
      }

      alert(`Aeronave ${codigo} deletada com sucesso!`);
      close();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao backend.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Deletar Aeronave</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="codigo"
            placeholder="ID (*OBRIGATÓRIO)"
            value={codigo}
            onChange={handleChange}
            required
          />
          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>Deletar</button>
            <button type="button" className={styles.cancel} onClick={close}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
