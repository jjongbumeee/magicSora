# 마법의 소라고동 프로젝트 <img src="https://img.shields.io/badge/status-developing-yellow" align = "center"/>

### Team Member
| 이름 | Github 링크 | 역할 |
| --- | :--- | :--- |
| 이영훈 | https://github.com/lee20h | B/E, DB |
| 정종범 | https://github.com/jjongbumeee | F/E, 프로젝트 기획 |
| 허수혁 | https://github.com/jalyice | F/E, 디자인, documentation

개발 팀원의 경우 [Magicsora Notion](https://www.notion.so/c5eb9fa7b231472c92206d088f518e84?v=7fa695f91e55461db3fc68b2fb1306c0) 참고 

---
## Project Settings
- B/E, F/E 구분하여 구성되었으며, npm을 이용하여 관리
- F/E, B/E 프로젝트 Clone 이후 각각 npm install 실행
  > cd backend  
  npm install  
  cd ../frontend  
  npm install
- Backend(Express) 실행 방법(mysql이 설정되어 있어야 함)
  > npm start  
- DB 연결 주소 입력
  - `/frontend/src/assets/iptable.json` 파일생성
  - `{"host" : "DB주소"}` 입력 후 저장
  - ex) {"host" : "http://localhost:3000"}  
  
  - `/backend/environment.json` 파일 생성
  - `{"host" : "DB host 주소",  
    "user" : "DB username",  
    "password" : "DB PW",  
    "port" : "DB port 번호"}  입력 후 저장
- Frontend(Vue.js) dev 서버 실행 방법
  > npm run serve  
- Frontend 빌드 방법
  > npm run build