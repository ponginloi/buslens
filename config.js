// ============================================================
//  config.js - BusLens 配置文件
// ============================================================

window.SUPABASE_URL = 'https://keeybzxxkjxvlvhjjdpr.supabase.co';
window.SUPABASE_KEY = 'sb_publishable_SpzHfgcLn0deJWoqEPJQ4g_2jzyXXci';

// 🛡️ 防 F12 / 防右键 / 防 DevTools
(function() {
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
            (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
            (e.ctrlKey && (e.key === 'U' || e.key === 'u')) ||
            (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))) {
            e.preventDefault();
            return false;
        }
    });
    console.log('🛡️ 安全防护已启用');
})();

document.dispatchEvent(new Event('configLoaded'));
console.log('✅ config.js 加载完成');