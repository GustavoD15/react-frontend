import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  // Se não houver tarefas, mostrar mensagem
  if (tasks.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-400">Nenhuma tarefa encontrada</p>
        <p className="text-sm text-gray-500 mt-2">Crie uma nova tarefa para começar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className={`card border-l-4 ${
            task.completed 
              ? 'border-l-green-600' 
              : 'border-l-yellow-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-medium ${
                task.completed ? 'text-gray-400 line-through' : 'text-white'
              }`}>
                {task.title}
              </h3>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-background-lighter text-primary mt-2">
                {task.category}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-full hover:bg-background-lighter text-gray-400 hover:text-primary transition-colors"
                aria-label="Editar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-full hover:bg-background-lighter text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Excluir"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={`mt-2 text-sm ${
              task.completed ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {task.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
