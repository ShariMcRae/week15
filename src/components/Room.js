import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import UpdateRoomForm from "./UpdateRoomForm";

export default function Room(props) {
  const { room, updateRoom, deleteRoom } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const changeRoom = (newName, newArea) => {
    const updatedRoom = { ...room, name: newName, area: newArea };
    updateRoom(updatedRoom);
    setShowEditForm(false);
  };

  return (
    <ListGroup.Item className="border rounded">
      {!showEditForm && (
        <div>
          <Button
            className="btn-sm me-1 pt-0 pb-0"
            title="Delete Room"
            onClick={(e) => deleteRoom(room._id)}
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
          {room.name} ({room.area} Sq Ft.)
        </div>
      )}
      {showEditForm && (
        <UpdateRoomForm
          oldName={room.name}
          oldArea={room.area}
          changeRoom={changeRoom}
        />
      )}
    </ListGroup.Item>
  );
}
