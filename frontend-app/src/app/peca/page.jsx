"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Peca.module.css";
import ModalCadastrar from "./components/ModalCadastrar";
import ModalListar from "./components/ModalListar";
import ModalEditar from "./components/ModalEditar";
import ModalDeletar from "./components/ModalDeletar";
import { useAuth } from "../../context/AuthContext";

export default function Pecas() {
  const { temPermissao } = useAuth();
  const [showCadastrar, setShowCadastrar] = useState(false);
  const [showListar, setShowListar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [pecas, setPecas] = useState([]);
  const [erro, setErro] = useState("");

  const podeCadastrar = temPermissao("criar") || temPermissao("criar_peca");
  const podeListar = temPermissao("listar") || temPermissao("ver_pecas");
  const podeEditar = temPermissao("editar");
  const podeDeletar = temPermissao("deletar");

  useEffect(() => {
    async function fetchPecas() {
      if (!podeListar) return;
      try {
        const res = await axios.get("http://localhost:3001/api/pecas");
        setPecas(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar peças do servidor.");
      }
    }

    fetchPecas();
  }, [podeListar]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Menu Peças</h1>

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
        <h2 className={styles.title}>Peças</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Fornecedor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pecas.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.tipo}</td>
                <td>{p.fornecedor}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCadastrar && (
        <ModalCadastrar
          close={() => setShowCadastrar(false)}
          onPecaCadastrada={(novaPeca) =>
            setPecas((prev) => [...prev, novaPeca])
          }
        />
      )}

      {showListar && <ModalListar close={() => setShowListar(false)} />}

      {showEditar && (
        <ModalEditar
          close={() => setShowEditar(false)}
          onPecaEditada={(pecaAtualizada) => {
            setPecas((prev) =>
              prev.map((p) => (p.id === pecaAtualizada.id ? pecaAtualizada : p))
            );
          }}
        />
      )}

      {showDeletar && (
        <ModalDeletar
          close={() => setShowDeletar(false)}
          onPecaDeletada={(idDeletada) =>
            setPecas((prev) => prev.filter((p) => p.id !== idDeletada))
          }
        />
      )}
    </div>
  );
}
