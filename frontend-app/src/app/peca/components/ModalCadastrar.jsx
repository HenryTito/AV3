"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalCadastrar({ close, onPecaCadastrada }) {
  const [form, setForm] = useState({
    nome: "",
    tipo: "NACIONAL",       // enum TipoPeca
    fornecedor: "",
    status: "EM_PRODUCAO",  // enum StatusPeca
    aeronaveId: "",          // será convertido para number
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    // Prepara payload com enums corretos
    const payload = {
      ...form,
      tipo: form.tipo.toUpperCase(),       // NACIONAL ou IMPORTADA
      status: form.status.toUpperCase(),   // EM_PRODUCAO, EM_TRANSPORTE, PRONTA
      aeronaveId: Number(form.aeronaveId),
    };

    try {
      const res = await axios.post("http://localhost:3001/api/pecas", payload);
      alert(`Peça cadastrada: ${res.data.nome}`);

      // Atualiza a tabela de peças no front sem precisar recarregar a página
      if (typeof onPecaCadastrada === "function") {
        onPecaCadastrada(res.data);
      }

      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastrar Peça</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="nome"
            placeholder="Nome da Peça"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="NACIONAL">Nacional</option>
            <option value="IMPORTADA">Importada</option>
          </select>

          <input
            name="fornecedor"
            placeholder="Fornecedor"
            value={form.fornecedor}
            onChange={handleChange}
            required
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="EM_PRODUCAO">Em Produção</option>
            <option value="EM_TRANSPORTE">Em Transporte</option>
            <option value="PRONTA">Pronta para Uso</option>
          </select>

          <input
            name="aeronaveId"
            placeholder="ID da Aeronave"
            value={form.aeronaveId}
            onChange={handleChange}
            required
            type="number"
          />

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>
              Cadastrar
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
