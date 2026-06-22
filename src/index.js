import express from "express";
import dotenv from "dotenv";

import clientesRoutes from "./routes/clientesRoutes.js";
import equipamentosRoutes from "./routes/equipamentosRoutes.js";
import ordensRoutes from "./routes/ordensRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import servicosRoutes from "./routes/servicosRoutes.js";
import pagamentosRoutes from "./routes/pagamentosRoutes.js";

dotenv.config();
const app = express();

// CORS Manual
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// Log de requisições
app.use((req, res, next) => {
  console.log(`Recebido: ${req.method} ${req.url}`);
  next();
});

app.use("/clientes", clientesRoutes);
app.use("/equipamentos", equipamentosRoutes);
app.use("/ordens", ordensRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/servicos", servicosRoutes);
app.use("/pagamentos", pagamentosRoutes);

app.get("/", (req, res) => res.json({ status: "API online" }));

// Captura erros globais
app.use((err, req, res, next) => {
  console.error("ERRO CRÍTICO NO SERVIDOR:", err);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

// CORREÇÃO: Usando a porta do ambiente E o host '0.0.0.0'
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});