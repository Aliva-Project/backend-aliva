export const authSchemas = {
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico del usuario'
      },
      password: {
        type: 'string',
        format: 'password',
        description: 'Contraseña del usuario'
      }
    }
  },
  RegisterRequest: {
    type: 'object',
    required: ['email', 'password', 'name', 'birthDate', 'location'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico del usuario'
      },
      password: {
        type: 'string',
        format: 'password',
        minLength: 6,
        description: 'Contraseña del usuario (mínimo 6 caracteres)'
      },
      name: {
        type: 'string',
        description: 'Nombre completo del usuario'
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Fecha de nacimiento en formato ISO 8601 (YYYY-MM-DD)'
      },
      location: {
        type: 'string',
        description: 'Ubicación del usuario'
      }
    }
  },
  AuthResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Mensaje de respuesta'
      },
      token: {
        type: 'string',
        description: 'Token JWT para autenticación'
      },
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID del usuario'
          },
          name: {
            type: 'string',
            description: 'Nombre del usuario'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Correo electrónico del usuario'
          },
          role: {
            type: 'string',
            enum: ['USER', 'ADMIN'],
            description: 'Rol del usuario'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación de la cuenta'
          }
        }
      }
    }
  }
}; 