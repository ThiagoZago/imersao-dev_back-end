// Importando as dependências necessárias para a aplicação
import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
}
// Configuração do armazenamento de arquivos utilizando o Multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos carregados
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Os arquivos serão salvos na pasta 'uploads/'
    },
    // Define o nome do arquivo no destino
    filename: function(req, file, cb) {
        cb(null, file.originalname); // O arquivo manterá o nome original
    }
});

// Cria uma instância do Multer com a configuração de armazenamento definida
const upload = multer({storage: storage});

// Define as rotas da aplicação
const routes = (app) => {
    // Permite que a aplicação processe dados JSON enviados nas requisições
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload de uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;