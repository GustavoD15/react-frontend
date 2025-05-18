import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Componentes
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Header from '../components/Header';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(['Trabalho', 'Pessoal', 'Estudos', 'Outros']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // Buscar tarefas ao carregar a página
  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          toast.error('Sessão expirada. Por favor, faça login novamente.');
          return;
        }
        throw new Error('Erro ao buscar tarefas');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error(error.message || 'Ocorreu um erro ao buscar as tarefas');
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova tarefa
  const createTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setShowForm(false);
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      toast.error(error.message || 'Ocorreu um erro ao criar a tarefa');
    }
  };

  // Função para atualizar uma tarefa
  const updateTask = async (id, taskData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null);
      setShowForm(false);
      toast.success('Tarefa atualizada com sucesso!');
    } catch (error) {
      toast.error(error.message || 'Ocorreu um erro ao atualizar a tarefa');
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar tarefa');
      }

      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Tarefa removida com sucesso!');
    } catch (error) {
      toast.error(error.message || 'Ocorreu um erro ao deletar a tarefa');
    }
  };

  // Função para filtrar tarefas por categoria
  const filteredTasks = selectedCategory 
    ? tasks.filter(task => task.category === selectedCategory)
    : tasks;

  // Função para editar uma tarefa
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Função para cancelar edição/criação
  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toast.info('Logout realizado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} />
      
      <main className="container-custom py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">Minhas Tarefas</h1>
            <p className="text-gray-400">Gerencie suas tarefas de forma eficiente</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <select 
              className="input-field bg-background-light text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button 
              className="btn btn-primary"
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
            >
              Nova Tarefa
            </button>
          </div>
        </div>
        
        {showForm && (
          <div className="mb-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-primary mb-4">
                {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
              </h2>
              <TaskForm 
                task={editingTask}
                categories={categories}
                onSubmit={editingTask ? updateTask : createTask}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onEdit={handleEdit} 
            onDelete={deleteTask} 
          />
        )}
      </main>
    </div>
  );
};

export default Tasks;
