"use client";

import { useState, useEffect } from "react";
import styles from "./Aeronaves.module.css";
import ModalCadastrar from "./components/ModalCadastrar";
import ModalListar from "./components/ModalListar";
import ModalEditar from "./components/ModalEditar";
import ModalDeletar from "./components/ModalDeletar";
import { useAuth } from "../../context/AuthContext";

export default function Aeronaves() {
  const { temPermissao } = useAuth();
  const [showCadastrar, setShowCadastrar] = useState(false);
  const [showListar, setShowListar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);

  const [aeronaves, setAeronaves] = useState([]);

  const podeCadastrar =
    temPermissao("criar") || temPermissao("criar_aeronave");
  const podeListar = temPermissao("ver_aeronaves") || temPermissao("listar");
  const podeEditar = temPermissao("editar");
  const podeDeletar = temPermissao("deletar");

  const API = "http://localhost:3001/api/aeronaves";

  // Buscar aeronaves do backend
  const fetchAeronaves = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Erro ao buscar aeronaves");

      const data = await res.json();
      setAeronaves(
        data.map((a) => ({
          ...a,
          dataEntrega: a.dataEntrega ? a.dataEntrega.substring(0, 10) : "",
        }))
      );
    } catch (err) {
      console.error(err);
      setAeronaves([]);
    }
  };

  // Executa ao montar o componente
  useEffect(() => {
    fetchAeronaves();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Menu Aeronaves</h1>

      <div className={styles.topBar}>
        {podeCadastrar && (
          <button className={styles.btn} onClick={() => setShowCadastrar(true)}>
            Cadastrar
          </button>
        )}
        {podeListar && (
          <button className={styles.btn} onClick={() => setShowListar(true)}>
            Listar
          </button>
        )}
        {podeEditar && (
          <button className={styles.btn} onClick={() => setShowEditar(true)}>
            Editar
          </button>
        )}
        {podeDeletar && (
          <button className={styles.btn} onClick={() => setShowDeletar(true)}>
            Deletar
          </button>
        )}
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.title}>Aeronaves em Exibição</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th> {/* NOVO */}
              <th>Modelo</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Alcance (em KM)</th>
              <th>Cliente</th>
              <th>Data Entrega</th>
            </tr>
          </thead>
          <tbody>
            {aeronaves.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  Nenhuma aeronave cadastrada.
                </td>
              </tr>
            ) : (
              aeronaves.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.codigo}</td> {/* NOVO */}
                  <td>{a.modelo}</td>
                  <td>{a.tipo === "COMERCIAL" ? "Comercial" : "Militar"}</td>
                  <td>{a.capacidade}</td>
                  <td>{a.alcance}</td>
                  <td>{a.cliente}</td>
                  <td>{a.dataEntrega}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCadastrar && (
        <ModalCadastrar
          close={() => setShowCadastrar(false)}
          onAeronaveCadastrada={(novaAeronave) =>
            setAeronaves((prev) => [
              ...prev,
              {
                ...novaAeronave,
                dataEntrega: novaAeronave.dataEntrega
                  ? novaAeronave.dataEntrega.substring(0, 10)
                  : "",
              },
            ])
          }
        />
      )}
      {showListar && <ModalListar close={() => setShowListar(false)} />}
      {showEditar && (
        <ModalEditar
          close={() => {
            setShowEditar(false);
            fetchAeronaves(); // Atualiza lista após edição
          }}
        />
      )}
      {showDeletar && (
        <ModalDeletar
          close={() => {
            setShowDeletar(false);
            fetchAeronaves(); // Atualiza lista após deleção
          }}
        />
      )}
    </div>
  );
}
