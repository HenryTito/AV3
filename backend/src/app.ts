import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import aeronaveRoutes from "./routes/aeronave.routes";
import funcionarioRoutes from "./routes/funcionario.routes";
import pecaRoutes from "./routes/peca.routes";
import etapaRoutes from "./routes/etapa.routes";
import testeRoutes from "./routes/teste.routes";
import relatorioRoutes from "./routes/relatorio.routes";
import medicoesRoutes from "./routes/medicoes";


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/aeronaves", aeronaveRoutes);
app.use("/api/funcionarios", funcionarioRoutes);
app.use("/api/pecas", pecaRoutes);
app.use("/api/etapas", etapaRoutes);
app.use("/api/testes", testeRoutes);
app.use("/api/relatorios", relatorioRoutes);
app.use("/medicoes", medicoesRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running on ${port}`));
