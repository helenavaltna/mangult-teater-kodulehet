function initMap() {
		//panin asukohaks Delta keskuse
        const asukoht = { lat: 58.385, lng: 26.725};
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: asukoht,
        });
		//punase markeri lisamine kaardile
        const marker = new google.maps.Marker({
          position: asukoht,
          map: map,
        });
      }