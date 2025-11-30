"use client";

import { useState, useEffect } from "react";
import styles from "./Testes.module.css";
import ModalCadastrar from "./components/ModalCadastrar"; // Modal de cadastro de teste
import ModalDeletar from "./components/ModalDeletar"; // Modal de deletar teste
import axios from "axios";

export default function Testes() {
  const [showCadastrar, setShowCadastrar] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [testes, setTestes] = useState([]);
  const [erro, setErro] = useState("");

  // Buscar testes do backend
  useEffect(() => {
    async function fetchTestes() {
      try {
        const res = await axios.get("http://localhost:3001/api/testes");
        setTestes(res.data);
      } catch (err) {
        console.error("Erro ao buscar testes:", err);
        setErro("Erro ao carregar testes do servidor.");
      }
    }
    fetchTestes();
  }, []);

  // Função auxiliar para buscar a aeronave completa
  const fetchAeronave = async (aeronaveId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/aeronaves/${aeronaveId}`);
      return res.data;
    } catch (err) {
      console.error("Erro ao buscar aeronave associada:", err);
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TESTES</h2>

      <div className={styles.topBar}>
        <button className={styles.btn} onClick={() => setShowCadastrar(true)}>
          Cadastrar
        </button>
        <button className={styles.btn} onClick={() => setShowDeletar(true)}>
          Deletar Teste
        </button>
      </div>

      <div className={styles.tableContainer}>
        <h3 className={styles.subtitle}>ÁREA DE TESTES</h3>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Resultado</th>
              <th>Aeronave</th>
            </tr>
          </thead>
          <tbody>
            {testes.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.tipo}</td>
                
                <td>{t.resultado}</td>
                <td>{t.aeronave?.modelo || "Não associado"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {showCadastrar && (
        <ModalCadastrar
          close={() => setShowCadastrar(false)}
          onTesteCadastrado={async (novoTeste) => {
           
            const aeronaveCompleta = await fetchAeronave(novoTeste.aeronaveId);
            const testeComAeronave = { ...novoTeste, aeronave: aeronaveCompleta };
            setTestes((prev) => [...prev, testeComAeronave]);
          }}
        />
      )}

     
      {showDeletar && (
        <ModalDeletar
          close={() => setShowDeletar(false)}
          onTesteDeletado={(idDeletado) =>
            setTestes((prev) => prev.filter((t) => t.id !== idDeletado))
          }
        />
      )}
    </div>
  );
}
