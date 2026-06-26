// ============================================================
//  config.js - BusLens 配置加载器
//  所有密钥通过 Edge Function 安全获取，前端不可见
// ============================================================

// 配置缓存
let configCache = {};

// ============================================================
//  从 Edge Function 获取配置
// ============================================================
async function fetchConfig(key) {
    // 如果缓存中有，直接返回
    if (configCache[key]) {
        return configCache[key];
    }

    try {
        const response = await fetch('https://keeybzxxkjxvlvhjjdpr.supabase.co/functions/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'get_config',
                key: key
            })
        });

        const result = await response.json();

        if (result.success) {
            configCache[key] = result.value;
            return result.value;
        } else {
            console.error(`❌ 获取配置 ${key} 失败:`, result.error);
            return null;
        }
    } catch (error) {
        console.error(`❌ 获取配置 ${key} 出错:`, error);
        return null;
    }
}

// ============================================================
//  初始化所有配置
// ============================================================
async function initConfig() {
    console.log('📦 正在加载配置...');

    // 并行获取所有配置
    const configs = await Promise.all([
        fetchConfig('supabase_url'),
        fetchConfig('supabase_key'),
        fetchConfig('amap_key'),
        fetchConfig('amap_security'),
        fetchConfig('imgbb_key')
    ]);

    const [supabaseUrl, supabaseKey, amapKey, amapSecurity, imgbbKey] = configs;

    // 设置全局变量
    window.SUPABASE_URL = supabaseUrl;
    window.SUPABASE_KEY = supabaseKey;
    window.AMAP_KEY = amapKey;
    window.AMAP_SECURITY = amapSecurity;
    window.IMGBB_KEY = imgbbKey;

    console.log('✅ 配置加载完成');
    console.log('🔑 SUPABASE_URL:', supabaseUrl ? '已加载 ✅' : '加载失败 ❌');
    console.log('🔑 SUPABASE_KEY:', supabaseKey ? '已加载 ✅' : '加载失败 ❌');
    console.log('🗺️ AMAP_KEY:', amapKey ? '已加载 ✅' : '加载失败 ❌');
    console.log('🔐 AMAP_SECURITY:', amapSecurity ? '已加载 ✅' : '加载失败 ❌');
    console.log('🖼️ IMGBB_KEY:', imgbbKey ? '已加载 ✅' : '加载失败 ❌');

    // 触发配置加载完成事件，通知所有页面
    document.dispatchEvent(new Event('configLoaded'));
}

// ============================================================
//  页面加载时自动初始化
// ============================================================
// 使用 DOMContentLoaded 确保 DOM 已准备好
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfig);
} else {
    initConfig();
}

// ============================================================
//  导出（供其他模块使用）
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchConfig,
        initConfig,
        configCache
    };
}