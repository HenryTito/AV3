"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const { user, temPermissao } = useAuth();

  const handleClick = () => {
    router.push("./home");
  };

  const handleLogout = () => {
   
    router.push("/");
  };


  const menu = [
    {
      label: "Aeronaves",
      icon: "/images/avisao.png",
      path: "/aeronaves",
      permission: "ver_aeronaves",
    },
    {
      label: "Funcionários",
      icon: "/images/pessoa.png",
      path: "/funcionarios",
      permission: "ver_funcionarios",
    },
    {
      label: "Peça",
      icon: "/images/engrenagem.png",
      path: "/peca",
      permission: "ver_pecas",
    },
    {
      label: "Etapas",
      icon: "/images/fluxograma.png",
      path: "/etapas",
      permission: "ver_etapas",
    },
    {
      label: "Testes",
      icon: "/images/teste.png",
      path: "/testes",
      permission: "ver_testes", 
    },
    {
      label: "Relatórios",
      icon: "/images/documento.png",
      path: "/relatorios",
      permission: "ver_relatorios",
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topBar}>
        <button type="button" onClick={handleClick} className={styles.backButton}>
          ←
        </button>
      </div>

      <nav className={styles.menu}>
        {menu.map(
          (item) =>
            temPermissao(item.permission) && (
              <button
                key={item.label}
                className={styles.menuItem}
                onClick={() => router.push(item.path)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                  className={styles.icon}
                />
                <span>{item.label}</span>
              </button>
            )
        )}
      </nav>


      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}></div>
          <div>
            <p className={styles.userName}>Nome: {user?.nome || "Usuário"}</p>
            <p className={styles.userModule}>
              Módulo: {user?.cargo?.toUpperCase() || "N/A"}
            </p>
            <p className={styles.userStatus}>Logado</p>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
}
