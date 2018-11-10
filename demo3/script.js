console.log('---动态数据绑定（3）---');

function Event() {
    this.events = {};
}
Event.prototype.on = function(attr, callback) {
    if (this.events[attr]) {
        this.events[attr].push(callback);
    } else {
        this.events[attr] = callback;
    }
}
Event.prototype.off = function(attr) {
    for (const key in this.events) {
        if (this.events.hasOwnProperty(key) && key === attr) {
            const element = this.events[key];
            delete element
        }
    }
}
Event.prototype.emit = function(attr, ...arg) {
    this.events[attr] && this.events[attr].forEach(item => {
        item(...arg)
    });
}

function Observer(data) {
    this.data = data;
    this.makeObserver(data)
    this.eventsBus = new Event();
}
Observer.prototype.setterAndGetter = function(key, ele) {
    let _this = this
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('你访问了' + key);
            return ele;
        },
        set: function(newEle) {
            console.log('你修改了' + key);
            console.log('新的' + key + ':' + newEle);

            _this.eventsBus.emit(key, ele, newEle)
            if (typeof newEle === 'object') {
                new Observer(ele)
            }
        }
    })
}
Observer.prototype.makeObserver = function(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (typeof element === 'object') {
                new Observer(element);
            }
            //console.log(element, key, obj);
            console.log(key, element);
            this.setterAndGetter(key, element);
        }
    }
}
Observer.prototype.$watch = function(attr, callback) {
    this.eventsBus.on(attr, callback);
}
let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function(newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});