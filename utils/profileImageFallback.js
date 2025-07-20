export function handleError(setterFunction, value) {
  setterFunction(`https://api.dicebear.com/5.x/initials/svg?seed=${value}`);
}
