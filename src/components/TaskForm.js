import React, { useState } from 'react';

const TaskForm = ({ task, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    category: task?.category || 'Outros',
    completed: task?.completed || false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.title.trim()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (task) {
        await onSubmit(task.id, formData);
      } else {
        await onSubmit(formData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="input-field"
          placeholder="Título da tarefa"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          className="input-field"
          placeholder="Descrição da tarefa"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          className="input-field"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          id="completed"
          name="completed"
          type="checkbox"
          className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded"
          checked={formData.completed}
          onChange={handleChange}
          disabled={loading}
        />
        <label htmlFor="completed" className="ml-2 block text-sm text-gray-300">
          Tarefa concluída
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Salvando...
            </>
          ) : (
            task ? 'Atualizar' : 'Criar'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
