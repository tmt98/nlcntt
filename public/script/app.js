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
  //   firebaseDB
  //     .collection(id)
  //     .get()
  //     .then(function (qS) {
  //       qS.forEach(function (doc) {
  //         var notification = doc.data();
  //         addNotification(
  //           notification.senderid,
  //           notification.content,
  //           notification.link
  //         );
  //       });
  //     });
  var countNotification = 0;
  firebaseDB
    .collection(id)
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
  function addNotification(senderid, content, link) {
    var html =
      '<div class="clearfix" style="min-width: 13rem;"><img class="d-inline-block rounded-circle float-left clearl" style="width: 30px; height: 30px;" src="/public/upload/avatar/abc.jpg" alt=""><p class="p-1">&nbsp; Đã like bài viết của bạn</p></div>';
    console.log("Vừa có 1 tin nhắn mới");
    $("#countNotification").html(
      '<i class="fa fa-bell" aria-hidden="true"></i>&nbsp;' + countNotification
    );
    $("#notification-i").append(html);
  }
  firebaseDB.collection(id).onSnapshot(function (snapshot) {
    countNotification = snapshot.size;
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {
        if (countNotification >= 1) {
          $("#countNotification").addClass("btn-danger");
          $("#countNotification").removeClass("btn-outline-danger");
        }
        var notification = change.doc.data();
        addNotification(
          notification.senderid,
          notification.content,
          notification.link
        );
      }
      if (change.type === "removed") {
      }
    });
  });
} // export
