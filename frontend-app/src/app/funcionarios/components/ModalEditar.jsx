"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalEditar({ close }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    telefone: "",
    endereco: "",
    usuario: "",
    senha: "",
    nivelPermissao: "OPERADOR",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.id) {
      setErro("ID do funcionário é obrigatório.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3001/api/funcionarios/${form.id}`,
        {
          nome: form.nome,
          telefone: form.telefone,
          endereco: form.endereco,
          senha: form.senha,
          nivelPermissao: form.nivelPermissao,
        }
      );

      alert(`Funcionário atualizado: ${res.data.nome}`);
      close();
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErro(err.response.data.error || "Erro ao atualizar funcionário");
      } else {
        setErro("Erro ao conectar com o servidor");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Funcionário</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="id"
            placeholder="ID do Funcionário"
            value={form.id}
            onChange={handleChange}
            required
          />
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
          <input
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            required
          />
          <input
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <select
            name="nivelPermissao"
            value={form.nivelPermissao}
            onChange={handleChange}
          >
            <option value="OPERADOR">Operador</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="ENGENHEIRO">Engenheiro</option>
          </select>

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
