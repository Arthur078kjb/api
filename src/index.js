import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROTAS
import clientesRoutes from "./routes/clientesRoutes.js";
import equipamentosRoutes from "./routes/equipamentosRoutes.js";
import ordensRoutes from "./routes/ordensRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import servicosRoutes from "./routes/servicosRoutes.js";
import pagamentosRoutes from "./routes/pagamentosRoutes.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES
======================= */

// Configuração robusta de CORS
app.use(cors()); 
app.options("*", cors()); // Resolve o problema de preflight (OPTIONS)
app.use(express.json());

/* =======================
   ROTAS API
======================= */

app.use("/clientes", clientesRoutes);
app.use("/equipamentos", equipamentosRoutes);
app.use("/ordens", ordensRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/servicos", servicosRoutes);
app.use("/pagamentos", pagamentosRoutes);

/* =======================
   ROTA BASE
======================= */

app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando 🚀" });
});

/* =======================
   ROTA NÃO ENCONTRADA
======================= */

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

/* =======================
   SERVIDOR
======================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ambiente de produção na porta: ${PORT}`);
  console.log("CORS configurado para suporte a preflight");
});