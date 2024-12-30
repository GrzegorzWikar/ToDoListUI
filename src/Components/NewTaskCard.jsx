import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

function NewTaskCard( {error, loading, refresh}) {
    const [planedDate, setPlandeDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDesription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const task = {planedDate, title, description}
        const response = await fetch(`https://localhost:7043/api/ToDoTasks`, {
                method:'POST',
                headers:{ "Content-Type": "application/json"},
                body: JSON.stringify(task)
            });
        if(!response.ok){
            throw new Error(`HTTP error: Status ${response.status}`);
            }
            error= null;   
        }catch (err){
            error = err.message;
        }finally{
            loading = false;
        }
        refresh();
    };

  return (
    <Form onSubmit={handleSubmit}>
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label >Title</Form.Label>
                    <Form.Control type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='textarea'  onChange={(e) => setDesription(e.target.value)} value={description}/>
                </Form.Group>
            </Col>
            <Col>
                <Row>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' onChange={(e) => setPlandeDate(e.target.value)} value={planedDate}/>
                    </Form.Group>
                </Row>
                <Button variant='primary' type='submit' >
                    Add New Task
                </Button>
            </Col>
        </Row>
    </Form>
  );
}

export default NewTaskCard;