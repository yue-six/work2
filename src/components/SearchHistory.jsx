import React, { useState, useEffect } from 'react'

function SearchHistory({ onSearch, maxItems = 5 }) {
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    // 从本地存储加载搜索历史
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    setSearchHistory(history)
  }, [])

  const addToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return

    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter(item => item !== searchTerm)
    ].slice(0, maxItems)

    setSearchHistory(updatedHistory)
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  const handleHistoryClick = (term) => {
    onSearch(term)
  }

  const removeFromHistory = (term) => {
    const updatedHistory = searchHistory.filter(item => item !== term)
    setSearchHistory(updatedHistory)
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
  }

  if (searchHistory.length === 0) {
    return null
  }

  return (
    <div className="search-history">
      <div className="search-history-header">
        <span className="search-history-title">搜索历史</span>
        <button 
          onClick={clearHistory}
          className="clear-history-btn"
          title="清除所有历史记录"
        >
          清除
        </button>
      </div>
      
      <div className="search-history-items">
        {searchHistory.map((term, index) => (
          <div key={index} className="search-history-item">
            <button 
              onClick={() => handleHistoryClick(term)}
              className="history-term-btn"
            >
              {term}
            </button>
            <button 
              onClick={() => removeFromHistory(term)}
              className="remove-history-btn"
              title="删除此项"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .search-history {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          padding: 1rem;
          max-width: 300px;
        }

        .search-history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .search-history-title {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        .clear-history-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .clear-history-btn:hover {
          background: #fef2f2;
        }

        .search-history-items {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .search-history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.25rem 0;
        }

        .history-term-btn {
          background: none;
          border: none;
          color: #2563eb;
          cursor: pointer;
          text-align: left;
          flex: 1;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .history-term-btn:hover {
          background: #eff6ff;
        }

        .remove-history-btn {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 1.2rem;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .remove-history-btn:hover {
          background: #f3f4f6;
          color: #ef4444;
        }
      `}</style>
    </div>
  )
}

export default SearchHistory