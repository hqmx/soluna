# SOLUNA 프로젝트 가이드 (GEMINI)

이 문서는 SOLUNA 프로젝트의 구조, 설정, 배포 및 유지보수에 대한 포괄적인 가이드를 제공합니다.

## 1. 프로젝트 개요

SOLUNA는 Next.js 기반의 웹 애플리케이션으로, 요가 및 웰니스 관련 서비스를 소개하는 플랫폼입니다.

### 기술 스택
- **Framework**: Next.js 15.1.8 (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: React Icons
- **Maps**: @googlemaps/react-wrapper
- **Animation**: Framer Motion
- **Video**: next-video
- **Deployment**: AWS EC2 (Ubuntu), PM2, Nginx

## 2. 프로젝트 구조

```
soluna/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx            # 메인 페이지 (섹션 조합)
│   ├── globals.css         # 전역 스타일
│   └── api/contact/        # 이메일 전송 API
├── components/             # UI 컴포넌트
│   ├── Hero.tsx            # 히어로 섹션 (동영상 배경)
│   ├── About.tsx           # 소개 섹션
│   ├── PhotoCards.tsx      # 포토 카드 그리드
│   ├── Contact.tsx         # 문의 폼
│   ├── GoogleMap.tsx       # 구글 맵 연동
│   ├── SocialLinks.tsx     # 소셜 미디어 링크
│   └── Footer.tsx          # 푸터
├── public/                 # 정적 파일
│   ├── images/             # 이미지 리소스
│   └── videos/             # 동영상 리소스
├── deploy-to-ec2.sh        # 자동 배포 스크립트
├── hqmx-ec2.pem            # EC2 접속 키
├── next.config.ts          # Next.js 설정
├── tailwind.config.ts      # Tailwind 설정
└── package.json            # 의존성 및 스크립트
```

## 3. 개발 및 빌드 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

## 4. 배포 정보 (AWS EC2, GitHub)

### 서버 접속 정보
- **IP**: 54.221.145.100
- **Domain**: https://soluna.hqmx.net
- **User**: ubuntu
- **Key**: `hqmx-ec2.pem`

- **Repository**: https://github.com/hqmx/soluna.git

### 배포 프로세스

#### 자동 배포
프로젝트 루트에서 다음 스크립트를 실행하면 자동으로 빌드 및 배포가 진행됩니다.
```bash
./deploy-to-ec2.sh
```

#### 수동 배포 절차
1. **프로젝트 전송**:
   ```bash
   scp -i hqmx-ec2.pem -r . ubuntu@54.221.145.100:~/soluna/
   ```
2. **서버 접속 및 빌드**:
   ```bash
   ssh -i hqmx-ec2.pem ubuntu@54.221.145.100
   cd ~/soluna
   npm install
   npm run build
   pm2 restart soluna
   ```

### 서버 구성 요소
- **PM2**: Node.js 애플리케이션 프로세스 관리
    - `pm2 list`: 상태 확인
    - `pm2 logs soluna`: 로그 확인
    - `pm2 restart soluna`: 재시작
- **Nginx**: 리버스 프록시 및 SSL 처리
    - 설정 파일: `/etc/nginx/sites-available/soluna`
    - `sudo systemctl status nginx`: 상태 확인
    - `sudo systemctl reload nginx`: 설정 리로드
- **SSL**: Let's Encrypt (Certbot)
    - 자동 갱신 설정됨
    - 인증서 경로: `/etc/letsencrypt/live/soluna.hqmx.net/`

## 5. 주요 수정 가이드

### 컨텐츠 수정
- **텍스트/이미지**: `components/` 내의 해당 컴포넌트 파일 수정
- **포토카드**: `components/PhotoCards.tsx` 내 `photos` 배열 수정
- **소셜 링크**: `components/SocialLinks.tsx` 내 `socialLinks` 배열 수정

### 디자인 수정
- **색상/폰트**: `tailwind.config.ts` 수정
    - Primary Color: `#e44d97` (Pink)
    - Fonts: Geist Sans, Geist Mono, Montserrat
- **스타일**: 각 컴포넌트 내 Tailwind 클래스 수정

### 미디어 관리
- **이미지**: `public/images/`에 저장 (권장: 1200x900, JPG/WebP)
- **동영상**: `public/videos/`에 저장 (권장: 1920x1080, MP4, H.264)

## 6. 트러블슈팅

### 배포 후 변경사항 미반영
- 브라우저 캐시 삭제 또는 강력 새로고침 (Cmd+Shift+R)
- EC2 서버에서 `pm2 restart soluna` 실행 확인

### 서버 접속 불가
- EC2 인스턴스 상태 확인 (AWS Console)
- 보안 그룹(Security Group) 포트 확인 (80, 443, 3000, 22)

### 빌드 에러
- 로컬에서 `npm run build`로 미리 확인
- Node.js 버전 확인 (v20.x 권장)
