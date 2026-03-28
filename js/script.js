document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const fullScreenNav = document.querySelector(".full-screen-nav");
    const closeButton = document.querySelector(".close-button");

    // 햄버거 메뉴 토글
    hamburgerMenu.addEventListener("click", () => {
        fullScreenNav.classList.toggle("open");
    });

    closeButton.addEventListener("click", () => {
        fullScreenNav.classList.remove("open");
    });

    // 결과 보기 버튼 클릭 이벤트 (예시)
    const ctaButton = document.querySelector(".cta-button");
    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            alert("결과 보기를 클릭했습니다! (실제 로직은 여기에 구현)");
            // 여기에 전면광고 호출 로직 추가
            // 전면광고 로드 후 결과 페이지로 이동
        });
    }
});
