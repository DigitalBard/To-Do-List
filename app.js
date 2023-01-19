const addBtn = document.querySelector(".addBtn");
let table = document.querySelectorAll("td");
const modal = document.getElementById("modal");
const bg = document.querySelector(".bg");

// modal 요소들
const closeBtn = document.querySelector(".close-btn");
const regBtn = document.querySelector(".reg-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const modifyBtn = document.querySelector(".modify_btn");
const modifiedBtn = document.querySelector(".modified_btn");
const delBtn = document.querySelector(".del_btn");
const title = document.getElementById("todo");
const status2 = document.getElementById("status");
const start = document.querySelector(".start-day");
const end = document.querySelector(".end-day");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");

// 정렬 방식
const sortStd = document.getElementById("sort");

const dayList = ["일", "월", "화", "수", "목", "금", "토"];
const statList = ["상", "중", "하"];
let items;
let idNum = 0;
let modifyResult = false;

function addTodo() {
  modifyBtn.style.display = "none";
  modifiedBtn.style.display = "none";
  delBtn.style.display = "none";
  regBtn.style.display = "inline";
  closeBtn.style.display = "block";

  title.disabled = false;
  status2.disabled = false;
  start.disabled = false;
  end.disabled = false;
  startTime.disabled = false;
  endTime.disabled = false;

  // modal 뒤 흐릿한 배경
  bg.style.display = "block";

  // modal 창 가운데에 띄우기
  modal.style.position = "fixed";
  modal.style.display = "block";
  modal.style.zIndex = "9999";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-370px, -220px)";
}

function close() {
  bg.style.display = "none";
  modal.style.display = "none";

  title.value = "";
  status2.value = "상";
  start.value = "일";
  end.value = "일";
  startTime.value = "";
  endTime.value = "";
}

function register() {
  const plan = title.value;
  const startDay = start.value;
  const startIndex = dayList.indexOf(startDay);
  const endDay = end.value;
  const endIndex = dayList.indexOf(endDay);
  const startTimeArr = startTime.value.split(":");
  const startT = parseInt(startTimeArr[0]) * 60 + parseInt(startTimeArr[1]);
  const endTimeArr = endTime.value.split(":");
  const endT = parseInt(endTimeArr[0] * 60) + parseInt(endTimeArr[1]);
  const status = status2.value;

  if (plan === "") {
    alert("일정을 입력해 주세요.");
    close();
    return false;
  } else if (startIndex > endIndex) {
    alert("요일 범위를 올바르게 입력해주세요.");
    close();
    return false;
  } else if (startT > endT || isNaN(startT) || isNaN(endT)) {
    alert("시간 범위를 올바르게 입력해 주세요.");
    close();
    return false;
  } else {
    const menu = document.createElement("div");
    const menuList = document.createElement("ul");
    const li_name = document.createElement("li");
    const li_time = document.createElement("li");
    const li_interval = document.createElement("li");
    const li_status = document.createElement("li");
    li_name.appendChild(document.createTextNode(plan));
    menuList.appendChild(li_name);
    li_time.appendChild(
      document.createTextNode(`시간 : ${startTime.value}~${endTime.value}`)
    );
    menuList.appendChild(li_time);
    li_interval.appendChild(document.createTextNode(startDay + "|" + endDay));
    li_interval.style.display = "none";
    menuList.appendChild(li_interval);
    li_status.appendChild(document.createTextNode(statList.indexOf(status)));
    li_status.style.display = "none";
    menuList.appendChild(li_status);
    menu.appendChild(menuList);
    menu.classList.add("menu");
    menuList.style.marginLeft = "16px";

    switch (status) {
      case "상":
        menu.style.backgroundColor = "red";
        break;
      case "중":
        menu.style.backgroundColor = "yellow";
        break;
      case "하":
        menu.style.backgroundColor = "green";
        break;
    }

    for (let i = startIndex; i <= endIndex; i++) {
      const item = menu.cloneNode(true);
      item.classList.add(idNum);
      item.addEventListener("click", modifyPopUp);
      table[i].appendChild(item);
    }
    idNum++;
    close();
    sorting();
    return true;
  }
}

function modifyPopUp(event) {
  const item = event.target;
  let color;
  let list;
  let listOfTime;

  closeBtn.style.display = "none";
  regBtn.style.display = "none";
  modifiedBtn.style.display = "none";
  modifyBtn.style.display = "inline";
  delBtn.style.display = "inline";

  title.disabled = true;
  status2.disabled = true;
  start.disabled = true;
  end.disabled = true;
  startTime.disabled = true;
  endTime.disabled = true;

  if (item.nodeName === "LI") {
    const par = item.parentNode;
    color = par.parentNode.style.backgroundColor;
    list = par.childNodes;
    listOfTime = list[1].firstChild.nodeValue.split(":");
    items = document.getElementsByClassName(par.parentNode.classList[1]);
  } else if (item.nodeName === "UL") {
    color = item.parentNode.style.backgroundColor;
    list = item.parentNode.firstChild.childNodes;
    listOfTime = list[1].firstChild.nodeValue.split(":");
    items = document.getElementsByClassName(item.parentNode.classList[1]);
  } else {
    color = item.style.backgroundColor;
    list = item.firstChild.childNodes;
    listOfTime = list[1].firstChild.nodeValue.split(":");
    items = document.getElementsByClassName(item.classList[1]);
  }

  title.value = list[0].firstChild.nodeValue;
  start.value = list[2].firstChild.nodeValue.split("|")[0];
  end.value = list[2].firstChild.nodeValue.split("|")[1];
  startTime.value = listOfTime[1].trim() + ":" + listOfTime[2].split("~")[0];
  endTime.value = listOfTime[2].split("~")[1] + ":" + listOfTime[3];
  switch (color) {
    case "red":
      status2.value = "상";
      break;
    case "yellow":
      status2.value = "중";
      break;
    case "green":
      status2.value = "하";
      break;
  }

  // modal 뒤 흐릿한 배경
  bg.style.display = "block";

  // modal 창 가운데에 띄우기
  modal.style.position = "fixed";
  modal.style.display = "block";
  modal.style.zIndex = "9999";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-370px, -220px)";
}

function close_mod() {
  title.disabled = true;
  status2.disabled = true;
  start.disabled = true;
  end.disabled = true;
  startTime.disabled = true;
  endTime.disabled = true;

  modifyBtn.style.display = "inline";
  modifiedBtn.style.display = "none";
  bg.style.display = "none";
  modal.style.display = "none";
}

function modifyTodo() {
  modifyBtn.style.display = "none";
  modifiedBtn.style.display = "inline";

  title.disabled = false;
  status2.disabled = false;
  start.disabled = false;
  end.disabled = false;
  startTime.disabled = false;
  endTime.disabled = false;
}

function deleteTodo(target, len) {
  for (let i = 0; i < len; i++) {
    target[0].remove();
  }
  close();
}

function modify(items, len) {
  modifyResult = register();

  if (modifyResult) {
    deleteTodo(items, len);
    modifyResult = false;
  }
}

function sorting() {
  if (sortStd.value === "우선순위 정렬") {
    for (let i = 0; i < table.length; i++) {
      const tdList = table[i].childNodes;
      const tdArray = Array.from(tdList);
      selectionSortByStat(tdArray, tdArray.length);
      const newTd = document.createElement("td");
      for (div of tdArray) {
        newTd.appendChild(div);
      }
      table[i].parentNode.replaceChild(newTd, table[i]);
    }
    table = document.querySelectorAll("td");
  } else if (sortStd.value === "이름순 정렬") {
    for (let i = 0; i < table.length; i++) {
      const tdList = table[i].childNodes;
      const tdArray = Array.from(tdList);
      selectionSortByName(tdArray, tdArray.length);
      const newTd = document.createElement("td");
      for (div of tdArray) {
        newTd.appendChild(div);
      }
      table[i].parentNode.replaceChild(newTd, table[i]);
    }
    table = document.querySelectorAll("td");
  } else if (sortStd.value === "시간순 정렬") {
    for (let i = 0; i < table.length; i++) {
      const tdList = table[i].childNodes;
      const tdArray = Array.from(tdList);
      selectionSortByTime(tdArray, tdArray.length);
      const newTd = document.createElement("td");
      for (div of tdArray) {
        newTd.appendChild(div);
      }
      table[i].parentNode.replaceChild(newTd, table[i]);
    }
    table = document.querySelectorAll("td");
  }
}

function selectionSortByStat(list, n) {
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (
        parseInt(list[j].firstChild.lastChild.textContent) <
        parseInt(list[min].firstChild.lastChild.textContent)
      ) {
        min = j;
      }
    }
    swap(list, i, min);
  }
}

function selectionSortByName(list, n) {
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (
        list[j].firstChild.firstChild.textContent <
        list[min].firstChild.firstChild.textContent
      ) {
        min = j;
      }
    }
    swap(list, i, min);
  }
}

function selectionSortByTime(list, n) {
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      const t1 = list[j].firstChild.childNodes[1].textContent.split(":");
      const t2 = list[min].firstChild.childNodes[1].textContent.split(":");
      if (
        parseInt(t1[1].trim()) * 60 + parseInt(t1[2].split("~")[0]) <
        parseInt(t2[1].trim()) * 60 + parseInt(t2[2].split("~")[0])
      ) {
        min = j;
      }
    }
    swap(list, i, min);
  }
}

function swap(list, i, min) {
  temp = list[i];
  list[i] = list[min];
  list[min] = temp;
}

addBtn.addEventListener("click", addTodo);
closeBtn.addEventListener("click", close);
cancelBtn.addEventListener("click", close);
regBtn.addEventListener("click", register);
sort.addEventListener("change", sorting);
cancelBtn.addEventListener("click", close_mod);
modifyBtn.addEventListener("click", () => {
  modifyTodo(items);
});
modifiedBtn.addEventListener("click", () => {
  modify(items, items.length);
});
delBtn.addEventListener("click", () => {
  deleteTodo(items, items.length);
});
