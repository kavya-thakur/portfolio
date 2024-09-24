gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var cursor = document.querySelector(".cursor")
let mainn = document.querySelector("#main")
mainn.addEventListener("mousemove", function (dets) {
  gsap.to(cursor, {
    x: dets.x,
    y: dets.y,
    duration: 0.3,
    ease: Power3,
  });
});

let tl = gsap.timeline()
tl.to(".cursor", {
  opacity: 0,
  duration: 0,
})
tl.from(".line h1", {
  y: 150,
  stagger: 0.2,
  duration: 0.5,
})
tl.from(".number1 , .line h2", {
  opacity: 0,
  onStart: function () {

    let timerAnimation = document.querySelector(".number1 h5")
    let grow = 0;
    setInterval(() => {
      if (grow < 100) {
        timerAnimation.textContent = grow++
      }
      else {
        timerAnimation.textContent = grow

      }
    }, 25);

  }
})
tl.to("#loader", {
  // opacity : 0,
  duration: 0.9,
  y: "-100%",
  ease: Expo.easeInOut,
  delay: 2.6,
  // opacity : 0 , display : none,

})
tl.to(".cursor", {
  opacity: 1
})
tl.from(".nav", {
  opacity: 0
})
// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye
document.querySelectorAll(".elem").forEach(function (elem) {
  var rot = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(elem.querySelector("h1"), {
      opacity: 0.7,
      x: 0
    })
  });
  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rot;
    rot = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      // scroller : "#main" ,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),

    });
    gsap.to(elem.querySelector("h1"), {
      opacity: 0.2,
      x: 40
    })
  });

});
let imgg = document.querySelectorAll(".elem")
imgg.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    gsap.to(".cursor", {
      scale: 3

    })
    cursor.style.mixBlendMode = "normal"
    cursor.innerHTML = "VIEW MORE"
  })
  elem.addEventListener("mouseleave", function () {
    gsap.to(".cursor", {
      scale: 1

    })
    console.log("hey");
    cursor.style.mixBlendMode = "difference"
    cursor.innerHTML = ""
  })
})

let icon = document.querySelector(".menu")
let menu = document.querySelector("#menu")

icon.addEventListener("click", function () {
  console.log("hey");
  // let tl2 = gsap.Timeline()
  gsap.to("#menu", {
    top: "0%",
  })
  gsap.from(".animate", {
    y: "120%",
    stagger: 0.2,
    duration: 0.7,
    opacity: 1
  })
})

// page1animation = gsap.timeline()

tl.from(".page1animate h1 , .page1animate h6 , .page1animate h3", {
  y: "100%",
  stagger: 0.2,
  duration: 0.7,
  opacity: 1
})
tl.from(".bottom h3", {
  opacity: 0
})