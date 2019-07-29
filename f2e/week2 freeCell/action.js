const app = new Vue({
    el: "#main",
    data: {
        start: false,
        view: '',
        randomList: [],
        indexOfList: 0,
        imgPrefix: 'resource/CARDS/card-',
        imgSuffix: 'copy.svg',
        opacity: 1,
        spade: 1,
        heart: 14,
        diamond: 27,
        club: 40,
    },
    methods: {
        // 亂數發牌
        randomCard: function () {
            console.log('random card')
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
            const li = document.getElementById(sourceId)
            const img = li.childNodes[0]
            event.target.appendChild(img)
            li.remove()
        },
        dropAnotherCol: function (event) {
            const vm = this
            const sourceId = event.dataTransfer.getData('text/plain')
            const li = document.getElementById(sourceId)
            const img = li.childNodes[0]
            const target = event.target.parentNode.parentNode
            target.appendChild(li)
            li.append(img)
        },
        sortDrop: function () {
            const vm = this
            const type = event.target.parentNode.id
            console.log(event.target.parentNode)
            const sourceId = event.dataTransfer.getData('text/plain')
            // 0~13 spade | 14~26 heart | 27~39 diamond | 40~52 club
            let sourceType;
            let num
            if (sourceId < 14) {
                sourceType = 'spade'
                num = vm.spade
                console.log('result ', vm.checkSort(sourceType, type, sourceId, num))
                if (vm.checkSort(sourceType, type, sourceId, num)) {
                    vm.spade++
                    vm.dropToStack(event.target, sourceId)
                } else {
                    return
                }
            } else if (sourceId > 13 && sourceId < 27) {
                sourceType = 'heart'
                num = vm.heart
                console.log('result ', vm.checkSort(sourceType, type, sourceId, num))
                if (vm.checkSort(sourceType, type, sourceId, num)) {
                    vm.heart++
                    vm.dropToStack(event.target, sourceId)
                } else {
                    return
                }
            } else if (sourceId > 26 && sourceId < 40) {
                sourceType = 'diamond'
                num = vm.diamond
                console.log('result ', vm.checkSort(sourceType, type, sourceId, num))
                if (vm.checkSort(sourceType, type, sourceId, num)) {
                    vm.diamond++
                    vm.dropToStack(event.target, sourceId)
                } else {
                    return
                }
            } else {
                sourceType = 'club'
                num = vm.club
                console.log('result ', vm.checkSort(sourceType, type, sourceId, num))
                if (vm.checkSort(sourceType, type, sourceId, num)) {
                    vm.club++
                    vm.dropToStack(event.target, sourceId)
                    vm.randomList[vm.indexOfList].pop()
                } else {
                    return
                }
            }
        },
        startDragging: function (event, card) {
            // 開始拖動
            const vm = this
            // vm.changeOpacity(card, 0)
            event.dataTransfer.setData('text/plain', card);
            console.log("dragstart ", event)
        },
        // changeOpacity: function (card, num) {
        //     document.getElementById(card).style.opacity = num
        // },
        checkSort: function (source, target, sourceId, targetNum) {
            console.log('source type: ', source)
            console.log('target type: ', target)
            console.log('sourceId ', sourceId)
            const vm = this
            if (source !== target) {
                return false;
            }
            console.log('targetNum ', targetNum)
            if (parseInt(sourceId) !== targetNum) {
                return false
            } else {
                return true
            }
        },
        dropToStack: function (target, sourceId) {
            console.log(target.parentNode)
            const li = document.getElementById(sourceId)
            const img = li.childNodes[0]
            target.parentNode.append(img)
            li.remove()
        },
        updateCardLists: function () {
            const vm = this
            let arr1 = [];
            for (i = 0; i < 8; i++) {
                let arr2 = []
                // console.log('coll '+ i)
                const nodes = document.getElementById('coll' + i).childNodes
                // console.log(nodes)
                for (j = 0; j < nodes.length; j++) {
                    // console.log(nodes[j].id)
                    arr2.push(nodes[j].id)
                }
                arr1.push(arr2)
            }
            vm.randomList = arr1
        }

    },
    watch: {

    }
})
function pushList(vm, cardList, num) {
    for (i = 0; i < 4; i++) {
        const arr = cardList.splice(0, num)
        vm.randomList.push(arr)
    }
}



