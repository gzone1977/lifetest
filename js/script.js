document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const fullScreenNav = document.querySelector(".full-screen-nav");
    const closeButton = document.querySelector(".close-button");
    const ctaButton = document.querySelector(".cta-button");
    const quizSection = document.getElementById("quiz-section");
    const resultSection = document.getElementById("result-section");
    const loadingOverlay = document.querySelector(".loading-overlay");

    // 햄버거 메뉴 토글
    hamburgerMenu.addEventListener("click", () => {
        fullScreenNav.classList.toggle("open");
    });

    closeButton.addEventListener("click", () => {
        fullScreenNav.classList.remove("open");
    });

    // 결과 보기 버튼 클릭 이벤트
    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            // 1. 질문 화면 숨기기
            if (quizSection) quizSection.style.display = "none";

            // 2. 로딩 애니메이션 표시
            if (loadingOverlay) loadingOverlay.classList.add("show");

            // 3. 3초 후 결과 화면 표시
            setTimeout(() => {
                if (loadingOverlay) loadingOverlay.classList.remove("show");
                if (resultSection) resultSection.style.display = "block";
            }, 3000);
        });
    }
});
