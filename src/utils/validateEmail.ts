import { connectToDatabase } from "../config/database";
import { SignupOutput } from "../modules/signup/service/signup-service";

export const validateEmail = async (email: string): Promise<boolean> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const db_connect = await connectToDatabase();
  if (!email) throw new Error("O email é obrigatório.");  
  if (!emailRegex.test(email)) return false;  
  try {
    const existingEmail = await db_connect.any<SignupOutput>(
      "SELECT * FROM accounts WHERE email = $1",
      [email]
    );
    return existingEmail.length === 0;
  } catch (error: any) {
    throw new Error(`Erro ao conectar ao banco de dados: ${error.message}`);
  }
};
