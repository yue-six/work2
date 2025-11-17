import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSupabase } from '../context/SupabaseContext'

function Login() {
  const { signIn, signUp, user } = useSupabase()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 如果用户已登录，重定向到首页
  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  // 格式化手机号，确保符合Supabase要求
  const formatPhoneNumber = (phone) => {
    // 移除所有非数字字符
    let cleaned = phone.replace(/\D/g, '')
    
    // 如果是中国手机号（以1开头的11位数字），自动添加+86
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+86${cleaned}`
    }
    
    // 如果是其他格式，返回原手机号（Supabase可能需要国际格式）
    return cleaned
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 格式化手机号
      const formattedPhone = formatPhoneNumber(formData.phone)
      
      // 验证手机号格式
      if (!formattedPhone.match(/^(\+?[0-9]{1,4})?[0-9]{8,15}$/)) {
        throw new Error('请输入有效的手机号码')
      }

      if (isLogin) {
        // 登录
        const { error } = await signIn(formattedPhone, formData.password)
        if (error) throw error
        navigate('/')
      } else {
        // 注册
        if (formData.password !== formData.confirmPassword) {
          throw new Error('密码确认不一致')
        }
        const { data, error, message } = await signUp(formattedPhone, formData.password)
        if (error) throw error
        
        // 显示注册成功消息
        if (message) {
          alert(message)
          setIsLogin(true)
          setFormData({ ...formData, password: '', confirmPassword: '' })
        }
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">{isLogin ? '登录' : '注册'}</h1>
            <p className="auth-subtitle">
              {isLogin ? '登录您的账户' : '创建新账户'}
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="phone">手机号码</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="请输入手机号码（例如：13912345678）"
                pattern="^(\+?[0-9]{1,4})?[0-9]{8,15}$"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="请输入密码"
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">确认密码</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="请再次输入密码"
                  minLength={6}
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary auth-btn"
            >
              {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-switch">
              {isLogin ? '还没有账户？' : '已有账户？'}
              <button 
                type="button" 
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setFormData({ phone: '', password: '', confirmPassword: '' })
                }}
                className="auth-switch-btn"
              >
                {isLogin ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }

        .auth-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-title {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .auth-form {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .auth-btn {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .auth-footer {
          text-align: center;
        }

        .auth-switch {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .auth-switch-btn {
          background: none;
          border: none;
          color: #2563eb;
          cursor: pointer;
          font-weight: 600;
          margin-left: 0.25rem;
        }

        .auth-switch-btn:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .auth-card {
            margin: 0 1rem;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Login