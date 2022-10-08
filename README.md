  # 경일 아카데미 학생들의 교류 및 친목을 위한 커뮤니티 사이트
  
  ### 🔨 Tech Stack
 
<div align=center>
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=black">
  
</div>

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
