import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// **Conecta ao banco de dados**
// Utiliza a função `conectarAoBanco` para estabelecer uma conexão com o banco de dados.
// A string de conexão é obtida da variável de ambiente `process.env.STRING_CONEXAO`.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// **Função assíncrona para buscar todos os posts**
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersão-instabytes'
    const db = conexao.db("imersão-instabytes");
    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

// **Função assíncrona para criar um novo post**
export async function criarPost(novoPost) {
    // Seleciona o banco de dados e a coleção 'posts'
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");

    // Insere um novo documento na coleção 'posts'
    return colecao.insertOne(novoPost);
};

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
};