import anime from "animejs"

export const ballAnime = (targets, x, y, status) => {
  anime({
    targets: targets,
    translateX: status ? (el, i) => x : 0,
    translateY: status ? (el, i) => y : 0,
    opacity: status ? 1 : 0,
    scale: status ? 1 : 0,
    delay: anime.stagger(100),
    duration: 600,
    easing: "easeInOutQuad"
  })
}
