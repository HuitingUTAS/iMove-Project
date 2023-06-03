import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Modal,
} from "react-bootstrap";

const sampleItems = [
  {
    id: 1,
    name: "Item 1",
    weight: "5 kg",
  },
  {
    id: 2,
    name: "Item 2",
    weight: "1 kg",
  },
  {
    id: 3,
    name: "Item 3",
    weight: "2 kg",
  },
  {
    id: 4,
    name: "Item 4",
    weight: "3 kg",
  },
  {
    id: 5,
    name: "Item 5",
    weight: "4 kg",
  },
];
function ItemManage() {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [items, setItems] = useState(sampleItems);
  const [showModal, setShowModal] = useState(false);
  const [originalItem, setOriginalItem] = useState(null);
  const [newItem, setNewItem] = useState({ id: "", name: "", weight: "" });
  const handleSearchChange = (e) => {
    if (e.target.value) {
      setSearch(e.target.value.toLowerCase());
    } else {
      setSearch("");
    }
  };
  const filteredItems = items.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.id.toString().toLowerCase().includes(keyword)
    );
  });
  const handleAdd = () => {
    if (newItem.name && parseFloat(newItem.weight) > 0) {
      setItems([...items, newItem]);
      setNewItem({ id: "", name: "", weight: "" });
      setShowModal(false);
    } else {
      alert("Please enter a name and a weight greater than 0.");
    }
  };
  const handleEdit = (index) => {
    setOriginalItem(JSON.parse(JSON.stringify(items[index])));
    setEditIndex(index);
  };
  const handleNameChange = (e, index) => {
    const newItems = [...items];
    newItems[index].name = e.target.value;
    setItems(newItems);
  };
  const handleShowModal = () => {
    const nextId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    setNewItem({ ...newItem, id: nextId });
    setShowModal(true);
  };
  const handleWeightChange = (e, index) => {
    let newWeight = parseFloat(e.target.value);
    if (newWeight <= 0) {
      alert("Weight must be greater than 0.");
      return;
    }
    const newItems = [...items];
    newItems[index].weight = newWeight + " kg";
    setItems(newItems);
  };
  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  const handleConfirm = () => {
    setEditIndex(null);
  };
  const handleCancel = (index) => {
    const newItems = [...items];
    newItems[index] = originalItem;
    setItems(newItems);
    setEditIndex(null);
  };
  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or ID"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="col ml-5">
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add
          </button>
        </div>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered table-hover table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Weight (kg)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => {
              const isEditing = editIndex === index;
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={item.name}
                        onChange={(e) => handleNameChange(e, index)}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          defaultValue={parseFloat(item.weight)}
                          onChange={(e) => handleWeightChange(e, index)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">kg</span>
                        </div>
                      </div>
                    ) : (
                      item.weight
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={handleConfirm}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleCancel(index)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        style={showModal ? { display: "block" } : {}}
        onClick={() => setShowModal(false)}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Item</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Item ID: <strong>{newItem.id}</strong>
              </p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Item Name</span>
                </div>
                <textarea
                  className="form-control"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  rows="1"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Weight</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  value={parseFloat(newItem.weight)}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      weight: parseFloat(e.target.value) + " kg",
                    })
                  }
                />
                <div className="input-group-append">
                  <span className="input-group-text">kg</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAdd}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemManage;
