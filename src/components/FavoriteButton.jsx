import React, { useState, useEffect } from 'react'

function FavoriteButton({ productId }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // 从本地存储加载收藏状态
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(productId))
  }, [productId])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    
    if (isFavorite) {
      // 从收藏中移除
      const updatedFavorites = favorites.filter(id => id !== productId)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } else {
      // 添加到收藏
      favorites.push(productId)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
    }
    
    // 触发自定义事件，通知其他组件
    window.dispatchEvent(new Event('favoritesUpdated'))
  }

  return (
    <button 
      onClick={toggleFavorite}
      className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
      title={isFavorite ? '取消收藏' : '加入收藏'}
    >
      {isFavorite ? '❤️' : '🤍'}
      
      <style>{`
        .favorite-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .favorite-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.1);
        }
        
        .favorite-btn.favorited {
          color: #ef4444;
        }
      `}</style>
    </button>
  )
}

export default FavoriteButton