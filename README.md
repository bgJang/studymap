# studymap

## 참고 사이트
https://velog.io/@takeknowledge/생활코딩-마인드맵-cytoscape-활용-프로젝트-56k4in7315

## 설치 패키지
1. 포스팅 당시 패키지와 현재 최신 버전간 차이점이 존재
2. dependency 문제 회피를 위해 아예 해당 환경으로 설치
3. node.js 설치 버전
- node-v14.21.3-x64
4. 설치 스크립트 
- npm install @babel/core@7.7.7 @babel/preset-env@7.7.7 @babel/preset-react@7.7.4 babel-loader@8.0.6 clean-webpack-plugin@3.0.0 css-loader@3.4.0 html-loader@0.5.5 file-loader@5.0.2 html-webpack-plugin@3.2.0 mini-css-extract-plugin@0.9.0 webpack@4.41.4 webpack-cli@3.3.10 webpack-dev-server@3.10.1 cytoscape@3.12.1 gh-pages@2.1.1
- npm install cytoscape-cose-bilkent (layout)

github 페이지를 gh-pages branch로 등록
build 폴더에서 npm run deploy를 해주면 origin/gh-pages 브랜치가 푸쉬됨
한글 출력하려면 vscode에서 모든 소스코드를 utf-8로 작성해야한다.

## 실행 방법
1. 로컬에서 실행
- 터미널에서 D:\Source\work1\map\map5 이동
- npm run start
- http://localhost:9000/

2. Github page 반영
- 터미널에서 D:\Source\work1\map\map5\build 이동
- build 폴더에서 npm run deploy