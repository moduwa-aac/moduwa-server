# moduwa-server
본 레포지토리는 **모두와 AAC 서비스의 백엔드 서버**로, Node.js 기반 RESTful API와 AI 연동 로직을 담당합니다.

## 📄 Description
모두와 AAC 서버는 사용자의 의사 표현을 돕기 위해
다음과 같은 핵심 기능을 제공합니다.
- 🧠 AI 문장 추천 및 예측
- ✍️ 문장 스타일 변환 (존댓말 / 반말, 어미 카드 등)
- 🔊 TTS(Text-to-Speech) 음성 생성
- 📚 대화·학습 히스토리 관리
- ⚙️ 사용자 설정 및 개인화 관리
- 🔐 JWT / OAuth 기반 인증

## 📚 Tech Stack
### Backend
- Node.js
- Express.js
- RESTful API
###  Database
- MySQL
- Prisma ORM
### Auth / Security
- JWT
- OAuth (Google / Kakao / Naver)
### AI / Media
- AI Prediction Server 연동 (FastAPI)
- TTS(Text-to-Speech)
### DevOps / Docs
- Docker / Docker Compose
- Swagger(OpenAPI)
- AWS EC2 / S3

## 📁 Project Structure
```
moduwa-server
├── .github/              # GitHub Actions 등 CI/CD 워크플로우
├── .vscode/              # VS Code 개발 환경 설정 (launch, settings 등)
├── fastapi-server/       # FastAPI 기반 AI 서버 (예측/스타일변환 등 연동 모듈)
├── prisma/               # Prisma 스키마/마이그레이션
├── src/                  # ✨ Node.js(Express) 메인 서버 소스
│   ├── ai-prediction/    # 🧠 AI 문장 예측 및 추천
│   │   ├── controllers
│   │   ├── dto
│   │   ├── middlewares
│   │   ├── repositories
│   │   ├── routes
│   │   └── services
│   ├── auth/             # 🔐 인증/인가 (JWT, OAuth)
│   ├── words/            # 📝 단어/문장 카드 관리
│   ├── tts/              # 🔊 TTS 처리
│   ├── history/          # 📚 대화/학습 히스토리
│   ├── routine/          # 🔁 반복 문장/루틴
│   ├── order/            # 🧾 주문/결제(확장 고려)
│   ├── category/         # 🗂️ 카테고리
│   ├── settings/         # ⚙️ 사용자 설정
│   ├── config/           # ⚙️ 서버 설정 모듈
│   ├── errors/           # ❗ 전역 에러 정의/처리
│   ├── swagger/          # 📖 Swagger 문서 설정
│   ├── utils/            # 🛠️ 공용 유틸
│   └── common/           # 🧩 공통 로직 (공용 함수/헬퍼)
│       └── utils
│
├── .dockerignore         # Docker 빌드 제외 파일 목록
├── .env.example          # 환경 변수 예시 템플릿
├── .gitignore            # Git 추적 제외 파일 목록
├── Dockerfile            # 백엔드 서버 Docker 이미지 빌드 파일
├── docker-compose.yml    # 로컬 개발용 멀티 컨테이너 구성
├── package.json          # 프로젝트 설정/의존성/스크립트
├── package-lock.json     # 의존성 버전 잠금
└── README.md             # 프로젝트 문서
```

## 🏗️ Server Architecture
<img width="1980" height="900" alt="aac drawio" src="https://github.com/user-attachments/assets/3a74d60c-26f6-4022-a48c-4c3d1d5371a6" />

---


## 🚀 빠른 시작

### 1. 필수 프로그램 설치

- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **Node.js 18+** (선택, 로컬 개발 시)

## 3. 환경변수 설정
```bash
# .env 파일 생성
cp .env.example .env

# .env 파일은 그대로 사용 (개발 환경)
# OAuth 키는 나중에 추가
```

### 4. Docker 실행
```bash
# Docker Desktop 실행 확인 후
docker-compose up -d

# 최초 실행: 5-10분 소요 (이미지 다운로드)
```

### 5. 데이터베이스 테이블 생성
```bash
# Backend 컨테이너에서 Prisma 실행
docker-compose exec backend npx prisma db push

# 성공 메시지:
# ✔ Your database is now in sync with your Prisma schema.
```
## 📂 Branch Convention
| 브랜치                       | 설명                                          |
| ------------------------- | ------------------------------------------- |
| `main`                    | 배포용 브랜치      |
| `develop`                 | 기능 개발 통합 브랜치 |
| `feature/{이슈번호}-{간단한설명}`  | 새로운 기능 개발 브랜치                               |
| `fix/{이슈번호}-{간단한설명}`      | 버그 수정 브랜치                                   |
| `hotfix/{이슈번호}-{간단한설명}`   | 긴급 수정 브랜치                                   |
| `refactor/{이슈번호}-{간단한설명}` | 리팩토링 브랜치                                    |
| `chore/{이슈번호}-{간단한설명}`    | 기타 설정, 패키지 변경 등                             |

## 📌 Commit Convention
| 타입 | 설명 |
| --- | --- |
| `[feat]` | 새로운 기능 |
| `[fix]` | 버그 수정 |
| `[hotfix]` | 긴급 버그 수정 |
| `[refactor]` | 코드 리팩토링 |
| `[chore]` | 설정/패키지 변경 |
| `[docs]` | 문서 수정 |
| `[add]` | 파일/라이브러리 추가 |
| `[del]` | 코드 삭제 |

## 🗨️ Commit Message
```
형식: #이슈번호 [타입]: 변경 요약

예시:
#12 [feat]: 로그인 API 구현
#17 [fix]: CORS 에러 수정
#20 [chore]: 환경변수 설정 추가
```
