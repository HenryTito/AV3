"use client";
import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalDeletarTeste({ close, onTesteDeletado }) {
  const [id, setId] = useState("");
  const [testes, setTestes] = useState([]);
  const [erro, setErro] = useState("");

  // Buscar todos os testes ao abrir o modal
  useEffect(() => {
    axios.get("http://localhost:3001/api/testes")
      .then(res => setTestes(res.data))
      .catch(err => console.error("Erro ao buscar testes", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!id) {
      setErro("Selecione o teste a ser deletado.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/testes/${id}`);
      alert(`Teste com ID ${id} deletado com sucesso!`);

      // Atualiza a lista no page.jsx
      if (typeof onTesteDeletado === "function") {
        onTesteDeletado(Number(id));
      }

      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Deletar Teste</h2>
        <div className={styles.inputGroup}>
          <select value={id} onChange={(e) => setId(e.target.value)} required>
            <option value="">Selecione o Teste</option>
            {testes.map(t => (
              <option key={t.id} value={t.id}>
                ID: {t.id} - Tipo: {t.tipo} - Resultado: {t.resultado}
              </option>
            ))}
          </select>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btnCancelar} onClick={close}>
            Cancelar
          </button>
          <button className={styles.btnSalvar} onClick={handleSubmit}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
