/**
 * @swagger
 * components:
 *   schemas:
 *     ProfileConfig:
 *       type: object
 *       required:
 *         - fieldName
 *         - fieldType
 *         - isRequired
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del campo
 *         fieldName:
 *           type: string
 *           description: Nombre del campo
 *         fieldType:
 *           type: string
 *           enum: [TEXT, NUMBER, DATE, BOOLEAN, SELECT]
 *           description: Tipo de campo
 *         isRequired:
 *           type: boolean
 *           description: Indica si el campo es obligatorio
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Opciones para campos de tipo SELECT
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *         profileData:
 *           type: object
 *           additionalProperties: true
 */

/**
 * @swagger
 * tags:
 *   - name: Perfil (Admin)
 *     description: Endpoints para la configuración de campos del perfil
 *   - name: Perfil (Usuario)
 *     description: Endpoints para la gestión del perfil de usuario
 */

/**
 * @swagger
 * /api/profile-config:
 *   post:
 *     summary: Crear una nueva configuración de campo
 *     tags: [Perfil (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileConfig'
 *     responses:
 *       201:
 *         description: Campo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 * 
 *   get:
 *     summary: Obtener todas las configuraciones de campos
 *     tags: [Perfil (Admin)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de configuraciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfileConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 * 
 * /api/profile-config/{id}:
 *   get:
 *     summary: Obtener una configuración de campo por ID
 *     tags: [Perfil (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Configuración no encontrada
 * 
 *   put:
 *     summary: Actualizar una configuración de campo
 *     tags: [Perfil (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileConfig'
 *     responses:
 *       200:
 *         description: Configuración actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileConfig'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Configuración no encontrada
 * 
 *   delete:
 *     summary: Eliminar una configuración de campo
 *     tags: [Perfil (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la configuración
 *     responses:
 *       200:
 *         description: Configuración eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Configuración no encontrada
 * 
 * /api/profile:
 *   get:
 *     summary: Obtener perfil del usuario
 *     tags: [Perfil (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: No autorizado
 * 
 *   put:
 *     summary: Actualizar perfil del usuario
 *     tags: [Perfil (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos inválidos
 */ 