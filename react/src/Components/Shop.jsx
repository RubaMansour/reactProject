import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaSearch, FaBookmark,FaSpinner } from "react-icons/fa";
import { getBooks, addFavorite } from "../redux/future/booksSlice";


const MAX_BOOKS_COUNT = 12;

const Shop = () => {
    const searchTerm = useRef("");
    const dispatch = useDispatch();
    const { isLoading, errorMsg, data } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const totalBooks = data.totalItems || 0;
    const totalPages = Math.ceil(totalBooks / MAX_BOOKS_COUNT);
    const books = data.items || [];

    
    useEffect(() => {
        const startIndex = (currentPage - 1) * MAX_BOOKS_COUNT;
        dispatch(
            getBooks({
                searchTerm: searchTerm.current.value || "all",
                maxResults: MAX_BOOKS_COUNT,
                startIndex,
                category: selectedCategory,
            })
        );
    }, [currentPage, selectedCategory, dispatch]);

    
    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        dispatch(
            getBooks({
                searchTerm: searchTerm.current.value,
                maxResults: MAX_BOOKS_COUNT,
                startIndex: 0,
                category: selectedCategory,
            })
        );
    };

   
    const handlePreviousClick = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const addToWishlist = (book) => {
        dispatch(addFavorite(book));
    };

    return (
        <>
          <Navbar /> 
      <header>
    <div className="header-container">
        <form className="search-form" onSubmit={handleSearch}>
            <input type="search" id="search-box" placeholder="Search here..." ref={searchTerm} />
            <label htmlFor="search-box" onClick={handleSearch}>
                <FaSearch />
            </label>
        </form>

        <div className="category-dropdown">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {["All", "Fiction", "History", "Science", "Technology", "Romance", "Mystery"].map((name, index) => (
                    <option key={index} value={name === "All" ? "" : name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    </div>
</header>


            {isLoading && <p className="loading"><FaSpinner /></p>}
            {errorMsg && <p>{errorMsg}</p>}

            <div className="books-grid">
                {books.map((book) => {
                    const imageUrl = book.volumeInfo.imageLinks?.thumbnail;
                    return (
                        <div key={book.id} className="Look-card">
                            {imageUrl ? (
                                <Link to={`/book/${book.id}`}>
                                    <img src={imageUrl} alt={book.volumeInfo.title} className="book-image" />
                                </Link>
                            ) : (
                                <div>No Image Available</div>
                            )}
                            <h2 className="book-title">{book.volumeInfo.title}</h2>
                            <button className="wishlist-button" onClick={() => addToWishlist(book)}>
                                <FaBookmark /> Add To Wishlist
                            </button>
                        </div>
                    );
                })}
            </div>

          
            {books.length > 0 && (
                <div className="pagination-container">
                    <span className="page-number">Page {currentPage}</span>
                    <div className="navigation-button">
                        <button
                            onClick={handlePreviousClick}
                            className={`previous-button ${
                                currentPage === 1 ? "previous-disabled" : "previous-enabled"
                            }`}
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNextClick}
                            className={`next-button ${
                                currentPage === totalPages ? "next-disabled" : "next-enabled"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Shop;
