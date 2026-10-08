import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooks,
  getBooks,
  postBooks,
  updateBooks,
} from "../features/books/books.Slice";

export default function Home() {
  const { books, loader, err } = useSelector((state) => state.books);
  const [editBook, setEditBooks] = useState(null);
  const [formData, setFormdata] = useState({
    bookName: "",
    bookAuthor: "",
    bookCategory: "",
    bookPublishYear: "",
    bookMessage: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loader) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading books...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{err}</div>
      </div>
    );
  }

  //POST DATA
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostBooks = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (editBook) {
        //abb editbook naam ke vairable me boh book ka data h jo hme update krna h
        await dispatch(
          updateBooks({
            id: editBook._id, // yeh hum object me pass krna hoga qki asyncThunk ek se jyda data hoo toh usse object me bejna pdta h
            book: formData, // aur me id ,book ese q bej rha huu qki hmre frontend ke slice mene usse book aur id se naam diya h isliye
          }),
        ).unwrap();
        alert("book is updated successfully");
        setEditBooks(null);
      } else {
        console.log(formData);
        await dispatch(postBooks(formData)).unwrap();
        alert("books is added successfully✔️");
      }
      setFormdata({
        bookName: "",
        bookAuthor: "",
        bookCategory: "",
        bookPublishYear: "",
        bookMessage: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  //PUT REQUEST
  const handleEditBooks = (book) => {
    // console.log(book)
    setEditBooks(book); //abb jab edit icon pe click ho then hum uss null se book ayegaa oth yeh formdata boh value dedega jo hme update krna hoga
    setFormdata({
      bookName: book.bookName,
      bookAuthor: book.bookAuthor,
      bookCategory: book.bookCategory,
      bookMessage: book.bookMessage,
      bookPublishYear: book.bookPublishYear,
    });
  };

  //DELETE - REQUEST
  const handleDeleteBook = async (id) => {
    try {
      await dispatch(deleteBooks(id))
      alert("this book is deleted successfully!");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex gap-2 mb-5">
        <h2 className="mb-4">Books</h2>
        <>
          <button
            type="button"
            className={editBook ? "btn btn-warning" : "btn btn-primary"}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
          >
            {editBook ? "Update Book" : "Add Book"}
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Publish Your Books
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handlePostBooks}>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Book Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="bookName"
                        value={formData.bookName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Book Author
                      </label>
                      <input
                        type="text"
                        name="bookAuthor"
                        className="form-control"
                        id="recipient-name"
                        value={formData.bookAuthor}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Book Category
                      </label>
                      <input
                        type="text"
                        name="bookCategory"
                        className="form-control"
                        id="recipient-name"
                        value={formData.bookCategory}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Book PublishYear
                      </label>
                      <input
                        type="numeric"
                        name="bookPublishYear"
                        className="form-control"
                        id="recipient-name"
                        value={formData.bookPublishYear}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Message:
                      </label>
                      <textarea
                        className="form-control"
                        name="bookMessage"
                        id="message-text"
                        value={formData.bookMessage}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Add Books
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info">Books are empty!</div>
      ) : (
        <div className="row g-4">
          {books.map((book) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book._id}>
              <div className="card h-100 shadow-sm">
                {/* Book Image */}
                {book.image && (
                  <img
                    src={book.image}
                    className="card-img-top"
                    alt={book.bookName}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <i
                  onClick={() => handleEditBooks(book)}
                  className="bi bi-pencil-square"
                ></i>
                <i
                  onClick={() => handleDeleteBook(book._id)}
                  className="bi bi-trash3"
                ></i>
                <div className="card-body d-flex flex-column">
                  {/* Book Name */}
                  <h5 className="card-title">{book.bookName}</h5>

                  {/* Author */}
                  <p className="card-text mb-2">
                    <strong>Author:</strong> {book.bookAuthor}
                  </p>
                  <p>{book.bookPublishYear}</p>
                  <p>BookCategory: {book.bookCategory}</p>
                  <p>Created At:{book.createdAt}</p>

                  {/* Price */}
                  <p className="card-text mb-2">
                    <strong>Price: 100</strong> ₹{book.price}
                  </p>

                  {/* Description */}
                  <p className="card-text text-muted">{book.description}</p>

                  <button className="btn btn-primary mt-auto">View Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
