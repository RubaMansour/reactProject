import React from "react";

const Category = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ["All", "Fiction", "History", "Science", "Technology", "Romance", "Mystery"];

    return (
        <h1>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((name, index) => (
                    <option key={index} value={name === "All" ? "" : name}>
                        {name}
                    </option>
                ))}
            </select>
        </h1>
    );
};

export default Category;
