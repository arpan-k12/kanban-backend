export function generateIdentificationCode(length = 6): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}
