import { useState, useEffect } from "react";
import House from "./House";
import NewHouseForm from "./NewHouseForm";
import { housesApi } from "../rest/HousesApi.js";

export default function HousesList() {

  const [houses, setHouses] = useState([]);

  // When page first loads, load the data
  // into our state object and render the page.
  useEffect(() => {
    fetchHouses();
  }, []);

  // READ all houses, sort them in reverse order by id
  // so we see our newly created houses at the top of the 
  // page, and set the state, triggering React to render the page.
  const fetchHouses = async () => {
   
    const newHouses = await housesApi.get();
    function compareFn(a, b) {
      if (a._id > b._id) {
        return -1;
      }
      if (a._id < b._id) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    newHouses.sort(compareFn);
    setHouses(newHouses);
  };

  // UPDATE an individual house in the database
  // and refresh the page.
  const updateHouse = async (updatedHouse) => {
    await housesApi.put(updatedHouse); 
    fetchHouses();
  };

  // CREATE an individual house in the database
  // and refresh the page.
  const addHouse = async (house) => {
    await housesApi.post(house);
    fetchHouses();
  };

  // DELETE an individual house in the database
  // and refresh the page.
  const deleteHouse = async (id) => {
    await housesApi.delete(id);
    fetchHouses();
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm">
          <h1>House List</h1>
        </div>
        <div className="col-sm-8 d-flex flex-row-reverse">
          <NewHouseForm
            addHouse={addHouse}
          />
        </div>
      </div>
      <div className="row">
        {houses.map((house, index) => (
          <House
            key={index}
            house={house}
            updateHouse={updateHouse}
            deleteHouse={deleteHouse}
          />
        ))}
      </div>
    </div>
  );
}
