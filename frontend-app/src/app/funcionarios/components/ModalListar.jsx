"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalListar({ close }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const res = await axios.get("http://localhost:3001/api/funcionarios");
        setFuncionarios(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar funcionários.");
      }
    }

    fetchFuncionarios();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Lista de Funcionários</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Nível de Permissão</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((func) => (
              <tr key={func.id}>
                <td>{func.id}</td>
                <td>{func.nome}</td>
                <td>{func.usuario}</td>
                <td>{func.telefone}</td>
                <td>{func.nivelPermissao}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className={styles.cancel} onClick={close}>
          Fechar
        </button>
      </div>
    </div>
  );
}
