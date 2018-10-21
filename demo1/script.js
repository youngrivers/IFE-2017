let data = {
    user: {
        name: 'youngrivers',
        age: '26'
    },
    address: {
        city: 'shenzhen'
    }
};
//构造观察者
function Ob(data) {
    this.data = data;
    this.walk(data);
}
let p = Ob.prototype;
p.walk = function(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (typeof element === 'object') {
                new Ob(element);
            }
            //console.log("------" + key);
            //console.log("------" + element);
            this.con(key, element);
        }
    }
}
p.con = function(key, element) {
    Object.defineProperty(this.data, key, {
        get: function() {
            console.log('你访问了：' + key);
            return element;
        },
        set: function(newElement) {
            console.log('你设置了：' + key);
            console.log('新的：' + key + '----' + newElement);
            if (newElement === element) return;
            element = newElement;
        }
    })
}
let app = new Ob(data)