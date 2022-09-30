//관리자페이지 컨트롤러(회원관리, 게시물관리, 카테고리, 통계)

const pool = require("../../db.js").pool;
const { response } = require("express");
const { createToken } = require("../../utils/jwt.js");
const { login } = require("../user/user.controller.js");

exports.login = async (req, res) => {
  // const {adminid, adminpw} = req.body;
  // const sql = `SELECT userid FROM user WHERE userid="${adminid}" AND userpw="${adminpw}" AND level=3`;

  // try{

  //     const [result] = await pool.execute(sql);
  //     console.log("이게답이다.", result,result.length)
  //     if(result.length == 0 || result.length > 1){
  //         throw new Error('id/pw를 확인해주세요')
  //     }
  //     const response = {
  //         output:"success"
  //     }

  //     req.session.user = result[0].userid
  //     res.json(response)
  //     console.log(req.session)

  // }catch(e){
  //     console.log(e)

  //     const response = {
  //         e
  //     }
  //     req.session.destroy(()=>{req.session})
  //     res.json(response)

  // }
  const { adminid, adminpw } = req.body;

  const sql =
    "SELECT userid, userimg, username, nickname, address, gender, phone, mobile, email, level from user where userid = ? and userpw = ? and level=3";
  const param = [adminid, adminpw];

  try {
    const [result] = await pool.execute(sql, param);

    if (result.length === 0) {
      throw Error("id/pw를 확인해주세요");
    }

    const jwt = createToken(result[0]);

    res.cookie("token", jwt, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
    });

    const response = {
      result,
      errno: 0,
    };
    res.json(response);
  } catch (e) {
    console.log(e.message);
    const response = {
      result: [],
      errormsg: e.message,
      errno: e.errno,
    };
    res.json(response);
  }
};
exports.logout = (req, res) => {
  const response = {
    result: "clearcookie",
  };
  res.clearCookie("token");
  res.json(response);
};

exports.userList = async (req, res) => {
  //유저 리스트
  const sql = "SELECT * from user";
  try {
    const [result] = await pool.execute(sql);

    const response = {
      result,
    };
    console.log(response.result);
    res.json(response);
  } catch (e) {
    console.log(e.message);
    const response = {
      error: "Not access",
    };
    res.json(response);
  }
};

exports.userSearch = async (req, res) => {
  //유저 검색
  const { nickname } = req.body;
  const sql = `select * from user where nickname LIKE "%${nickname}%"`;

  try {
    const [result] = await pool.execute(sql);

    const response = {
      result,
      errno: "none",
    };
    console.log(response.result);
    res.json(response);
  } catch (e) {
    console.log(e.message);
    const response = {
      errormsg: e.message,
      errno: e.errno,
    };
    res.json(response);
  }
};

exports.userUpdate = async (req, res) => {
  const body = req.body;
  console.log(body);
  let modified_userid = [];
  let modified_userlevel = [];
  let modified_nickname = [];
  let modified_available = [];
  const before = body.beforeData;
  const current = body.currentData;
  const search_before = body.search_beforeData;
  //console.log("리스트 이전데이터" ,before.userid.length, "현재데이터",current.userid.length, "검색후수정전데이터",search_before.userid.length)
  if (current.userid.length == before.userid.length) {
    //유저리스트페이지에서(검색x)
    for (let i = 0; i < current.userid.length; i++) {
      if (
        before.level[i] !== current.level[i] ||
        before.nickname[i] !== current.nickname[i] ||
        before.available[i] !== current.available[i]
      ) {
        modified_userid.push(current.userid[i]);
        modified_userlevel.push(current.level[i]);
        modified_nickname.push(current.nickname[i]);
        modified_available.push(current.available[i]);
      }
    }
  } else if (search_before.userid.length == current.userid.length) {
    //유저검색페이지에서(검색o)
    for (let i = 0; i < current.userid.length; i++) {
      if (
        search_before.level[i] !== current.level[i] ||
        search_before.nickname[i] !== current.nickname[i] ||
        search_before.available[i] == current.available[i]
      ) {
        modified_userid.push(current.userid[i]);
        modified_userlevel.push(current.level[i]);
        modified_nickname.push(current.nickname[i]);
        modified_available.push(current.available[i]);
      }
    }
  }
  console.log(
    "변경사항",
    modified_userid,
    modified_userlevel,
    modified_nickname,
    modified_available
  );

  const level_querylist = [];
  const idlist = []; //정보 변경된 userid 값만 넣을 리스트
  const nickname_querylist = [];
  const available_querylist = [];
  for (let i = 0; i < modified_userid.length; i++) {
    //변경사항만큼 for문돌린다
    let level_query = `when "${modified_userid[i]}" THEN ${modified_userlevel[i]} `; //레벨변경 쿼리
    level_querylist.push(level_query);
    idlist.push(`"${modified_userid[i]}"`);
    let nickname_query = `when "${modified_userid[i]}" THEN "${modified_nickname[i]}" `; //닉네임변경 쿼리
    nickname_querylist.push(nickname_query);
    let available_query = `when "${modified_userid[i]}" THEN "${modified_available[i]}" `; //사용가능 변경 쿼리
    available_querylist.push(available_query);
  }
  const sql_insert1 = level_querylist.toString().replaceAll(",", ""); //레벨변경쿼리 리스트를 string으로 변환
  const sql_insert2 = nickname_querylist.toString().replaceAll(",", ""); //닉네임변경쿼리 리스트를 string으로 변환
  const sql_insert3 = available_querylist.toString().replaceAll(",", "");
  const sql = `UPDATE user set level = CASE userid
                                        ${sql_insert1}
                                        ELSE level
                                    END,
                                nickname = CASE userid
                                        ${sql_insert2}
                                        ELSE nickname
                                    END,
                                available = CASE userid
                                        ${sql_insert3}
                                        ELSE available
                                    END
                                where userid IN (${idlist.toString()})`;
  console.log(sql);

  try {
    const [result] = await pool.execute(sql);

    const response = {
      result: "success",
    };
    console.log(response.result);
    res.json(response);
  } catch (e) {
    const response = {
      errmsg: e.message,
      errno: e.errno,
    };
    res.json(response);
  }
};

exports.userDelete = (req, res) => {
  res.send("관리자 권한 회원 강제퇴장");
};

exports.boardList = async (req, res) => {
  const { board_db } = req.body;
  console.log(board_db);
  const sql = `SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes, c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx where category="${board_db}" group by c.idx;`;
  console.log(sql);
  try {
    const [result] = await pool.execute(sql);

    const response = {
      result,
      errno: "none",
    };
    console.log(response.result);
    res.json(response);
  } catch (e) {
    console.log(e.message);
    const response = {
      errormsg: e.message,
      errno: e.errno,
    };
    res.json(response);
  }
};

exports.boardSearch = async (req, res) => {
  const { info, category } = req.body;
  console.log(info, category);

  const sql = ` SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes,c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx WHERE category = "${category}" and (c.title LIKE "%${info}%" OR c.userid LIKE "%${info}%" OR c.content LIKE "%${info}%" OR c.nickname LIKE "%${info}%") group by c.idx ;`;
  console.log(sql);
  try {
    const [result] = await pool.execute(sql);

    const response = {
      result,
      errorno: "none",
    };
    res.json(response);
  } catch (e) {
    const response = {
      errormsg: e.message,
      errno: e.errno,
    };
    console.log(response);
    res.json(response);
  }
};

exports.boardHidden = async (req, res) => {
  const { idx, hidden, category } = req.body;
  console.log(idx, hidden, category);
  hidden_insert = [];
  for (let i = 0; i < idx.length; i++) {
    const hidden_query = `when ${idx[i]} THEN "${hidden[i]}" `;
    hidden_insert.push(hidden_query);
  }
  console.log(hidden_insert);

  const sql = `UPDATE cate1 set hidden= CASE idx
                                        ${hidden_insert
                                          .toString()
                                          .replaceAll(",", "")}
                                        ELSE hidden
                                    END
                                    where idx IN (${idx.toString()})`;
  console.log(sql);
  try {
    const [result] = await pool.execute(sql);

    const response = {
      result: "success",
    };
    res.json(response);
  } catch (e) {
    console.log(e.message);
    const response = {
      errormsg: e.message,
      errno: e.errno,
    };
    res.json(response);
  }
};

exports.boardOrderby = async (req, res) => {
  const { orderby, category } = req.body;
  console.log(orderby, category);
  if (orderby == "likes") {
    const sql = `SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes,
        c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx where category = "${category}" group by c.idx order by count(l.m_idx) DESC;`;

    try {
      const [result] = await pool.execute(sql);

      const response = {
        result,
      };
      res.json(response);
    } catch (e) {
      console.log(e.message);
      const response = {
        errormsg: e.message,
        errno: e.errno,
      };
      res.json(response);
    }
  } else if (orderby == "hit") {
    const sql = `SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes,
        c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx where category = "${category}" group by c.idx order by hit DESC;`;

    try {
      const [result] = await pool.execute(sql);

      const response = {
        result,
      };
      res.json(response);
    } catch (e) {
      console.log(e.message);
      const response = {
        errormsg: e.message,
        errno: e.errno,
      };
      res.json(response);
    }
  }
};
