import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { mockProducts } from '../data/mockData'

// 获取环境变量
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 检查是否提供了有效的 Supabase 配置
const isSupabaseConfigured = supabaseUrl && 
                           supabaseUrl.startsWith('http') && 
                           !supabaseUrl.includes('your-supabase-url') &&
                           supabaseAnonKey && 
                           !supabaseAnonKey.includes('your-anon-key')

const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

// 创建上下文
const SupabaseContext = createContext()

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 简化用户状态检查 - 从本地存储恢复用户会话
    const savedUser = localStorage.getItem('current_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('解析用户数据失败:', error)
      }
    }
    setLoading(false)
  }, [])

  // 登录函数
  const signIn = async (phone, password) => {
    // 简化登录 - 从本地存储验证用户
    const users = JSON.parse(localStorage.getItem('local_users') || '[]')
    const user = users.find(u => u.phone === phone && u.password === password)
    
    if (user) {
      const userData = {
        id: user.id,
        phone: user.phone,
        user_metadata: { name: user.name || '用户' }
      }
      setUser(userData)
      // 保存当前用户到本地存储
      localStorage.setItem('current_user', JSON.stringify(userData))
      return { data: { user: userData }, error: null }
    } else {
      return { data: null, error: { message: '手机号或密码错误' } }
    }
  }

  // 注册函数
  const signUp = async (phone, password) => {
    // 简化注册 - 保存到本地存储
    const users = JSON.parse(localStorage.getItem('local_users') || '[]')
    
    // 检查手机号是否已存在
    if (users.find(u => u.phone === phone)) {
      return { 
        data: null, 
        error: { message: '该手机号已被注册' },
        message: null
      }
    }
    
    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      phone: phone,
      password: password,
      name: '新用户',
      created_at: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('local_users', JSON.stringify(users))
    
    // 自动登录
    const userData = {
      id: newUser.id,
      phone: newUser.phone,
      user_metadata: { name: newUser.name }
    }
    setUser(userData)
    // 保存当前用户到本地存储
    localStorage.setItem('current_user', JSON.stringify(userData))
    
    return { 
      data: { user: newUser }, 
      error: null,
      message: '注册成功！欢迎使用手机号登录。'
    }
  }

  // 退出登录
  const signOut = async () => {
    setUser(null)
    // 清除本地存储的用户信息
    localStorage.removeItem('current_user')
    return { error: null }
  }

  // 获取产品数据
  const getProducts = async () => {
    // 简化产品获取 - 直接返回模拟数据
    return { data: mockProducts, error: null }
  }

  // 获取单个产品
  const getProduct = async (id) => {
    // 简化产品获取 - 从模拟数据中查找
    const product = mockProducts.find(p => p.id === parseInt(id))
    return { data: product, error: product ? null : new Error('Product not found') }
  }

  // 创建订单
  const createOrder = async (orderData) => {
    if (!user) throw new Error('User must be logged in')
    
    // 简化订单创建 - 使用本地存储
    const mockOrder = {
      id: Date.now(),
      ...orderData,
      user_id: user.id,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    
    // 保存订单到本地存储
    const existingOrders = JSON.parse(localStorage.getItem('user_orders') || '[]')
    existingOrders.push(mockOrder)
    localStorage.setItem('user_orders', JSON.stringify(existingOrders))
    
    return { data: mockOrder, error: null }
  }

  // 获取用户订单
  const getOrders = async () => {
    if (!user) throw new Error('User must be logged in')
    
    // 简化订单获取 - 从本地存储获取
    const orders = JSON.parse(localStorage.getItem('user_orders') || '[]')
    const userOrders = orders.filter(order => order.user_id === user.id)
    return { data: userOrders, error: null }
  }

  // 获取单个订单详情
  const getOrder = async (orderId) => {
    if (!user) throw new Error('User must be logged in')
    
    // 简化订单获取 - 从本地存储查找
    const orders = JSON.parse(localStorage.getItem('user_orders') || '[]')
    const order = orders.find(o => o.id === parseInt(orderId) && o.user_id === user.id)
    return { data: order, error: order ? null : new Error('Order not found') }
  }

  // 更新订单状态
  const updateOrderStatus = async (orderId, status) => {
    if (!user) throw new Error('User must be logged in')
    
    // 简化订单更新 - 使用本地存储
    const orders = JSON.parse(localStorage.getItem('user_orders') || '[]')
    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId) && o.user_id === user.id)
    
    if (orderIndex !== -1) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        status,
        updated_at: new Date().toISOString()
      }
      localStorage.setItem('user_orders', JSON.stringify(orders))
      return { data: orders[orderIndex], error: null }
    }
    return { data: null, error: new Error('Order not found') }
  }

  const value = {
    supabase,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    getProducts,
    getProduct,
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}