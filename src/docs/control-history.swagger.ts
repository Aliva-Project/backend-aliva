/**
 * @swagger
 * components:
 *   schemas:
 *     ControlHistoryQuestion:
 *       type: object
 *       required:
 *         - question
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la pregunta
 *         question:
 *           type: string
 *           description: Texto de la pregunta
 *         description:
 *           type: string
 *           description: Descripción adicional de la pregunta
 *         isRequired:
 *           type: boolean
 *           description: Indica si la pregunta es obligatoria
 *         order:
 *           type: integer
 *           description: Orden de visualización
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     ControlHistoryAnswer:
 *       type: object
 *       required:
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         questionId:
 *           type: integer
 *         date:
 *           type: string
 *           format: date-time
 *         details:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         question:
 *           $ref: '#/components/schemas/ControlHistoryQuestion'
 */

/**
 * @swagger
 * tags:
 *   - name: Historial de Controles (Admin)
 *     description: Endpoints para la gestión de preguntas del historial de controles
 *   - name: Historial de Controles (Usuario)
 *     description: Endpoints para la gestión de respuestas del historial de controles
 */

/**
 * @swagger
 * /api/control-history/config/questions:
 *   post:
 *     summary: Crear una nueva pregunta de control
 *     tags: [Historial de Controles (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *               description:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ControlHistoryQuestion'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 * 
 *   get:
 *     summary: Obtener todas las preguntas de control
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ControlHistoryQuestion'
 *       401:
 *         description: No autorizado
 * 
 * /api/control-history/config/questions/{id}:
 *   put:
 *     summary: Actualizar una pregunta de control
 *     tags: [Historial de Controles (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               description:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ControlHistoryQuestion'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Pregunta no encontrada
 * 
 *   delete:
 *     summary: Eliminar una pregunta de control
 *     tags: [Historial de Controles (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Pregunta no encontrada
 * 
 * /api/control-history/questions/{id}:
 *   get:
 *     summary: Obtener una pregunta de control por ID
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ControlHistoryQuestion'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pregunta no encontrada
 * 
 * /api/control-history/questions/{questionId}/answers:
 *   post:
 *     summary: Enviar respuesta a una pregunta de control
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               details:
 *                 type: string
 *     responses:
 *       201:
 *         description: Respuesta enviada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ControlHistoryAnswer'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pregunta no encontrada
 * 
 * /api/control-history/answers:
 *   get:
 *     summary: Obtener todas las respuestas del usuario
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de respuestas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ControlHistoryAnswer'
 *       401:
 *         description: No autorizado
 * 
 * /api/control-history/answers/{id}:
 *   get:
 *     summary: Obtener una respuesta específica
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ControlHistoryAnswer'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 * 
 *   put:
 *     summary: Actualizar una respuesta
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ControlHistoryAnswer'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 * 
 *   delete:
 *     summary: Eliminar una respuesta
 *     tags: [Historial de Controles (Usuario)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 */ 