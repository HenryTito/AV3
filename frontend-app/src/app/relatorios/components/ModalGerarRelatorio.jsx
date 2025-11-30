"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalGerarRelatorio({ onClose, onGerarSucesso }) {
  const [form, setForm] = useState({ aeronaveId: "" });
  const [aeronaves, setAeronaves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/aeronaves")
      .then(res => setAeronaves(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, aeronaveId: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.aeronaveId) return alert("Selecione uma aeronave!");

    try {
      const res = await axios.post("http://localhost:3001/api/relatorios", {
        aeronaveId: Number(form.aeronaveId)
      });
      alert(`Relatório gerado! ID: ${res.data.id}`);

      // Atualiza a lista de relatórios imediatamente
      if (onGerarSucesso) onGerarSucesso(res.data);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar relatório");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Gerar Relatório</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <select name="aeronaveId" value={form.aeronaveId} onChange={handleChange} required>
            <option value="">Selecione a Aeronave</option>
            {aeronaves.map(a => (
              <option key={a.id} value={a.id}>{a.modelo} (ID: {a.id})</option>
            ))}
          </select>

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>GERAR</button>
            <button type="button" className={styles.cancel} onClick={onClose}>CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}
