3/21 (1주차 월요일)

라우터 분리, DB 스키마 오전 ~ 오후

front/user 쪽의 html 아웃라인 작성 - 야간

로그인, 회원 가입 기능은 카카오를 통해 구현 해야하는데

이걸 어떻게 쓰는지 잘 모르겠다.

oauth에 대한 공부, 수업 시간에 한 코드에 대한 복습이 필요할 것 같읍니다.

 --------------------------

3/22 (1주차 화요일)

todo

1. 메인 페이지 - 로그인/아웃 > 여기서 가능하면 oauth까지 구현해본다.

로그인 하면 사용자 정보를 이용, jwt를 만들어 쿠키를 준다. 로그아웃하면 쿠키를 지운다.

현재 회원 가입 기능은 미구현이므로 우선 DB에 직접 아이디를 하나 만들어서 그걸 가지고 해보자.

insert into user(userid, userpw,userimg,  username, nickname, address, gender,phone, mobile, email, userintro) 
values('sila', '1234', 'sss', 'qwerty', 'qwerty','seoul', '남자','00000000', '00000000', '1234@gmail.com', '살려줘');

front - 로그인 시도 (id, pw 입력후 axios를 통해 back으로 전송) 
> back에서 그걸 받아다 DB의 데이터셋과 비교
> 일치하는 데이터셋이 있으면 그에 맞는 응답을 전달

done

2. 채팅

사용자에 따라 다른 아이디가 출력 되게끔 하는 채팅 기능이 필요하다. 
예전에 혼자 시도 해봤는데 안 됫는데 ㅠㅠ..

얘는 소켓 통신을 사용해야 함. (배웠던거 대충 배껴서 구현함.)

다만, userid는 로그인 후 쿠키를 쪼개던가 해서 값을 받아서 미들웨어에서 html 렌더링할때 같이 던져줘야 할 것 같아서 나중으로 미룸.

일단 나는 jwt를 쪼개서 userid value를 다시 얻고 그걸 던져 주는 방법을 생각하고 있는데 글쎄..

!! problem !! 
jwt cookie를 해석해 유저 정보를 얻는것 까진 되는데 이걸 socket.js로 주질 못하고 있습니다. 

http > ws 로 데이터 전송을 하는데 특별한 기능이 필요한걸까요?

아니면 제가 뭔가 헛짓을 하고 있는걸까요? 

!! solve !!
선생님께 질문을 통해 해결했습니다. 

우리가 서버를 구동하면 server.js가 콜 스텍 가장 아래 쌓이고 

그 다음 socket.js가 실행이 되므로 

server.js에서 socket.js로 데이터를 export할 수 없습니다.

미래에서 과거로 복권 당첨 번호를 보낼 수 없는 것과 같은 원리입니다.

다행히도 ws에도 요청 헤더가 있습니다. ( 선생님이 힌트 주심.. ㅠㅠ..) 

거기에 쿠키가 있으므로 그걸 잘 해석해서 넣어주면 될 수도 있을 것 같습니다. 안되면 말고..

해보니까 잘 실행됩니다. 다행 ㅠㅠ..

done

3. 야간 작업

집에 가서 저녁때는 oauth의 개념에 대해 조금 더 공부하고

수업 들었던 내용 코드를 다시 한 번 확인해볼 예정입니다.

그래서 코드 복붙까지만 성공해도 뭐..

지금 어떻게 구현할지 잘 모르겠는 부분은

'카카오 로그인을 할 경우, 저희가 그 사람의 정보를 어떻게 DB에서 가져올 수 있는가' 입니다.

프론트에서 로그인 > axios > 백엔드 > DB > 핸드폰 번호로 select

해서 가져와야 할까요?

그렇다면 거기서 입력해서 카카오의 로그인 페이지에 전송한 핸드폰 번호를 저희가 다른 곳으로도 가져올 수 있을까요?

직접 해봐야 알 것 같습니다. 안되면 도와주세요..

-----------------------------------------

3/23 (1주차 수요일) - 게시판 작업

1. 글쓰기

- 1.1 공지사항

관리자만 사용 가능.

작성자는 req.user로 가져오고,

작성일자는 timestamp, date.now() 등을 잘 이용하면 될 것 같다.

내용, 제목은 req.body에 담아 DB에 넣는 방식으로.

댓글 기능 없음.

공지 사항을 써서 제출할 경우 notice table에 내용이 저장된다.
작성자는 admin일 거고, idx, 제목, 작성일자, 내용을 저장하면 되겠다.

create table notice(
    idx INT AUTO_INCREMENT PRIMARY KEY,
    writer VARCHAR(30) DEFAULT 'admin',
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    date VARCHAR(30) NOT NULL
);

!! problem !!

DB에서 공지사항 목록을 가져오는 것 까지는 성공
그걸 html로 보내주고 싶은데 반복문으로 줄 수가 없다..

!! solve !!
선생님 도움 받아 해결.. DB와 통신시 결괏값의 데이터 타입을 바꿔줘서 해결했다.

done

- 1.2 QnA

일반 사용자들이 질문을 게시글 형태로 써서 올린다.

작성자 등의 메타데이터는 1.1과 동일

여기까지 작업 완료

단, 답변은 관리자가 댓글 형태로 준다. > 댓글에 대한 DB table이 따로 필요할지는 아직 모르겠다.

- 1.3 일반

1.2에 더해 카테고리, 해시태그 기능이 또 추가된다.

1.3.1 카테고리 (이하 분류)

> 관리자가 카테고리를 추가 한다 
> DB내 카테고리 테이블에 이게 추가된다. 복잡하게 생각할 것도 없다. 그냥 테이블 명만 있으면 돼.

> 사용자가 게시판 리스트 페이지를 볼 때, 상단에 탭이 추가된다.
리스트 페이지를 불러올때, DB의 카테고리 테이블에서 목록을 가져온다.
select * from category << 대충 뭐 이런 식으로
그 result를 가공해서 넌적스 반복문으로 뿌려주면 될 것 같다.

> 사용자가 글 작성시 추가된 카테고리를 선택할 수 있어야 한다.
이때 아마 선택지 중 하나를 고르는 식으로 할텐데
선택지를 띄울 때도 DB에서 가져다가 쓰면 될 것 같다.
이떄 선택한 카테고리는 게시물 자체의 table중 하나로 들어가야 할 것 같다.

> 탭을 클릭하면 해당 카테고리의 글만 DB에서 가져다가 보여준다. 
board table의 카테고리 field를 조건으로 주고 해당하는 게시물을 가져다 렌더링한다.

1.3.2 해시태그
최대 5개까지 사용할 수 있도록 하자.

해시태그 DB table을 만들고 tag 1 ~ 5 까지의 field를 준다.

글 작성 버튼을 누르면 동시에 그 글과 동일한 idx (auto increment) 값을 가진 
해시태그 table의 데이터 셋을 같이 생성해준다.

글 보기 페이지를 접속할 경우, idx 값으로 해시태그랑 글을 같이 불러다가 보여준다.


1.3.3 likes

좋아요 기능은 일단 보류. 여기까지 생각하긴 너무 많다.

2. 리스트 (w/o paging)

--------------------------------

3/24 (1주차 목요일) - 게시판 작업 (이어서)

글 view 기능, (제목 클릭하면 그리로 가게끔..) 을 구현한다.

- 1.1 view 기능 > 각 글 제목에 링크를 걸되, idx 값을 uri에 포함시켜야 한다.

done

- 1.2 글 삭제, 수정

무슨 고작 이거 하는데 하루 종일걸리냐.. 공부좀 해라..


- 1.3 댓글 기능

댓글을 써서 서밋 한다 > DB에 추가한다.

우리가 어떤 카테고리의 어떤 글으 열면 그 카테고리와 인덱스에 맞는 댓글 데이터셋들을 DB에서 가져온다.

어떤 카테고리, 어떤 글에 달린 댓글인지 알아야 글에 맞는 댓글을 가져올 수 있다.

즉, 댓글을 저장할 때, 글의 카테고리와 인덱스를 함께 저장해야한다.

//

그래서 나중에 다시 글을 열때, 카테고리, 인덱스를 가지고 이 글에 달린 댓글을 가져올 수 있다.

그럼 댓글은 하나의 DB에 저장하면 될 것 같은데..

댓글을 단다 > submit 한다 > DB reply table에 추가한다. >

mcategory, mindex, index(Primary key), nickname, content, date 정도의 field가 필요할 것 같다.


CREATE TABLE cate1 (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(30) NOT NULL,
    title VARCHAR(40) NOT NULL,
    content TEXT NULL,
    nickname VARCHAR(30) NOT NULL,
    userid VARCHAR(30) NOT NULL,
    date VARCHAR(30) NOT NULL,
    hit INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0
);

create table hashtag_bridge (
    cate1_idx int,
    hashtag_idx int,

);

create table hashtag (
    idx INT NOT NUll PRIMARY KEY,
    hashtagName VARCHAR(30),
)

CREATE TABLE comment (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mcategory VARCHAR(30) NOT NULL,
    mindex INT NOT NULL,
    content TEXT NULL,
    nickname VARCHAR(30) NOT NULL,
    userid VARCHAR(30) NOT NULL,
    date VARCHAR(30) NOT NULL,
)


이렇게 저장한 댓글은 글 view 페이지에 갈 경우 글 내용과 함꼐 불러올 수 있다.

그 후엔 댓글 쓰는대로 불러다가 주면 될 거다.

--------------------------------

3/25 (1주차 금요일)

1. 좋아요 기능

- 1.1 기능 구현

게시판별로 좋아요 테이블을 따로 만든다.

cate1 이라고 한다.

cate1 의 idx 1인 게시물

그거랑 연결되는 table을 하나더 만든다 (cate1_like)

create table cate1_like(
    m_idx int not null,
    userid varchar(30) not null,
);

<!-- 처음에 글을 쓰면 cate1, cate1_like에 각각 요청이 간다.

cate1엔 글쓴이 날짜 등이 삽입 될거고

cate1_like에는 게시물의 idx(자동 생성?) table이 채워진다.
id table은 아직 빈칸. -->

cate1엔 안간다. 지금 이걸 넣으면 안 됨.


누군가 idx 1인 게시물에 좋아요를 누른다.

이 때 라이크 테이블이 관여한다.

게시물의 idx, userid 

sila가 1번 게시물에 눌렀다. > 1 /sila

이 데이터셋이 cate1_like에 추가된다.

done

- 1.2 좋아요 갯수 count

n번 게시물의 좋아요 수를 알고싶다.

좋아요 table > idx가 n인 녀석을 카운트해서 그 숫자를 가져온다.



- 1.3 좋아요 취소

if 랑 likeflag를 만든다.

눌렀는데 이미 DB에 있다 > 삭제

없다 > 추가




