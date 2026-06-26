// ============================================================
//  config.js - 开源版本（所有密钥可见，RLS 保护）
// ============================================================

// ✅ 直接设置所有密钥（开源，RLS 保护）
window.SUPABASE_URL = 'https://keeybzxxkjxvlvhjjdpr.supabase.co';
window.SUPABASE_KEY = 'sb_publishable_SpzHfgcLn0deJWoqEPJQ4g_2jzyXXci';
window.AMAP_KEY = '404164dc78620cbc5d9440e9b2ed5e85';
window.AMAP_SECURITY = '32cb0dfc6330c69e2d13dd3164cea242';
window.IMGBB_KEY = '8e3090df223d722b14abf8aaed4ed7e4';

console.log('✅ 配置加载完成（开源模式）');
console.log('🗺️ AMAP_KEY:', window.AMAP_KEY ? '已加载 ✅' : '加载失败 ❌');
console.log('🔐 AMAP_SECURITY:', window.AMAP_SECURITY ? '已加载 ✅' : '加载失败 ❌');
console.log('🖼️ IMGBB_KEY:', window.IMGBB_KEY ? '已加载 ✅' : '加载失败 ❌');

// ✅ 触发事件，通知页面配置已加载
document.dispatchEvent(new Event('configLoaded'));