// eslint-disable-next-line import/prefer-default-export
export function getBestETA(data) {
  if (data.length === 0) {
    return [];
  }

  // Get the Best ETA VALUE
  const bestETA = data.reduce(
    (min, p) =>
      parseInt(p.leg.duration, 10) < min ? parseInt(p.leg.duration, 10) : min,
    parseInt(data[0].leg.duration, 10)
  );

  // Get the Best ETA DATA
  const bestETAPlanner = data.filter(
    p => parseInt(p.leg.duration, 10) === bestETA
  );
  
  return bestETAPlanner[0];
}
