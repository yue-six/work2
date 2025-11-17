// 模拟产品数据
export const mockProducts = [
  // 手机品类
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "最新款iPhone，搭载A17 Pro芯片，配备钛合金机身，6.1英寸超视网膜XDR显示屏",
    price: 7999,
    category: "手机",
    stock_quantity: 50,
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "安卓旗舰手机，配备SPen，AI摄影功能，钛合金边框",
    price: 8999,
    category: "手机",
    stock_quantity: 35,
    image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-14T15:30:00Z"
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    description: "徕卡影像系统，骁龙8 Gen 3处理器，2K全等深微曲屏",
    price: 4999,
    category: "手机",
    stock_quantity: 60,
    image_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-13T09:15:00Z"
  },
  {
    id: 4,
    name: "Huawei Mate 60 Pro",
    description: "华为旗舰手机，昆仑玻璃，卫星通话功能",
    price: 6999,
    category: "手机",
    stock_quantity: 25,
    image_url: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-12T14:20:00Z"
  },
  
  // 电脑品类
  {
    id: 5,
    name: "MacBook Air M3",
    description: "超轻薄笔记本电脑，M3芯片，13英寸视网膜显示屏，18小时续航",
    price: 8999,
    category: "电脑",
    stock_quantity: 30,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-11T11:45:00Z"
  },
  {
    id: 6,
    name: "MacBook Pro 16英寸",
    description: "专业级笔记本电脑，M3 Pro芯片，Liquid视网膜XDR显示屏",
    price: 19999,
    category: "电脑",
    stock_quantity: 15,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-10T16:00:00Z"
  },
  {
    id: 7,
    name: "Dell XPS 13",
    description: "超极本，英特尔酷睿i7处理器，13.4英寸4K显示屏",
    price: 7999,
    category: "电脑",
    stock_quantity: 40,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-09T08:30:00Z"
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1 Carbon",
    description: "商务旗舰本，军工级品质，长续航电池",
    price: 10999,
    category: "电脑",
    stock_quantity: 20,
    image_url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-08T14:15:00Z"
  },
  
  // 耳机品类
  {
    id: 9,
    name: "AirPods Pro",
    description: "主动降噪无线耳机，空间音频，通透模式，MagSafe充电盒",
    price: 1899,
    category: "耳机",
    stock_quantity: 100,
    image_url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-07T10:20:00Z"
  },
  {
    id: 10,
    name: "Sony WH-1000XM5",
    description: "头戴式降噪耳机，30小时续航，智能降噪技术",
    price: 2299,
    category: "耳机",
    stock_quantity: 45,
    image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-06T11:30:00Z"
  },
  {
    id: 11,
    name: "Bose QuietComfort 45",
    description: "舒适降噪耳机，均衡音质，快速充电",
    price: 1999,
    category: "耳机",
    stock_quantity: 35,
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-05T15:45:00Z"
  },
  {
    id: 12,
    name: "Samsung Galaxy Buds2 Pro",
    description: "真无线降噪耳机，360度音频，IPX7防水",
    price: 1299,
    category: "耳机",
    stock_quantity: 65,
    image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-04T09:00:00Z"
  },
  
  // 平板品类
  {
    id: 13,
    name: "iPad Pro 12.9英寸",
    description: "专业级平板，M2芯片，Liquid视网膜XDR显示屏，支持Apple Pencil",
    price: 9299,
    category: "平板",
    stock_quantity: 25,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-03T13:20:00Z"
  },
  {
    id: 14,
    name: "iPad Air 11英寸",
    description: "轻薄便携平板，M1芯片，支持第二代Apple Pencil",
    price: 4799,
    category: "平板",
    stock_quantity: 40,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-02T16:30:00Z"
  },
  {
    id: 15,
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "超大屏安卓平板，骁龙8 Gen 2，S Pen手写笔",
    price: 7999,
    category: "平板",
    stock_quantity: 20,
    image_url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2024-01-01T10:45:00Z"
  },
  {
    id: 16,
    name: "Huawei MatePad Pro 13.2",
    description: "华为旗舰平板，星闪技术，轻薄设计",
    price: 5699,
    category: "平板",
    stock_quantity: 30,
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-31T14:00:00Z"
  },
  
  // 手表品类
  {
    id: 17,
    name: "Apple Watch Series 9",
    description: "智能健康手表，血氧监测，运动追踪，视网膜显示屏",
    price: 2999,
    category: "手表",
    stock_quantity: 80,
    image_url: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-30T11:15:00Z"
  },
  {
    id: 18,
    name: "Apple Watch Ultra 2",
    description: "极限运动手表，钛合金表壳，双频GPS，专业级健康监测",
    price: 6299,
    category: "手表",
    stock_quantity: 25,
    image_url: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-29T09:30:00Z"
  },
  {
    id: 19,
    name: "Samsung Galaxy Watch6 Classic",
    description: "经典旋转表圈，健康监测，运动追踪",
    price: 2299,
    category: "手表",
    stock_quantity: 45,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-28T15:45:00Z"
  },
  
  // 相机品类
  {
    id: 20,
    name: "Sony Alpha 7 IV",
    description: "全画幅微单相机，3300万像素，4K视频拍摄",
    price: 16999,
    category: "相机",
    stock_quantity: 12,
    image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-27T08:20:00Z"
  },
  {
    id: 21,
    name: "Canon EOS R5",
    description: "专业全画幅相机，4500万像素，8K视频录制",
    price: 25999,
    category: "相机",
    stock_quantity: 8,
    image_url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-26T14:30:00Z"
  },
  
  // 游戏机品类
  {
    id: 22,
    name: "PlayStation 5",
    description: "次世代游戏主机，8K游戏支持，高速SSD",
    price: 3899,
    category: "游戏机",
    stock_quantity: 25,
    image_url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-25T10:00:00Z"
  },
  {
    id: 23,
    name: "Xbox Series X",
    description: "高性能游戏主机，4K 120fps游戏，快速恢复功能",
    price: 3599,
    category: "游戏机",
    stock_quantity: 20,
    image_url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-24T16:45:00Z"
  },
  
  // 智能家居品类
  {
    id: 24,
    name: "Apple HomePod mini",
    description: "智能音箱，Siri语音助手，空间音频技术",
    price: 749,
    category: "智能家居",
    stock_quantity: 100,
    image_url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-23T09:15:00Z"
  },
  {
    id: 25,
    name: "Google Nest Hub",
    description: "智能显示屏，Google助手，家居控制中心",
    price: 899,
    category: "智能家居",
    stock_quantity: 60,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    is_active: true,
    created_at: "2023-12-22T13:30:00Z"
  }
]

// 模拟用户数据
export const mockUsers = [
  {
    id: 1,
    email: "user@example.com",
    created_at: "2024-01-01T08:00:00Z"
  }
]

// 模拟订单数据
export const mockOrders = [
  {
    id: 1,
    user_id: 1,
    total_amount: 7999,
    status: "completed",
    created_at: "2024-01-15T10:30:00Z",
    items: [
      {
        product_id: 1,
        quantity: 1,
        price: 7999
      }
    ]
  }
]