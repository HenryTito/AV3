"use client";
import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalCadastrarTeste({ close, onTesteCadastrado }) {
  const [form, setForm] = useState({
    tipo: "",        // enum TipoTeste
    resultado: "",   // enum ResultadoTeste
    aeronaveId: "",  // ID da aeronave
  });
  const [aeronaves, setAeronaves] = useState([]);
  const [erro, setErro] = useState("");

  // Buscar aeronaves para o select
  useEffect(() => {
    axios.get("http://localhost:3001/api/aeronaves")
      .then(res => setAeronaves(res.data))
      .catch(err => console.error("Erro ao buscar aeronaves", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.tipo || !form.resultado || !form.aeronaveId) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const payload = {
        tipo: form.tipo,
        resultado: form.resultado,
        aeronaveId: Number(form.aeronaveId),
      };

      const res = await axios.post("http://localhost:3001/api/testes", payload);
      alert(`Teste cadastrado com sucesso! ID: ${res.data.id}`);

      // Atualiza a lista de testes no page.jsx
      if (typeof onTesteCadastrado === "function") {
        onTesteCadastrado(res.data);
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
        <h2>Cadastrar Teste</h2>
        <div className={styles.inputGroup}>
          <select name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="">Selecione o Tipo do Teste</option>
            <option value="HIDRAULICO">Hidráulico</option>
            <option value="AERODINAMICO">Aerodinâmico</option>
          </select>

          <select name="resultado" value={form.resultado} onChange={handleChange} required>
            <option value="">Selecione o Resultado</option>
            <option value="APROVADO">Aprovado</option>
            <option value="REPROVADO">Reprovado</option>
          </select>

          <select name="aeronaveId" value={form.aeronaveId} onChange={handleChange} required>
            <option value="">Selecione a Aeronave</option>
            {aeronaves.map(a => (
              <option key={a.id} value={a.id}>{a.modelo} (ID: {a.id})</option>
            ))}
          </select>

          {erro && <p style={{ color: "red" }}>{erro}</p>}
        </div>

        <div className={styles.btnGroup}>
          <button className={styles.btnCancelar} onClick={close}>Cancelar</button>
          <button className={styles.btnSalvar} onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
