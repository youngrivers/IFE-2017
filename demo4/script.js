function Compile(node, vm) {
    console.log(node, vm, node.firstChild, node.childNodes);
    let _this = vm.data
    console.log(_this.user.name);
    console.log(_this.user.age);
    Array.from(node.childNodes).forEach(child => {
        //节点类型为元素
        if (child.nodeType === 1) {
            console.log('节点类型为元素');
            //console.log(child.innerText);
            let reg = /\{\{(.*)\}\}/;
            //user.name = _this.user.name;
            child.innerText.replace(child.innerText.split(reg)[1], _this.user.name);
            console.log(child.innerText.split(reg)[1]);
            console.log(child.innerText);
            console.log(_this.user.name);
        }
    });
    //return `<p>vm.data.user.name</p>`
    let _p = document.createElement('p')
    let _text = document.createTextNode(_this.user.name)
    _p.appendChild(_text)
    return _p;
}

function Vue(farms) {
    this.data = farms.data;
    if (farms.el.slice(0, 1) === '#') {
        console.log(farms.el.slice(1));
        let id = farms.el.slice(1);
        let _div = document.getElementById(id);
        const dom = new Compile(_div, this);
        _div.appendChild(dom);
    }
}
const app = new Vue({
    el: '#app',
    data: {
        user: {
            name: "young",
            age: 11
        }
    }
});