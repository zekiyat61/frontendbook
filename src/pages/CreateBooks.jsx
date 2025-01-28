import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";
const CreateBooks = () => {
  const [base64Image, setBase64Image] = useState("");
  const [title, settitle] = useState("");
  const [publishYear, setpublishYear] = useState("");
  const [author, setauthor] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    const data = {
      title,
      author,
      publishYear,
      image: base64Image,
    };
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/book`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("book created successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
    }
  };

  return (
    <div className="container py-4">
      <BackButton />
      <h1 className="my-4">Create Book</h1>
      <form>
        {/* Title */}
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Author */}
        <div className="mb-3 row">
          <label htmlFor="author" className="col-sm-2 col-form-label">
            Author
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setauthor(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Publish Year */}
        <div className="mb-3 row">
          <label htmlFor="publishYear" className="col-sm-2 col-form-label">
            Publish Year
          </label>
          <div className="col-sm-6">
            <input
              type="number"
              id="publishYear"
              value={publishYear}
              onChange={(e) => setpublishYear(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-3 row">
          <label htmlFor="image" className="col-sm-2 col-form-label">
            Image
          </label>
          <div className="col-sm-6">
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={handleFileUpload}
            /> 
             {/* Save Button */}
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-lg mt-3"
            onClick={handleSubmit}
          >
            Save
          </button>
          </div>
         
        </div>

       
        </div>
      </form>
    </div>
  );
};

export default CreateBooks;