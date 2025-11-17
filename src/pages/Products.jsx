import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../context/SupabaseContext'
import LazyImage from '../components/LazyImage'

function Products() {
  const { getProducts } = useSupabase()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
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

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="page-title">所有商品</h1>
      
      {products.length === 0 ? (
        <div className="empty-state">
          <h3>暂无商品</h3>
          <p>目前没有可用的商品</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {products.map(product => (
            <div key={product.id} className="card">
              <LazyImage
                src={product.image_url}
                alt={product.name}
                style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px'}}
                placeholder="加载商品图片..."
              />
              <div style={{padding: '1rem'}}>
                <h3 style={{marginBottom: '0.5rem', fontSize: '1.2rem'}}>{product.name}</h3>
                <p style={{marginBottom: '1rem', color: '#6b7280', fontSize: '0.9rem'}}>
                  {product.description?.substring(0, 100)}...
                </p>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem'}}>
                  <span style={{background: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px'}}>
                    {product.category}
                  </span>
                  <span>库存: {product.stock_quantity}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>¥{product.price}</span>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    查看详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products