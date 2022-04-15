# YoonSea Project

## Purpose
Opensea Clone으로 간단한 기능을 구현 프로젝트이다.

## Get Start
``` shell
# Installation
$ npm install

# Run Start
$ cd yoonsea-client
$ npm run start
```

### Set Contract Address
``` shell
# .env 파일을 수정해야한다.
REACT_APP_CONTRACT_ADDRESS='write your contract address'
```

## Project Description
### Folder Structure
``` shell
├── README.md
└── yoonsea-client
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    └── src
        ├── App.css
        ├── App.js
        ├── components
        │   ├── common
        │   │   ├── Footer.js
        │   │   └── Header.js
        │   ├── create
        │   │   └── Create.js
        │   ├── explore.js
        │   │   └── Explore.js
        │   ├── profile
        │   │   └── Profile.js
        │   └── template
        │       └── PageTemplate.js
        ├── index.css
        ├── index.js
        ├── pages
        │   ├── CreatePage.js
        │   ├── ExplorePage.js
        │   ├── HomePage.js
        │   └── ProfilePage.js
        └── serviceWorker.js
```

### install Package
``` 
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.3.0",
    "react-scripts": "4.0.3",
    "web3": "^1.7.3"
  },
  "devDependencies": {
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "prettier": "^2.6.2"
  }
```

### Feature 
- 메타마스크 지갑 연결
- IPFS 연결 및 호출 기능
- NFT 생성 기능
- NFT 구매 기능 구현
- NFT 판매 기능 구현


## Cooperate work
### Branch
``` text
  main : 배포 브랜치
  dev : 개발 브랜치
  feature/[feature name] : 기능 개발을 위한  브랜치
```

### git commit Comment rule
**Comment Rule**
- 어떻게 보다는 무엇과 왜를 설명한다
- 전체 영어로 작성
- 제목 첫 글자는 대문자로 작성
- 제목 끝에 마침표 넣지 않기
- 제목을 50글자 내로 제한
- 본문의 각 행은 72글자 내로 제한

**Comment Structure**
``` shell
# 헤더
<type>(<name>): <subject>
<BLANK LINE>
# 본문 => 옵션
<body>                         
```
type 
- feat : 새로운 기능에 대한 커밋
- bug : 버그 수정에 대한 커밋
- build : 빌드 관련 파일 수정에 대한 커밋
- chore : 그 외 자잘한 수정에 대한 커밋
- docs : 문서 수정에 대한 커밋(ReadMe)
- style : 코드 스타일 혹은 포맷 등에 관한 커밋
- test : 테스트 코드 수정에 대한 커밋


