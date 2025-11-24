#!/bin/bash

# SOLUNA EC2 배포 스크립트
# 사용법: ./deploy-ec2.sh

echo "🚀 SOLUNA 배포 시작..."

# 1. 의존성 설치
echo "📦 패키지 설치 중..."
npm install

# 2. 프로덕션 빌드
echo "🔨 프로덕션 빌드 중..."
npm run build

# 3. PM2로 실행
echo "▶️  애플리케이션 시작 중..."

# PM2 확인
if ! command -v pm2 &> /dev/null
then
    echo "PM2가 설치되어 있지 않습니다. 설치 중..."
    sudo npm install -g pm2
fi

# 기존 프로세스 중지 (있다면)
pm2 delete soluna 2>/dev/null || true

# 새로 시작
pm2 start npm --name "soluna" -- start

# PM2 저장
pm2 save

echo "✅ 배포 완료!"
echo "🌐 앱 URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo ""
echo "유용한 명령어:"
echo "  pm2 list        - 실행 중인 앱 확인"
echo "  pm2 logs soluna - 로그 확인"
echo "  pm2 restart soluna - 재시작"
echo "  pm2 stop soluna - 중지"
