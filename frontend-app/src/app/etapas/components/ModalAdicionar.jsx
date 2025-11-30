"use client";

import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalAdicionar({ close, onSuccess }) { 
  const [form, setForm] = useState({
    nome: "",
    prazo: "",
    status: "PENDENTE",
    aeronaveId: "",
  });

  const [aeronaves, setAeronaves] = useState([]);
  const [erro, setErro] = useState("");


  useEffect(() => {
    axios.get("http://localhost:3001/api/aeronaves")
      .then((res) => {
        const todasAeronaves = res.data;
        const disponiveis = todasAeronaves.filter(a => !a.etapas || a.etapas.every(e => e.status !== "ANDAMENTO"));
        setAeronaves(disponiveis);
      })
      .catch((err) => console.error("Erro ao buscar aeronaves:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.prazo) {
      setErro("Por favor, informe o prazo da etapa.");
      return;
    }

    try {
      const payload = {
        ...form,
        prazo: new Date(form.prazo),
        aeronaveId: Number(form.aeronaveId),
      };

      const res = await axios.post("http://localhost:3001/api/etapas", payload);

  
      if (onSuccess) onSuccess(res.data);

      alert(`Etapa cadastrada: ${res.data.nome}`);
      close();
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Adicionar Etapa</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="nome"
            placeholder="Nome da Etapa"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            name="prazo"
            type="datetime-local"
            placeholder="Prazo"
            value={form.prazo}
            onChange={handleChange}
            required
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="PENDENTE">Pendente</option>
            <option value="ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>

          <select
            name="aeronaveId"
            value={form.aeronaveId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Aeronave</option>
            {aeronaves.map((a) => (
              <option key={a.id} value={a.id}>
                {a.modelo} (ID: {a.id})
              </option>
            ))}
          </select>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>
              Salvar
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
