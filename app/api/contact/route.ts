import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 입력 유효성 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Nodemailer Transporter 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 이메일 옵션 설정
    const mailOptions = {
      from: process.env.GMAIL_USER, // 보내는 사람 (인증된 계정)
      to: process.env.GMAIL_USER,   // 받는 사람 (관리자)
      replyTo: email,               // 답장 시 고객 이메일로 설정
      subject: `[SOLUNA 문의] ${name}님의 새로운 문의`,
      text: `
        이름: ${name}
        이메일: ${email}
        전화번호: ${phone || '없음'}
        
        문의 내용:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e44d97;">SOLUNA 새로운 문의</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>전화번호:</strong> ${phone || '없음'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <h3 style="margin-bottom: 10px;">문의 내용</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    console.log('Contact Form Submission Success:', { name, email });

    return NextResponse.json(
      { success: true, message: '문의가 성공적으로 접수되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
