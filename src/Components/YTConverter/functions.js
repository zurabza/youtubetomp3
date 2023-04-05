export function isYTLinkValid(url) {
    var regExp = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
    var match = url.match(regExp);
    if (match) {
      return true;
    } else {
      return false;
    }
  }
  

export function getYTVideoID(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    // Error
  }
}
