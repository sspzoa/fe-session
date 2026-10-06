# 작업 지침

- React + JavaScript + Vite 프로젝트입니다. 라이브러리는 TanStack Router·Query, Zustand, ky, Panda CSS를 사용합니다. 새 라이브러리나 TypeScript는 요청받지 않는 한 도입하지 않습니다.
- 작업 전 관련 파일을 읽고 사용자가 만든 변경을 보존합니다. README.md는 별도 요청 없이 수정하지 않습니다.
- Bun을 사용합니다. 의존성을 바꾸면 `package.json`과 `bun.lock`을 함께 갱신합니다. `node_modules/`, `dist/`, `styled-system/`은 직접 편집하지 않습니다.

## 코드 위치

- `src/main.jsx`: React 진입점과 Panda CSS 레이어 로드.
- `src/App.jsx`: QueryClient와 RouterProvider를 조합하는 앱 루트.
- `src/router.jsx`: 코드 기반 TanStack Router 설정.
- `src/routes/posts/`: 게시글 목록 및 상세 route.
- `src/routes/posts/-post-form/`: 작성·수정 폼, 초안 저장소, 폼 상태 훅.
- `src/routes/posts/-queries.js`: 게시글 TanStack Query 조회·변경 훅. 서버 데이터를 Zustand에 복제하지 않습니다.
- `src/routes/posts/-style.js`: 게시글 route에서 사용하는 Panda CSS 스타일.
- `src/api/posts.js`: 게시글 ky HTTP 요청.
- `src/index.css`: Panda 레이어 및 전역 기본 스타일. 실제 데이터는 프로젝트 루트의 `db.json`에 저장합니다.
- 기존처럼 작은따옴표와 세미콜론 없는 JavaScript 스타일을 사용합니다. 단순 계산값은 상태로 중복 보관하지 않습니다.

## 구조

- Route 전용 코드는 route 가까이에 둡니다. 다른 route에서도 실제로 공유될 때만 공용 코드로 승격합니다.
- 경로와 디렉터리 이름은 kebab-case를 사용합니다. 여러 파일로 구성된 컴포넌트는 디렉터리로 묶습니다.

## 검증

- 코드나 의존성 변경 후 `bun run lint`와 `bun run build`를 실행합니다.
- API 변경은 요청과 오류를, 화면 변경은 가능하면 실제 브라우저 상호작용을 확인합니다.
- 확인하지 못한 검증은 완료했다고 보고하지 않습니다.
