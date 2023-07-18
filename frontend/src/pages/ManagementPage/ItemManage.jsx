import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../../config";
function ItemManage() {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [originalItem, setOriginalItem] = useState(null);
  const [newItem, setNewItem] = useState({ uom: "", itemName: "", qty: "" });
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const fetchItemData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/ItemManagementPage/GetAllItems`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        console.log(data);
      } else {
        console.log("Error response:", response.status);
      }
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  const filteredItems = items.filter((item) => {
    const keyword = search.trim();
    const itemName = item.name || "";
    const itemUom = item.uom || "";

    const nameMatch = itemName.toLocaleLowerCase().includes(keyword);
    const codeMatch = new RegExp(keyword, "i").test(itemUom);

    return nameMatch || codeMatch;
  });
  const handleAdd = async () => {
    if (newItem.itemName && newItem.qty && newItem.uom) {
      try {
        const response = await fetch(`${BASE_URL}/DispatchPage/InsertingItem`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uom: newItem.uom,
            itemName: newItem.itemName,
            qty: newItem.qty,
          }),
        });

        if (response.ok) {
          const addedItem = await response.json();
          setItems([...items, addedItem]);
          setNewItem({ uom: "", itemName: "", qty: "" });
          setShowModal(false);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error adding item:", error);
      }
    } else {
      alert("Please enter a name and a weight.");
    }
  };
  const handleEdit = (_id) => {
    setOriginalItem(
      JSON.parse(JSON.stringify(items.find((item) => item._id === _id)))
    );
    setEditIndex(_id);
  };
  const handleNameChange = (e, _id) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item._id === _id);
    newItems[itemIndex].name = e.target.value;
    setItems(newItems);
  };
  const handleShowModal = () => {
    setNewItem({ ...newItem, uom: "", name: "", qty: "" });
    setShowModal(true);
  };
  const handleQtyChange = (e, _id) => {
    let newQty = parseFloat(e.target.value);
    if (newQty <= 0) {
      alert("Weight must be greater than 0.");
      return;
    }
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item._id === _id);
    newItems[itemIndex].qty = newQty + " kg";
    setItems(newItems);
  };
  const handleDelete = (_id) => {
    const selectedItem = items.find((item) => item._id === _id);
    console.log(selectedItem._id);
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(
          `${BASE_URL}/ItemManagementPage/DeleteItem/${selectedItem._id}`,
          {}
        )
        .then((response) => {
          // 处理成功响应
          console.log(response.data);
          // 更新 customers 列表，从中删除已删除的 customer
          const updatedItems = items.filter(
            (item) => item._id !== selectedItem._id
          );
          setItems(updatedItems);
        })
        .catch((error) => {
          // 处理错误
          console.error(error);
        });
    }
  };
  const handleConfirm = (_id) => {
    const selectedItem = items.find((item) => item._id === _id);
    console.log(selectedItem._id);
    axios
      .put(`${BASE_URL}/ItemManagementPage/EditItem`, {
        _id: selectedItem._id,
        ItemName: selectedItem.ItemName,
        qty: selectedItem.qty,
      })
      .then((response) => {
        // 处理成功响应
        console.log(response.data);
        setEditIndex(null);
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      });
  };
  const handleCancel = (index) => {
    const newItems = [...items];
    newItems[index] = originalItem;
    setItems(newItems);
    setEditItemId(null);
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
              <th>UOM</th>
              <th>Item Name</th>
              <th>Weight (kg)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const isEditing = editIndex === item._id;
              return (
                <tr key={item._id}>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={item.uom}
                        onChange={(e) => handleNameChange(e, item._id)}
                      />
                    ) : (
                      item.uom
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={item.itemName}
                        onChange={(e) => handleNameChange(e, item._id)}
                      />
                    ) : (
                      item.itemName
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          defaultValue={parseFloat(item.qty)}
                          onChange={(e) => handleQtyChange(e, item._id)}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">kg</span>
                        </div>
                      </div>
                    ) : (
                      item.qty
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleConfirm(item._id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleCancel(item._id)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item._id)}
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

            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Item UOM</span>
                </div>
                <textarea
                  className="form-control"
                  value={newItem.uom}
                  onChange={(e) =>
                    setNewItem({ ...newItem, uom: e.target.value })
                  }
                  rows="1"
                  style={{ resize: "none" }}
                />
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Item Name</span>
                  </div>
                  <textarea
                    className="form-control"
                    value={newItem.itemName}
                    onChange={(e) =>
                      setNewItem({ ...newItem, itemName: e.target.value })
                    }
                    rows="1"
                    style={{ resize: "none" }}
                  />
                </div>
                <div
                  className="input-group mb-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="input-group-prepend">
                    <span className="input-group-text">Weight</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={parseFloat(newItem.qty)}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        qty: parseFloat(e.target.value) + " kg",
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
    </div>
  );
}

export default ItemManage;
