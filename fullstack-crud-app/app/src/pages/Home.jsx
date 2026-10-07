import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, postBooks } from "../features/books/books.Slice";

export default function Home() {
  const { books, loader, err } = useSelector((state) => state.books);
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
      console.log(formData);
      await dispatch(postBooks(formData)).unwrap();
      alert("books is added successfully✔️");
    } catch (err) {
      alert(err.message);
    }
  };

  //PUT REQUEST
  const handleEditBooks = (id)=>{
    try{
      
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex gap-2 mb-5">
        <h2 className="mb-4">Books</h2>
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
          >
            Add Books
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
                <i onClick={(id)=> handleEditBooks} className="bi bi-calendar2-x"></i>
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
