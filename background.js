function checkUpdateAccount() {
  if (
    document
      .getElementsByTagName("html")[0]
      .innerHTML.search("Không, Cảm Ơn") != -1
  ) {
    var allBtns = document.getElementsByClassName("button");
    var closeBtn = allBtns[allBtns.length - 1];
    closeBtn.click();
  }
}

function closeModal() {
  var closeButton = document.querySelector('[aria-label="Đóng"]');
  if (closeButton) {
    closeButton.click();
  }
}

function runOutOfLike() {
  if (
    document
      .getElementsByTagName("html")[0]
      .innerHTML.search("Bạn không còn lượt thích nào!") != -1
  ) {
    const hms = document.getElementsByClassName("Fz($ml)")[1].textContent;
    // Split it at the colons
    const a = hms.split(":");
    // Minutes are worth 60 seconds. Hours are worth 60 minutes. 1 second = 1kmilliseconds.
    // Genius... rocket science...
    const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    if (!seconds) {
      return 12 * 60 * 60 * 1000;
    }

    return seconds * 1000;
  }
  return 0;
}

function swipedAllNearBy() {
  if (
    document
      .getElementsByTagName("html")[0]
      .innerHTML.search("MỞ RA TOÀN CẦU") != -1 ||
    document
      .getElementsByTagName("html")[0]
      .innerHTML.search(
        "Chúng tôi không tìm thấy ai có vẻ tương hợp bạn vào lúc này"
      ) != -1
  ) {
    setTimeout(function () {
      location.reload();
    }, 900000);
    return 1;
  }
  return 0;
}

function isMatch() {
  return document.querySelector("a.active");
}

// prevent async execution
function pause(milliseconds) {
  const dt = new Date();
  while (new Date() - dt <= milliseconds) {
    /* Do nothing */
  }
}

function trickTinder() {
  // Check if ran out of likes
  const waitTime = runOutOfLike();
  if (waitTime) {
    checkUpdateAccount();
    return waitTime + 60 * 1000;
  }

  // Check if there is subscription modal
  checkUpdateAccount();

  // Check if modal open then close it
  closeModal();

  if (swipedAllNearBy()) {
    return 900000;
  }

  const infoClassName = "focus-button-style";
  const mainPage = document.getElementsByClassName("recsPage")[0];
  const buttons = mainPage.getElementsByClassName("button");

  const dislike = buttons[1];
  const like = buttons[3];

  if (like) {
    like.click();
  }
  
  if (window.swiped_count % 20 == 0) {
    console.log("Swiped: ", +window.swiped_count);
  }

  const thereIsMatch = isMatch();
  if (thereIsMatch) {
    console.log("------------- IT'S A MATCH ! -------------");
    thereIsMatch.click();
  }
  return waitTime;
}

// There is a lot more fun that can be achieved
// Need to add socket puppetry (VPNs solutions? several accounts?) - :D
// TODO: Need to accept automatically permissions except for
// TODO: Need to add ANN for fake pics
// TODO: Need to add RNN for fake messages

function getRandomPeriod() {
  return Math.round(Math.random() * (2000 - 500)) + 700;
}

window.addEventListener("load", function () {
  console.log("Start swiping!");
  window.swiped_count = 0;

  (function loopSasori() {
    // A random period between 700ms and 2secs
    let randomPeriod = getRandomPeriod();
    var btns = document.getElementsByClassName("Pos(r) Z(1)");
    if (btns.length >= 10) {
      btns[9].click();
    }
    setTimeout(function () {
      randomPeriod = undefined;

      const delay = trickTinder();

      window.swiped_count += 1;

      if (delay) {
        console.log(
          "Have to wait: " +
            Math.floor(delay / 1000 / 60 / 60) +
            " hours and " +
            (Math.floor(delay / 1000 / 60) % 60) +
            " minutes"
        );
        console.log("Swiped: ", +window.swiped_count);
        randomPeriod = delay;
      }

      if (!randomPeriod) {
        loopSasori();
      } else {
        setTimeout(function () {
          checkUpdateAccount();
          loopSasori();
        }, randomPeriod);
      }
    }, randomPeriod);
  })();
});
