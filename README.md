# Bookstore App
  
  The Bookstore App is a web application that allows users to browse books, add books to a favorites list, and search for books using the Google Books API. Built with modern technologies like React and Redux, the app offers an intuitive interface with a smooth user experience.

# Key Features
  
  . Book Display: Browse books across different categories (e.g., Fiction, History, and more).
  . Advanced Search: Search for books using keywords.
  . Favorites: Save your favorite books to a personal list.
  . Sign Up / Sign In: Register an account using email or log in with Google.
  . Pagination: Navigate through multiple pages for a better book browsing experience.

# Technologies Used

  . React: For building dynamic and interactive user interfaces.
  . Redux: For global state management.
  . Firebase: For storing user data and handling authentication.
  . Google Books API: To fetch books from the Google Books library.
  . React Router: For navigation between pages.
  . CSS & Swiper: For designing the UI and enhancing user interaction.

# Installation

   1. Clone the Repository
     https://github.com/RubaMansour/reactProject.git

   2. Navigate to the Project Directory
     cd reactProject

   3. Install Dependencies   
     npm install

   4. Configure Firebase
     Set up your Firebase account and configure your app settings in firebase.js:
     1. Create a new project on Firebase Console.
     2. Create a web app and add Firebase configurations in firebase.js.
     3. Enable "Email/Password Authentication" and "Google Authentication" in Firebase settings.
    
   5. Run the App
      Once all dependencies are installed, you can run the app with:
        npm run dev

# Project Structure  

    bookstore-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   └── ...
│   ├── redux/
│   │   └── booksSlice.js
│   ├── App.js
│   ├── firebase.js
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── ...

# How the App Works
  1. Sign Up and Sign In:

     . Users can sign up using email or log in with their Google account.
     . Once logged in, user data is stored in Firebase Firestore.

  2. Display Books:

     . The app uses the Google Books API to fetch book data based on the search keyword or
       selected category.
     . Books are displayed on the "Shop" page, with the ability to browse through multiple pages.

  3. Add Books to Favorites:

     . Users can add books to their favorites list using the "Add To Wishlist" button.

  4.  Navigation:

     . The app uses React Router to navigate between pages, including the homepage, book details, 
       and shop pages.
