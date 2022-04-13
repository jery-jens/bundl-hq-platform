/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

(function () {
  /** Make sure to show only the participated events in the schedule * */
  const scheduleItems = document.querySelectorAll('.js-scheduleevent');
  const sideItems = document.querySelectorAll('.js-event');

  if (sideItems && scheduleItems) {
    scheduleItems.forEach((scheduleItem) => {
      const scheduleTitle = scheduleItem.children[1].innerHTML;

      sideItems.forEach((sideItem) => {
        const sideTitle = sideItem.innerHTML;

        if (scheduleTitle === sideTitle) {
          scheduleItem.style.display = 'flex';
        }
      });
    });
  }

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
      if (!formStorage.contains(title)) {
        formStorage.push(title);
        formStorage.setItem('forms', JSON.stringify(formStorage));
      }
    }
  };

  /** Check if all items are filled in or naah */
  console.log(formStorage);
  console.log(formIcons);
  if (formStorage.length) {
    toggleLinks.forEach((link, index) => {
      if (formStorage.contains(link.children[0].innerHTML)) {
        // Add green color to filled in icon
        formIcons[index].children[0].style.fill = '#00BB77';
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

  toggleLinks.forEach((link) => {
    link.addEventListener('click', () => {
      togglePopup(link.children[0].innerHTML);
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
}());
