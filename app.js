//Add Map
var map = L.map('map').setView([35.67829610038154, 139.7764439603751], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

var myIcon = L.icon({
  iconUrl: 'like.png',
  iconSize: [45, 45],
  iconAnchor: [20, 40],
});

L.marker([51.5, -0.09], { icon: myIcon }).addTo(map);

// Code for modal window goes here

map.on('click', function (e) {
  var modal = document.getElementById('myModal');
  var latitudeField = document.getElementById('latitude');
  var longitudeField = document.getElementById('longitude');
  latitudeField.value = e.latlng.lat.toFixed(6);
  longitudeField.value = e.latlng.lng.toFixed(6);
  modal.style.display = 'block';
});

var modal = document.getElementById('myModal');
var closeButton = document.getElementsByClassName('close')[0];
var form = document.getElementsByTagName('form')[0];
var closeModal = document.getElementsByTagName('body')[0];

closeButton.onclick = function () {
  modal.style.display = 'none';
};

form.onsubmit = function (event) {
  event.preventDefault();
  var latitude = parseFloat(document.getElementById('latitude').value);
  var longitude = parseFloat(document.getElementById('longitude').value);
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var phone = document.getElementById('phone').value;
  var data = {
    latitude: latitude,
    longitude: longitude,
    name: name,
    email: email,
    address: address,
    phone: phone,
  };

  var savedData = JSON.parse(localStorage.getItem('markerData')) || [];
  savedData.push(data);
  localStorage.setItem('markerData', JSON.stringify(savedData));
  modal.style.display = 'none';
  savedData.forEach(function (data) {
    L.marker([data.latitude, data.longitude], { icon: myIcon }).addTo(map);
  });
};

var savedData = JSON.parse(localStorage.getItem('markerData')) || [];
savedData.forEach(function (data) {
  L.marker([data.latitude, data.longitude], { icon: myIcon }).addTo(map);
});

// When adding markers to the map
savedData.forEach(function (data) {
  var marker = L.marker([data.latitude, data.longitude], { icon: myIcon }).addTo(map);

  // Add click event listener to the marker
  marker.on('click', function (e) {
    // Show dialog box with marker's details
    var details = 'Lat: ' + data.latitude + '<br>' + 'Lat: ' + data.longitude + '<br>' + 'Email: ' + data.email + '<br>' + 'Address: ' + data.address + '<br>' + 'Phone: ' + data.phone ;
    Swal.fire({
      title: data.name,
      html:
        details,
      showDenyButton: true,
      confirmButtonText: 'Oke',
      denyButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        const markerFilter = (marker) => {
          return marker.latitude !==  e.latlng.lat && marker.langitutde !==  e.latlng.lng ;
        }
        var markData = savedData.filter(markerFilter);
        localStorage.setItem('markerData', JSON.stringify(markData))
        setTimeout(function(){window.location.reload();},100);
      }
    })
  });
});