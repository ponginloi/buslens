// ============================================================
//  api.js - BusLens API 调用工具
//  所有第三方 API 密钥通过 Supabase 函数获取，前端不可见
// ============================================================

var supabaseClient = null;

// 初始化 Supabase（如果尚未初始化）
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
//  🔑 从 Supabase 获取 API 密钥（安全，前端不可见）
// ============================================================
async function getApiKey(keyName) {
    if (!initApiClient()) return null;

    try {
        const { data, error } = await supabaseClient
            .rpc('get_api_key', { key_name: keyName });

        if (error) {
            console.error('❌ 获取 API 密钥失败:', error);
            return null;
        }
        return data;
    } catch (e) {
        console.error('❌ 获取 API 密钥异常:', e);
        return null;
    }
}

// ============================================================
//  📤 上传图片到 ImgBB（使用安全密钥）
// ============================================================
async function uploadToImgBB(file) {
    try {
        // 从 Supabase 获取密钥（前端不可见）
        const apiKey = await getApiKey('imgbb_key');
        if (!apiKey) {
            throw new Error('无法获取 ImgBB API 密钥');
        }

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://api.imgbb.com/1/upload?key=' + apiKey, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('图片上传失败 (HTTP ' + response.status + ')');
        }

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error?.message || '图片上传失败');
        }

        return result.data.url;
    } catch (error) {
        console.error('❌ 上传失败:', error);
        throw error;
    }
}

// ============================================================
//  🗺️ 获取高德地图密钥
// ============================================================
async function getAmapKey() {
    return await getApiKey('amap_key');
}

async function getAmapSecurity() {
    return await getApiKey('amap_security');
}

// ============================================================
//  🖼️ 图片压缩 + 上传（带水印）
// ============================================================
async function compressAndUploadImage(file, options, username) {
    // 压缩逻辑（复用之前的 Canvas 压缩代码）
    // ... 压缩代码 ...

    // 然后上传
    return await uploadToImgBB(compressedFile);
}

// ============================================================
//  导出
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getApiKey,
        uploadToImgBB,
        getAmapKey,
        getAmapSecurity,
        compressAndUploadImage
    };
}