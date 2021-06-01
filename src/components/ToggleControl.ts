export const StopToggleControlsCb: Array<{
  name: string;
  stop: () => void;
}> = [];

export function addStopToggleControl(name: string, stop: () => void): void {
  StopToggleControlsCb.push({ name, stop });
}

export function stopToggleControlsFor(excludeControlName?: string): void {
  StopToggleControlsCb.forEach((x) => {
    if (x.name !== excludeControlName) {
      x.stop();
    }
  });
}
