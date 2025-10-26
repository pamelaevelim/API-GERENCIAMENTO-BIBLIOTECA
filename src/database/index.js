import mongoose from "mongoose";
import "dotenv/config";

export async function connectMongo() {
  const { MONGO_URL, MONGO_DATABASE, MONGO_OPTIONS } = process.env;
  const connectionString = `${MONGO_URL}${MONGO_DATABASE}${MONGO_OPTIONS}`;

  try {
    await mongoose.connect(connectionString);
    console.log("✅ Conexão com o MongoDB estabelecida com sucesso!");
  } catch (err) {
    console.error("❌ Falha ao conectar ao MongoDB:", err.message);
  }
}
