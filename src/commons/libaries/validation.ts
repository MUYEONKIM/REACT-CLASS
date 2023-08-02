export const checkValidationFile = (file?: File): boolean => {
  if (typeof file === "undefined") {
    alert("파일이 없습니다!");
    return false;
  }

  // 1024byte = 1kb, 1024kb = 1MB
  if(file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 급니다. (제한 : 5MB")
    return false;
  }

  if(!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("파일 형식이 잘못되었습니다.");
    return false;
  }

  return true;
}
