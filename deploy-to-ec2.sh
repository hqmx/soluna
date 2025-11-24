#!/bin/bash

# SOLUNA EC2 배포 스크립트
# EC2 IP: 54.221.145.100
# 도메인: https://soluna.hqmx.net

set -e  # 에러 발생 시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 설정
EC2_IP="54.221.145.100"
EC2_USER="ubuntu"
PEM_KEY="./hqmx-ec2.pem"
REMOTE_DIR="~/soluna"
LOCAL_DIR="."

echo -e "${GREEN}🚀 SOLUNA EC2 배포 시작${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. PEM 키 권한 확인
echo -e "${YELLOW}📋 1/6: PEM 키 권한 확인 중...${NC}"
if [ ! -f "$PEM_KEY" ]; then
    echo -e "${RED}❌ PEM 키 파일을 찾을 수 없습니다: $PEM_KEY${NC}"
    exit 1
fi

chmod 400 "$PEM_KEY"
echo -e "${GREEN}✓ PEM 키 권한 설정 완료${NC}"

# 2. EC2 연결 테스트
echo -e "${YELLOW}📋 2/6: EC2 연결 테스트 중...${NC}"
if ssh -i "$PEM_KEY" -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$EC2_USER@$EC2_IP" "echo 'Connection successful'" &>/dev/null; then
    echo -e "${GREEN}✓ EC2 연결 성공${NC}"
else
    echo -e "${RED}❌ EC2 연결 실패. IP 주소와 PEM 키를 확인하세요.${NC}"
    exit 1
fi

# 3. 로컬 빌드 확인
echo -e "${YELLOW}📋 3/6: 로컬에서 프로덕션 빌드 테스트 중...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ 로컬 빌드 성공${NC}"
else
    echo -e "${RED}❌ 로컬 빌드 실패${NC}"
    exit 1
fi

# 4. EC2에 디렉토리 생성
echo -e "${YELLOW}📋 4/6: EC2에 디렉토리 생성 중...${NC}"
ssh -i "$PEM_KEY" "$EC2_USER@$EC2_IP" "mkdir -p $REMOTE_DIR"
echo -e "${GREEN}✓ 디렉토리 생성 완료${NC}"

# 5. 파일 전송 (rsync 사용, node_modules 제외)
echo -e "${YELLOW}📋 5/6: 파일 전송 중... (시간이 걸릴 수 있습니다)${NC}"
rsync -avz --progress \
    -e "ssh -i $PEM_KEY" \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '*.log' \
    --exclude '.env*.local' \
    "$LOCAL_DIR/" "$EC2_USER@$EC2_IP:$REMOTE_DIR/"

echo -e "${GREEN}✓ 파일 전송 완료${NC}"

# 6. EC2에서 배포 실행
echo -e "${YELLOW}📋 6/6: EC2에서 애플리케이션 배포 중...${NC}"
ssh -i "$PEM_KEY" "$EC2_USER@$EC2_IP" << 'ENDSSH'
cd ~/soluna

# Node.js 및 npm 버전 확인
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 의존성 설치
echo "📦 패키지 설치 중..."
npm install --production=false

# 프로덕션 빌드
echo "🔨 프로덕션 빌드 중..."
npm run build

# PM2 설치 확인
if ! command -v pm2 &> /dev/null; then
    echo "PM2 설치 중..."
    sudo npm install -g pm2
fi

# PM2로 애플리케이션 실행
echo "🚀 애플리케이션 시작 중..."
pm2 delete soluna 2>/dev/null || true
pm2 start npm --name "soluna" -- start
pm2 save

# 상태 확인
pm2 list

echo "✅ 배포 완료!"
ENDSSH

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 배포가 성공적으로 완료되었습니다!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "🌐 접속 URL:"
echo "   - HTTP: http://$EC2_IP:3000"
echo "   - 도메인: https://soluna.hqmx.net"
echo ""
echo "📊 유용한 명령어:"
echo "   ssh -i $PEM_KEY $EC2_USER@$EC2_IP   # EC2 접속"
echo "   pm2 list                                    # 앱 상태 확인"
echo "   pm2 logs soluna                             # 로그 확인"
echo "   pm2 restart soluna                          # 재시작"
echo ""
