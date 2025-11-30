"use client";

import { useState } from "react";
import styles from "./Modal.module.css";

export default function ModalEditar({ close }) {
  const [form, setForm] = useState({
    id: null,
    codigo: "",
    modelo: "",
    tipo: "COMERCIAL",
    capacidade: "",
    alcance: "",
    cliente: "",
    dataEntrega: "",
  });

  const [loaded, setLoaded] = useState(false);
  const [erro, setErro] = useState("");

  const API = "http://localhost:3001/api/aeronaves";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buscarAeronave = async () => {
    if (!form.codigo) {
      setErro("Digite um código válido.");
      return;
    }

    try {
      const res = await fetch(`${API}/${form.codigo}`);
      if (!res.ok) {
        setErro("Aeronave não encontrada.");
        return;
      }

      const data = await res.json();

      setForm({
        id: data.id,
        codigo: data.codigo,
        modelo: data.modelo,
        tipo: data.tipo, // já vem em COMERCIAL / MILITAR
        capacidade: data.capacidade,
        alcance: data.alcance,
        cliente: data.cliente,
        dataEntrega: data.dataEntrega?.substring(0, 10),
      });

      setLoaded(true);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao buscar aeronave.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id) return alert("Aeronave não carregada.");

    try {
      // Prepara os dados para envio: converte tipos
      const { id, codigo, ...dataToUpdate } = form;

      const payload = {
        ...dataToUpdate,
        capacidade: Number(dataToUpdate.capacidade),
        alcance: Number(dataToUpdate.alcance),
        dataEntrega: new Date(dataToUpdate.dataEntrega),
      };

      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Erro ao editar aeronave.");
        return;
      }

      alert("Aeronave editada com sucesso!");
      close();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao backend.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Aeronave</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Campo de código — sempre aparece */}
          <input
            name="codigo"
            placeholder="ID"
            value={form.id}
            onChange={handleChange}
            required
          />

          <button type="button" className={styles.submit} onClick={buscarAeronave}>
            Buscar Aeronave
          </button>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          {/* Campos só aparecem se a aeronave foi carregada */}
          {loaded && (
            <>
              <input
                name="modelo"
                placeholder="Modelo"
                value={form.modelo}
                onChange={handleChange}
                required
              />

              <select name="tipo" value={form.tipo} onChange={handleChange}>
                <option value="COMERCIAL">Comercial</option>
                <option value="MILITAR">Militar</option>
              </select>

              <input
                name="capacidade"
                placeholder="Capacidade"
                value={form.capacidade}
                onChange={handleChange}
                required
              />

              <input
                name="alcance"
                placeholder="Alcance"
                value={form.alcance}
                onChange={handleChange}
                required
              />

              <input
                name="cliente"
                placeholder="Cliente"
                value={form.cliente}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="dataEntrega"
                value={form.dataEntrega}
                onChange={handleChange}
                required
              />

              <div className={styles.buttons}>
                <button type="submit" className={styles.submit}>
                  Editar
                </button>
                <button type="button" className={styles.cancel} onClick={close}>
                  Cancelar
                </button>
              </div>
            </>
          )}

          {!loaded && (
            <div className={styles.buttons}>
              <button type="button" className={styles.cancel} onClick={close}>
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
