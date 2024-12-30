import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SingleTaskCard from './Components/SingleTaskCard';
import NewTaskCard from './Components/NewTaskCard';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [refresh, setRefresh] = useState(false);


  function refreshData(){
    if(refresh) setRefresh(false)
      else setRefresh(true);
  }

  function showAddTask(){
    if(addTask) setAddTask(false)
      else setAddTask(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(
          `https://localhost:7043/api/ToDoTasks`,{
            method: "GET",
            mode: 'cors',
          }
        );
        if(!response.ok){
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let taskData = await response.json()
        setData(taskData);
        setError(null);
      }catch (err){
        setError(err.message);
        setData(null);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
    
  }, [refresh]);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Tasks To Do</h1>
          </Col>
          <Col>
            <Button variant='primary' onClick={showAddTask}>Add Task</Button>
          </Col>
        </Row>
        <Row>
          { addTask && <NewTaskCard refresh={refreshData} error={setError} loading={setLoading}/> }
        </Row>
        <Row>
          {loading && (<h2>Loading...</h2> )}
          {error && <h2>{error}</h2>}
          {data && 
            data.map(({id, planedDate, title, description}) => (
              <SingleTaskCard key={id} id={id} planedDate={planedDate} title={title} description={description} refresh={refreshData} error={setError} loading={setLoading}/>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
