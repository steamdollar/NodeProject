const webSocket = require('ws') // npm install ws

// socket.io 
let sockets = []
module.exports = (server) => {
    const wss = new webSocket.Server({ server })
    // const wss = new webSocket.Server({ port:3006 })
    
    wss.on('connection',(ws, req)=>{
        ws.id = req.headers['sec-websocket-key']
        console.log(ws.id)
        // HwM3xwJM8735Rgr/bGGyiA==  << 접속마다 변함

        sockets.push(ws)
        console.log(`address : ${req.connection.remoteAddress} connected`)
        // ::1
        
        // code : 연결이 종료되는 이유를 가르키는 숫자
        // 기본값은 1000
        const userid = 'web7722'
        ws.send(`${userid}님 환영합니다.`)
        // reason : 왜종료되는지 사람이 읽을수 있도록 나타내는 문자열
        // UTF-8 포멧 123바이트를 넘을수없다.

        ws.on("message", (response) => {
            let obj = JSON.parse(response.toString('utf-8'))
            console.log(obj) // { type: 'send_msg', userid: 'web7722', data: '1234' }
            let { type, data, userid } = obj

            switch (type) {
                case 'send_msg':
                    sockets.forEach( v => {     
                        v.send(`${userid} : ${data}`)
                    })
                break;
            }            
        })

        ws.on('close', ()=>{
            console.log('cilent out')
            sockets = sockets.filter(v=>{
                return ws.id !== v.id
            })
            // 나간 c의 ws.id를 제거한 배열 재생성

            console.log(sockets.length)
        })
    })

   
}