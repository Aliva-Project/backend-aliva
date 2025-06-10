import { PrismaClient } from '@prisma/client';
import { seedSystemPrompt } from './systemPromptSeeder';

const prisma = new PrismaClient();

async function main() {
  try {
    // Ejecutar todos los seeders
    await seedSystemPrompt();
    // Aquí puedes agregar más seeders
    // await seedOtroModelo();
    // await seedOtroModeloMas();

    console.log('Todos los seeders se ejecutaron exitosamente');
  } catch (error) {
    console.error('Error al ejecutar los seeders:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 