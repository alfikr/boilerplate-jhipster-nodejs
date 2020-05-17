(function($window,$document,bs){
    var socket = bs.socket
    socket.on('disconnect',(c)=>{
        window.close();
    })
})(window,document,___browserSync___)