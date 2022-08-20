export const clientToSVGPosition = (x: number, y: number, svg: SVGSVGElement) => {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  const ctm = svg.getScreenCTM()?.inverse();
  const res = point.matrixTransform(ctm);
  return { x: res.x, y: res.y };
};
