import React from 'react'

function SortFilter({ sortBy, setSortBy, filterCategory, setFilterCategory, categories }) {
  return (
    <div className="sort-filter-container">
      <div className="filter-section">
        <label htmlFor="category-filter">分类筛选:</label>
        <select 
          id="category-filter"
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">全部商品</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="sort-section">
        <label htmlFor="sort-by">排序方式:</label>
        <select 
          id="sort-by"
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">默认排序</option>
          <option value="price-low">价格从低到高</option>
          <option value="price-high">价格从高到低</option>
          <option value="name">按名称排序</option>
          <option value="stock">库存充足优先</option>
        </select>
      </div>

      <style>{`
        .sort-filter-container {
          display: flex;
          gap: 2rem;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .filter-section, .sort-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        label {
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }
        
        .filter-select, .sort-select {
          padding: 0.5rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
        }
        
        .filter-select:focus, .sort-select:focus {
          outline: none;
          border-color: #2563eb;
        }
        
        @media (max-width: 768px) {
          .sort-filter-container {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .filter-section, .sort-section {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  )
}

export default SortFilter