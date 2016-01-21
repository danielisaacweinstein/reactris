export function getColor() {
  let colors = [
    "#2e86ab",
    "#a23b72",
    "#f18f01",
    "#c73e1d",
    "#3b1f2b"
  ]

  return colors[Math.floor(Math.random() * colors.length)];
}
