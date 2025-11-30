"use client";
import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalAssociar({ close, onSuccess }) {
  const [form, setForm] = useState({
    funcionarioId: "",
    etapaId: "",
  });
  const [funcionarios, setFuncionarios] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/funcionarios")
      .then(res => setFuncionarios(res.data))
      .catch(err => console.error("Erro ao buscar funcionários", err));

    axios.get("http://localhost:3001/api/etapas")
      .then(res => setEtapas(res.data))
      .catch(err => console.error("Erro ao buscar etapas", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.funcionarioId || !form.etapaId) {
      setErro("Por favor, selecione um funcionário e uma etapa.");
      return;
    }

    try {
      const payload = {
        funcionarioId: Number(form.funcionarioId),
        etapaId: Number(form.etapaId),
      };

      const res = await axios.post("http://localhost:3001/api/etapas/associar", payload);

      const funcionario = funcionarios.find(f => f.id === Number(form.funcionarioId));
      const etapaAtualizada = res.data.etapa;

      alert(`Funcionário ${funcionario?.nome} associado à etapa ${etapaAtualizada.nome}`);


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
        <h2>Associar Funcionário à Etapa</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <select
            name="funcionarioId"
            value={form.funcionarioId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um Funcionário</option>
            {funcionarios.map(f => (
              <option key={f.id} value={f.id}>
                {f.nome} (ID: {f.id})
              </option>
            ))}
          </select>

          <select
            name="etapaId"
            value={form.etapaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma Etapa</option>
            {etapas.map(e => (
              <option key={e.id} value={e.id}>
                {e.nome} (ID: {e.id})
              </option>
            ))}
          </select>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>Associar</button>
            <button type="button" className={styles.cancel} onClick={close}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
