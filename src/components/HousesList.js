import React from "react";
import House from "./House";
import NewHouseForm from "./NewHouseForm";
import { housesApi } from "../rest/HousesApi.js";

export class HousesList extends React.Component {
  state = {
    houses: [],
  };

  componentDidMount() {
    this.fetchHouses();
  }

  // get (Read)
  fetchHouses = async () => {
    const houses = await housesApi.get();

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
    houses.sort(compareFn);

    this.setState({ houses });
  };

  // put (Update)
  updateHouse = async (updatedHouse) => {
    await housesApi.put(updatedHouse);
    this.fetchHouses();
  };

  // post (Create)
  addHouse = async (house) => {
    await housesApi.post(house);
    this.fetchHouses();
  };

  // delete (Delete)
  deleteHouse = async (id) => {
    await housesApi.delete(id);
    this.fetchHouses();
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-2">
          <div className="col-sm-6  ">
            <h1>House List</h1>
          </div>
          <div className="col-sm-6 d-flex flex-row-reverse">
            <NewHouseForm addHouse={this.addHouse} />
          </div>
        </div>
        <div className="row">
          {this.state.houses.map((house) => (
            <House
              key={house._id}
              house={house}
              updateHouse={this.updateHouse}
              deleteHouse={this.deleteHouse}
            />
          ))}
        </div>
      </div>
    );
  }
}
