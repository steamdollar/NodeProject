const axios = require('axios')

exports.Auth = async (req, res, next) => {
    const {token} = req.cookies
    const body = {
        token
    }
    const option = {
        "Content-type":"application/json"
    }

    const response = await axios.post('http://localhost:4000/api/auth', body, option)

    if (response.data === true) {
        next ()
    }
    else {
        res.render('token.html')
    }
}

// const { createSignature } = require('../../back/utils/jwt')

// exports.Auth = (req,res,next) => {
//     try {
//         const { token } = req.cookies
//         if (token === undefined) throw new Error('토큰 없다')
//         const [header,payload,sign] = token.split('.') // 결과물이 뭐냐.
//         //[eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9,eyJ1c2VyaWQiOiJhZG1pbiIsIm5hbWUiOiJhYSIsIm5pY2tuYW1lIjoicXdlcSIsInVzZXJsZXZlbCI6MX0,LEgXmfqxlZvB3+ryHOTkfnntVA1BD4k6FL17saBJBBE]
//         const signature = createSignature(header,payload)

//         if (sign !== signature) throw new Error('토큰 변조됨')
//         const user = JSON.parse( Buffer.from(payload,'base64').toString('utf-8') )

//         req.user = {
//             ...user
//         }
//         console.log(user)
//     } catch (e) {
//         console.log(e.message)
//     }
//     next()
// }