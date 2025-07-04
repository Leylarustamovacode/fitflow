import React, { useEffect, useState } from "react";
import "./admin.scss";

function Admin() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ name: "name", order: true });

  function getData() {
    fetch("http://localhost:3000/teacher")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debug üçün
        setData(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }

  useEffect(() => {
    getData();
  }, []);

  function Delete(id) {
    fetch("http://localhost:3000/teacher/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then(() => getData());
  }

  return (
    <div className="admin-container">
      <div className="admin-controls container py-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button
            className="btn btn-gradient"
            onClick={() => setSort({ name: "name", order: true })}
          >
            A-Z
          </button>
          <button
            className="btn btn-gradient"
            onClick={() => setSort({ name: "name", order: false })}
          >
            Z-A
          </button>
        </div>
      </div>

      <div className="table-responsive container mb-5">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-gradient text-white">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Sport</th>
              <th>Information</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data
                .slice()
                .sort((a, b) =>
                  sort.order
                    ? a[sort.name] > b[sort.name]
                      ? 1
                      : -1
                    : a[sort.name] < b[sort.name]
                    ? 1
                    : -1
                )
                .filter((teacher) =>
                  teacher.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((teacher) => (
                  <tr key={teacher._id}>
                    <td>
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="img-thumbnail"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{teacher.name}</td>
                    <td>{teacher.sport}</td>
                    <td>{teacher.text}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => Delete(teacher._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5">Loading data or no data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
