// 页面加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
     // 移动菜单切换
     const menuToggle = document.querySelector('.menu-toggle');
     const navLinks = document.querySelector('.nav-links');
     
     menuToggle.addEventListener('click', function() {
         navLinks.classList.toggle('active');
         // 汉堡菜单动画效果
         this.classList.toggle('active');
     });
     
     // 点击导航链接关闭移动菜单
     const links = document.querySelectorAll('.nav-links a');
     links.forEach(link => {
         link.addEventListener('click', () => {
             navLinks.classList.remove('active');
             menuToggle.classList.remove('active');
         });
     });
     
     // 平滑滚动
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();
             
             const targetId = this.getAttribute('href');
             const targetElement = document.querySelector(targetId);
             
             if (targetElement) {
                 window.scrollTo({
                     top: targetElement.offsetTop - 80, // 减去导航栏高度
                     behavior: 'smooth'
                 });
             }
         });
     });
     
     // 表单验证
     const contactForm = document.querySelector('.contact-form form');
     if (contactForm) {
         contactForm.addEventListener('submit', function(e) {
             e.preventDefault();
             
             // 简单的表单验证
             const name = document.getElementById('name').value.trim();
             const email = document.getElementById('email').value.trim();
             const message = document.getElementById('message').value.trim();
             
             let isValid = true;
             let errorMessage = '';
             
             if (!name) {
                 isValid = false;
                 errorMessage += '请输入您的姓名\n';
             }
             
             if (!email) {
                 isValid = false;
                 errorMessage += '请输入您的邮箱\n';
             } else if (!validateEmail(email)) {
                 isValid = false;
                 errorMessage += '请输入有效的邮箱地址\n';
             }
             
             if (!message) {
                 isValid = false;
                 errorMessage += '请输入您的留言\n';
             }
             
             if (isValid) {
                 // 模拟表单提交
                 alert('感谢您的留言！表单已提交。');
                 contactForm.reset();
             } else {
                 alert(errorMessage);
             }
         });
     }
     
     // 邮箱验证函数
     function validateEmail(email) {
         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return re.test(email);
     }
     
     // 深色模式切换功能
     const themeToggle = document.getElementById('theme-toggle');
     const storedTheme = localStorage.getItem('theme');
     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

     // 设置初始主题
     if (storedTheme) {
         document.body.classList.toggle('dark-theme', storedTheme === 'dark');
     } else if (prefersDarkMode) {
         document.body.classList.add('dark-theme');
         localStorage.setItem('theme', 'dark');
     }

     // 更新主题切换按钮图标
     function updateThemeIcon() {
         const isDark = document.body.classList.contains('dark-theme');
         themeToggle.innerHTML = isDark 
             ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
             : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
     }

     // 初始更新图标
     updateThemeIcon();

     // 主题切换事件监听
     themeToggle.addEventListener('click', function() {
         const isDark = document.body.classList.toggle('dark-theme');
         localStorage.setItem('theme', isDark ? 'dark' : 'light');
         updateThemeIcon();
     });

     // 导航栏滚动效果
     window.addEventListener('scroll', function() {
         const nav = document.querySelector('nav');
         const isDark = document.body.classList.contains('dark-theme');
         
         if (window.scrollY > 50) {
             if (isDark) {
                 nav.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
             } else {
                 nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
             }
             nav.style.boxShadow = isDark 
                 ? '0 2px 15px rgba(0, 0, 0, 0.3)' 
                 : '0 2px 15px rgba(0, 0, 0, 0.1)';
         } else {
             nav.style.backgroundColor = '';
             nav.style.boxShadow = '';
         }
     });
     
     // 为作品项目添加简单的悬停效果
     const workItems = document.querySelectorAll('.work-item');
     workItems.forEach(item => {
         item.addEventListener('mouseenter', function() {
             const img = this.querySelector('.work-img');
             img.style.transform = 'scale(1.05)';
             img.style.transition = 'transform 0.3s ease';
         });
         
         item.addEventListener('mouseleave', function() {
             const img = this.querySelector('.work-img');
             img.style.transform = 'scale(1)';
         });
     });
     
     // 监听窗口大小变化，确保响应式布局正确显示
     window.addEventListener('resize', function() {
         if (window.innerWidth > 768) {
             navLinks.classList.remove('active');
             menuToggle.classList.remove('active');
         }
     });
     
     // 为按钮添加点击波纹效果
     const buttons = document.querySelectorAll('.btn');
     buttons.forEach(button => {
         button.addEventListener('click', function(e) {
             const circle = document.createElement('span');
             const diameter = Math.max(button.clientWidth, button.clientHeight);
             const radius = diameter / 2;
             
             circle.style.width = circle.style.height = `${diameter}px`;
             circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
             circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
             circle.classList.add('ripple');
             
             const ripple = button.getElementsByClassName('ripple')[0];
             if (ripple) {
                 ripple.remove();
             }
             
             button.appendChild(circle);
         });
     });
     
     // 初始化页面时触发一次滚动事件，确保导航栏状态正确
     window.dispatchEvent(new Event('scroll'));
 });