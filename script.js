document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const introSection = document.getElementById('intro');
    const lessons = document.querySelectorAll('.lesson');
    const nextButtons = document.querySelectorAll('.next-button');

    let currentLessonIndex = -1; // -1은 인트로 페이지를 의미

    // 모든 레슨 섹션을 숨깁니다.
    function hideAllLessons() {
        lessons.forEach(lesson => {
            lesson.classList.add('hidden');
        });
    }

    // 특정 레슨 섹션을 보여줍니다.
    function showLesson(lessonId) {
        hideAllLessons();
        const targetLesson = document.getElementById(lessonId);
        if (targetLesson) {
            targetLesson.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 새 페이지로 이동 시 맨 위로 스크롤
    }

    // '수업 시작하기' 버튼 클릭 이벤트
    startButton.addEventListener('click', (event) => {
        // 만약 '처음으로 돌아가기' 버튼이면 인트로로 이동
        if (event.target.textContent === '처음으로 돌아가기') {
            currentLessonIndex = -1;
            introSection.classList.remove('hidden');
            hideAllLessons();
        } else { // '수업 시작하기' 버튼이면 첫 번째 레슨으로 이동
            introSection.classList.add('hidden');
            currentLessonIndex = 0;
            showLesson('lesson1');
        }
    });

    // '다음 차시로 이동' 버튼 클릭 이벤트
    nextButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const nextLessonId = event.target.dataset.nextLesson;
            if (nextLessonId === 'end') {
                currentLessonIndex = -1; // 끝 페이지도 초기화로 취급
                showLesson('end');
            } else {
                currentLessonIndex++;
                showLesson(nextLessonId);
            }
        });
    });

    // 초기 상태: 인트로만 보여주고 나머지 숨기기
    hideAllLessons();
    introSection.classList.remove('hidden');
});