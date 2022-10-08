  # 경일 아카데미 학생들의 교류 및 친목을 위한 커뮤니티 사이트
  
<div align=center>
  <h1>
    🔨 Tech Stack
  </h1>
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=black">
  
</div>

#### Project nickname : 경일 커뮤니티
#### Project execution period : 2021.04.30~2021.12

## Description
경일 커뮤니티는 보이스피싱 취약계층을 위한 보이스피싱 경고 시스템으로, 유선 전화나 인터넷 전화에서의 통화내용을 실시간으로 분석하고, 보이스피싱일 경우 LED로 경고한다.

스마트폰 분야에는 이미 AI로 통화내용을 분석해 보이스피싱을 잡아내는 앱이 출시되어 사용되고있다. 그러나 인터넷 전화나 유선전화에는 보이스피싱을 예방하기 위한 하드웨어와 소프트웨어가 없는 실정이다. 따라서 대화 내용을 실시간으로 분석해 보이스피싱 여부를 가려내기 위한 시스템 개발이 필요하며, 특히나 보이스피싱 취약계층을 위해 개발되어야 한다.


## Step 1

```
npm install
```

Or

```
npm i
```

## Step 2 

```
cd back
```

```
.env
```

```
vi .env
```

```
DB_HOST = 127.0.0.1
DB_USER = 'your_mysql_id'
DB_PASSWORD = 'your_mysql_id'
DB_DATABASE = 'your_database_name'

```

Or

back 디렉토리 안에 .env 파일을 생성해 준 뒤

```
DB_HOST = 127.0.0.1
DB_USER = 'your_mysql_id'
DB_PASSWORD = 'your_mysql_id'
DB_DATABASE = 'your_database_name'

```
를 입력 후 저장해준다.


**DB스키마 파일 위치: back/cd/etc/DB.sql

## Step 3

- 사진이 저장 되는 디렉토리 생성하기

```
cd back
```

```
mkdir public
```

```
cd public
```

```
mkdir uploads
```

## Step 4

```
cd front
```

```
npm run start
```

다른 터미널 Open

```
cd front
```

```
npm run start
```
