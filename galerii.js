// Järgnev Javascript kood pärineb tervenisti siit: https://codepen.io/Snip3r/pen/GxybbN
// Samast kohast pärineb ka sellega kokku kuuluv galerii.css faili sisu ja slaideriga
// seotud html-koodi elemendid. See Javascript aitab teostada veebilehel kuvatavat piltide
// animeeritud slaiderit. Koodi sisse olen lisanud mõned eestikeelsed kommentaarid.

{
    // Dokumendist otsitakse üles slider klassi DIV elemendid (neid on antud veebilehel ainult 1)
    const sliders = document.querySelectorAll(".slider");
    // interval between switching images
    // can't be less than your animation duration in css!
    const interval = 2800;
    // if you don't want to first animation last longer than other animations  
    // set animDuration (in miliseconds) to your value of animation duration in css
    const animDuration = 600;
  
    for (let i = 0; i < sliders.length; ++i) {
      // Kuna veebilehel on ainult üks slaider, siis see tsükkel kestab ainult ühe sammu.
      const slider = sliders[i];
      // HTML dokumendist leitakse dots klassi DIV
      const dots = slider.querySelector(".dots");
      // HTML dokumendist leitakse kõik img klassi DIV-id
      const sliderImgs = slider.querySelectorAll(".img");
  
      let currImg = 0;
      let prevImg = sliderImgs.length - 1;
      let intrvl;
      let timeout;
  
      // Creates dots and add listeners to them
      for (let i = 0; i < sliderImgs.length; ++i) {
        // Iga pildi jaoks luuakse üks dot klassi DIV ja see uus DIV seotakse dotClick funktsiooniga, mis käivitub, kui selle DIV peal klõpsatakse hiirega.
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dots.appendChild(dot);
        dot.addEventListener("click", dotClick.bind(null, i), false);
      }
  
      // HTML dokumendist leitakse kõik vastloodud dot klassi DIV-id ja esimesele neist lisatakse active-dot klass.
      const allDots = dots.querySelectorAll(".dot");
      allDots[0].classList.add("active-dot");
  
      // Slaideri animatsioon: iga teatud aja tagant (muutuja 'interval') käivitub animateSlider funktsioon, mis vahetab aktiivset pilti.
      sliderImgs[0].style.left = "0";
      timeout = setTimeout(() => {
        animateSlider();
        sliderImgs[0].style.left = "";
        intrvl = setInterval(animateSlider, interval);
      }, interval - animDuration);   
  
      /**
       * Animates images
       * @param {number} [nextImg] - index of next image to show
       * @param {boolean} [right = false] - animate to right
       */
      function animateSlider(nextImg, right) {
        // See on funktsioon, mida käivitatakse ülevalpool nähtavas koodis iga teatud aja tagant aktiivse pildi vahetamiseks.
        if (!nextImg)
          nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;
  
        --nextImg;
        sliderImgs[prevImg].style.animationName = "";
  
        if (!right) {
          sliderImgs[nextImg].style.animationName = "leftNext";
          sliderImgs[currImg].style.animationName = "leftCurr";
        } 
        else {
          sliderImgs[nextImg].style.animationName = "rightNext";
          sliderImgs[currImg].style.animationName = "rightCurr";
        }
  
        prevImg = currImg;
        currImg = nextImg;
  
        currDot = allDots[currImg];
        currDot.classList.add("active-dot");
        prevDot = allDots[prevImg];
        prevDot.classList.remove("active-dot");
      }
  
      /**
       * Decides if animate to left or right and highlights clicked dot
       * @param {number} num - index of clicked dot
       */
      function dotClick(num) {
        // See on funktsioon, mis kutsutakse välja, kui dot klassi DIV'i peal on hiirega klõpsatud -- funktsioon aktiveerib antud dot DIV'ile vastava pildi.
        if (num == currImg)
          return false;
  
        clearTimeout(timeout);
        clearInterval(intrvl);
  
        if (num > currImg)
          animateSlider(num + 1);
        else
          animateSlider(num + 1, true);
  
        intrvl = setInterval(animateSlider, interval);
      }
    }
  }