
const looper_time = 800;

//是否首次执行
let run_once = true;
//弹幕索引
let index = 0;
let total;
let data;
let looper;
function barrager() {
  if (run_once) {
    //如果是首次执行,则设置一个定时器,并且把首次执行置为false
    looper = setInterval(barrager, looper_time);
    run_once = false;
  }
  
  //发布一个弹幕
  const item = {
    img: 'https://yaseng.org/jquery.barrager.js/static/img/heisenberg.png', //图片 
    color: '#' + parseInt(Math.random() * 0xffffff).toString(16), //颜色,默认白色 
    info: data[index]['title'], //文字 
    speed:Math.random() *10,
    bottom: Math.random() * (document.body.clientHeight * 3 / 4), //距离底部高度,单位px,默认随机 
  }
  
  $('body').barrager(item);
  
  //索引自增
  index++;
  //所有弹幕发布完毕，清除计时器。
  if (index == total) {
    clearInterval(looper);
    main();
    return false;
  }
}

async function main() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    data = await response.json();
    
  
    total = data.length;
    if (total == 0) {
        setTimeout(main, 30000);
        return;
    }
  
    index = 0;
    run_once = true;
    barrager();
}


$(function() {
    main();
});
