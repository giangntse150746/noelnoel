console.log(
  `%cNhập thêm parameter vào sau đường dẫn nha (nhớ thêm dấu hỏi chấm trước đó).\nCú pháp: 
  - Dẫn tới profile facebook: ?fbid=Profile_ID. VD: fbid=MashiMar.2001
  - Dẫn tới profile messenger: ?meid=Profile_ID. VD: meid=MashiMar.2001
  - Hoặc để trống nếu bạn chỉ muốn chơi cho vui =)))
Sau đó reload lại trang để thử xem đường dẫn có hoạt động hay chưa.`
  , 'background: #222; color: #32a846; font-size: 1.5em');

function askForSound() {
  swal({
    text: "Bạn có muốn một chút nhạc không?",
    buttons: {
      yes: {
        text: "Yuppp!",
        value: true,
      },
      no: {
        text: "Chắc chắn rồi",
        value: false,
      }
    }
  }).then(() => {
    playTheMusic();
  });
}

const numberOfParticular = 300;

const screen = window.screen;
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const txtAsk = document.getElementById("txtAsk");

var count = 0;
var randH = 80;
var randW = 80;
if (screen.width <= 540) {
  randW = 40;
  randH = 50;
} else if (screen.width <= 800) {
  randW = 60;
}

btnNo.addEventListener("click", clickNo);
btnYes.addEventListener("click", clickYes);

// First load elements
txtAsk.innerHTML = '<span class="text">Noel này cậu đi chơi với tớ nhé</span>';
btnYes.innerHTML = 'Tớ đồng ý ' + `<span class="red icon"> &#10084;</span>`;
btnNo.innerText = 'Không';

// snow generate
for (var i = 0; i < numberOfParticular; i++) {
  var snow = document.createElement("DIV");
  snow.classList.add("snow");
  document.getElementById("snowContainer").appendChild(snow);
}

// handle Click
function clickNo() {
  console.log(randW);
  switch (count) {
    case 0:
    case 1:
    case 2:
      count++;
      btnNo.style.top = Math.floor(Math.random(randH) * 100) + 'vh';
      btnNo.style.left = Math.floor(Math.random(randW) * 100) + 'vw';
      break;
    case 3:
      btnNo.style.top = '150vh';
      btnNo.style.left = '-120vw';
      btnNo.style.visibility = 'hidden';
      break;
  }
}

async function clickYes() {
  btnNo.style.top = '150vh';
  btnNo.style.left = '-120vw';
  btnYes.style.top = '150vh';
  btnYes.style.left = '120vw';
  btnYes.style.visibility = 'hidden';
  btnNo.style.visibility = 'hidden';
  txtAsk.innerHTML = '<span class="bg-white">Đồng ý rồi nha ^^</span>';
  var url = new URL(window.location);
  const profile = url.searchParams.get('fbid');
  if (profile) {
    setTimeout(window.location.href = `https://fb.com/${profile}`, 3000);
  } else {
    const message = url.searchParams.get('meid');
    if (message)
      setTimeout(window.location.href = `https://m.me/${profile}`, 3000);
  }
}

function playTheMusic() {
  document.getElementById("bgAudio-container").innerHTML = `
      <audio id="bgAudio" src="/assets/jinglebellrock.mp3" type="audio/mpeg" allow="autoplay" autoplay loop>
          Your browser does not support the audio.
      </audio>
  `;
  var player = document.getElementById('bgAudio');
  player.volume = 0.5;
  setTimeout(function () {
    var playedPromise = player.play();
    if (playedPromise) {
      playedPromise.catch((e) => {
        console.log(e)
        if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
          console.log(e.name);
        }
      }).then(() => {
        console.log("playing sound !!!");
      });
    }
  }, 1000);
}

$(document).ready(() => {
  askForSound();
});