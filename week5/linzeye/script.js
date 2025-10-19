// 基础JavaScript文件

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成');
    
    // 深色/浅色模式切换功能
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;
    const body = document.body;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        if (root.classList.contains('dark-mode')) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    });
    
    // 启用深色模式
    function enableDarkMode() {
        root.classList.add('dark-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
    
    // 启用浅色模式
    function enableLightMode() {
        root.classList.remove('dark-mode');
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
    
    // 联系表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 模拟表单提交成功
            console.log('表单提交成功:', { name, email, message });
            alert('感谢您的留言！我会尽快回复您。');
            
            // 重置表单
            contactForm.reset();
        });
    }
});