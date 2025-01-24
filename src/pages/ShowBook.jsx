import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../component/BackButton";
import { SERVER_URL } from "../global";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Initialize as null to handle loading state
  const [imageError, setImageError] = useState(false); 
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(book);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleImageError = () => {
    setImageError(true); // Set error state if image fails to load
  };
  return (
    <div className="p-4">
  <BackButton />
  <h1 className="my-4 text-center">Show Book</h1>
  <div className="border border-1 rounded p-3" style={{ maxWidth: '600px', margin: '0 auto' }}> {/* Adjusted border width and set max width */}
    {book && book.image && (
      <div className="text-center mb-4">
        <img
          src={book.image} // Ensure correct image path
          alt=""
          className="img-fluid rounded" // Responsive image
          style={{ maxWidth: '200px' }} // Control image size
        />
      </div>
    )}
    {book ? (
      <>
        <div className="my-2">
          <span className="border p-1 rounded mx-2">ID:</span>
          <span>{book._id}</span>
        </div>

        <div className="my-2">
          <span className="border p-1 rounded mx-2">Title:</span>
          <span>{book.title}</span>
        </div>

        <div className="my-2">
          <span className="border p-1 rounded mx-2">Author:</span>
          <span>{book.author}</span>
        </div>

        <div className="my-2">
          <span className="border p-1 rounded mx-2">Publish Year:</span>
          <span>{book.publishYear}</span>
        </div>

        <div className="my-2">
          <span className="border p-1 rounded mx-2">Created Time:</span>
          <span>{new Date(book.createdAt).toLocaleString()}</span>
        </div>

        <div className="my-2">
          <span className="border p-1 rounded mx-2">Last Update Time:</span>
          <span>{new Date(book.updatedAt).toLocaleString()}</span>
        </div>
      </>
    ) : (
      <p className="text-center">Loading...</p>
    )}
  </div>
</div>
  );
};

export default ShowBook;
