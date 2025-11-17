import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../context/SupabaseContext'

function Navbar() {
  const { user, signOut } = useSupabase()
  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    // 监听购物车变化
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemsCount(totalItems)
    }

    // 初始加载
    updateCartCount()

    // 监听storage变化（跨标签页同步）
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // 监听同标签页内的cart变化
    const handleCartChange = () => {
      updateCartCount()
    }
    
    // 自定义事件监听
    window.addEventListener('cartUpdated', handleCartChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartChange)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            🛍️ 电商商城
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">首页</Link>
          <Link to="/products" className="nav-link">商品</Link>

          <Link to="/cart" className="nav-link cart-link">
            购物车
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
          
          {user ? (
            <div className="nav-user">
              <Link to="/profile" className="nav-link">个人中心</Link>
              <span className="user-phone">{user.phone || '用户'}</span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                退出登录
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              登录
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background: white;
          border-bottom: 2px solid #e5e7eb;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .brand-link {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2563eb;
          text-decoration: none;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .cart-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cart-badge {
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .nav-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-phone {
          color: #374151;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 1rem;
          }
          
          .nav-menu {
            gap: 1rem;
            flex-wrap: wrap;
          }
          
          .nav-user {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar