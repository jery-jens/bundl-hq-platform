/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
(function () {
  /** Make sure to show only the participated events in the schedule * */
  const scheduleItems = document.querySelectorAll('.js-scheduleevent');

  /** Popups */
  const toggleLinks = document.querySelectorAll('.js-togglepopup');
  const toggleDeskLinks = document.querySelectorAll('.js-deskspace');
  const toggleScheduleLinks = document.querySelectorAll('.js-haspopup');
  const popups = document.querySelectorAll('.js-popup');
  const closeToggles = document.querySelectorAll('.js-closepopup');
  const formStorage = JSON.parse(localStorage.getItem('forms')) ?? [];
  const formIcons = document.querySelectorAll('.js-icon');

  /** Place in storage when toggled popup is a form  */
  const placeStorage = (title) => {
    if (formStorage.length) {
      // Check if form isn't filled in
      if (!formStorage.includes(title)) {
        formStorage.push(title);
        localStorage.setItem('forms', JSON.stringify(formStorage));
      }
    } else {
      localStorage.setItem('forms', JSON.stringify([title]));
    }
  };

  /** Check if empy placeholder is needed */
  const days = document.querySelectorAll('.js-day');

  days.forEach((day) => {
    const items = day.querySelectorAll('.js-scheduleevent');
    const empty = day.querySelector('.js-empty');
    const activeEmpty = day.querySelector('.js-activeempty');

    if (!activeEmpty) {
      let pass = true;

      items.forEach((item) => {
        if (item.style.display === 'flex') {
          pass = false;
        }
      });

      if (pass) {
        empty.style.display = 'flex';
      }
    }
  });

  /** Check if all items are filled in or naah */
  if (formStorage.length) {
    toggleLinks.forEach((link, index) => {
      if (formStorage.includes(link.children[1].innerHTML)) {
        // Add green color and full opacity to filled in icon
        if (formIcons[index]) {
          formIcons[index].style.backgroundColor = '#00BB77';
        }
      }
    });
  }

  /** Toggle popup when clicking link */
  const togglePopup = (title) => {
    popups.forEach((popup) => {
      if (popup.innerHTML === title) {
        // Place cookie
        placeStorage(title);

        // Show popup
        const wrapper = popup.parentElement;
        wrapper.style.display = 'flex';
      }
    });
  };

  toggleLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      togglePopup(link.children[1].innerHTML);

      if (formIcons[index]) {
        formIcons[index].style.backgroundColor = '#00BB77';
      }
    });
  });

  toggleScheduleLinks.forEach((link) => {
    link.addEventListener('click', () => {
      togglePopup(link.children[2].innerHTML);
    });
  });

  toggleDeskLinks.forEach((link) => {
    link.addEventListener('click', () => {
      togglePopup(link.innerHTML);
    });
  });

  closeToggles.forEach((closeToggle) => {
    closeToggle.addEventListener('click', () => {
      popups.forEach((popup) => {
        popup.parentElement.style.display = 'none';
      });
    });
  });

  /** Toggle event popup */
  scheduleItems.forEach((link) => {
    link.addEventListener('click', () => {
      popups.forEach((popup) => {
        if (popup.innerHTML === link.children[0].innerHTML) {
          const wrapper = popup.parentElement;
          wrapper.style.display = 'flex';
        }
      });
    });
  });
}());
