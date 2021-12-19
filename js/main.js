// =========== NAV-BAR Sticy ===========
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 0) {
    nav.classList.remove('fixed-top');
    nav.classList.add('sticky-top');
  } else {
    nav.classList.add('fixed-top');
    nav.classList.remove('sticky-top');
  }
})


// =========== Nav Icon Customization ===========
const navToggler = document.querySelector('.fa-bars');
navToggler.addEventListener('click', () => {
  navToggler.classList.toggle('fa-times');
})

const navbar = document.querySelector('.navbar-collapse');
const navLink = document.querySelectorAll('.nav-link');

navLink.forEach(item => {
  item.addEventListener('click', () => {
    navbar.classList.remove('show');
    navToggler.classList.toggle('fa-times');
  });
})


// =========== ULTIMATE FEATURES TOGGLE hIDDEN DOCUMENTS ===========
const hidden = document.querySelectorAll('#ultimate-features .hidden');
const showBtn = document.querySelector('.more-features-show');

showBtn.addEventListener('click', () => {
  showBtn.classList.toggle('active');

  hidden.forEach(item => {
    item.classList.toggle('hidden');
  });
})




// =========== for Companies logo Slider ===========
var slider = tns({
  container: '.my-slider',
  items: 5,
  slideBy: 'page',
  autoplay: true,
  autoplayButtonOutput: false,
  controls: false,
  autoplayTimeout: 2000,
  speed: 1000,
  mouseDrag: true,
  slideBy: 1,
  responsive: {
    0: {
      items: 3,
      nav: false
    },
    768: {
      items: 4,
      nav: true
    },
    1000: {
      items: 5
    }
  },
});




// =========== PURCHASING CARDS ===========
const annualBtn = document.querySelector('.annually');
const monthlyBtn = document.querySelector('.monthly');
const background = document.querySelector('.bg-btn');
const annualCards = document.querySelector('.annual-cards');
const monthlyCards = document.querySelector('.monthly-cards');



annualBtn.addEventListener('click', () => {
  const active = document.querySelector('.filter-btns .active');
  const activeCard = document.querySelector('.active-card');
  active.classList.remove('active');
  activeCard.classList.remove('active-card');

  annualBtn.classList.add('active');
  background.style.left = "49%";
  annualCards.classList.add('active-card');
});

monthlyBtn.addEventListener('click', () => {
  const active = document.querySelector('.filter-btns .active');
  const activeCard = document.querySelector('.active-card');
  active.classList.remove('active');
  activeCard.classList.remove('active-card');

  monthlyBtn.classList.add('active');
  background.style.left = "1%";
  monthlyCards.classList.add('active-card');
});












// =========== TESTIMONIAL SLIDER ===========
var slider = tns({
  container: '.testimonial-slider',
  items: 1,
  slideBy: 'page',
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 5000,
  speed: 1000,
  mouseDrag: true,
  slideBy: 1,
  gutter: 50,
  controls: true,
  controlsContainer: '#custom-control',
});




// ========= HOME BUTTON ANIMATION =========
var animateButton = function (e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');

  e.target.classList.add('animate');
  setTimeout(function () {
    e.target.classList.remove('animate');
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}




// ======= INITIALIZE AOS Scroll Plugin =======
AOS.init();




// ======== TypeWritter =========

(function (window, document) {
  window.autoTyper = function (opts) {
    var options = {
      selector: '',
      words: [],
      charSpeed: 125,
      delay: 2100,
      loop: true,
      flipflop: true,
      position: 10,
      currentWord: '',
      element: null,
      isStopped: false
    }

    var applyNewOptions = function (opts) {
      if (!opts) return

      for (var opt in opts) {
        if (opts.hasOwnProperty(opt)) {
          options[opt] = opts[opt]
        }
      }
    }
    applyNewOptions(opts)

    // put characters synchronously
    var putChar = function*() {
      // if current character is last or its stopped
      if (options.position === options.currentWord.length || options.isStopped) {
        // check if flip flop is activated
        if (options.flipflop) {
          yield setTimeout(function () {
            // after the delay, start removing chars one by one
            remChar().next()
          }, options.delay)
        }

        // exit
        yield null
      }

      // append the char into the element
      options.element.innerHTML += options.currentWord[options.position++]

      // loop the function for other remained chars
      yield setTimeout(function () {
        putChar().next()
      }, (options.position < options.currentWord.length) ? options.charSpeed : 0)
    }

    // remove characters synchronously
    var remChar = function*() {
      // if all chars is removed or its stopped, exit function
      if (options.position === 0 || options.isStopped) yield null

      // remove the char from the element
      options.element.innerHTML = options.currentWord.substr(0, --options.position)

      // loop the function for other remained chars
      yield setTimeout(function () {
        remChar().next()
      }, (options.position > 0) ? options.charSpeed : 0)
    }

    // prepare words to be typed synchronously
    var processWord = function*(word, delay) {
      yield setTimeout(function () {
        // reset options
        options.position = 0
        options.currentWord = word
        options.element.innerHTML = ''

        // start to put characters
        putChar().next()
      }, delay)
    }

    var exec = function*() {
      // if its stopped, exit function
      if (options.isStopped) yield null

      var timeoutDelay = 0

      for (var i = 0; i < options.words.length; i++) {
        var theWord = options.words[i]

        if (!theWord) continue

        processWord(options.words[i], timeoutDelay).next()

        var tmp = options.words[i].length * options.charSpeed
        if (options.flipflop) tmp *= 2

        timeoutDelay += (tmp + options.delay)
      }

      yield setTimeout(function () {
        options.loop ? exec().next() : ''
      }, timeoutDelay)
    }

    this.start = function () {
      if (typeof options.selector !== 'string' || !options.selector) return
      if (!Array.isArray(options.words) || !options.words.length) return

      var el = document.querySelector(options.selector)
      if (!el) return

      options.element = el
      options.isStopped = false

      exec().next()
    }

    this.stop = function() {
      // reset options
      options.isStopped = true
      options.position = 0
      options.currentWord = ''
    }
  }
})(window, document)


  var options = {
    selector: '#typewritter',
    words: ['Best app for your modern lifestyle']
}
  
  // start autoTyper
  var typer = new autoTyper(options)
  typer.start()