import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function NewRoomForm(props) {
  
  const [name, setName] = useState("");
  const [area, setArea] = useState("");

  const handleAreaInput = (e) => {
    const int = parseInt(e.target.value, 10);
    setArea(int >= 0 ? int : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && area) {
      props.addNewRoom({ name, area });
      setName("");
      setArea("");
    } else {
      console.log("invalid input");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <div className="container">
          <div className="row">
            <div className="col-sm  text-end mt-2">
              <h6>New Room:</h6>
            </div>
            <div className="col-sm-2">
              <Form.Control
                type="text"
                placeholder="Room Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="col-sm-1">
              <Form.Control
                type="text"
                placeholder="Sq. Ft."
                onChange={handleAreaInput}
                value={area}
              />
            </div>
            <div className="col-sm-1 my-1">
              <Button type="submit" className="btn-sm">
                Add
              </Button>
            </div>
          </div>
        </div>
      </Form.Group>
    </Form>
  );
}
