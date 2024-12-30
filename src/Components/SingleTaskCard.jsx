import { Card, Button, Col, Row } from 'react-bootstrap';

function SingleTaskCard({id, planedDate, title, description, loading, error, refresh}) {
  
   const handleDelete = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`https://localhost:7043/api/ToDoTasks/${id}`, {
        method:'DELETE',
        headers:{ "Content-Type": "application/json"},
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
    <Card border="info">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Col>
          <Col md={{ span: 2 }}> 
            <Row>
              {planedDate}
            </Row>
            <Row>
              <Col>
                <Button variant="success">V</Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={handleDelete}>X</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default SingleTaskCard;