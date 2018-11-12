function Compile(node, vm) {
    console.log(node, vm, node.childNodes);
    let _this = vm.data
        //console.log(_this.user.name);
        //console.log(_this.user.age);
        //let _p
    Array.from(node.childNodes).forEach(child => {
        //节点类型为元素
        if (child.nodeType === 1) {
            //console.log('节点类型为元素');
            //console.log(child.innerText);
            let reg = /\{\{(.*)\}\}/;
            //user.name = _this.user.name;
            //child.innerText.replace(child.innerText.split(reg)[1], _this.user.name);
            //console.log(child.innerText);
            //console.log(user.name);
            let _text = child.innerText.split(reg)[0] + (child.innerText.split(reg)[1].split('.')[1] === 'name' ? _this.user.name : _this.user.age);
            console.log(_text);
            child.innerText = _text;
            //_p = document.createElement('p')
            //_p.appendChild(document.createTextNode(_text))
        }
    });
    //return _p;
    //return `<p>vm.data.user.name</p>`
    //let text_name = document.createTextNode('姓名：' + _this.user.name)
    //let text_age = document.createTextNode('年龄：' + _this.user.age)
    //_p.appendChild(text_name)
    //_p.appendChild(text_age)
}

function Vue(farms) {
    this.data = farms.data;
    if (farms.el.slice(0, 1) === '#') {
        ///console.log(farms.el.slice(1));
        let id = farms.el.slice(1);
        let _div = document.getElementById(id);
        //编译dom
        const dom = new Compile(_div, this);
        _div.appendChild(dom);
    }
}
const app = new Vue({
    el: '#app',
    data: {
        user: {
            name: "young",
            age: 111
        }
    }
});