import React, { useState, useEffect } from 'react'
import { useSupabase } from '../context/SupabaseContext'

function Profile() {
  const { user, signOut, getOrders } = useSupabase()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await getOrders()
      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('获取订单失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  if (!user) {
    return (
      <div className="container">
        <div className="auth-required">
          <h2>请先登录</h2>
          <p>登录后可以查看个人中心</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.phone ? user.phone.substring(2, 3) : 'U'}
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user.user_metadata?.name || user.phone || '用户'}</h1>
          <p className="profile-phone">{user.phone || '未绑定手机号'}</p>
          <p className="profile-joined">
            注册时间: {new Date(user.created_at).toLocaleDateString('zh-CN')}
          </p>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          个人信息
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          我的订单
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          账户设置
        </button>
      </div>

      {/* 内容区域 */}
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="tab-panel">
            <h2>个人信息</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>手机号码</label>
                <input 
                  type="tel" 
                  value={user.phone || '未绑定'} 
                  disabled 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>用户名</label>
                <input 
                  type="text" 
                  value={user.user_metadata?.name || ''} 
                  placeholder="未设置用户名"
                  disabled 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>用户ID</label>
                <input 
                  type="text" 
                  value={user.id} 
                  disabled 
                  className="form-input"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="tab-panel">
            <h2>我的订单</h2>
            {loading ? (
              <div className="loading">加载中...</div>
            ) : orders.length === 0 ? (
              <div className="no-orders">
                <div className="empty-icon">📦</div>
                <h3>暂无订单</h3>
                <p>您还没有创建任何订单</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <span className="order-id">订单号: #{order.id}</span>
                        <span className={`order-status ${order.status}`}>
                          {order.status === 'pending' && '待处理'}
                          {order.status === 'processing' && '处理中'}
                          {order.status === 'shipped' && '已发货'}
                          {order.status === 'completed' && '已完成'}
                          {order.status === 'cancelled' && '已取消'}
                        </span>
                      </div>
                      <div className="order-date">
                        {new Date(order.created_at).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items?.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.product_name || '商品'}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">¥{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        总计: <span>¥{order.total_amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-panel">
            <h2>账户设置</h2>
            <div className="settings-options">
              <div className="setting-item">
                <h3>安全设置</h3>
                <p>修改密码、管理登录设备等</p>
                <button className="btn btn-secondary btn-sm">
                  管理安全设置
                </button>
              </div>
              
              <div className="setting-item">
                <h3>通知设置</h3>
                <p>订单状态、促销活动等通知</p>
                <button className="btn btn-secondary btn-sm">
                  管理通知
                </button>
              </div>
              
              <div className="setting-item danger">
                <h3>账户操作</h3>
                <p>退出登录等操作</p>
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .avatar-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: bold;
        }

        .profile-info {
          flex: 1;
        }

        .profile-name {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .profile-phone {
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .profile-joined {
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .profile-tabs {
          display: flex;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 2rem;
        }

        .tab-btn {
          padding: 1rem 2rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.3s;
        }

        .tab-btn.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }

        .tab-btn:hover {
          color: #2563eb;
        }

        .tab-panel {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .tab-panel h2 {
          font-size: 1.8rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .profile-form {
          max-width: 500px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          background: #f8fafc;
        }

        .no-orders {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .order-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .order-card:hover {
          border-color: #2563eb;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .order-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .order-id {
          font-weight: 600;
          color: #1f2937;
        }

        .order-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .order-status.pending {
          background: #fffbeb;
          color: #d97706;
        }

        .order-status.processing {
          background: #eff6ff;
          color: #2563eb;
        }

        .order-status.shipped {
          background: #f0f9ff;
          color: #0369a1;
        }

        .order-status.completed {
          background: #f0fdf4;
          color: #16a34a;
        }

        .order-status.cancelled {
          background: #fef2f2;
          color: #dc2626;
        }

        .order-date {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .order-items {
          margin-bottom: 1rem;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .order-item:last-child {
          border-bottom: none;
        }

        .item-name {
          flex: 1;
          color: #374151;
        }

        .item-quantity {
          color: #6b7280;
          margin: 0 1rem;
        }

        .item-price {
          font-weight: 600;
          color: #059669;
        }

        .order-footer {
          display: flex;
          justify-content: flex-end;
          border-top: 2px solid #e5e7eb;
          padding-top: 1rem;
        }

        .order-total {
          font-size: 1.2rem;
          font-weight: bold;
          color: #1f2937;
        }

        .order-total span {
          color: #059669;
        }

        .settings-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .setting-item {
          padding: 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
        }

        .setting-item.danger {
          border-color: #fecaca;
          background: #fef2f2;
        }

        .setting-item h3 {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .setting-item p {
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .btn-danger {
          background: #dc2626;
          color: white;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .profile-tabs {
            overflow-x: auto;
            flex-wrap: nowrap;
          }

          .tab-btn {
            white-space: nowrap;
            padding: 1rem;
          }

          .order-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile