/**
 * @swagger
 * components:
 *   schemas:
 *     FamilyHistoryQuestion:
 *       type: object
 *       required:
 *         - question
 *         - answerType
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
 *         answerType:
 *           type: string
 *           enum: [TEXT, SELECT, MULTIPLE_CHOICE]
 *           description: Tipo de respuesta esperada
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Opciones para preguntas de selección
 *         allowMultiple:
 *           type: boolean
 *           description: Indica si se permiten múltiples respuestas
 *         order:
 *           type: integer
 *           description: Orden de la pregunta
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 * 
 *     FamilyHistoryAnswer:
 *       type: object
 *       required:
 *         - userId
 *         - questionId
 *         - answer
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la respuesta
 *         userId:
 *           type: integer
 *           description: ID del usuario que respondió
 *         questionId:
 *           type: integer
 *           description: ID de la pregunta respondida
 *         answer:
 *           type: string
 *           description: Respuesta del usuario
 *         details:
 *           type: string
 *           description: Detalles adicionales de la respuesta
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

/**
 * @swagger
 * tags:
 *   - name: Antecedentes Familiares (Admin)
 *     description: Endpoints para administradores de antecedentes familiares
 *   - name: Antecedentes Familiares (Usuario)
 *     description: Endpoints para usuarios de antecedentes familiares
 */

/**
 * @swagger
 * /api/family-history/questions:
 *   get:
 *     summary: Obtener todas las preguntas de antecedentes familiares
 *     tags: [Antecedentes Familiares (Usuario)]
 *     responses:
 *       200:
 *         description: Lista de preguntas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FamilyHistoryQuestion'
 * 
 * /api/family-history/config/questions:
 *   post:
 *     summary: Crear una nueva pregunta (solo administradores)
 *     tags: [Antecedentes Familiares (Admin)]
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
 *               - answerType
 *             properties:
 *               question:
 *                 type: string
 *               description:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *               answerType:
 *                 type: string
 *                 enum: [TEXT, SELECT, MULTIPLE_CHOICE]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               allowMultiple:
 *                 type: boolean
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 * 
 * /api/family-history/questions/{id}:
 *   get:
 *     summary: Obtener una pregunta específica
 *     tags: [Antecedentes Familiares (Usuario)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta obtenida exitosamente
 *       404:
 *         description: Pregunta no encontrada
 * 
 * /api/family-history/config/questions/{id}:
 *   put:
 *     summary: Actualizar una pregunta (solo administradores)
 *     tags: [Antecedentes Familiares (Admin)]
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
 *               answerType:
 *                 type: string
 *                 enum: [TEXT, SELECT, MULTIPLE_CHOICE]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               allowMultiple:
 *                 type: boolean
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Pregunta no encontrada
 * 
 *   delete:
 *     summary: Eliminar una pregunta (solo administradores)
 *     tags: [Antecedentes Familiares (Admin)]
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
 *         description: Acceso denegado
 *       404:
 *         description: Pregunta no encontrada
 * 
 * /api/family-history/questions/{questionId}/answers:
 *   post:
 *     summary: Enviar una respuesta a una pregunta
 *     tags: [Antecedentes Familiares (Usuario)]
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
 *               - answer
 *             properties:
 *               answer:
 *                 type: string
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta guardada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pregunta no encontrada
 * 
 * /api/family-history/answers:
 *   get:
 *     summary: Obtener todas las respuestas del usuario
 *     tags: [Antecedentes Familiares (Usuario)]
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
 *                 $ref: '#/components/schemas/FamilyHistoryAnswer'
 *       401:
 *         description: No autorizado
 * 
 * /api/family-history/answers/{id}:
 *   get:
 *     summary: Obtener una respuesta específica
 *     tags: [Antecedentes Familiares (Usuario)]
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
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 * 
 *   put:
 *     summary: Actualizar una respuesta existente
 *     tags: [Antecedentes Familiares (Usuario)]
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
 *               - answer
 *             properties:
 *               answer:
 *                 type: string
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta actualizada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Respuesta no encontrada
 * 
 *   delete:
 *     summary: Eliminar una respuesta
 *     tags: [Antecedentes Familiares (Usuario)]
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