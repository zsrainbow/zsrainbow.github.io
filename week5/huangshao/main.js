/*
 * @file main.js
 * @description 个人作品集网站交互功能JavaScript文件
 * @author 开发者名称
 * @version 1.0.0
 * @date 2024-01-01
 * @copyright (c) 2024 个人作品集. 保留所有权利.
 */

// 定义多语言翻译数据
const translations = {
    'zh': {
        'nav-home': '首页',
        'nav-about': '关于我',
        'nav-works': '作品展示',
        'nav-contact': '联系方式',
        'hero-title': '欢迎来到我的作品集',
        'hero-subtitle': '展示我的创意和技术能力',
        'hero-btn': '查看作品',
        'about-title': '关于我',
        'works-title': '作品展示',
        'contact-title': '联系方式',
        'contact-form-title': '给我留言',
        'contact-info-title': '联系信息',
        'social-title': '关注我',
        'map-title': '我的位置',
        'footer-text': '© 2024 黄劭作品集. 保留所有权利.',
        'form-name': '姓名',
        'form-email': '邮箱',
        'form-message': '留言',
        'form-submit': '发送'
    },
    'en': {
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-works': 'Works',
        'nav-contact': 'Contact',
        'hero-title': 'Welcome to My Portfolio',
        'hero-subtitle': 'Showcasing my creativity and technical skills',
        'hero-btn': 'View Works',
        'about-title': 'About Me',
        'works-title': 'My Works',
        'contact-title': 'Contact Me',
        'contact-form-title': 'Send Me a Message',
        'contact-info-title': 'Contact Information',
        'social-title': 'Follow Me',
        'map-title': 'My Location',
        'footer-text': '© 2024 Huang Shao Portfolio. All Rights Reserved.',
        'form-name': 'Name',
        'form-email': 'Email',
        'form-message': 'Message',
        'form-submit': 'Send'
    }
};

// 初始化当前语言
let currentLang = localStorage.getItem('preferredLang') || 'zh';

// 更新页面文本到指定语言
function updateLanguage(lang) {
    // 检查语言是否存在
    if (!translations[lang]) {
        console.error('语言不存在:', lang);
        return;
    }
    
    // 更新当前语言
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    
    // 更新所有带有data-lang-key属性的元素
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // 更新语言按钮的激活状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    console.log('语言已切换至:', lang);
}

// DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言
    updateLanguage(currentLang);
    
    // 语言切换按钮事件监听
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
    // 导航栏滚动效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (window.scrollY > 100) {
            header.style.backgroundColor = isDarkMode ? 'rgba(44, 62, 80, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = isDarkMode ? '0 5px 20px rgba(0, 0, 0, 0.3)' : '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = ''; // 使用CSS变量中的默认值
            header.style.boxShadow = isDarkMode ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // 简单的表单验证示例
            if (formValues.name && formValues.email && formValues.message) {
                // 在实际项目中，这里会发送AJAX请求到服务器
                console.log('表单数据:', formValues);
                
                // 显示成功消息
                alert('消息发送成功！感谢您的联系。');
                
                // 重置表单
                this.reset();
            } else {
                alert('请填写所有必填字段');
            }
        });
    }

    // 动态添加作品项的示例
    function addWorkItem(title, description, imageUrl) {
        const worksGrid = document.querySelector('.works-grid');
        if (!worksGrid) return;
        
        const workItem = document.createElement('div');
        workItem.className = 'work-item';
        workItem.innerHTML = `
            <div class="work-img">
                <img src="${imageUrl || 'images/placeholder.jpg'}" alt="${title}">
            </div>
            <div class="work-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
        
        worksGrid.appendChild(workItem);
    }

    // 示例：添加一个新的作品项（实际项目中可以从API获取数据）
    // addWorkItem('新项目', '这是一个新项目的描述', 'images/new-project.jpg');

    // 图片懒加载示例
    const lazyImages = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.style.opacity = '0';
                    image.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        image.style.opacity = '1';
                    }, 100);
                    
                    observer.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级处理：直接加载所有图片
        lazyImages.forEach(img => {
            img.style.opacity = '1';
        });
    }

    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // 创建一个简单的作品数据数组
    const portfolioItems = [
        {
            title: '响应式网站设计',
            description: '为客户创建的现代响应式企业网站',
            image: 'images/placeholder.jpg'
        },
        {
            title: '移动应用UI设计',
            description: '用户友好的移动应用界面设计',
            image: 'images/placeholder.jpg'
        },
        {
            title: '品牌标识设计',
            description: '为初创公司设计的全套品牌视觉识别系统',
            image: 'images/placeholder.jpg'
        }
    ];

    // 函数：随机生成一些动画效果
    function animateOnScroll() {
        const elements = document.querySelectorAll('.work-item, section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // 初始化元素的动画状态
    function initAnimationStyles() {
        const elements = document.querySelectorAll('.work-item, section');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // 初始化动画
    initAnimationStyles();
    animateOnScroll();
    
    // 滚动时触发动画
    window.addEventListener('scroll', animateOnScroll);
    
    // 深色模式切换功能
    const themeToggle = document.getElementById('theme-toggle');
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 初始化主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    
    // 主题切换点击事件
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-mode');
            
            // 更新按钮图标
            if (isDark) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
            
            // 触发滚动事件，更新导航栏样式
            window.dispatchEvent(new Event('scroll'));
        });
    }
});