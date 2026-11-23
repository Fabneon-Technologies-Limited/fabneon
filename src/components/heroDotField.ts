import type { Theme } from '../composables/useTheme';

const palettes = {
  light: [[38, 62, 46], [69, 109, 81], [143, 174, 150], [206, 196, 170], [120, 148, 126]],
  dark: [[143, 174, 150], [184, 212, 174], [216, 201, 168], [239, 238, 235], [150, 180, 156]],
};

const columns = 196;
const rows = 56;
const tau = 2 * Math.PI;

// This same transparent sheet is the resting image and the source for the moving flecks.
export function paintDotField(canvas: HTMLCanvasElement, theme: Theme) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  const stops = palettes[theme];
  const colors = Array.from({ length: 256 }, (_, index) => {
    const position = index / 255 * stops.length;
    const step = Math.floor(position);
    const start = stops[step % stops.length];
    const end = stops[(step + 1) % stops.length];
    const rgb = start.map((value, channel) =>
      Math.round(value + (end[channel] - value) * (position - step)));
    return 'rgb(' + rgb.join(',') + ')';
  });

  for (let row = 0; row < rows; row++) {
    const v = (row + 0.5) / rows;
    for (let column = 0; column < columns; column++) {
      const u = (column + 0.5) / columns;
      const relief = 0.55 * Math.sin(tau * 1.05 * u + 0.4)
        + 0.3 * Math.sin(tau * 0.85 * v - 0.8)
        + 0.15 * Math.sin(tau * 0.65 * (u + v));
      const depth = (1 + relief) / 2;
      const edge = Math.min(1, 10 * Math.min(u, 1 - u, v, 1 - v));
      const y = height * (v + 0.05 * relief);

      ctx.fillStyle = colors[Math.round(depth * 255)];
      ctx.globalAlpha = (0.3 + 0.7 * depth) * edge * edge * (3 - 2 * edge);
      ctx.beginPath();
      ctx.arc(width * u, y, 0.7 + 1.9 * depth, 0, tau);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}
