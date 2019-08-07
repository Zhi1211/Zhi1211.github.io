const app = new Vue({
    el: "#main",
    data: {
        start: false,
        view: '',
        randomList: [],
        indexOfList: 0,
        imgPrefix: 'resource/CARDS/card-',
        imgSuffix: 'copy.svg',
        opacity: 0,
        spade: 0,
        heart: 0,
        diamond: 0,
        club: 0,
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
            vm.pushList(vm, cardList, 7)
            vm.pushList(vm, cardList, 6)
        },
        pushList: function (vm, cardList, num) {
            for (i = 0; i < 4; i++) {
                let secondArr = []
                for (j = 0; j < num; j++) {
                    const thirdArr = cardList.splice(0, 1)
                    secondArr.push(thirdArr)
                }
                vm.randomList.push(secondArr)
            }
        },
        // 開始拖動
        startDragging: function (event, card) {
            const vm = this
            // vm.changeOpacity(card, 0)
            event.dataTransfer.setData('text/plain', card);
            console.log("dragstart ", event)
        },
        // changeOpacity: function (card, num) {
        //     document.getElementById(card).style.opacity = num
        // },
        // 拖曳到左上
        dropUpLeft: function (target, sourceId) {
            console.log('put')
            const img = document.getElementById(sourceId)
            target.appendChild(img)
        },
        checkUpLeft: function (event) {
            console.log('event.target ',event.target.tagName)
            const vm = this
            if (event.target.tagName !== "IMG") {
                const sourceId = event.dataTransfer.getData('text/plain')
                vm.dropUpLeft(event.target, sourceId)
            }else{
                return
            }
        },
        // 下方拖曳
        dropDownCol: function (event) {
            const vm = this
            const sourceId = event.dataTransfer.getData('text/plain')
            // check if correct
            // if (!vm.checkDownCol(parseInt(sourceId), parseInt(event.target.parentNode.id))) { return }
            const img = document.getElementById(sourceId)
            const target = event.target.parentNode
            console.log('target ',target)
            target.appendChild(img)

            // target.setAttribute('draggable', true)
        },
        // 右上條件檢查
        checkUpRight: function (event) {
            const vm = this
            let sourceId = event.dataTransfer.getData('text/plain')
            const sourceType = vm.getCardType(parseInt(sourceId))
            let targetType = event.target.parentNode.id
            const sourceCardNum = vm.getCardNum(sourceId)
            const targetCardNum = parseInt(event.target.parentNode.dataset.num);
            console.log(targetCardNum)

            if (vm.checkUpRightDetail(sourceType, targetType, sourceCardNum, targetCardNum)) {
                event.target.parentNode.dataset.num++
                vm.dropUpRight(event.target, sourceId)
            }
        },
        // 拖曳到右上
        dropUpRight: function (target, sourceId) {
            const img = document.getElementById(sourceId)

            if (target.parentNode.childNodes.length === 1) {
                target.parentNode.replaceChild(img, target.parentNode.childNodes[0])
            } else {
                target.parentNode.append(img)
            }
        },
        // 右上條件檢查分支
        checkUpRightDetail: function (sourceType, targetType, sourceCardNum, targetNum) {
            if (sourceType !== targetType) {
                console.log(sourceType + " | " + targetType)
                return false;
            }
            if (sourceCardNum - 1 !== targetNum) {
                console.log(sourceCardNum - 1)
                console.log(sourceCardNum + " | " + targetNum)
                return false
            } else {
                return true
            }
        },
        // 重新紀錄牌面
        updateCardLists: function () {
            console.log('update')
            const vm = this
            let firstArr = [];
            for (i = 0; i < 8; i++) {
                let collArr = []
                let coll = document.getElementById('coll' + i)
                coll.childNodes.forEach(div => {
                    if (div.childNodes.length > 0) {
                        div.childNodes.forEach(li => {
                            let groupArr = []
                            li.childNodes.forEach(img => {
                                if (img.tagName === 'IMG') {
                                    groupArr.push(img.id)
                                }
                            })
                            if (groupArr.length > 0) {
                                collArr.push(groupArr)
                            }
                        })
                    }
                })
                firstArr.push(collArr)
            }
            console.log(firstArr)
        },
        // 下方條件檢查
        checkDownCol: function (source, target) {
            const vm = this
            let sourceCardNum = vm.getCardNum(source)
            let sourceColor = vm.getCardColor(source)

            let targetCardNum = vm.getCardNum(target)
            let targetColor = vm.getCardColor(target)

            if (targetCardNum === sourceCardNum + 1) {
                if (targetColor !== sourceColor) {
                    console.log('true')
                    return true
                }
                console.log('false')
                return false
            } else {
                console.log('false')
                return false
            }
        },
        getCardType: function (num) {
            // 0~13 spade | 14~26 heart | 27~39 diamond | 40~52 club
            if (num <= 13) {
                return 'spade'
            } else if (num > 13 && num <= 26) {
                return 'heart'
            } else if (num > 26 && num <= 39) {
                return 'diamond'
            } else {
                return 'club'
            }
        },
        getCardNum: function (num) {
            return num % 13 === 0 ? 13 : num % 13
        },
        getCardColor: function (num) {
            return num > 13 && num < 40 ? 'red' : 'black'
        },

    },
    watch: {
        start: function () {
            const vm = this
            vm.randomCard()
        }
    }
})




