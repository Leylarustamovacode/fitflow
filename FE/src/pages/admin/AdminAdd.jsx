import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./adminadd.scss";

function AdminAdd() {
  const [data, setData] = useState([]);

  function getData() {
    fetch("http://localhost:3000/teacher")
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    getData();
  }, []);

  function post(body) {
    fetch("http://localhost:3000/teacher", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container admin-add mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center fw-bold text-gradient">Add New Teacher</h3>
        <Formik
          initialValues={{ image: "", name: "", sport: "", text: "" }}
          validationSchema={Yup.object({
            image: Yup.string().required("Required"),
            name: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            sport: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            text: Yup.string()
              .max(200, "Must be 200 characters or less")
              .required("Required"),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            post(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label htmlFor="image" className="form-label fw-semibold">Image URL</label>
                <input id="image" type="text" className="form-control" {...formik.getFieldProps("image")} />
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-danger small">{formik.errors.image}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                <input id="name" type="text" className="form-control" {...formik.getFieldProps("name")} />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger small">{formik.errors.name}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="sport" className="form-label fw-semibold">Sport</label>
                <input id="sport" type="text" className="form-control" {...formik.getFieldProps("sport")} />
                {formik.touched.sport && formik.errors.sport ? (
                  <div className="text-danger small">{formik.errors.sport}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="text" className="form-label fw-semibold">Information</label>
                <input id="text" type="text" className="form-control" {...formik.getFieldProps("text")} />
                {formik.touched.text && formik.errors.text ? (
                  <div className="text-danger small">{formik.errors.text}</div>
                ) : null}
              </div>

              <button type="submit" className="btn btn-gradient w-100">
                Add Teacher
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminAdd;

