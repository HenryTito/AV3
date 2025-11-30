"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalEditar({ close, onPecaEditada }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    tipo: "NACIONAL",
    fornecedor: "",
    status: "EM_PRODUCAO",
    aeronaveId: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.id) {
      setErro("ID da peça é obrigatório.");
      return;
    }

    const payload = {
      nome: form.nome,
      tipo: form.tipo,
      fornecedor: form.fornecedor,
      status: form.status,
      aeronaveId: Number(form.aeronaveId),
    };

    try {
      const res = await axios.put(`http://localhost:3001/api/pecas/${form.id}`, payload);
      alert(`Peça atualizada: ${res.data.nome}`);

      // Atualiza a tabela automaticamente
      if (typeof onPecaEditada === "function") {
        onPecaEditada(res.data);
      }

      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao atualizar peça.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Peça</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="id"
            placeholder="ID da Peça"
            value={form.id}
            onChange={handleChange}
            required
          />
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
            type="number"
            value={form.aeronaveId}
            onChange={handleChange}
            required
          />

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>
              Editar
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
