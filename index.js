const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 유저 데이터를 저장할 JSON 파일 경로
const DATA_FILE = 'users.json';

// 회원가입 API
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: '비밀번호는 8~20자의 영문, 숫자, 특수문자 조합이어야 합니다.' });
    }

    // 기존 사용자 데이터 읽기
    let users = [];
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        users = JSON.parse(data);
    }

    // 아이디 중복 체크
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    // 새 사용자 저장
    users.push({ username, password });
    fs.writeFileSync(DATA_FILE, JSON.stringify(users));

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
