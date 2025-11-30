"use client";

import { useState, useEffect } from "react";
import styles from "./Funcionarios.module.css";
import ModalCadastrar from "./components/ModalCadastrar";
import ModalListar from "./components/ModalListar";
import ModalEditar from "./components/ModalEditar";
import ModalDeletar from "./components/ModalDeletar";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Funcionarios() {
  const [showCadastrar, setShowCadastrar] = useState(false);
  const [showListar, setShowListar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [erro, setErro] = useState("");

  const { user, temPermissao } = useAuth();

  const podeCadastrar = temPermissao("criar");
  const podeEditar = temPermissao("editar");
  const podeDeletar = temPermissao("deletar");
  const podeListar = temPermissao("ver_funcionarios");

  // Função para buscar funcionários do backend
  const fetchFuncionarios = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/funcionarios");
      setFuncionarios(res.data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar funcionários.");
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Menu Funcionários</h1>

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
        <h2 className={styles.title}>Funcionários</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Usuário</th>
              <th>Nível de Permissão</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.nome}</td>
                <td>{f.telefone}</td>
                <td>{f.endereco}</td>
                <td>{f.usuario}</td>
                <td>{f.nivelPermissao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCadastrar && (
        <ModalCadastrar
          close={() => {
            setShowCadastrar(false);
            fetchFuncionarios();
          }}
        />
      )}
      {showListar && <ModalListar close={() => setShowListar(false)} />}
      {showEditar && (
        <ModalEditar
          close={() => {
            setShowEditar(false);
            fetchFuncionarios();
          }}
        />
      )}
      {showDeletar && (
        <ModalDeletar
          close={() => {
            setShowDeletar(false);
            fetchFuncionarios();
          }}
        />
      )}
    </div>
  );
}
