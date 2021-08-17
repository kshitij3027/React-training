import React, { useEffect, useState, useCallback } from 'react';
import useHttp from './hooks/use-http'
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {

  const [tasks, setTasks] = useState([]);
  const transformedTasks = useCallback(taskObj => {
          const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
  },[])
  const {isLoading,error,sendRequest: fetchTasks} = useHttp(transformedTasks)
 
  useEffect(() => {
    fetchTasks({url: 'https://react-custom-hooks-3d408-default-rtdb.firebaseio.com/tasks.json'});
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
