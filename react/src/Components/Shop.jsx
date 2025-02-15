import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch, FaBookmark } from "react-icons/fa";
import { getBooks, addFavorite } from "../redux/future/booksSlice";
import Category from "./Category";

const MAX_BOOKS_COUNT = 12;

const Shop = () => {
    const searchTerm = useRef("");
    const dispatch = useDispatch();
    const { isLoading, errorMsg, data } = useSelector((state) => state.books);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(""); // تمت إضافته هنا
    const totalBooks = data.totalItems || 0;
    const totalPages = Math.ceil(totalBooks / MAX_BOOKS_COUNT);
    const books = data.items || [];

    // جلب الكتب عند البحث أو تغيير التصنيف
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

    // البحث عند الضغط على زر البحث
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

    // التنقل بين الصفحات
    const handlePreviousClick = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    // إضافة إلى المفضلة
    const addToWishlist = (book) => {
        dispatch(addFavorite(book));
    };

    return (
        <>
         <div className="header_two">
         <div className="header_on">
            <form className="search-form" onSubmit={handleSearch}>
                <input type="search" id="search-box" placeholder="Search here..." ref={searchTerm} />
                <label htmlFor="search-box">
                    <FaSearch />
                </label>
            </form>
            </div>
                 </div>
            

            {/* تصنيف الكتب */}
            <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {isLoading && <p>Loading...</p>}
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

            {/* التصفح حسب الصفحات */}
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
