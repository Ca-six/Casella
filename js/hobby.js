document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav a');
    let isScrolling = false; // 防止快速滚动时多次触发

    // 监听滚动事件
    document.addEventListener('scroll', () => {
        if (isScrolling) return; // 如果正在滚动，跳过
        updateActiveSection();
    });

    // 监听滚轮事件
    document.addEventListener('wheel', (e) => {
        if (isScrolling) return; // 如果正在滚动，跳过

        if (e.deltaY > 0) {
            // 向下滚动，切换到下一个 section
            scrollToNextSection();
        } else if (e.deltaY < 0) {
            // 向上滚动，切换到上一个 section
            scrollToPreviousSection();
        }
    }, { passive: true });

    // 导航栏点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            scrollToSection(targetSection);
        });
    });

    // 更新当前激活的 section
    function updateActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // 更新导航栏状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    // 滚动到下一个 section
    function scrollToNextSection() {
        const currentSection = document.querySelector('.page.active');
        const nextSection = currentSection.nextElementSibling;

        if (nextSection && nextSection.classList.contains('page')) {
            scrollToSection(nextSection);
        }
    }

    // 滚动到上一个 section
    function scrollToPreviousSection() {
        const currentSection = document.querySelector('.page.active');
        const previousSection = currentSection.previousElementSibling;

        if (previousSection && previousSection.classList.contains('page')) {
            scrollToSection(previousSection);
        }
    }

    // 滚动到指定 section
    function scrollToSection(section) {
        isScrolling = true; // 标记正在滚动
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // 滚动结束后更新状态
        setTimeout(() => {
            isScrolling = false;
            updateActiveSection();
        }, 500); // 500ms 是滚动动画的持续时间
    }

    // 初始化页面时设置第一个 section 为 active
    sections[0].classList.add('active');
    updateActiveSection();
});
