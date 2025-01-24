
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaInfo } from "react-icons/fa6";

const BooksTable = ({ books }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped text-center w-100">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Title</th>
            <th className="border">Author</th>
            <th className="border">Publish Year</th>
            <th className="border">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border">{index + 1}</td>
              <td className="border">{book.title}</td>
              <td className="border">{book.author}</td>
              <td className="border">{book.publishYear}</td>
              <td className="border">
                <div className="d-flex justify-content-center gap-2">
                  <Link to={`/book/details/${book._id}`}>
                    <FaInfo className="mx-2" />
                  </Link>
                  <Link to={`/book/edit/${book._id}`}>
                    <FaRegEdit className="mx-2" />
                  </Link>
                  <Link to={`/book/delete/${book._id}`}>
                    < RiDeleteBin6Line className="mx-2" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
