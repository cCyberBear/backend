/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *              - role
 *              - age
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: integer
 *              role:
 *                  type: string
 *                  enum: [admin,guest]
 *                  defaut: guest
 *              age:
 *                  type: integer
 *          example:
 *              name: Khuong Duy
 *              email: 123@gmail.com
 *              password: 123456
 *              role: admin
 *              age: 21
 *      Book:
 *          type: object
 *          required:
 *              - title
 *              - author
 *          properties:
 *              _id:
 *                  type: string
 *              title:
 *                  type: string
 *                  example: Gio ben doi
 *              description:
 *                   type: string
 *                   example: best book
 *              price:
 *                  type: integer
 *                  example: 20
 *              category:
 *                  type: string
 *                  example: 617cd6b90e407c3cdf9496f5
 *      Category:
 *          type: object
 *          required:
 *              - name
 *              - description
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *                  example: Sach giao khoa
 *              description:
 *                   type: string
 *                   example: sach danh cho hoc sinh
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *              - age
 *              - isActive
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              email:
 *                   type: string
 *              password:
 *                  type: string
 *              age:
 *                  type: integer
 *              isActive:
 *                  type: boolean
 *                  default: true
 *          example:
 *              name: Le Viet Hoang
 *              email: viethoang@gmail.com
 *              password: 1234567
 *              age: 20
 *              isActive: true
 *      Token:
 *          type: object
 *          required:
 *              - userId
 *              - token
 *          properties:
 *              _id:
 *                  type: string
 *              userId:
 *                  type: string
 *              token:
 *                  type: string
 */

//Author:

/**
 * @swagger
 *   /auth-info/register:
 *      post:
 *         summary: Create auth
 *         tags: [Auth]
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: "#/components/schemas/Auth"
 *         responses:
 *             200:
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/components/schemas/Auth"
 *             400:
 *                description: Email duplicated
 */
/**
 * @swagger
 *   /auth-info/login:
 *      post:
 *         summary: Auth login
 *         tags: [Auth]
 *         requestBody:
 *             description: Email and password for login
 *             content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           required:
 *                               - email
 *                               - password
 *                           properties:
 *                             email:
 *                               type: string
 *                             password:
 *                               type: string
 *         responses:
 *             200:
 *                description: Success
 *             400:
 *                description: Email or password incorrect
 */
/**
 * @swagger
 *   /auth-info/updatepassword:
 *      patch:
 *         summary: Update password
 *         tags: [Auth]
 *         requestBody:
 *             description: Old password and new password
 *             content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           required:
 *                               - oldPassword
 *                               - newPassword
 *                           properties:
 *                             oldPassword:
 *                               type: string
 *                             newPassword:
 *                               type: string
 *         responses:
 *             200:
 *                description: Success
 *             404:
 *                description: Your email does not exist anymore
 *             400:
 *                description: Old password does not match
 */
/**
 * @swagger
 *   /auth-info/forgotpassword:
 *      post:
 *         summary: forgot password
 *         tags: [Auth]
 *         requestBody:
 *             description: Enter email of account you forgot
 *             content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           required:
 *                               - email
 *                           properties:
 *                             email:
 *                               type: string
 *         responses:
 *             200:
 *                description: Success
 *             404:
 *                description: Your email does not exist
 */
/**
 * @swagger
 *   /auth-info/deleteAccount:
 *      delete:
 *         summary: Delete this Account
 *         tags: [Auth]
 *         responses:
 *             200:
 *                description: Success
 */
/**
 * @swagger
 *   /auth-info/randompassword:
 *      get:
 *         summary: random password
 *         tags: [Auth]
 *         parameters:
 *            - in: query
 *              name: amount
 *              schema:
 *                  type: integer
 *              description: Enter email of account you forgot
 *            - in: query
 *              name: capital
 *              schema:
 *                  type: integer
 *                  enum: [1, 0]
 *              description: Enter email of account you forgot
 *            - in: query
 *              name: normal
 *              schema:
 *                  type: integer
 *                  enum: [1, 0]
 *              description: Enter email of account you forgot
 *            - in: query
 *              name: number
 *              schema:
 *                  type: integer
 *                  enum: [1, 0]
 *              description: Enter email of account you forgot
 *            - in: query
 *              name: symbol
 *              schema:
 *                  type: integer
 *                  enum: [1, 0]
 *              description: Enter email of account you forgot
 *         responses:
 *             200:
 *                description: return password
 */
/**
 * @swagger
 *  /auth-info/all-users:
 *    get:
 *     summary: Get all user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Find success
 */
/**
 * @swagger
 *  /auth-info/add-users:
 *    post:
 *     summary: Add user by sending  email
 *     tags: [Auth]
 *     requestBody:
 *         description: Enter email of account you forgot
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - age
 *                      properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         age:
 *                           type: integer
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: Wrong input
 */

/**
 * @swagger
 *  /auth-info/delete-user/{id}:
 *    delete:
 *     summary: delete user by id
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of user
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: not be empty
 */
/**
 * @swagger
 *  /auth-info/update-users:
 *    patch:
 *     summary: Update infomation of user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of user
 *     requestBody:
 *         description: Enter email of account you forgot
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - age
 *                      properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         age:
 *                           type: integer
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: Wrong input
 */

//Book
/**
 * @swagger
 *  /book-info:
 *    get:
 *      summary: get all books
 *      tags: [Book]
 *      responses:
 *          200:
 *            description: Success
 *            content:
 *                application/json:
 *                    schema:
 *                        types: array
 *                        items:
 *                            $ref: "#/components/schemas/Book"
 *          401:
 *            description: Unauthorize
 *    post:
 *      summary: create new book
 *      tags: [Book]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Book"
 *      responses:
 *          200:
 *            description: Success
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: "#/components/schemas/Book"
 */

/**
 * @swagger
 *  /book-info/{id}:
 *    get:
 *     summary: Get book by id
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: Find success
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       400:
 *         description: Invalid ID
 *    patch:
 *     summary: Update book by id
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Update success
 *         contens:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       400:
 *         description: Invalid ID
 *    delete:
 *     summary: Delete book by id
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: Delete success
 *         contens:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       400:
 *         description: Invalid ID
 */

//Category
/**
 * @swagger
 *  /category:
 *    post:
 *     summary: Create new category
 *     tags: [Category]
 *     requestBody:
 *          description: information about new category
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Category"
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: Wrong input
 *    get:
 *     summary: Get all category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *             application/json:
 *                 schema:
 *                    $ref: "#/components/schemas/Category"
 */

//User
/**
 * @swagger
 *   /user-info/register:
 *      post:
 *         summary: User auth
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                    schema:
 *                        $ref: "#/components/schemas/User"
 *         responses:
 *             200:
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/components/schemas/User"
 *             400:
 *                description: Email duplicated
 */

/**
 * @swagger
 *   /user-info/login:
 *      post:
 *         summary: User login
 *         tags: [User]
 *         requestBody:
 *             description: Email and password for login
 *             content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           required:
 *                               - email
 *                               - password
 *                           properties:
 *                             email:
 *                               type: string
 *                             password:
 *                               type: string
 *         responses:
 *             200:
 *                description: Success
 *             400:
 *                description: Email or password incorrect
 */
/**
 * @swagger
 *   /user-info/updatepassword:
 *      patch:
 *         summary: Update password
 *         tags: [User]
 *         requestBody:
 *             description: Old password and new password
 *             content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           required:
 *                               - oldPassword
 *                               - newPassword
 *                           properties:
 *                             oldPassword:
 *                               type: string
 *                             newPassword:
 *                               type: string
 *         responses:
 *             200:
 *                description: Success
 *             404:
 *                description: Your email does not exist anymore
 *             400:
 *                description: Old password does not match
 */
/**
 * @swagger
 *   /user-info/forgotpassword:
 *      post:
 *         summary: forgot password
 *         tags: [User]
 *         requestBody:
 *             description: Enter email of account you forgot
 *             content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           required:
 *                               - email
 *                           properties:
 *                             email:
 *                               type: string
 *         responses:
 *             200:
 *                description: Success, please check your mail
 *             404:
 *                description: Your email does not exist
 */
/**
 * @swagger
 *  /user-info/detail:
 *    get:
 *      summary: get user detail
 *      tags: [User]
 *      responses:
 *          200:
 *            description: Success
 *            content:
 *                application/json:
 *                    schema:
 *                        items:
 *                            $ref: "#/components/schemas/User"
 *          401:
 *            description: Unauthorize
 */
