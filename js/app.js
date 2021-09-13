/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

// get elements and store them in variables
const mainTag = document.getElementsByTagName('main');
const navbar = document.getElementById('navbar__list');

// create arrays
const sectionDataNav = []; // get data-nav attr value
const MainTagArr = [...mainTag]; // convert htmlCollection to array
let sectionsArr = []; // initialize empty array to store specific tags in it [all sections]
const sectionIds = []; // create empty array to store ids of section in it to use them inside links
const sectionsOffset = {};

for (const item of MainTagArr) {
  sectionsArr = [...item.children];
}
sectionsArr.shift(); // delete header item

for (const item of sectionsArr) {
  const attr = item.getAttribute('data-nav');
  const itemId = item.id;
  const itemOffsetTop = item.offsetTop;
  sectionDataNav.push(attr);
  sectionIds.push(itemId);
  sectionsOffset[itemId] = itemOffsetTop;
}

// add attributes,text to element and append every one to its parents
for (let i = 0; i < sectionDataNav.length; i += 1) {
  // create li and link tags
  const li = document.createElement('li');
  const aLink = document.createElement('a');

  // setting href to a tag used later for if condition to
  // compare if section id == to href so when user click on link it will move them to section
  for (let j = 0; j < sectionIds.length; j += 1) {
    aLink.setAttribute('href', `#${sectionIds[i]}`);
  }

  aLink.classList.add('menu__link');
  aLink.innerText = sectionDataNav[i];
  li.appendChild(aLink);
  navbar.appendChild(li);
}
const links = [...document.querySelectorAll('.menu__link')];

// toggle active class
function activeStat(e) {
  const currLink = document.querySelector('#navbar__list .active');
  if (currLink !== null) {
    document.querySelector('#navbar__list a.active').classList.remove('active');
  }
  e.target.classList.add('active');
}
links.forEach((item) => {
  item.addEventListener('click', activeStat);
});

function toggleClass(e) {
  const temp = e.target.attributes.href.value;
  const trimmedHref = temp.slice(1); // remove the hashsympol from string
  // loop over the array of sections
  for (let i = 0; i < sectionsArr.length; i += 1) {
    // check if section id == link
    if (trimmedHref === sectionsArr[i].id) {
      const currNode = sectionsArr[i].nextElementSibling;
      // remove the class from all sections
      sectionsArr.forEach((item) => item.classList.remove('your-active-class'));
      // loop to add class to current section
      for (let x = 0; x < sectionsArr.length; x += 1) {
        sectionsArr[i].classList.add('your-active-class'); // add class to current section
        if (sectionsArr[i].nextElementSibling != null || sectionsArr[i] === sectionsArr.length) {
          currNode.classList.remove('your-active-class'); // remove class from next sibling
        }
      }
    }
  }
}

// scroll to corresponding section
function navigate(e) {
  e.preventDefault();
  const temp = e.target.attributes.href.value;
  const trimmedHref = temp.slice(1); // remove the hashsympol from string
  const objKeys = Object.keys(sectionsOffset);
  const objVal = Object.values(sectionsOffset);
  for (let i = 0; i < objKeys.length; i += 1) {
    if (trimmedHref === objKeys[i]) {
      window.scrollTo({
        top: objVal[i],
        behavior: 'smooth',
      });
    }
  }
  toggleClass(e);
}

// add active class to section in view
function checkView() {
  for (let i = 0; i < sectionsArr.length; i += 1) {
    const rect = sectionsArr[i].getBoundingClientRect(); // get section's position
    // add active class when section is in viewport
    if (rect.top >= 0 && rect.top <= 250) {
      sectionsArr[i].classList.add('your-active-class');
    } else {
      sectionsArr[i].classList.remove('your-active-class');
    }
  }
}

// add event listener to every navbar link
navbar.addEventListener('click', navigate);
window.addEventListener('scroll', checkView);
