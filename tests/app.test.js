const request = require('supertest');
const app = require('../src/app');

describe('TODO API', () => {
  
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /todos', () => {
    it('should get all todos', async () => {
      const res = await request(app).get('/todos');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /todos/:id', () => {
    it('should get a specific todo', async () => {
      const res = await request(app).get('/todos/1');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id', 1);
      expect(res.body.data).toHaveProperty('title');
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app).get('/todos/999');
      
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Tarea no encontrada');
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        title: 'Nueva tarea de prueba'
      };
      
      const res = await request(app)
        .post('/todos')
        .send(newTodo);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.title).toBe(newTodo.title);
      expect(res.body.data.completed).toBe(false);
    });

    it('should return 400 for empty title', async () => {
      const res = await request(app)
        .post('/todos')
        .send({ title: '' });
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('El título es obligatorio');
    });

    it('should return 400 for missing title', async () => {
      const res = await request(app)
        .post('/todos')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todo', async () => {
      const updates = {
        title: 'Tarea actualizada',
        completed: true
      };
      
      const res = await request(app)
        .put('/todos/1')
        .send(updates);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(updates.title);
      expect(res.body.data.completed).toBe(updates.completed);
      expect(res.body.data).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app)
        .put('/todos/999')
        .send({ title: 'No existe' });
      
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', async () => {
      // Primero crear una tarea para eliminar
      const createRes = await request(app)
        .post('/todos')
        .send({ title: 'Tarea para eliminar' });
      
      const todoId = createRes.body.data.id;
      
      const deleteRes = await request(app).delete(`/todos/${todoId}`);
      
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);
      expect(deleteRes.body.message).toBe('Tarea eliminada correctamente');
      
      // Verificar que ya no existe
      const getRes = await request(app).get(`/todos/${todoId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app).delete('/todos/999');
      
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown endpoints', async () => {
      const res = await request(app).get('/unknown-endpoint');
      
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Endpoint no encontrado');
    });
  });
});