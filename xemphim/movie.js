const movieData = [
    {
      "title": "A Nightmare on Elm Street",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/A_Nightmare_on_Elm_Street_%281984%29_theatrical_poster.jpg/220px-A_Nightmare_on_Elm_Street_%281984%29_theatrical_poster.jpg"
    },
    {
      "title": "Beetlejuice",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Beetlejuice_%281988_film_poster%29.png/220px-Beetlejuice_%281988_film_poster%29.png"
    },
    {
      "title": "Bram Stoker's Dracula",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Bram_Stoker%27s_Dracula_%281992_film%29.jpg/220px-Bram_Stoker%27s_Dracula_%281992_film%29.jpg"
    },
    {
      "title": "Ghostbusters",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Ghostbusters_%281984%29_theatrical_poster.png/220px-Ghostbusters_%281984%29_theatrical_poster.png"
    },
    {
      "title": "Halloween",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Halloween_%281978%29_theatrical_poster.jpg/220px-Halloween_%281978%29_theatrical_poster.jpg"
    },
    {
      "title": "Hocus Pocus",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Hocuspocusposter.jpg/220px-Hocuspocusposter.jpg"
    },
    {
      "title": "It",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/b/b0/It_1990_Promotional_Poster.JPG"
    },
    {
      "title": "Monster House",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Monster_House_poster.jpg/220px-Monster_House_poster.jpg"
    },
    {
      "title": "Scary Movie",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Movie_poster_for_%22Scary_Movie%22.jpg/220px-Movie_poster_for_%22Scary_Movie%22.jpg"
    },
    {
      "title": "Scream",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Scream_%281996_film%29_poster.jpg/220px-Scream_%281996_film%29_poster.jpg"
    },
    {
      "title": "The Addams Family",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/The_Addams_Family.jpg/220px-The_Addams_Family.jpg"
    },
    {
      "title": "The Exorcist",
      "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Exorcist_ver2.jpg/220px-Exorcist_ver2.jpg"
    }
  ]
  
  const cf = document.querySelector('.coverflow');
  const th = document.querySelector('.titleholder')
  const totalItems = movieData.length;
  let currentIndex = 0;
  
  // Create items
  const createItems = () => {
      movieData.forEach((item, index) => {
          const div = document.createElement('div');
          const img = document.createElement('img');
          img.src = item.poster_url;
                  img.title = item.title
          div.appendChild(img);
          div.classList.add('carousel-item');
          cf.appendChild(div);
      });
  };
  
  // Function to update view
  const updateView = () => {
      const items = document.querySelectorAll('.carousel-item');
      items.forEach((item, index) => {
          let relativeIndex = (index - currentIndex + totalItems) % totalItems;
          if (relativeIndex > totalItems / 2) relativeIndex -= totalItems;
          
          let angle = relativeIndex * (360 / totalItems);
          let zIndex = 5 - Math.abs(relativeIndex);
          
          if (Math.abs(relativeIndex) <= 2) {
              item.style.transform = `rotateY(${angle}deg) translateZ(200px)`;
              item.style.opacity = '1';
              item.style.zIndex = zIndex;
          } else {
              item.style.transform = `rotateY(${angle}deg) translateZ(200px) scale(0.1)`;
              item.style.opacity = '0';
              item.style.zIndex = zIndex;
          }
              if (relativeIndex != 0) {
                  item.onmouseover = (event) => {};
              }
              if (relativeIndex === 0) {
                  th.innerHTML = item.querySelector('img').title
                  item.onmouseover = (event) => {item.style.scale='1.2'};
                  item.onmouseout = (event) => {item.style.scale='1'};
                  Object.assign(document.body.style, {
                      background: `linear-gradient(transparent 40%,rgba(0,0,0,.85) 50%),radial-gradient(50% 75% at center, transparent 20%, black 65%), url('${item.querySelector('img').src}')`,
                      backgroundColor: '#000',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backdropFilter: 'blur(12px)'
                  });
              }
      });
  };
  
  // Update the current index
  const changeIndex = (direction) => {
      currentIndex = (currentIndex + direction + totalItems) % totalItems;
      updateView();
  };
  
  // Create arrows
  const createArrows = () => {
      const leftArrow = document.createElement('button');
      leftArrow.id = 'leftArrow';
      leftArrow.classList.add('arrow-button');
      document.body.appendChild(leftArrow);
      leftArrow.addEventListener('click', () => {
          changeIndex(-1); // Move left
      });
  
      const rightArrow = document.createElement('button');
      rightArrow.id = 'rightArrow';
      rightArrow.classList.add('arrow-button');
      document.body.appendChild(rightArrow);
      rightArrow.addEventListener('click', () => {
          changeIndex(1); // Move right
      });
  };
  
  // Initialize carousel
  createItems();
  updateView();
  createArrows();