document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const fullScreenNav = document.querySelector(".full-screen-nav");
    const closeButton = document.querySelector(".close-button");
    const ctaButton = document.querySelector(".cta-button");
    const quizSection = document.getElementById("quiz-section");
    const resultSection = document.getElementById("result-section");
    const loadingOverlay = document.querySelector(".loading-overlay");
    const questionContainer = document.querySelector(".question-container");
    const progressBar = document.getElementById("progress-bar");

    let currentQuestionIndex = 0;
    let currentScore = 0;

    const questions = [
        {
            question: "1. 불합리한 일을 겪으면 참지 못하고 바로 화를 낸다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "2. 화가 나면 물건을 집어 던지거나 부순 적이 있다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "3. 다른 사람이 내 말을 따르지 않으면 짜증이 난다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "4. 화가 나면 폭언이나 욕설을 하는 경우가 있다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "5. 운전 중 다른 차량이 방해하면 분노를 느낀다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "6. 사소한 실수에도 스스로에게 크게 화를 낸다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "7. 화가 나면 얼굴이 붉어지거나 심장이 빨리 뛰는 등 신체 반응이 나타난다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "8. 과거의 불쾌한 기억 때문에 현재까지도 화가 난다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "9. 화가 나면 주변 사람들에게 비난하거나 공격적인 말을 한다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        },
        {
            question: "10. 나의 분노 때문에 대인 관계에 문제가 생긴 적이 있다.",
            options: [
                { text: "매우 그렇다", score: 3 },
                { text: "그렇다", score: 2 },
                { text: "보통이다", score: 1 },
                { text: "그렇지 않다", score: 0 }
            ]
        }
    ];

    const results = [
        {   // 0~5점
            title: "평온한 부처님",
            description: "당신은 마치 부처님과 같습니다. 어떤 상황에서도 평정심을 잃지 않고, 분노를 지혜롭게 다스릴 줄 아는 진정한 평화주의자입니다. 당신의 주변 사람들은 당신의 온화함에 항상 감동받을 것입니다.",
            image: "../images/result_buddha.png", // 임시 이미지
            type: "평화주의자"
        },
        {   // 6~10점
            title: "온화한 현자",
            description: "당신은 스트레스 상황에서도 비교적 침착하게 대처하는 현명한 사람입니다. 가끔은 화가 나지만, 금세 마음을 다잡고 해결책을 찾으려 노력합니다. 약간의 주의만 기울이면 완벽한 분노 조절 능력을 가질 수 있습니다.",
            image: "../images/result_sage.png", // 임시 이미지
            type: "현자"
        },
        {   // 11~15점
            title: "감정적인 예술가",
            description: "당신은 풍부한 감성을 가진 예술가와 같습니다. 감정 표현에 솔직하고 열정적이지만, 때로는 그 감정이 폭발적으로 나타나 주변을 놀라게 할 수 있습니다. 감정을 섬세하게 조절하는 방법을 배우면 더욱 멋진 사람이 될 것입니다.",
            image: "../images/result_artist.png", // 임시 이미지
            type: "감정적인 예술가"
        },
        {   // 16~20점
            title: "끓어오르는 화산",
            description: "당신 안에는 언제 폭발할지 모르는 뜨거운 화산이 잠재되어 있습니다. 작은 자극에도 쉽게 분노가 치밀어 오르고, 이를 통제하기 어려워 주변 사람들에게 상처를 줄 수 있습니다. 전문적인 상담이나 훈련을 통해 분노를 다스리는 방법을 배우는 것이 필요합니다.",
            image: "../images/result_volcano.png", // 임시 이미지
            type: "끓어오르는 화산"
        },
        {   // 21~30점
            title: "분노의 화신",
            description: "당신은 분노의 화신 그 자체입니다. 사소한 일에도 격렬하게 반응하며, 분노를 주체하지 못해 자신과 타인에게 큰 피해를 입힐 수 있습니다. 심각한 수준의 분노 조절 문제가 의심되므로, 반드시 전문가의 도움을 받는 것이 시급합니다.",
            image: "../images/result_incarnate.png", // 임시 이미지
            type: "분노의 화신"
        }
    ];

    // 햄버거 메뉴 토글
    hamburgerMenu.addEventListener("click", () => {
        fullScreenNav.classList.toggle("open");
    });

    closeButton.addEventListener("click", () => {
        fullScreenNav.classList.remove("open");
    });

    // 질문 렌더링 함수
    function renderQuestion() {
        const q = questions[currentQuestionIndex];
        if (!q) return;

        questionContainer.innerHTML = `
            <p class="question-text">${q.question}</p>
            <div class="options">
                ${q.options.map((option, index) => `<button class="option-button" data-score="${option.score}">${option.text}</button>`).join("")}
            </div>
        `;

        // 진행 바 업데이트
        updateProgressBar();

        // 선택지 버튼 이벤트 리스너 추가
        document.querySelectorAll(".option-button").forEach(button => {
            button.addEventListener("click", (event) => {
                // 이전 선택지 초기화
                document.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
                event.target.classList.add("selected");

                currentScore += parseInt(event.target.dataset.score);

                // 다음 질문으로 이동 또는 결과 보기 버튼 활성화
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        renderQuestion();
                    } else {
                        // 모든 질문 완료
                        questionContainer.innerHTML = 
                            `<p class="question-text">테스트가 완료되었습니다. 결과를 확인하세요!</p>`;
                        if (ctaButton) ctaButton.style.display = "block"; // 결과 보기 버튼 활성화
                    }
                }, 300); // 짧은 딜레이 후 다음 질문
            });
        });
    }

    // 진행 바 업데이트 함수
    function updateProgressBar() {
        if (progressBar) {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%;`;
        }
    }

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
                if (resultSection) {
                    resultSection.style.display = "block";
                    displayResult();
                }
            }, 3000);
        });
    }

    // 결과 표시 함수
    function displayResult() {
        let result = results[0]; // 기본값: 가장 낮은 점수 결과

        if (currentScore >= 21) { result = results[4]; } // 21~30
        else if (currentScore >= 16) { result = results[3]; } // 16~20
        else if (currentScore >= 11) { result = results[2]; } // 11~15
        else if (currentScore >= 6) { result = results[1]; } // 6~10
        // else: 0~5 (results[0])

        document.querySelector("#result-section h2").textContent = "당신의 분노 지수는?!";
        document.querySelector("#result-section .result-image-wrapper img").src = result.image;
        document.querySelector("#result-section .result-image-wrapper img").alt = result.title;
        document.querySelector("#result-section .result-description").textContent = result.description;
        document.querySelector("#result-section .result-type").textContent = `분노 지수: ${result.type} (${result.title})`;

        // 다른 콘텐츠 썸네일도 업데이트 (임시)
        document.querySelector(".explore-thumbnail img").src = "../images/anger_thumbnail.png";
        document.querySelector(".explore-thumbnail img").alt = "다른 콘텐츠";
        document.querySelector(".explore-text .explore-title").textContent = "다른 테스트 해보기";
        document.querySelector(".explore-text .explore-hook").textContent = "이것도 재밌어요!";
    }

    // 초기 질문 렌더링
    renderQuestion();

    // ctaButton 초기 숨김
    if (ctaButton) ctaButton.style.display = "none";
});
