// ============================================================
//  api.js - BusLens API 调用工具（安全版）
//  所有第三方 API 密钥通过 Supabase Edge Function 调用
// ============================================================

var supabaseClient = null;

function initApiClient() {
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase SDK 未加载');
        return false;
    }
    if (!supabaseClient) {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ API 客户端初始化成功');
        } catch (e) {
            console.error('❌ API 客户端初始化失败:', e);
            return false;
        }
    }
    return true;
}

// ============================================================
//  👤 用户状态
// ============================================================
function getCurrentUser() {
    try {
        var raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

// ============================================================
//  📤 上传图片到 ImgBB（通过 Edge Function 代理）
//  ✅ 前端不接触 ImgBB Key
// ============================================================
async function uploadToImgBB(file) {
    const user = getCurrentUser();
    if (!user) {
        throw new Error('请先登录再上传图片');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
        'https://keeybzxxkjxvlvhjjdpr.supabase.co/functions/v1/upload-image',
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (user.access_token || '')
            },
            body: formData
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || '上传失败');
    }

    if (!result.success) {
        throw new Error(result.error || '上传失败');
    }

    return result.url;
}

// ============================================================
//  🛡️ 防止 XSS 攻击
// ============================================================
function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================================
//  🗺️ 获取高德地图密钥（通过 Edge Function）
// ============================================================
async function getAmapConfig() {
    try {
        const response = await fetch(
            'https://keeybzxxkjxvlvhjjdpr.supabase.co/functions/v1/get-amap-config'
        );
        const result = await response.json();
        return result;
    } catch (e) {
        console.error('获取高德配置失败:', e);
        return null;
    }
}

// ============================================================
//  🔐 验证管理员权限（通过 Supabase Auth）
// ============================================================
async function isAdminAsync() {
    if (!initApiClient()) return false;
    try {
        const { data, error } = await supabaseClient.auth.getUser();
        if (error || !data.user) return false;
        return data.user.user_metadata?.role === 'admin';
    } catch (e) {
        console.error('验证管理员失败:', e);
        return false;
    }
}

// ============================================================
//  🚪 登出
// ============================================================
function logoutUser() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
}