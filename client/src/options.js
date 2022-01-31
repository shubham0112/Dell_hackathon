// export const options =  {
//   particles: {
//     number: {
//       value: 80,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     },
//     color: {
//       value: "#ffffff"
//     },
//     shape: {
//       type: "circle",
//       stroke: {
//         width: 0,
//         color: "#000000"
//       },
//       polygon: {
//         nb_sides: 5
//       },
//       image: {
//         src: "img/github.svg",
//         width: 100,
//         height: 100
//       }
//     },
//     opacity: {
//       value: 0.5,
//       random: false,
//       anim: {
//         enable: false,
//         speed: 1,
//         opacity_min: 0.1,
//         sync: false
//       }
//     },
//     size: {
//       value: 4.005992965476349,
//       random: true,
//       anim: {
//         enable: false,
//         speed: 40,
//         size_min: 0.1,
//         sync: false
//       }
//     },
//     line_linked: {
//       enable: true,
//       distance: 150,
//       color: "#ffffff",
//       opacity: 0.4,
//       width: 1
//     },
//     move: {
//       enable: true,
//       speed: 6,
//       direction: "none",
//       random: false,
//       straight: false,
//       out_mode: "out",
//       bounce: false,
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 1200
//       }
//     }
//   },
//   interactivity: {
//     detect_on: "canvas",
//     events: {
//       onhover: {
//         enable: true,
//         mode: "repulse"
//       },
//       onclick: {
//         enable: true,
//         mode: "push"
//       },
//       resize: true
//     },
//     modes: {
//       grab: {
//         distance: 400,
//         line_linked: {
//           opacity: 1
//         }
//       },
//       bubble: {
//         distance: 400,
//         size: 40,
//         duration: 2,
//         opacity: 8,
//         speed: 3
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4
//       },
//       push: {
//         particles_nb: 4
//       },
//       remove: {
//         particles_nb: 2
//       }
//     }
//   },
//   retina_detect: true
// };
export const options = {
  particles: {
    number: {
      value: 106, //106
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
        color: "#29299d"
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
      color: "#29299d",
      opacity: 3.4,
      width: 3
    },
    move: {
      enable: true,
      speed: 6,//6
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
        distance: 400,
        line_linked: {
          opacity: 100
        }
      },
      bubble: {
        distance: 100,
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