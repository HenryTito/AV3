"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalListar({ close }) {
  const [pecas, setPecas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchPecas() {
      try {
        const res = await axios.get("http://localhost:3001/api/pecas");
        setPecas(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar peças.");
      }
    }

    fetchPecas();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Lista de Peças</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Aeronave ID</th>
            </tr>
          </thead>
          <tbody>
            {pecas.map((peca) => (
              <tr key={peca.id}>
                <td>{peca.id}</td>
                <td>{peca.nome}</td>
                <td>{peca.tipo}</td>
                <td>{peca.status}</td>
                <td>{peca.aeronaveId}</td>
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
