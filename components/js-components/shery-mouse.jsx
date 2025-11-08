import Shery from "sheryjs"; 



export default function SheryMouse() {
const mouse = Shery.mouseFollower({
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

return (
  mouse
)
}
