/**
 * @swagger
 * components:
 *   schemas:
 *     RelevantHabitQuestion:
 *       type: object
 *       required:
 *         - question
 *         - options
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único de la pregunta
 *         question:
 *           type: string
 *           description: Texto de la pregunta
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de opciones predefinidas
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     RelevantHabitAnswer:
 *       type: object
 *       required:
 *         - answer
 *         - questionId
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         answer:
 *           type: string
 *         questionId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         question:
 *           $ref: '#/components/schemas/RelevantHabitQuestion'
 * 
 * /api/relevant-habit/config/questions:
 *   post:
 *     tags: [Hábitos Relevantes - Admin]
 *     summary: Crear una nueva pregunta
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
 *               - options
 *             properties:
 *               question:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 * 
 *   get:
 *     tags: [Hábitos Relevantes]
 *     summary: Obtener todas las preguntas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelevantHabitQuestion'
 * 
 * /api/relevant-habit/config/questions/{id}:
 *   put:
 *     tags: [Hábitos Relevantes - Admin]
 *     summary: Actualizar una pregunta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - options
 *             properties:
 *               question:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 * 
 *   delete:
 *     tags: [Hábitos Relevantes - Admin]
 *     summary: Eliminar una pregunta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pregunta eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de administrador
 * 
 * /api/relevant-habit/questions/{id}:
 *   get:
 *     tags: [Hábitos Relevantes]
 *     summary: Obtener una pregunta específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la pregunta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelevantHabitQuestion'
 * 
 * /api/relevant-habit/questions/{questionId}/answers:
 *   post:
 *     tags: [Hábitos Relevantes]
 *     summary: Crear una respuesta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
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
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 *       401:
 *         description: No autorizado
 * 
 * /api/relevant-habit/answers:
 *   get:
 *     tags: [Hábitos Relevantes]
 *     summary: Obtener todas las respuestas del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelevantHabitAnswer'
 * 
 * /api/relevant-habit/answers/{id}:
 *   get:
 *     tags: [Hábitos Relevantes]
 *     summary: Obtener una respuesta específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la respuesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelevantHabitAnswer'
 * 
 *   put:
 *     tags: [Hábitos Relevantes]
 *     summary: Actualizar una respuesta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: Respuesta actualizada exitosamente
 *       401:
 *         description: No autorizado
 * 
 *   delete:
 *     tags: [Hábitos Relevantes]
 *     summary: Eliminar una respuesta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Respuesta eliminada exitosamente
 *       401:
 *         description: No autorizado
 */ 