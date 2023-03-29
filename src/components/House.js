import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import NewRoomForm from "./NewRoomForm";

export default function House(props) {

  const { house, updateHouse, deleteHouse } = props;

  const deleteRoom = (roomId) => {
    const updatedHouse = {
      ...house,
      rooms: house.rooms.filter((x) => x._id !== roomId),
    };
    updateHouse(updatedHouse);
  };

  const addNewRoom = (room) => {
    return updateHouse({ ...house, rooms: [...house.rooms, room] });
  };

  const rooms = () => (
    <>
      {house.rooms.map((room) => (
        <Card.Text>
          <Button className="btn-sm mx-3" onClick={(e) => deleteRoom(room._id)}>
            𐌢
          </Button>
          <b>Room:</b> {`${room.name} (${room.area} Sq Ft.)`}
        </Card.Text>
      ))}
    </>
  );

  return (
    <CardGroup>
      <Card bg="light" key="{house._id}" text="dark" className="mt-3">
        <Card.Header className="pt-3">
          <h4>
            <Button
              className="btn-sm me-3 "
              onClick={(e) => deleteHouse(house._id)}>
              𐌢
            </Button>
            <b>House:</b> {house.name}
          </h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {rooms()}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <NewRoomForm addNewRoom={addNewRoom} />
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}
