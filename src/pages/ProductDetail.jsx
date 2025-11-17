import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSupabase } from '../context/SupabaseContext'
import LazyImage from '../components/LazyImage'

function ProductDetail() {
  const { id } = useParams()
  const { getProduct, user } = useSupabase()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data, error } = await getProduct(id)
      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('获取产品详情失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      setAddingToCart(true)
      // 这里实现添加到购物车逻辑
      // 可以存储到 localStorage 或通过 Supabase 管理
      
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItem = cartItems.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity: quantity
        })
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems))
      
      alert('商品已添加到购物车！')
    } catch (error) {
      console.error('添加到购物车失败:', error)
      alert('添加失败，请重试')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container">
        <div className="error">
          <p>商品不存在</p>
          <Link to="/products" className="btn btn-primary">返回商品列表</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to="/products" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        ← 返回商品列表
      </Link>
      
      <div className="product-detail">
        <div className="product-image-section">
          <LazyImage
            src={product.image_url}
            alt={product.name}
            className="product-detail-image"
            placeholder="加载商品图片..."
          />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-price">¥{product.price}</p>
          
          <div className="product-detail-description">
            <h3>商品描述</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-detail-meta">
            <div className="meta-item">
              <span className="meta-label">库存:</span>
              <span className="meta-value">{product.stock_quantity} 件</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">状态:</span>
              <span className={`meta-value ${product.is_active ? 'active' : 'inactive'}`}>
                {product.is_active ? '在售' : '已下架'}
              </span>
            </div>
          </div>
          
          {product.is_active && (
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">数量:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock_quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="quantity-input"
                />
              </div>
              
              <button 
                onClick={addToCart}
                disabled={addingToCart || product.stock_quantity === 0}
                className="btn btn-primary add-to-cart-btn"
              >
                {addingToCart ? '添加中...' : product.stock_quantity === 0 ? '暂时缺货' : '加入购物车'}
              </button>
            </div>
          )}
          
          {!product.is_active && (
            <div className="product-unavailable">
              <p className="unavailable-message">该商品已下架</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .product-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        .product-detail-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
        }
        
        .product-detail-name {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }
        
        .product-detail-category {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        
        .product-detail-price {
          font-size: 2rem;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 2rem;
        }
        
        .product-detail-description {
          margin-bottom: 2rem;
        }
        
        .product-detail-description h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .product-detail-description p {
          line-height: 1.6;
          color: #6b7280;
        }
        
        .product-detail-meta {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        
        .meta-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .meta-label {
          font-weight: 600;
          color: #374151;
        }
        
        .meta-value {
          color: #6b7280;
        }
        
        .meta-value.active {
          color: #059669;
          font-weight: 600;
        }
        
        .meta-value.inactive {
          color: #dc2626;
          font-weight: 600;
        }
        
        .product-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .quantity-input {
          width: 80px;
          padding: 0.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          text-align: center;
        }
        
        .add-to-cart-btn {
          flex: 1;
          min-width: 200px;
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }
        
        .product-unavailable {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
        }
        
        .unavailable-message {
          color: #dc2626;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .product-detail {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .product-detail-image {
            height: 300px;
          }
          
          .product-detail-name {
            font-size: 2rem;
          }
          
          .product-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .quantity-selector {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductDetail