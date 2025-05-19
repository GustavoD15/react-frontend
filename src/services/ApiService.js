const ApiService = {
  // URL base da API (usando variável de ambiente se disponível)
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',

  // Headers padrão com token (se existir)
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  },

  // Lida com a resposta de forma segura e redireciona se necessário
  async handleResponse(response) {
    if (response.ok) {
      // Retorna JSON válido
      try {
        return await response.json();
      } catch {
        return {};
      }
    }

    // Redireciona se não autorizado
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }

    try {
      const error = await response.json();
      throw new Error(error.message || `Erro ${response.status}`);
    } catch {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
  },

  // Autenticação
  async register(userData) {
    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  },

  async login(credentials) {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials)
    });
    return this.handleResponse(response);
  },

  // Tarefas
  async getTasks() {
    const response = await fetch(`${this.baseUrl}/api/tasks`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  },

  async getTaskById(id) {
    const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  },

  async createTask(taskData) {
    const response = await fetch(`${this.baseUrl}/api/tasks`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    return this.handleResponse(response);
  },

  async updateTask(id, taskData) {
    const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    return this.handleResponse(response);
  },

  async deleteTask(id) {
    const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }
};

export default ApiService;
