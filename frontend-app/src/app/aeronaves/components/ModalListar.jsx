"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

export default function ModalListar({ close }) {
  const [aeronaves, setAeronaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:3001/api";

  useEffect(() => {
    const fetchAeronaves = async () => {
      try {
        const res = await axios.get(`${API}/aeronaves`);
        setAeronaves(res.data);
      } catch (err) {
        console.error("Erro ao buscar aeronaves:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAeronaves();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Lista de Aeronaves</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : aeronaves.length === 0 ? (
          <p>Nenhuma aeronave cadastrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Data Entrega</th>
              </tr>
            </thead>
            <tbody>
              {aeronaves.map((a) => (
                <tr key={a.id}>
                  <td>{a.codigo}</td>
                  <td>{a.modelo}</td>
                  <td>{a.tipo}</td>
                  <td>{a.cliente}</td>
                  <td>{new Date(a.dataEntrega).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className={styles.cancel} onClick={close}>
          Fechar
        </button>
      </div>
    </div>
  );
}
