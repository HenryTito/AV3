"use client";
import { useState, useEffect } from "react";
import styles from "./Relatorio.module.css";
import ModalGerarRelatorio from "./components/ModalGerarRelatorio";
import ModalVisualizarRelatorio from "./components/ModalVisualizarRelatorio";
import { FileText } from "lucide-react";
import axios from "axios";

export default function RelatoriosPage() {
  const [relatorios, setRelatorios] = useState([]);
  const [showModalGerar, setShowModalGerar] = useState(false);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:3001/api/relatorios")
      .then((res) => setRelatorios(res.data))
      .catch((err) => console.error("Erro ao buscar relatórios:", err));
  }, []);

  const handleOpenModalGerar = () => setShowModalGerar(true);
  const handleCloseModalGerar = () => setShowModalGerar(false);

  const handleOpenRelatorio = async (relatorio) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/relatorios/${relatorio.id}`);
      setSelectedRelatorio(res.data); 
    } catch (err) {
      console.error("Erro ao buscar relatório:", err);
      alert("Não foi possível carregar o relatório.");
    }
  };

  const handleCloseRelatorio = () => setSelectedRelatorio(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>RELATÓRIOS</h1>
      
      <div className={styles.topBar}>
        <button onClick={handleOpenModalGerar} className={styles.btn}>
          Gerar relatório
        </button>
      </div>

      <div className={styles.gridContainer}>
        {relatorios.map((rel) => (
          <div
            key={rel.id}
            className={styles.card}
            onClick={() => handleOpenRelatorio(rel)}
          >
            <FileText className={styles.icon} size={40} />
            <p>Relatório {rel.id}</p>
          </div>
        ))}
      </div>

      {showModalGerar && (
        <ModalGerarRelatorio 
          onClose={handleCloseModalGerar} 
          onGerarSucesso={(novoRelatorio) => setRelatorios(prev => [novoRelatorio, ...prev])} 
        />
      )}
      
      {selectedRelatorio && (
        <ModalVisualizarRelatorio 
          relatorio={selectedRelatorio} 
          onClose={handleCloseRelatorio} 
        />
      )}
    </div>
  );
}
