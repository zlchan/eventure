import React from 'react'
import './EventCategoryGrid.css'
import test2 from "../../assets/images/test2.png"

const EventCategoryGrid = () => {
    const categories = [
        { id: 1, name: 'Business', image: test2 },
        { id: 2, name: 'Music', image: test2 },
        { id: 3, name: 'Parties', image: test2 },
        { id: 4, name: 'Food & Drinks', image: test2 },
        { id: 5, name: 'Comedy', image: test2 },
    ];

    return (
        <div className="categories-container">
            <div className="categories-header">
                <h2 className="categories-title">Discover Your Favourites</h2>
                {/* <a href="" className='view-all'>View all</a> */}
            </div>

            <div className="categories-grid">
                {categories.map(category => (
                   <div key={category.id} className="category-item">
                        <div className="category-image-wrapper">
                            <img src={test2} alt="test2" className="category-image" />
                        </div>
                        <span className="category-name">{category.name}</span>
                   </div> 
                ))}
            </div>
        </div>
    )
}

export default EventCategoryGrid;