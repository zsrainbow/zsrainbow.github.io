// 主题切换功能
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
}

// 页面滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('section, .project-card, .timeline-item, .contact-method');
    animateElements.forEach(el => {
        el.classList.add('page-transition', 'animate');
        observer.observe(el);
    });
    
    // 确保首页内容立即显示（不应用动画）
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.remove('animate');
    }
}

// DOM 内容加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('作品集网站已加载');
    
    // 初始化主题
    initTheme();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 获取DOM元素
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const ctaButton = document.getElementById('cta-button');
    const contactForm = document.getElementById('contact-form');
    
    // 移动端导航菜单切换
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            // 切换导航菜单显示
            navLinks.classList.toggle('active');
            
            // 汉堡菜单动画
            burger.classList.toggle('toggle');
        });
    }
    
    // CTA按钮点击事件
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // 滚动到项目区域
            document.getElementById('projects').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // 添加点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // 联系表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟表单提交（实际项目中这里应该是AJAX请求）
            console.log('表单提交数据:', { name, email, message });
            alert('消息已发送！感谢您的联系。');
            
            // 重置表单
            this.reset();
        });
    }
    
    // 导航链接点击处理 - 平滑滚动
    const navAnchors = document.querySelectorAll('.nav-links a');
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 计算偏移量（考虑固定导航栏的高度）
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 移动端点击后关闭菜单
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });
    
    // 滚动时添加导航栏阴影效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
    
    // 项目卡片悬停效果增强
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // 页面加载动画 - 修复闪烁问题
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // 确保首页内容立即显示
        const heroSection = document.querySelector('.hero');
        if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight) {
            heroSection.classList.add('active');
        }
    }, 50);
});

// 页面加载时设置初始透明度
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// 响应式检测
function checkScreenSize() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    if (window.innerWidth > 768) {
        // 桌面端：确保导航菜单可见
        if (navLinks) navLinks.classList.remove('active');
        if (burger) burger.classList.remove('toggle');
    }
}

// 窗口大小改变时检测
window.addEventListener('resize', checkScreenSize);

// 页面加载时执行一次检测
window.addEventListener('load', checkScreenSize);

// 移动端导航改进
function initMobileNavigation() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        // 点击导航链接后自动关闭菜单
        const navAnchors = navLinks.querySelectorAll('a');
        navAnchors.forEach(anchor => {
            anchor.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('toggle');
                }
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !burger.contains(e.target) && 
                !navLinks.contains(e.target) &&
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    }
}

// 表单增强功能
function enhanceForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // 实时表单验证
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && this.value.trim() === '') {
                    this.classList.add('error');
                }
            });
        });
        
        // 添加错误样式
        const style = document.createElement('style');
        style.textContent = `
            .contact-form input.error,
            .contact-form textarea.error {
                border-color: #dc3545;
                box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    enhanceForm();
});