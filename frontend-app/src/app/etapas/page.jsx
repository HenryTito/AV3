"use client";

import { useState, useEffect } from "react";
import styles from "./Etapa.module.css";
import ModalAdicionar from "./components/ModalAdicionar";
import ModalIniciar from "./components/ModalIniciar";
import ModalFinalizar from "./components/ModalFinalizar";
import ModalListar from "./components/ModalListar";
import ModalAssociar from "./components/ModalAssociar";
import ModalVerFuncionarios from "./components/ModalVerFuncionarios";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Etapas() {
  const [showAdicionar, setShowAdicionar] = useState(false);
  const [showIniciar, setShowIniciar] = useState(false);
  const [showFinalizar, setShowFinalizar] = useState(false);
  const [showListar, setShowListar] = useState(false);
  const [showAssociar, setShowAssociar] = useState(false);
  const [showVerFuncionarios, setShowVerFuncionarios] = useState(false);

  const [etapas, setEtapas] = useState([]);

  const { temPermissao } = useAuth();

  // Função para buscar etapas
  const buscarEtapas = () => {
    axios.get("http://localhost:3001/api/etapas")
      .then((res) => setEtapas(res.data))
      .catch((err) => console.error("Erro ao buscar etapas:", err));
  };

  useEffect(() => {
    buscarEtapas();
  }, []);

  const podeAdicionar = temPermissao("criar_etapa") || temPermissao("criar");
  const podeIniciar = temPermissao("iniciar_etapa") || temPermissao("editar");
  const podeFinalizar = temPermissao("finalizar_etapa") || temPermissao("editar");
  const podeListar = temPermissao("ver_etapas");
  const podeAssociar = temPermissao("associar_funcionario") || temPermissao("editar");
  const podeVerFuncionarios = temPermissao("ver_funcionarios") || temPermissao("ver");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Etapas da Produção</h1>

      <div className={styles.topBar}>
        {podeAdicionar && (
          <button className={styles.btn} onClick={() => setShowAdicionar(true)}>
            Adicionar Etapa
          </button>
        )}
        {podeIniciar && (
          <button className={styles.btn} onClick={() => setShowIniciar(true)}>
            Iniciar Etapa
          </button>
        )}
        {podeFinalizar && (
          <button className={styles.btn} onClick={() => setShowFinalizar(true)}>
            Finalizar Etapa
          </button>
        )}
        {podeListar && (
          <button className={styles.btn} onClick={() => setShowListar(true)}>
            Listar Etapas
          </button>
        )}
        {podeAssociar && (
          <button className={styles.btn} onClick={() => setShowAssociar(true)}>
            Associar Funcionário
          </button>
        )}
        {podeVerFuncionarios && (
          <button className={styles.btn} onClick={() => setShowVerFuncionarios(true)}>
            Ver Funcionários
          </button>
        )}
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.subtitle}>Tabela Etapas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Etapa</th>
              <th>Funcionário(s)</th>
              <th>Status Etapa</th>
              <th>Prazo Etapa</th>
            </tr>
          </thead>
          <tbody>
            {etapas.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.nome}</td>
                <td>
                  {e.funcionarios?.length > 0
                    ? e.funcionarios.map((f) => f.nome).join(", ")
                    : "Sem funcionário"}
                </td>
                <td>{e.status}</td>
                <td>{new Date(e.prazo).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modais */}
      {showAdicionar && (
        <ModalAdicionar
          close={() => setShowAdicionar(false)}
          onSuccess={(novaEtapa) =>
            setEtapas((prev) => [...prev, novaEtapa])
          }
        />
      )}
      {showIniciar && (
        <ModalIniciar
          close={() => setShowIniciar(false)}
          onSuccess={(etapaAtualizada) =>
            setEtapas((prev) =>
              prev.map((e) => (e.id === etapaAtualizada.id ? etapaAtualizada : e))
            )
          }
        />
      )}
      {showFinalizar && (
        <ModalFinalizar
          close={() => setShowFinalizar(false)}
          onSuccess={(etapaAtualizada) =>
            setEtapas((prev) =>
              prev.map((e) => (e.id === etapaAtualizada.id ? etapaAtualizada : e))
            )
          }
        />
      )}
      {showListar && <ModalListar close={() => setShowListar(false)} />}
      {showAssociar && (
        <ModalAssociar
          close={() => setShowAssociar(false)}
          onSuccess={(etapaAtualizada) =>
            setEtapas((prev) =>
              prev.map((e) => (e.id === etapaAtualizada.id ? etapaAtualizada : e))
            )
          }
        />
      )}
      {showVerFuncionarios && (
        <ModalVerFuncionarios close={() => setShowVerFuncionarios(false)} />
      )}
    </div>
  );
}
