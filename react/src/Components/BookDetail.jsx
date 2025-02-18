import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../redux/future/booksSlice";  // تأكد من أنه يوجد لديك أكشن لهذا

const BookDetail = () => {
    const { bookId } = useParams();  // جلب معرف الكتاب من الـ URL
    const dispatch = useDispatch();
    const navigate = useNavigate();  // للحصول على دالة التوجيه
    const { data, isLoading, errorMsg } = useSelector((state) => state.books);

    // جلب تفاصيل الكتاب عند تحميل الصفحة
    useEffect(() => {
        dispatch(getBookDetails(bookId));
    }, [bookId, dispatch]);

    const book = data?.items?.[0]; // نفترض أنه فقط كتاب واحد سيتم جلبه

    if (isLoading) return <div>Loading...</div>;
    if (errorMsg) return <div>{errorMsg}</div>;

    return (
        <div className="book-detail-container">
            {book && (
                <div className="book-detail">
                    <div className="book-image-container">
                        <img
                            src={book.volumeInfo.imageLinks?.thumbnail}
                            alt={book.volumeInfo.title}
                            className="book-image"
                        />
                    </div>
                    <div className="book-info">
                        <h1>{book.volumeInfo.title}</h1>
                        <h3>by {book.volumeInfo.authors?.join(", ")}</h3>
                        <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
                        <p><strong>Pages:</strong> {book.volumeInfo.pageCount}</p>
                        <p><strong>Category:</strong> {book.volumeInfo.categories?.join(", ")}</p>
                        <p><strong>Published:</strong> {book.volumeInfo.publishedDate}</p>

                        <div className="book-description">
                            <h3>Description:</h3>
                            <p>{book.volumeInfo.description}</p>
                        </div>

                        <button className="back-button" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
