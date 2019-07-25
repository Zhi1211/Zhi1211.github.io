const app = new Vue({
    el: "#main",
    data: {
        view: '',
        randomList: [],
        indexOfList: 0,
        imgPrefix: 'resource/CARDS/card-',
        imgSuffix: 'copy.svg',
        opacity: 0,
        spade: 0,
        diamond: 0,
        club: 0,
        heart: 0,
    },
    methods: {
        // 亂數發牌
        randomCard: function () {
            const vm = this
            if (vm.randomList.length !== 0) {
                vm.randomList = []
            }
            let cardList = new Array()
            for (let i = 1; i <= 52; i++) {
                cardList.push(i)
            }
            var m = cardList.length,
                t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = cardList[m];
                cardList[m] = cardList[i];
                cardList[i] = t;
            }
            pushList(vm, cardList, 7)
            pushList(vm, cardList, 6)
        },
        // 拖曳
        drop: function (event) {
            // 放下卡片
            console.log("drop ", event)
            const vm = this
            const sourceId = event.dataTransfer.getData('text/plain')
            const obj = document.getElementById(sourceId).childNodes[0].childNodes[0]
            event.target.appendChild(obj)
            // 移除陣列最後一位
            vm.randomList[vm.indexOfList].pop()
        },
        dropAnotherCol: function (event) {
            const vm = this
            const sourceId = event.dataTransfer.getData('text/plain')
            const obj = document.getElementById(sourceId).childNodes[0].childNodes[0]
            event.target.parentNode.parentNode.parentNode.appendChild(obj)
            // 移除陣列最後一位
            vm.randomList[vm.indexOfList].pop()
        },
        startDragging: function (event, card) {
            // 開始拖動
            const vm = this
            vm.changeOpacity(card, 0)
            event.dataTransfer.setData('text/plain', card);
            console.log("dragstart ", event)
            // 記錄當前欄位
            const collId = document.getElementById(card).parentNode.id
            const listIndex = parseInt(collId.replace("coll", ""));
            vm.indexOfList = parseInt(listIndex)
            console.log(vm.indexOfList)
        },
        changeOpacity: function (card, num) {
            document.getElementById(card).style.opacity = num
        },
    }
})
function pushList(vm, cardList, num) {
    for (i = 0; i < 4; i++) {
        const arr = cardList.splice(0, num)
        vm.randomList.push(arr)
    }
}



