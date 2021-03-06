function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var BuuDien = new google.maps.LatLng(10.780047603307494, 106.6998753111126);
  var VanMieu = new google.maps.LatLng(21.02738408669354, 105.83580794007007);

const duongkinh = 26000;
  const bankinh = 13000;
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: BuuDien,
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
//ve hinh tron
const BuuDiencircle = new google.maps.Circle({
  strorkecolor : "#0000FF",
  strorkeOpacity:0.8 ,
  strorkewieght: 2 ,
  fillColor:"#00FFFF",
  fillOpacity: 0.35 ,
  map,
  center : BuuDien,
  radius: 13000,
});
const VanMieucircle = new google.maps.Circle({
  strorkecolor : "#0000FF",
  strorkeOpacity:0.8 ,
  strorkewieght: 2 ,
  fillColor:"#00FFFF",
  fillOpacity: 0.35 ,
  map,
  center : VanMieu,
  radius: 13000,
});
var triangle1 = google.maps.geometry.spherical.computeOffset(
    BuuDien,
    duongkinh,
    0
  );
  var triangle2 = google.maps.geometry.spherical.computeOffset(
    BuuDien,
    duongkinh,
    120
  );
  var triangle3 = google.maps.geometry.spherical.computeOffset(
    BuuDien,
    duongkinh,
    -120
  );


  myPolygon1 = new google.maps.Polygon({
    path: [triangle1, triangle2, triangle3],
    strokeColor: "#FF049",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
  });

  
  var diem1 = google.maps.geometry.spherical.computeOffset(
    BuuDien,
    bankinh,
    0
  );
  var diem2 = google.maps.geometry.spherical.computeOffset(
    BuuDien,
    bankinh,
    120
  );
  var diem3 = google.maps.geometry.spherical.computeOffset(
   BuuDien,
    bankinh,
    -120
  );

  
  myPolygon2 = new google.maps.Polygon({
    path: [diem1, diem2, diem3],
    strokeColor: "#FF000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
  });

  // Van mieu
  var line1 = google.maps.geometry.spherical.computeOffset(
    VanMieu,
    duongkinh,
    0
  );
  var line2 = google.maps.geometry.spherical.computeOffset(
    VanMieu,
    duongkinh,
    120
  );
  var line3 = google.maps.geometry.spherical.computeOffset(
    VanMieu,
    duongkinh,
    -120
  );


  myPolygon3 = new google.maps.Polygon({
    path: [line1, line2, line3],
    strokeColor: "#FF049",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
  });

  
  var straigh1 = google.maps.geometry.spherical.computeOffset(
    VanMieu,
    bankinh,
    0
  );
  var straigh2 = google.maps.geometry.spherical.computeOffset(
    VanMieu,
    bankinh,
    120
  );
  var straigh3 = google.maps.geometry.spherical.computeOffset(
    VanMieu,
    bankinh,
    -120
  );

  
  myPolygon4 = new google.maps.Polygon({
    path: [straigh1, straigh2, straigh3],
    strokeColor: "#FF000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map,
  });


  //Hi???n th??? th??ng tin
  const infowindow1 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>B??u ??i???n th??nh ph??? </b>  <br> 2 C??ng x?? Paris, B???n Ngh??, Qu???n 1, Th??nh ph??? H??? Ch?? Minh, Vi???t Nam <br>  </div>',
    position: BuuDien,
  });

  //Hi???n th??? th??ng tin
  const infowindow2 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>V??n mi???u qu???c t??? gi??m</b> <br>63, ?????ng ??a, H?? N???i, Vi???t Nam <br></div>',
    position: VanMieu,
  });

  // Marker
  const marker = new google.maps.Marker({
    position: BuuDien,
    title: "B??u ??i???n th??nh ph???",
    map: map,
    // icon: "./img/Buu-dien.jpg",
  });

  const marker1 = new google.maps.Marker({
    position: VanMieu,
    title: "V??n mi???u qu???c t??? gi??m",
    map: map,
    // icon: "./img/khue-van-cac.jpg",
  });

  

  // Khi click v??o Marker th?? hi???n th???
  google.maps.event.addListener(marker, "click", function () {
    infowindow1.open(map, marker);
  });
  google.maps.event.addListener(marker1, "click", function () {
    infowindow2.open(map, marker1);
  });
}

google.maps.event.addDomListener(window, "load", initMap);
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
