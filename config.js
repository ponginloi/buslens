// config.js
// ============================================================
//  从 Netlify Functions 加载所有配置
//  前端完全看不到任何密钥！
// ============================================================

async function loadConfig() {
    console.log('📦 正在加载配置...');
    
    try {
        // ✅ 从 Netlify Functions 获取所有密钥
        const response = await fetch('/.netlify/functions/config');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error('获取配置失败');
        }
        
        // ✅ 设置全局变量
        window.SUPABASE_URL = result.config.supabase_url;
        window.SUPABASE_KEY = result.config.supabase_key;
        window.AMAP_KEY = result.config.amap_key;
        window.AMAP_SECURITY = result.config.amap_security;
        window.IMGBB_KEY = result.config.imgbb_key;
        
        console.log('✅ 配置加载完成');
        console.log('🔑 SUPABASE_URL:', window.SUPABASE_URL ? '已加载 ✅' : '加载失败 ❌');
        console.log('🔑 SUPABASE_KEY:', window.SUPABASE_KEY ? '已加载 ✅' : '加载失败 ❌');
        console.log('🗺️ AMAP_KEY:', window.AMAP_KEY ? '已加载 ✅' : '加载失败 ❌');
        console.log('🔐 AMAP_SECURITY:', window.AMAP_SECURITY ? '已加载 ✅' : '加载失败 ❌');
        console.log('🖼️ IMGBB_KEY:', window.IMGBB_KEY ? '已加载 ✅' : '加载失败 ❌');
        
        // ✅ 触发事件，通知页面配置已加载
        document.dispatchEvent(new Event('configLoaded'));
        
    } catch (error) {
        console.error('❌ 配置加载失败:', error);
        // 即使失败也触发事件，让页面降级处理
        document.dispatchEvent(new Event('configLoaded'));
    }
}

// ✅ 页面加载时自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
} else {
    loadConfig();
}