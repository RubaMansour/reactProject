import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBackspace ,FaSpinner} from "react-icons/fa";
import Navbar from "./Navbar";

const BookDetails = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null); 
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.books);

  useEffect(() => {
    const book = data.items.find((item) => item.id === id);
    setBook(book); 
  }, [id, data.items]);

  const navigate = useNavigate(); 

  
  if (!book) return<p className="loading"><FaSpinner /></p>;
  const buyLink = book.saleInfo?.buyLink;

  return (
    <>

    <div className="book-details">
      <div className="back-button" onClick={() => navigate("/shop")}><FaBackspace /></div>
      
      <div className="book-info">
        <div className="book-image-container">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
            alt={book.volumeInfo.title}
            className="book-image"
          />
        </div>

        <div className="book-text-info">
          <h2 className="book-title">{book.volumeInfo.title}</h2>
          <p><strong>Authors:</strong> {book.volumeInfo.authors?.join(", ")}</p>
          <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
          <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
          <p><strong>Page Count:</strong> {book.volumeInfo.pageCount}</p>
          <p><strong>Category:</strong> {book.volumeInfo.categories?.join(", ")}</p>

          <div className="book-description">
            <h3>Description:</h3>
            <p>{book.volumeInfo.description || "No description available."}</p>
          </div>

         
          {buyLink ? (
            <a href={buyLink} target="_blank" rel="noopener noreferrer">
              <button className="add-to-wishlist">Buy Now</button>
            </a>
          ) : (
            <button className="add-to-wishlist" disabled>Not Available for Purchase</button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default BookDetails;
