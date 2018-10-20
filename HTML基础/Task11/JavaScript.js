/**
 * Created by youngrivers on 2017/5/9.
 */
var s=0,i=0;
while(s<2333){
    i++;
    if(i%2==0||i%3==0){
        s++;
    }
}
document.write(i+'<br>');
alert(i);