var app = new Vue({
    el: "#container",
    mounted: function () {
        setInterval(this.updateTime, 1000)
    },
    data: {
        now: moment().format('YYYY.MM.DD dddd  h:mm a'),
        taskTime: 25,
        breakTime: 5,
        countDown: {
            minute: 5,
            second: 0,
            time: "05:00",
            isBreakTime: true,
            isPaused: true,
            id: 0,
            drawId: 0,
            status: "START",
        },
        sectorDegree: -90,
        newTodo: "",
        todos: [
            {
                "id": "1",
                "title": "Lorem ipsum dolor sit",
                "complete": false,
                "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, voluptatum?",
                "startTime": new Date(),
                "endTime": null,
            }
        ],
        nowProcess: {
            "id": "1",
            "title": "Lorem ipsum dolor sit",
            "complete": false,
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, voluptatum?"
        },
        showPanel: "",
        upcomings: [
            {
                "id": "2",
                "title": "hello world to tomorrow",
                "complete": false
            }
        ]
    },
    methods: {
        addTodo: function () {
            let value = this.newTodo.trim();
            let ts = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todos.push({
                id: ts,
                title: value,
                complete: false
            })
            this.newTodo = '';
        },
        updateTime: function () {
            this.now = moment().format('YYYY.MM.DD dddd  h:mm a')
        },
        countDownProcess: function (status) {
            let vm = this
            let count = this.countDown
            count.status = status
            console.log(vm)
            if (count.status === 'START') {
                count.isPaused = false
                // draw()
                count.id = setInterval(() => {
                    if (count.second !== 0) {
                        count.second--
                    } else {
                        count.minute--
                        count.second = 59
                    }

                    // 計時結束
                    if (count.minute === 0 && count.second === 0) {
                        count.isBreakTime = !count.isBreakTime
                        if (count.isBreakTime) {
                            count.minute = vm.breakTime
                        } else {
                            count.status = "NEXT"
                            count.isPaused = true
                            count.minute = vm.taskTime
                            clearInterval(count.id)
                        }
                    }
                    if (count.isBreakTime) {
                        vm.sectorDegree = vm.sectorDegree + 180 / (vm.breakTime * 60)
                    } else {
                        vm.sectorDegree = vm.sectorDegree + 180 / (vm.taskTime * 60)
                    }
                    // vm.drawSector(true)
                    count.time = timerFormat(count.minute, count.second)
                }, 1000)
            }
            if (count.status === 'PAUSE') {
                count.isPaused = true
                clearInterval(count.id)
            }
            if (count.status === 'STOP') {
                count.isPaused = true
                count.minute = vm.taskTime
                count.second = 0
                count.time = timerFormat(count.minute, count.second)
                clearInterval(count.id)
                vm.resetCanvas()

            }
            if (count.status === 'RESET') {
                if (count.isBreakTime) {
                    count.minute = vm.breakTime
                } else {
                    count.minute = vm.taskTime
                }
                vm.resetCanvas()
                count.second = 0
                count.time = timerFormat(count.minute, count.second)
                count.status = "START"
            }
        },
        draw: function () {
            vm = this.countDown
            // Canvas draw circle
            var cvs = document.getElementById('movement');
            var ctx = cvs.getContext('2d');
            function angleToRadian(angle) {
                return Math.PI / 180 * angle;
            }
            ctx.beginPath();
            ctx.translate(0, 245.5);
            // ctx.lineTo(0, 0);
            // vm.sectorDegree -- 

            ctx.arc(0, 0, 244, angleToRadian(vm.sectorDegree), angleToRadian(vm.sectorDegree++), false);
            console.log(vm.sectorDegree)
            ctx.closePath();
            ctx.fillStyle = "rgba(240, 236, 233, 0.5)"
            ctx.strokeStyle = "#003CA1"
            ctx.stroke();
            ctx.fill();
        },
        resetCanvas: function () {
            vm = this
            cvs.height = cvs.height
            cvs.width = cvs.width
            vm.sectorDegree = -90
            ctx.fillStyle = "rgba(240, 236, 233, 0.1)"
            ctx.strokeStyle = "#003CA1"
            ctx.beginPath()
            ctx.translate(0, 245.5);
            ctx.lineTo(0, 0);
            // ctx.fill()
            // draw()
        }
    },
    watch: {
        sectorDegree: function (val) {
            vm = this
            let i;
            if (vm.countDown.isBreakTime) {
                i = 180 / (vm.breakTime * 60)
            } else {
                i = 180 / (vm.taskTime * 60)
            }
            ctx.arc(0, 0, 244, angleToRadian(val - i), angleToRadian(val), false);
            ctx.stroke();
            ctx.fill();
            console.log('degree', val)
        },
    }
})

var cvs = document.getElementById('movement');
var ctx = cvs.getContext('2d');
function angleToRadian(angle) {
    return Math.PI / 180 * angle;
}

function timerFormat(minute, second) {
    if (String(minute).length < 2) {
        minute = "0" + minute
    }
    if (String(second).length < 2) {
        second = "0" + second
    }
    return minute + ":" + second
}

const draw = function () {
    // Canvas draw circle
    ctx.beginPath();
    ctx.translate(0, 245.5);
    ctx.lineTo(0, 0);
    // vm.sectorDegree -- 

    // ctx.closePath();
    ctx.fillStyle = "rgba(240, 236, 233, 0.1)"
    ctx.strokeStyle = "#003CA1"
    ctx.stroke();
    ctx.fill();
}


draw()

var moment = require('moment');