# SOLUNA - 요가 스튜디오 웹사이트

프라이빗 요가 스튜디오 SOLUNA의 공식 웹사이트입니다.

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Video**: Next-Video
- **i18n**: Next-Intl (다국어 지원)

## 📁 프로젝트 구조

```
soluna/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── contact/       # 이메일 폼 API
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── Hero.tsx          # 히어로 섹션 (동영상 배경)
│   ├── About.tsx         # 소개 섹션
│   ├── PhotoCards.tsx    # 포토 카드 그리드
│   ├── Contact.tsx       # 문의 폼
│   ├── GoogleMap.tsx     # 구글 맵
│   ├── SocialLinks.tsx   # 소셜 미디어 링크
│   └── Footer.tsx        # 푸터
├── public/
│   ├── videos/           # 동영상 파일
│   └── images/           # 이미지 파일
└── messages/             # 다국어 번역 파일 (향후 추가)
```

## 🎨 주요 기능

### ✅ 구현 완료
- ✨ 동영상 배경 히어로 섹션 (full width)
- 📱 완전 반응형 디자인 (모바일 최적화)
- 🖼️ 포토 카드 그리드 레이아웃
- 📧 이메일 문의 폼
- 🗺️ 구글 맵 통합
- 🔗 소셜 미디어 링크 (Instagram, Note, Threads, 네이버 블로그)
- 🎭 부드러운 애니메이션 효과

### 🔄 추가 설정 필요
- 🎥 **동영상 파일 추가**: `public/videos/hero-video.mp4`
- 🖼️ **이미지 파일 추가**: `public/images/` (아래 참조)
- 📧 **이메일 전송 설정**: API 키 구성 (아래 참조)
- 🗺️ **구글 맵 좌표**: 실제 스튜디오 위치로 변경

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 프로덕션 빌드
```bash
npm run build
npm start
```

## 📸 이미지 파일 추가하기

다음 이미지 파일들을 준비해서 `public/images/` 폴더에 추가하세요:

```
public/images/
├── hero-poster.jpg          # 히어로 섹션 포스터 (1920x1080 권장)
├── yoga-1.jpg              # 하타 요가 (800x600 권장)
├── yoga-2.jpg              # 빈야사 플로우 (800x600 권장)
├── yoga-3.jpg              # 회복 요가 (800x600 권장)
├── yoga-4.jpg              # 명상과 호흡 (800x600 권장)
├── yoga-5.jpg              # 스트레칭 (800x600 권장)
└── yoga-6.jpg              # 개인 세션 (800x600 권장)
```

**이미지 최적화 팁:**
- WebP 또는 JPEG 형식 권장
- 파일 크기: 200KB 이하 (품질 유지하면서 압축)
- 권장 도구: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

## 🎥 동영상 파일 추가하기

히어로 섹션 배경 동영상을 준비하세요:

```
public/videos/
└── hero-video.mp4          # 히어로 배경 동영상
```

**동영상 최적화 팁:**
- 해상도: 1920x1080 (Full HD)
- 길이: 10-30초 (루프 재생)
- 코덱: H.264 (MP4)
- 파일 크기: 5MB 이하 권장
- 최적화 도구: [HandBrake](https://handbrake.fr/), [FFmpeg](https://ffmpeg.org/)

**FFmpeg 최적화 명령어:**
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1920:1080 -b:v 2M public/videos/hero-video.mp4
```

## 📧 이메일 전송 설정

Contact 폼에서 이메일을 실제로 전송하려면 다음 중 하나를 선택하세요:

### 옵션 1: Resend (권장)
```bash
npm install resend
```

`.env.local` 파일 생성:
```env
RESEND_API_KEY=your_api_key_here
```

`app/api/contact/route.ts` 수정:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// POST 함수 내에서
await resend.emails.send({
  from: 'SOLUNA <noreply@yourdomain.com>',
  to: 'your-email@example.com',
  subject: `[SOLUNA] ${name}님의 문의`,
  html: `
    <h2>새로운 문의가 도착했습니다</h2>
    <p><strong>이름:</strong> ${name}</p>
    <p><strong>이메일:</strong> ${email}</p>
    <p><strong>전화번호:</strong> ${phone || '미제공'}</p>
    <p><strong>문의 내용:</strong></p>
    <p>${message}</p>
  `,
});
```

### 옵션 2: Nodemailer (SMTP)
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

`.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 옵션 3: SendGrid
```bash
npm install @sendgrid/mail
```

`.env.local`:
```env
SENDGRID_API_KEY=your_api_key_here
```

## 🗺️ 구글 맵 설정

`components/GoogleMap.tsx`에서 실제 스튜디오 좌표로 변경하세요:

1. [Google Maps](https://www.google.com/maps)에서 스튜디오 위치 검색
2. 좌표 확인 (위도, 경도)
3. 파일에서 다음 부분 수정:

```typescript
const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.289!2d[경도]!3d[위도]!...`;
```

또는 [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)에서 embed 코드 생성

## 🌐 다국어 지원 (향후 추가)

현재는 한국어로만 구성되어 있습니다. 일본어/영어 지원을 추가하려면:

1. `messages/` 폴더에 번역 파일 추가:
   - `messages/ko.json`
   - `messages/ja.json`
   - `messages/en.json`

2. `next-intl` 설정 추가

3. 각 컴포넌트에서 `useTranslations` 훅 사용

## 🎨 커스터마이징

### 색상 변경
`tailwind.config.ts`에서 primary 색상 커스터마이징:

```typescript
colors: {
  primary: {
    50: '#your-color',
    // ... 다른 shade
  },
}
```

### 폰트 변경
`app/layout.tsx`에서 Google Fonts 변경 가능

### 섹션 순서 변경
`app/page.tsx`에서 컴포넌트 순서 조정

## 📱 반응형 브레이크포인트

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 배포

### Vercel (권장)
```bash
npm install -g vercel
vercel
```

### 기타 플랫폼
- Netlify
- AWS Amplify
- Google Cloud Run

## 📝 라이선스

© 2024 SOLUNA. All rights reserved.

## 📞 문의

웹사이트 관련 문의: contact@soluna-yoga.com
