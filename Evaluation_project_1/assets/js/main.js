/**
* Template Name: Flattern - v4.9.0
* Template URL: https://bootstrapmade.com/flattern-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

// ======= CRD Function==============

var list = localStorage.getItem('ToDo')
data_todo = JSON.parse(list);
show(data_todo);

function show(l) {
    var list_todo = document.getElementById('list-todo');
    list_todo.innerHTML=" ";

    // data_todo.length === 0 ? list_todo.innerHTML += `<tr><td><strong>There's nothing to do...</strong></td></tr>` : "";
    Object.keys(l).length === 0 ? list_todo.innerHTML += `<tr><td style = "width : 500px";><strong>There's nothing to do...</strong></td></tr>` : "";

    console.log(l);

    l.forEach(function (todo) { 
      let check = todo.checked ? 'checked' : null;
      let idx = l.findIndex(obj => {
        return obj.id = todo.id;
      });

      var hapus =`<button type="button" class="btn btn-danger" onclick="hapus(${idx})">Hapus</button>`;
      if (todo.checked) {
        list_todo.innerHTML += `<tr><td style = "width : 500px";>
        
        <input type="checkbox" class="form-check-input" id="check-${todo.id}" name="option" value="${todo.checked}" onclick="checkbox(${todo.id})" checked>
        <label class="form-check-label" for="check" id="item-${todo.id}"><span class = "text-decoration-line-through">${todo.value}</span></label> 
        
        </td> <td>`+ hapus +`</td></tr>`;
      } else {
        list_todo.innerHTML += `<tr><td style = "width : 500px";>
        
        <input type="checkbox" class="form-check-input" id="check-${todo.id}" name="option" value="${todo.checked}" onclick="checkbox(${todo.id})">
        <label class="form-check-label" for="check" id="item-${todo.id}"><span>${todo.value}</span></label> 
        
        </td> <td>`+ hapus +`</td></tr>`;
      }
    });
    console.log(l);

}

// tick n strike function
function checkbox(id) {
  var check = JSON.parse(localStorage.getItem('ToDo'));
  var checkbox = document.getElementById('check-'+id);

  // tenary operator 
  let find = check.findIndex(obj => {
    return obj.id == id;
  })

  if (checkbox.checked == true) { 
    check[find].checked = true;
    document.querySelector("#item-"+id).style.textDecoration = 'line-through';
    // console.log(check[id]);
    localStorage.setItem('ToDo', JSON.stringify(check));
    
  } else {
    // console.log(checkbox.checked);
    check[find].checked = false;
    document.querySelector("#item-"+id).style.textDecoration = '';
    // console.log(check);
    localStorage.setItem('ToDo', JSON.stringify(check));
  }
}

function add(id) {
    var input = document.querySelector("input[name=todo]");
    // console.log(input);
    var value = input.value;
    input.value = "";
    const todo = {
      value,
      checked: false,
      id: Date.now(),
    };

    let list = JSON.parse(localStorage.getItem('ToDo'));

    if (list === null) {
      let list = [];
      list.push(todo);
      console.log(list);
      localStorage.setItem('ToDo', JSON.stringify(list));
      show(list);
    } else{
      list.push(todo);
      console.log(list);
      localStorage.setItem('ToDo', JSON.stringify(list));
      show(list);
    }
}    

function hapus(id) {
  let data_todo = JSON.parse(localStorage.getItem('ToDo'));
    data_todo.splice(id,1);
    
    localStorage.setItem('ToDo', JSON.stringify(data_todo));
    show(data_todo);
}
// ========= end CRD Funtion ============

// ======= Search Function==============
function search() {
  var data_todo = JSON.parse(localStorage.getItem('ToDo'));
  var search_todo = document.getElementById('search-todo');
  search_todo.innerHTML=" ";
  
  var input = document.getElementById("search");
  var filter = "value";
  var keyword = input.value;
  console.log(input.value);

  var filteredData = data_todo.filter(function(obj) {
    return obj[filter] === keyword;

  });
  Object.keys(filteredData).length === 0 ? search_todo.innerHTML += `<tr><td><strong>Search for Somehing...</strong></td></tr>` : "";

  console.log(filteredData);
  filteredData.forEach(todo => {
    console.log(todo);
    search_todo.innerHTML += `<tr><td>${todo.value}</td></tr>`;
  });
}

search();

