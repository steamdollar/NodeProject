const webSocket = require('ws')

// socket.io 
let sockets = []
module.exports = (server) => {
    const wss = new webSocket.Server({ server })
    let userId = 'unknown'
    wss.on('connection',(ws, req)=>{
        ws.id = req.headers['sec-websocket-key']
        sockets.push(ws)

        let ecookie1 = req.headers.cookie.split('=')
        let ecookie2 = ecookie1[1].split('.')
        let ecookie3 = ecookie2[1]
        const deUserid = JSON.parse(Buffer.from(ecookie3, 'base64').toString('utf-8'))

        ws.send(`${deUserid.userid}님 환영합니다.`)
        
        userid = deUserid.userid

        ws.on("message", (response) => {
            let obj = JSON.parse(response.toString('utf-8'))
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
            sockets = sockets.filter(v=>{
                return ws.id !== v.id
            })

        })
    })

   
}