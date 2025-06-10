import dotenv from 'dotenv';

dotenv.config();

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4.1-nano',
  },
  virtualAssistant: {
    contextName: process.env.VIRTUAL_ASSISTANT_CONTEXT_NAME || 'default',
  },
  // Otras configuraciones pueden agregarse aquí
}; 