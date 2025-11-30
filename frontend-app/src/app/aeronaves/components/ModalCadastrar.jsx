"use client";

import { useState } from "react";
import styles from "./Modal.module.css";
import axios from "axios";

export default function ModalCadastrar({ close, onAeronaveCadastrada }) {
  const [form, setForm] = useState({
    codigo: "",
    modelo: "",
    tipo: "Comercial",
    capacidade: "",
    alcance: "",
    cliente: "",
    dataEntrega: "",
  });

  const API = "http://localhost:3001/api"; // backend

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      codigo: form.codigo,
      modelo: form.modelo,
      tipo: form.tipo.toUpperCase(), // COMERCIAL / MILITAR
      capacidade: parseInt(form.capacidade),
      alcance: parseInt(form.alcance),
      cliente: form.cliente,
      dataEntrega: new Date(form.dataEntrega).toISOString(),
    };

    try {
      const res = await axios.post(`${API}/aeronaves`, payload);
      alert("Aeronave cadastrada!");

      // Atualiza a lista no componente pai sem recarregar
      if (onAeronaveCadastrada) {
        onAeronaveCadastrada(res.data);
      }

      close();
    } catch (err) {
      console.error(err);
      alert(
        "Erro ao cadastrar aeronave. Verifique se o código já não existe."
      );
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastrar Aeronave</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="codigo"
            placeholder="Código"
            onChange={handleChange}
            required
          />
          <input
            name="modelo"
            placeholder="Modelo (nome)"
            onChange={handleChange}
            required
          />
          <select name="tipo" onChange={handleChange} value={form.tipo}>
            <option value="Comercial">Comercial</option>
            <option value="Militar">Militar</option>
          </select>
          <input
            name="capacidade"
            placeholder="Capacidade (apenas numeros)"
            onChange={handleChange}
            required
          />
          <input
            name="alcance"
            placeholder="Alcance (apenas numeros (em KM))"
            onChange={handleChange}
            required
          />
          <input
            name="cliente"
            placeholder="Cliente"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dataEntrega"
            onChange={handleChange}
            required
          />

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
