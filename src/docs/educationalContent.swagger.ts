/**
 * @swagger
 * components:
 *  schemas:
 *      EducationalContentRequest:
 *          type: object
 *          required:
 *          - title
 *          - content
 *          - category
 *          properties:
 *          id:
 *              type: integer
 *              description: ID único del contenido educativo
 *              example: 1
 *          title:
 *              type: string
 *              description: Título del contenido educativo
 *              example: "Introducción al cancer de mama"
 *          content:
 *              type: string
 *              description: Contenido del artículo o video
 *              example: "El cáncer de mama es una enfermedad que afecta a las células del seno..."
 *          category:
 *              type: string
 *              description: Categoría del contenido educativo
 *              example: "Prevención"
 *
 *      EducationalContentResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: Mensaje de éxito
 *                  example: "Contenido educativo creado exitosamente"
 *              content:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID único del contenido educativo
 *                      example: 1
 *                  title:
 *                      type: string
 *                      description: Título del contenido educativo
 *                      example: "Introducción al cancer de mama"
 *                  content:
 *                      type: string
 *                      description: Contenido del artículo o video
 *                      example: "El cáncer de mama es una enfermedad que afecta a las células del seno..."
 *                  categoryId:
 *                      type: integer
 *                      description: Categoría del contenido educativo
 *                      example: 1
 *                  type:
 *                      type: string
 *                      description: Tipo de contenido (artículo, video, etc.)
 *                      example: ["ARTICLE", "VIDEO", "PODCAST"]
 *                  url:
 *                      type: string
 *                      description: URL del contenido (si aplica)
 *                      example: "https://example.com/educational-content/1"
 *                  createdAt:
 *                      type: string
 *                      format: date-time
 *                  updatedAt:
 *                      type: string
 *                      format: date-time
 *                  question:
 *                      $ref: '#/components/schemas/EducationalContentRequest'
 */

/**
* @swagger
* tags:
*   - name: Contenido Educativo
*   description: Endpoints para gestionar el contenido educativo
 **/

/**
 * @swagger
 * /api/educational-content:
 * post:
 *  summary: Crear nuevo contenido educativo
 *  tags: [Contenido Educativo]
 *  requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EducationalContentRequest'
 *      responses:
 *          201:
 *              description: Contenido educativo creado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                      $ref: '#/components/schemas/EducationalContentResponse'
 *          401:
 *              description: No autorizado
 *          403:
 *              description: Prohibido
 *
 *  get:
 *      summary: Obtener todos los contenidos educativos
 *      tags: [Contenido Educativo]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de contenidos educativos obtenida exitosamente
 *              content:
 *                  application/json:
 *              schema:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/EducationalContentResponse'
 *          401:
 *              description: No autorizado
 *
 * /api/educational-content/{id}:
 *  put:
 *      summary: Actualizar contenido educativo
 *      tags: [Contenido Educativo]
 *      security:
 *          - bearerAuth: []
 *          parameters:
 *          - in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: integer
 *              description: ID del contenido educativo a actualizar
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          content:
 *                              type: string
 *                          category:
 *                              type: string
 *          responses:
 *              200:
 *              description: Contenido educativo actualizado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EducationalContentResponse'
 *              401:
 *                  description: No autorizado
 *              403:
 *                  description: Prohibido
 *              404:
 *                  description: Contenido educativo no encontrado
 *      delete:
 *      summary: Eliminar contenido educativo
 *      tags: [Contenido Educativo]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *              name: id
 *              required: true
 *              schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Contenido educativo eliminado exitosamente
 *          401:
 *              description: No autorizado
 *          403:
 *              description: Prohibido
 *          404:
 *              description: Contenido educativo no encontrado
 *
 *      get:
 *      summary: Obtener contenido educativo por ID
 *      tags: [Contenido Educativo]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *      - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Contenido educativo obtenido exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EducationalContentResponse'
 *          401:
 *              description: No autorizado
 *          404:
 *              description: Contenido educativo no encontrado
 */