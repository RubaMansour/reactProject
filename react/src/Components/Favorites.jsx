import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../redux/future/booksSlice";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import Navbar from "./Navbar";

const Favorites = () => {
    const { favorites } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (book) => {
        dispatch(removeFavorite(book));
    };

    return (
        <div>
            <Navbar />
            <h2 className="info">Books in Your Wishlist</h2>
            {favorites.length === 0 ? (
                <p className="info">No books in your wishlist yet.</p>
            ) : (
                <div className="favorites-list favorites-container">
                    {favorites.map((book) => {
                        const buyLink = book.volumeInfo.infoLink; 

                        return (
                            <div key={book.id} className="favorite-book">
                                <div className="book-details">
                                    <div className="book-image">
                                        <img
                                            src={book.volumeInfo.imageLinks?.thumbnail}
                                            alt={book.volumeInfo.title}
                                        />
                                    </div>
                                    <div className="book-info">
                                        <h3>{book.volumeInfo.title}</h3>
                                        <div className="book-actions">
                                            {buyLink && (
                                                <a href={buyLink} target="_blank" rel="noopener noreferrer">
                                                    <button className="buy-btn">
                                                        <FaShoppingCart />
                                                        Buy
                                                    </button>
                                                </a>
                                            )}
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleRemoveFavorite(book)}
                                            >
                                                <FaTrashAlt />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorites;
