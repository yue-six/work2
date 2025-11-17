import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../context/SupabaseContext'
import SortFilter from '../components/SortFilter'
import FavoriteButton from '../components/FavoriteButton'
import LazyImage from '../components/LazyImage'

function Home() {
  const { getProducts } = useSupabase()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, categoryFilter])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await getProducts()
      if (error) throw error
      
      // 处理图片URL，确保有效性
      const processedProducts = (data || []).map(product => ({
        ...product,
        image_url: validateImageUrl(product.image_url)
      }))
      
      setProducts(processedProducts)
    } catch (error) {
      console.error('获取产品数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 验证和修复图片URL
  const validateImageUrl = (url) => {
    if (!url) return '/placeholder-image.jpg'
    
    // 检查是否是有效的URL
    try {
      new URL(url)
      return url
    } catch {
      // 如果不是有效的URL，尝试修复或使用默认图片
      if (url.startsWith('//')) {
        return `https:${url}`
      }
      return '/placeholder-image.jpg'
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }

    setFilteredProducts(filtered)
  }

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]

  if (loading) {
    return (
      <div className="container">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">欢迎来到 🛍️ 电商商城</h1>
          <p className="hero-subtitle">发现高品质商品，享受便捷购物体验</p>
          
          {/* 搜索框 */}
          <div className="search-container">
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="btn btn-primary search-btn">🔍 搜索</button>
          </div>
        </div>
      </section>

      {/* 分类筛选 */}
      <section className="filters-section">
        <div className="filters">
          <button 
            className={`filter-btn ${!categoryFilter ? 'active' : ''}`}
            onClick={() => setCategoryFilter('')}
          >
            全部商品
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${categoryFilter === category ? 'active' : ''}`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 产品展示 */}
      <section className="products-section">
        <h2 className="section-title">精选商品</h2>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>没有找到相关商品</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setCategoryFilter('')
              }}
              className="btn btn-primary"
            >
              查看所有商品
            </button>
          </div>
        ) : (
          <div className="grid grid-3">
            {filteredProducts.map(product => (
              <div key={product.id} className="card product-card">
                <LazyImage
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                  placeholder="加载商品图片..."
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-category">{product.category}</span>
                    <span className="product-stock">库存: {product.stock_quantity}</span>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">¥{product.price}</span>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 特色区域 */}
      <section className="features-section">
        <div className="grid grid-3">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>快速配送</h3>
            <p>全国范围内快速配送服务</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>安全支付</h3>
            <p>多种安全支付方式保障</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>品质保证</h3>
            <p>正品保证，售后无忧</p>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
          border-radius: 20px;
          margin-bottom: 3rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .search-container {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          gap: 1rem;
        }

        .search-input {
          flex: 1;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
        }

        .search-btn {
          padding: 1rem 2rem;
          border-radius: 10px;
        }

        .filters-section {
          margin-bottom: 2rem;
        }

        .filters {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .filter-btn:hover {
          border-color: #2563eb;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #1f2937;
        }

        .no-products {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .product-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .product-description {
          color: #6b7280;
          margin-bottom: 1rem;
          flex: 1;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #9ca3af;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .product-price {
          font-size: 1.3rem;
          font-weight: bold;
          color: #2563eb;
        }

        .features-section {
          padding: 3rem 0;
          background: #f8fafc;
          border-radius: 20px;
          margin-top: 3rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .feature-card p {
          color: #6b7280;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .search-container {
            flex-direction: column;
          }
          
          .filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Home