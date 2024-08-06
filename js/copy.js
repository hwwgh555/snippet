function Copy(str) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str)
  }

  const save = function (e) {
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  };
  document.addEventListener("copy", save);
  document.execCommand("copy");
  document.removeEventListener("copy", save);
}
