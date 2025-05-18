import React from 'react';

const ApiService = {
  // URL base da API
  baseUrl: 'http://localhost:3000',
  
  // Headers padrão para requisições autenticadas
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  },
  
  // Método para lidar com erros de resposta
  handleResponse(response) {
    return new Promise(async (resolve, reject) => {
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        // Se for erro de autenticação, redirecionar para login
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        
        try {
          const error = await response.json();
          reject(new Error(error.message || 'Ocorreu um erro na requisição'));
        } catch (e) {
          reject(new Error(`Erro ${response.status}: ${response.statusText}`));
        }
      }
    });
  },
  
  // Métodos para autenticação
  async register(userData) {
    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    return this.handleResponse(response);
  },
  
  async login(credentials) {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    return this.handleResponse(response);
  },
  
  // Métodos para tarefas
  async getTasks() {
    const response = await fetch(`${this.baseUrl}/api/tasks`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse(response);
  },
  
  async getTaskById(id) {
    const response = await fetch(`${this.baseUrl}/api/tasks/${id}`, {
      method: 'GET',
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
