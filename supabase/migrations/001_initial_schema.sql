-- 创建产品表
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户表（扩展自 Supabase Auth 的 users）
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    payment_method VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建订单项表
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS（行级安全策略）
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 为产品表创建策略（所有人都可以查看产品）
CREATE POLICY "任何人都可以查看产品" ON products FOR SELECT USING (true);

-- 为用户档案创建策略（用户只能查看和修改自己的档案）
CREATE POLICY "用户可以查看自己的档案" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "用户可以更新自己的档案" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "用户可以插入自己的档案" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 为订单表创建策略（用户只能查看和修改自己的订单）
CREATE POLICY "用户可以查看自己的订单" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "用户可以创建自己的订单" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "用户可以更新自己的订单" ON orders FOR UPDATE USING (auth.uid() = user_id);

-- 为订单项表创建策略（通过订单关联）
CREATE POLICY "通过订单查看订单项" ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- 创建更新时间的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要更新时间的表添加触发器
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入丰富的产品数据
INSERT INTO products (name, description, price, image_url, category, stock_quantity) VALUES
-- 手机品类
('iPhone 15 Pro', '最新款iPhone，搭载A17 Pro芯片，配备钛合金机身', 7999.00, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', '手机', 50),
('Samsung Galaxy S24 Ultra', '安卓旗舰手机，配备SPen，AI摄影功能，钛合金边框', 8999.00, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', '手机', 35),
('Xiaomi 14 Pro', '徕卡影像系统，骁龙8 Gen 3处理器，2K全等深微曲屏', 4999.00, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', '手机', 60),
('Huawei Mate 60 Pro', '华为旗舰手机，昆仑玻璃，卫星通话功能', 6999.00, 'https://images.unsplash.com/photo-1592910147776-6806e0e6d8f0?w=400', '手机', 25),

-- 电脑品类
('MacBook Air M3', '超轻薄笔记本电脑，M3芯片，13英寸视网膜显示屏，18小时续航', 8999.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', '电脑', 30),
('MacBook Pro 16英寸', '专业级笔记本电脑，M3 Pro芯片，Liquid视网膜XDR显示屏', 19999.00, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400', '电脑', 15),
('Dell XPS 13', '超极本，英特尔酷睿i7处理器，13.4英寸4K显示屏', 7999.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', '电脑', 40),
('Lenovo ThinkPad X1 Carbon', '商务旗舰本，军工级品质，长续航电池', 10999.00, 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400', '电脑', 20),

-- 耳机品类
('AirPods Pro', '主动降噪无线耳机，空间音频，通透模式，MagSafe充电盒', 1899.00, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400', '耳机', 100),
('Sony WH-1000XM5', '头戴式降噪耳机，30小时续航，智能降噪技术', 2299.00, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400', '耳机', 45),
('Bose QuietComfort 45', '舒适降噪耳机，均衡音质，快速充电', 1999.00, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', '耳机', 35),
('Samsung Galaxy Buds2 Pro', '真无线降噪耳机，360度音频，IPX7防水', 1299.00, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400', '耳机', 65),

-- 平板品类
('iPad Pro 12.9英寸', '专业级平板，M2芯片，Liquid视网膜XDR显示屏，支持Apple Pencil', 9299.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', '平板', 25),
('iPad Air 11英寸', '轻薄便携平板，M1芯片，支持第二代Apple Pencil', 4799.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', '平板', 40),
('Samsung Galaxy Tab S9 Ultra', '超大屏安卓平板，骁龙8 Gen 2，S Pen手写笔', 7999.00, 'https://images.unsplash.com/photo-1586953208448-b95a79798f5e?w=400', '平板', 20),
('Huawei MatePad Pro 13.2', '华为旗舰平板，星闪技术，轻薄设计', 5699.00, 'https://images.unsplash.com/photo-1586953208448-b95a79798f5e?w=400', '平板', 30),

-- 手表品类
('Apple Watch Series 9', '智能健康手表，血氧监测，运动追踪，视网膜显示屏', 2999.00, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400', '手表', 80),
('Apple Watch Ultra 2', '极限运动手表，钛合金表壳，双频GPS，专业级健康监测', 6299.00, 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d1?w=400', '手表', 25),
('Samsung Galaxy Watch6 Classic', '经典旋转表圈，健康监测，运动追踪', 2299.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', '手表', 45),

-- 相机品类
('Sony Alpha 7 IV', '全画幅微单相机，3300万像素，4K视频拍摄', 16999.00, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', '相机', 12),
('Canon EOS R5', '专业全画幅相机，4500万像素，8K视频录制', 25999.00, 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400', '相机', 8),

-- 游戏机品类
('PlayStation 5', '次世代游戏主机，8K游戏支持，高速SSD', 3899.00, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400', '游戏机', 25),
('Xbox Series X', '高性能游戏主机，4K 120fps游戏，快速恢复功能', 3599.00, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', '游戏机', 20),

-- 智能家居品类
('Apple HomePod mini', '智能音箱，Siri语音助手，空间音频技术', 749.00, 'https://images.unsplash.com/photo-1589003078178-9c670e3c1bab?w=400', '智能家居', 100),
('Google Nest Hub', '智能显示屏，Google助手，家居控制中心', 899.00, 'https://images.unsplash.com/photo-1558089687-f282ff5dd7ae?w=400', '智能家居', 60);