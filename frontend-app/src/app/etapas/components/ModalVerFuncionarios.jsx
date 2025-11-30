"use client";
import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalVerFuncionarios({ close }) {
  const [etapas, setEtapas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/etapas");
        setEtapas(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar etapas e funcionários do servidor.");
      }
    };

    fetchEtapas();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Funcionários por Etapa</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Funcionários</th>
            </tr>
          </thead>
          <tbody>
            {etapas.map((etapa) => (
              <tr key={etapa.id}>
                <td>{etapa.nome}</td>
                <td>
                  {etapa.funcionarios.length > 0
                    ? etapa.funcionarios.map(f => f.nome).join(", ")
                    : "Nenhum funcionário associado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={close}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
