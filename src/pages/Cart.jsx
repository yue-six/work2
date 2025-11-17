import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../context/SupabaseContext'

function Cart() {
  const { user, createOrder } = useSupabase()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(items)
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    // 触发购物车更新事件
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    // 触发购物车更新事件
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
    // 触发购物车更新事件
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {
    if (!user) {
      alert('请先登录')
      return
    }

    setLoading(true)
    try {
      // 获取购物车中的商品
      const orderItems = cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      }))

      // 计算总金额
      const totalAmount = getTotalPrice()

      // 创建订单
      const { data: order, error } = await createOrder({
        items: orderItems,
        total_amount: totalAmount,
        shipping_address: "默认地址", // 这里可以添加地址选择功能
        payment_method: "在线支付"
      })

      if (error) throw error

      alert(`订单创建成功！订单号: #${order.id}`)
      clearCart()
    } catch (error) {
      console.error('创建订单失败:', error)
      alert('创建订单失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container">
        <div className="auth-required">
          <h2>请先登录</h2>
          <p>登录后可以查看和管理购物车</p>
          <Link to="/login" className="btn btn-primary">
            立即登录
          </Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>购物车为空</h2>
          <p>快去添加一些心仪的商品吧！</p>
          <Link to="/products" className="btn btn-primary">
            继续购物
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="cart-header">
        <h1>购物车</h1>
        <div className="cart-summary">
          <span>共 {getTotalItems()} 件商品</span>
          <button onClick={clearCart} className="btn btn-secondary btn-sm">
            清空购物车
          </button>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image_url || '/placeholder-image.jpg'} 
                alt={item.name}
                className="cart-item-image"
              />
              
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">¥{item.price}</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ¥{(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  title="删除商品"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="order-summary">
            <h3>订单摘要</h3>
            
            <div className="summary-row">
              <span>商品总数:</span>
              <span>{getTotalItems()} 件</span>
            </div>
            
            <div className="summary-row">
              <span>商品金额:</span>
              <span>¥{getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>运费:</span>
              <span>¥0.00</span>
            </div>
            
            <div className="summary-row total">
              <span>总计:</span>
              <span>¥{getTotalPrice().toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="btn btn-primary checkout-btn"
            >
              {loading ? '处理中...' : '立即结算'}
            </button>

            <Link to="/products" className="continue-shopping">
              ← 继续购物
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .cart-header h1 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1f2937;
        }

        .cart-summary {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #6b7280;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .cart-item-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .cart-item-price {
          font-size: 1.1rem;
          color: #2563eb;
          font-weight: 600;
        }

        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .quantity-btn {
          background: #f8fafc;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .quantity-display {
          padding: 0.5rem 1rem;
          min-width: 50px;
          text-align: center;
          font-weight: 600;
        }

        .cart-item-total {
          font-size: 1.2rem;
          font-weight: bold;
          color: #059669;
          min-width: 80px;
          text-align: center;
        }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.5rem;
          border-radius: 6px;
          transition: background-color 0.3s;
        }

        .remove-btn:hover {
          background: #fef2f2;
        }

        .cart-sidebar {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }

        .order-summary {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .order-summary h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #1f2937;
          text-align: center;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-row.total {
          font-size: 1.2rem;
          font-weight: bold;
          color: #059669;
          border-bottom: none;
          margin-top: 1rem;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 1.5rem 0;
        }

        .continue-shopping {
          display: block;
          text-align: center;
          color: #2563eb;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .continue-shopping:hover {
          text-decoration: underline;
        }

        .auth-required, .empty-cart {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .auth-required h2, .empty-cart h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .auth-required p, .empty-cart p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .cart-content {
            grid-template-columns: 1fr;
          }

          .cart-item {
            grid-template-columns: 80px 1fr;
            grid-template-rows: auto auto;
          }

          .cart-item-controls {
            grid-column: 1 / -1;
            justify-content: space-between;
            margin-top: 1rem;
          }

          .cart-sidebar {
            position: static;
          }
        }
      `}</style>
    </div>
  )
}

export default Cart