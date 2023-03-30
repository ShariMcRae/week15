import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import RoomList from "./RoomList";
import NewRoomForm from "./NewRoomForm";
import UpdateHouseForm from "./UpdateHouseForm";
import "./House.css";

export default function House(props) {
  const { house, updateHouse, deleteHouse } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const addRoom = (room) => {
    updateHouse({ ...house, rooms: [...house.rooms, room] });
  };

  const changeHouseName = (newName) => {
    const newHouse = { ...house, name: newName };
    updateHouse(newHouse);
    setShowEditForm(false);
  };

  return (
    <CardGroup>
      <Card bg="light" text="dark" className="mt-3">
        <Card.Header className="pt-3">
          <h5>
            {!showEditForm && (
              <div>
                <Button
                  className="btn-sm me-1 pt-0 pb-0"
                  title="Delete House"
                  onClick={(e) => deleteHouse(house._id)}
                >
                  𐌢
                </Button>
                <Button
                  className="btn-sm me-3 px-1 py-0"
                  title="Edit House"
                  onClick={(e) => setShowEditForm(true)}
                >
                  ✎
                </Button>
                {house.name}
              </div>
            )}
            {showEditForm && (
              <UpdateHouseForm
                oldName={house.name}
                changeHouseName={changeHouseName}
              />
            )}
          </h5>
        </Card.Header>
        <RoomList house={house} updateHouse={updateHouse}/>  
        <Card.Footer className="d-flex flex-row-reverse">
          <NewRoomForm addRoom={addRoom} />
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}
