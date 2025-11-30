"use client";

import { useState } from "react";
import styles from "./Modal.module.css";

export default function ModalCadastrar({ close }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    usuario: "",
    senha: "",
    nivelPermissao: "OPERADOR", // padrão
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:3001/api/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErro(data.error || "Erro ao cadastrar funcionário");
        return;
      }

      const data = await res.json();
      alert(`Funcionário cadastrado: ${data.nome}`);
      close();
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastrar Funcionário</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="nome" placeholder="Nome" onChange={handleChange} value={form.nome} required />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} value={form.telefone} required />
          <input name="endereco" placeholder="Endereço" onChange={handleChange} value={form.endereco} required />
          <input name="usuario" placeholder="Usuário" onChange={handleChange} value={form.usuario} required />
          <input name="senha" placeholder="Senha" onChange={handleChange} value={form.senha} required />

          <select name="nivelPermissao" onChange={handleChange} value={form.nivelPermissao}>
            <option value="OPERADOR">Operador</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="ENGENHEIRO">Engenheiro</option>
          </select>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit}>Cadastrar</button>
            <button type="button" className={styles.cancel} onClick={close}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
