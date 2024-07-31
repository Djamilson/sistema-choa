function removeDoubleSpaces(text: string) {
  return text.replace(/\s{2,}/g, ' ');
}

export { removeDoubleSpaces };
