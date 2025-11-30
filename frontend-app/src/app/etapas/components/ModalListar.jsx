"use client";
import styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalListar({ close }) {
  const [etapas, setEtapas] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);
  const [erro, setErro] = useState("");

  // Buscar etapas
  useEffect(() => {
    const fetchEtapas = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/etapas");
        setEtapas(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar etapas do servidor.");
      }
    };

    fetchEtapas();
  }, []);

  // Buscar aeronaves
  useEffect(() => {
    const fetchAeronaves = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/aeronaves");
        setAeronaves(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAeronaves();
  }, []);

  // Função para mapear aeronaveId para modelo
  const getAeronave = (id) => {
    const a = aeronaves.find(a => a.id === id);
    return a ? `${a.modelo} (ID: ${a.id})` : "Não associada";
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Listar Etapas</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Aeronave</th>
            </tr>
          </thead>
          <tbody>
            {etapas.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.nome}</td>
                <td>{e.status}</td>
                <td>{getAeronave(e.aeronaveId)}</td>
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
