export const options = {
  particles: {
    number: {
      value: 106, 
      density: {
        enable: true,
        value_area: 1500 //800
      },
    },
    color: {
      value: "#3a20b6"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 7,
        color: "0c45ad"
      },
      polygon: {
        nb_sides: 100
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.6810188041309794,
      random: false,
      anim: {
        enable: false,
        speed: 1.24, //1.24
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
        speed: 400,
        size_min: 2.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 85.11985930952699,
      color: "#0c45ad",
      opacity: 3.4,
      width: 3
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 100,
        line_linked: {
          opacity: 100
        }
      },
      bubble: {
        distance: 10,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: .1
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};