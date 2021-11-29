
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const statusPoint = 12;
const selectList = [0,0,0,0,0,0,0,0,0,0,0,0];
const answerList = [0,0,0,0,0,0,0,0,0,0,0,0];

function openClose() {
  if (document.querySelector(".answerGroup").style.display === "block") {
    document.querySelector(".answerGroup").style.display = 'none';
    document.querySelector("#answerToggle").textContent = '보이기';
  } else {
    document.querySelector(".answerGroup").style.display = 'block';
    document.querySelector("#answerToggle").textContent = '숨기기';
  }
}

function calculationResult() {
  var result = selectList.indexOf(Math.max(...selectList));
  return result;
}

function setResult() {
  let point = calculationResult();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;

  const answerGroup = document.querySelector(".answerGroup");
  for(let i=0; i < statusPoint; i++) {
    let li = document.createElement("li");
    let tempText = qnaList[i].q;
    li.innerText = tempText;
    answerGroup.appendChild(li);
    let li2 = document.createElement("li");
    let tempText2 = "-> " +qnaList[i].a[answerList[i]].answer;
    li2.innerText = tempText2
    answerGroup.appendChild(li2);
  }

  var resultImg = document.createElement('img');
  const resultImgDiv = document.querySelector('#resultImg');
  var imgUrl = 'img/image-' + point + '.png';
  resultImg.src = imgUrl;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  resultImgDiv.appendChild(resultImg);
  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(function() {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450)
  }, 450);
  setResult();
}

function addAnswerBtn(answerText, qIdx, answerIdx) {
  var answerBox = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  answerBox.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    answerList[qIdx] = answerIdx;
    var children = document.querySelectorAll('.answerList');
    for(let i=0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[answerIdx].type;
      for(let i=0; i<target.length; i++) {
        selectList[target[i]] += 1;
      }

      for(let i=0; i<children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450)
  }, false);

}

function goNext(qIdx) {
  if(qIdx === statusPoint) {
    goResult();
    return;
  }
  var qBox = document.querySelector('.qBox');
  qBox.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswerBtn(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var statusBar = document.querySelector('.statusBar');
  statusBar.style.width = (100/statusPoint) * (qIdx + 1) + '%';
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(function() {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
