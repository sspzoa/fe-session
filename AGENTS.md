# 작업 지침

- React + JavaScript + Vite 프로젝트입니다. 라이브러리는 TanStack Router·Query, Zustand, ky, Panda CSS를 사용합니다. 새 라이브러리나 TypeScript는 요청받지 않는 한 도입하지 않습니다.
- 작업 전 관련 파일을 읽고 사용자가 만든 변경을 보존합니다. README.md는 별도 요청 없이 수정하지 않습니다.
- Bun을 사용합니다. 의존성을 바꾸면 `package.json`과 `bun.lock`을 함께 갱신합니다. `node_modules/`, `dist/`, `styled-system/`은 직접 편집하지 않습니다.

## 코드 위치

- `src/main.jsx`: React 진입점과 Panda CSS 레이어 로드.
- `src/App.jsx`: 코드 기반 TanStack Router 설정과 QueryClient 제공.
- `src/feature/post/pages/`: 목록 및 상세 화면.
- `src/feature/post/components/PostForm.jsx`: 두 화면에서 사용하는 작성·수정 폼.
- `src/feature/post/hooks/usePosts.js`: TanStack Query 조회·변경 훅. 서버 데이터를 Zustand에 복제하지 않습니다.
- `src/feature/post/lib/postApi.js`: ky HTTP 요청.
- `src/feature/post/store/usePostDraftStore.js`: 작성·수정 폼 초안만 관리.
- `src/feature/post/styles/postStyles.js`: 여러 화면에서 쓰는 Panda CSS 스타일.
- `src/index.css`: Panda 레이어 및 전역 기본 스타일. 실제 데이터는 프로젝트 루트의 `db.json`에 저장합니다.
- 기존처럼 작은따옴표와 세미콜론 없는 JavaScript 스타일을 사용합니다. 단순 계산값은 상태로 중복 보관하지 않습니다.

## 검증

- 코드나 의존성 변경 후 `bun run lint`와 `bun run build`를 실행합니다.
- API 변경은 요청과 오류를, 화면 변경은 가능하면 실제 브라우저 상호작용을 확인합니다.
- 확인하지 못한 검증은 완료했다고 보고하지 않습니다.
