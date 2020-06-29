export function app(id) {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCWH_f74iDZvJE7cMG8mIdRqtffLZmWmbo",
    authDomain: "nienluancntt-b1606931.firebaseapp.com",
    databaseURL: "https://nienluancntt-b1606931.firebaseio.com",
    projectId: "nienluancntt-b1606931",
    storageBucket: "nienluancntt-b1606931.appspot.com",
    messagingSenderId: "142231237489",
    appId: "1:142231237489:web:c5156bb06d0d0948663cd0",
    measurementId: "G-7N1P4X53B3",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var firebaseDB = firebase.firestore();
  var countNotification = 0;
  firebaseDB
    .collection(id)
    .where("status", "==", "Chưa xem")
    .get()
    .then(function (querySnapshot) {
      console.log(querySnapshot.size);
      if (querySnapshot.size != undefined) {
        countNotification = querySnapshot.size;
      }
    });
  console.log(typeof countNotification);
  if (countNotification == 0) {
    console.log("true");
    $("#countNotification").removeClass("btn-danger");
    $("#countNotification").addClass("btn-outline-danger");
  } else {
    console.log("false");
  }
  function Get(url) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
  }
  function addNotification(senderid, content, link, time) {
    firebaseDB
      .collection(id)
      .where("status", "==", "Chưa xem")
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size != undefined) {
          countNotification = querySnapshot.size;
        }
      });
    var strTime = moment(time).format("hh:mm, DD/MM/YYYY");
    var user = JSON.parse(Get("/api/user/" + senderid));
    var html = `<div class="container thongbao" style="padding: 0;min-width: 15rem;">
      <div class="row thongbao1" style="padding-top: 10px;padding-bottom: 2px">
        <div class="col-2">
          <a href="/user/${senderid}"><img class="d-inline-block rounded-circle float-left clearl" style="width: 30px; height: 30px;" src="${user.avatar}" alt=""></a>
        </div>
      <div class="col"
        <p class="p-1"><a href="${link}">${content}</a>
        <span class="d-block" style="font-size: .8125rem;">${strTime}</span></p>
      </div>
    </div>`;
    firebaseDB
      .collection(id)
      .where("status", "==", "Chưa xem")
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size != undefined) {
          countNotification = querySnapshot.size;
          if (countNotification >= 1) {
            $("#countNotification").addClass("btn-danger");
            $("#countNotification").removeClass("btn-outline-danger");
          }
          $("#countNotification").html(
            '<i class="fa fa-bell" aria-hidden="true"></i>&nbsp;' +
              countNotification
          );
        }
      });
    $("#notification-i").prepend(html);
  }
  firebaseDB
    .collection(id)
    .orderBy("time")
    .onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          var notification = change.doc.data();
          addNotification(
            notification.senderid,
            notification.content,
            notification.link,
            notification.time.toDate()
          );
        }
        if (change.type === "modified") {
          console.log("vừa có 1 thay đổi");
          firebaseDB
            .collection(id)
            .where("status", "==", "Chưa xem")
            .get()
            .then(function (querySnapshot) {
              if (querySnapshot.size != undefined) {
                countNotification = querySnapshot.size;
                if (countNotification == 0) {
                  $("#countNotification").removeClass("btn-danger");
                  $("#countNotification").addClass("btn-outline-danger");
                }
                $("#countNotification").html(
                  '<i class="fa fa-bell" aria-hidden="true"></i>&nbsp;' +
                    countNotification
                );
              }
            });
        }
        if (change.type === "removed") {
        }
      });
    });
} // export
