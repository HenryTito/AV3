"use client";

import styles from "./Modal.module.css";

export default function ModalVisualizarRelatorio({ relatorio, onClose }) {
  if (!relatorio) return null;

  const { aeronave, data } = relatorio;

  // Relações diretamente de dentro de aeronave
  const pecas = aeronave?.pecas || [];
  const etapas = aeronave?.etapas || [];
  const testes = aeronave?.testes || [];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>RELATÓRIO DA AERONAVE</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalBody}>
          {/* Informações da Aeronave */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações da aeronave:</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Código:</span>
                <span className={styles.infoValue}>{aeronave?.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Modelo:</span>
                <span className={styles.infoValue}>{aeronave?.modelo}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Tipo:</span>
                <span className={styles.infoValue}>{aeronave?.tipo}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Capacidade:</span>
                <span className={styles.infoValue}>{aeronave?.capacidade}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Alcance:</span>
                <span className={styles.infoValue}>{aeronave?.alcance}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Cliente:</span>
                <span className={styles.infoValue}>{aeronave?.cliente}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Data de Entrega:</span>
                <span className={styles.infoValue}>
                  {new Date(aeronave?.dataEntrega).toLocaleDateString()}
                </span>
              </div>
            </div>
          </section>

          {/* Peças */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Peças usadas:</h3>
            <div className={styles.list}>
              {pecas.length ? pecas.map((p, i) => (
                <div key={p.id} className={styles.listItem}>
                  {i + 1}. {p.tipo} | Fornecedor: {p.fornecedor} | Status: {p.status}
                </div>
              )) : <div>Nenhuma peça registrada</div>}
            </div>
          </section>

          {/* Etapas */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Etapas de produção da aeronave:</h3>
            <div className={styles.list}>
              {etapas.length ? etapas.map((e, i) => (
                <div key={e.id} className={styles.listItem}>
                  <strong>{i + 1}. {e.nome}</strong>
                  <br />
                  Prazo: {new Date(e.prazo).toLocaleDateString()} | Status: {e.status}

                  {/* Funcionários da etapa */}
                  <div style={{ marginLeft: "15px", marginTop: "5px" }}>
                    <strong>Funcionários responsáveis:</strong>
                    <div>
                      {e.funcionarios?.length ? (
                        e.funcionarios.map((f) => (
                          <div key={f.id} style={{ paddingLeft: "10px" }}>
                            • {f.nome} (ID: {f.id})
                          </div>
                        ))
                      ) : (
                        <div style={{ paddingLeft: "10px" }}>
                          Nenhum funcionário associado
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )) : <div>Nenhuma etapa registrada</div>}
            </div>
          </section>

          {/* Testes */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Resultado dos testes:</h3>
            <div className={styles.list}>
              {testes.length ? testes.map((t, i) => (
                <div key={t.id} className={styles.listItem}>
                  {i + 1}. {t.tipo} | Resultado: {t.resultado}
                </div>
              )) : <div>Nenhum teste registrado</div>}
            </div>
          </section>

          {/* Rodapé */}
          <section className={styles.footer}>
            <div className={styles.emissionDate}>
              Data de emissão: {new Date(data).toLocaleDateString()}
            </div>
            <div className={styles.signature}>
              <strong>AERONAVE ELABORADA</strong>
            </div>
          </section>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.secondaryButton} onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
