document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ハンバーガーメニュー制御 ---
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-list a');

    const toggleMenu = (isOpen) => {
        menuOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuOpenBtn?.addEventListener('click', () => toggleMenu(true));
    menuCloseBtn?.addEventListener('click', () => toggleMenu(false));
    menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // --- 2. カルーセル制御 ---
    const figuresGroup = document.querySelector('.figures');
    const slides = document.querySelectorAll('.figures figure');
    // HTML側でIDが重複しないよう修正した前提
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIdx = 0;

    const moveSlide = () => {
        if (!slides.length) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        figuresGroup.style.transform = `translateX(${-currentIdx * slideWidth}px)`;
    };

    nextBtn?.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % slides.length;
        moveSlide();
    });

    prevBtn?.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + slides.length) % slides.length;
        moveSlide();
    });

    // 画面サイズ変更時にズレを補正
    window.addEventListener('resize', moveSlide);

    // --- 3. スムーズスクロール ---
    document.querySelector('.top-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// --- 4. スクロールによる表示制御 ---
window.addEventListener('scroll', () => {
    const footerActions = document.querySelector('.fixed-footer-actions');
    const footer = document.querySelector('footer');
    if (!footerActions || !footer) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const vh = window.innerHeight;

    // フッターの「ブラウザ表示領域の上端からの距離」を取得
    const footerRect = footer.getBoundingClientRect();
    const footerTop = footerRect.top;

    // --- A. 表示・非表示の判定 (300px以上スクロール) ---
    if (scrollY > 300) {
        footerActions.classList.add('show');

        // --- B. フッターに接触したかどうかの判定 ---
        // フッターが画面内に入ってきたら at-bottom を付与
        if (footerTop <= vh) {
            footerActions.classList.add('at-bottom');
        } else {
            footerActions.classList.remove('at-bottom');
        }
    } else {
        // 300px未満は非表示
        footerActions.classList.remove('show');
        footerActions.classList.remove('at-bottom');
    }

    if (footerRect.top < windowHeight) {
        // フッターが画面内に入ってきたら
        cta.classList.add('is-stopped');
        // bodyに対してabsoluteになるため、footerの直前に配置される
    } else {
        cta.classList.remove('is-stopped');
    }

});