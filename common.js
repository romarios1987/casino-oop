var userMoney = document.querySelector('#userMoney'),
    quantityMachine = document.querySelector('#numSlot'),
    machines = document.getElementById('machines'),
    casino;

/**
 * Function Create New Machine
 * @param id
 * @param money
 */
function createMachine(id, money) {
    var itemMachine = document.createElement('div');
    itemMachine.setAttribute('class', 'item-machine');
    var number = document.createElement('span');
    number.innerHTML = 'Machine -  ' + id;
    var current = document.createElement('span');
    current.setAttribute('class', 'curr' + id);
    current.innerHTML = money;
    var step = document.createElement('input');
    step.setAttribute('type', 'number');
    step.setAttribute('class', 'form-control step' + id);
    step.setAttribute('value', 25);
    var button = document.createElement('button');
    button.setAttribute('id', id);
    button.setAttribute('class', 'btn btn-dark');
    button.innerText = 'Play';
    button.setAttribute('onclick', 'play(event)');

    itemMachine.appendChild(number);
    itemMachine.appendChild(current);
    itemMachine.appendChild(step);
    itemMachine.appendChild(button);
    machines.appendChild(itemMachine);
}

function createCasino(casino) {
    machines.innerHTML = '';
    var yourTotal = document.querySelector('#total');
    yourTotal.innerHTML = casino.getTotalMoney();
    var items = casino.machines;
    items.forEach(function (item) {
        createMachine(item.id, parseInt(item.money));
    });
}

function pushMoney() {
    if (quantityMachine.value <= 0) return alert('Please set Machine');
    if (casino && casino.length > 0) casino = [];
    casino = new Casino(parseInt(quantityMachine.value), parseInt(userMoney.value));
    createCasino(casino);
}

function play(e) {
    e.preventDefault();
    var arr = [];
    casino.machines.forEach(function (item) {
        arr.push(item);
    });

    var item = arr.find(function (i) {
        return i.id == e.target.id;
    });
    if (item.money <= 0) return alert('You Lose!!!');
    item.play(item.id, item.money);
    casino.changeMoney(item.money);
    var total = document.querySelector('#total');
    total.innerHTML = casino.getTotalMoney();
}

/**
 * Class SlotMachine (Ігровий Автомат)
 * @param id
 * @param startCash
 * @constructor
 */
function SlotMachine(id, startCash) {
    this.id = id;
    this.money = startCash;

    this.getMoney = function () {
        return this.money;
    };

    this.getMoney = function (cash) {
        this.money = cash;
    };

    this.randomNum = function (min, max) {
        var number = parseInt(Math.random() * (max - min + 1) + min);
        return number;
    };

    this.play = function (id, money) {
        if (this.money <= 0) {
            return alert("You don't have money!");
        }
        var input = document.querySelector('.step' + id);
        if (input.value > 5) {
            if (this.money >= input.value) {
                this.money = money - this.randomNum(-10, 10);
            } else {
                alert('Please require step!');
            }
        } else {
            if (this.money >= input.value) {
                this.money = money - this.randomNum(-input.value, input.value);
            }
            else {
                alert('Please require step!');
            }
        }
        var currentCash = document.querySelector('.curr' + id);
        currentCash.innerHTML = this.money;
        return this.money;
    }
}


/**
 * Class Casino (Казино)
 * @param quantityMachine
 * @param startCash
 * @constructor
 */
function Casino(quantityMachine, startCash) {
    this.totalMoney = startCash;
    this.totalSum = [];
    this.number = quantityMachine;
    this.machines = [];

    for (var i = 0; i < quantityMachine; i++) {
        var machine,
            sum;
        if (i == 0 && quantityMachine % 2 != 0) {
            sum = Math.ceil(startCash / quantityMachine);
            machine = new SlotMachine(i, sum);
        } else {
            sum = Math.floor(startCash / quantityMachine);
            machine = new SlotMachine(i, sum);
        }
        this.machines.push(machine);
    }

    this.getCasino = function () {
        return this.machines;
    };

    this.getTotalMoney = function () {
        if (this.totalMoney <= 0) return alert('You WON!');
        return this.totalMoney;
    };

    this.setTotalMoney = function (money) {
        this.totalMoney += money;
    };

    this.changeMoney = function (total) {
        var lastIndex;
        if (this.totalSum.length == 0) {
            lastIndex = parseInt(this.totalMoney / this.number);
        } else {
            lastIndex = this.totalSum[this.totalSum.length - 1];
        }
        this.totalSum.push(total);
        this.totalMoney = this.totalMoney + (lastIndex - total);
    }
}




