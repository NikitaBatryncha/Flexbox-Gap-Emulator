// Проверяем, является ли браузер Safari до версии 14.1
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isSafariOlderThan14_1 = isSafari && parseInt(/Version\/(\d+)\.(\d+)/.exec(navigator.userAgent)[1]) < 14 || isSafari && parseInt(/Version\/(\d+)\.(\d+)/.exec(navigator.userAgent)[1]) === 14 && parseInt(/Version\/(\d+)\.(\d+)/.exec(navigator.userAgent)[2]) < 1;

// Проверяем, является ли браузер Chrome до версии 84
const isChromeOlderThan84 = /Chrome\/([0-9]+)/.test(navigator.userAgent) && parseInt(RegExp.$1) < 84;

// Проверяем, является ли браузер Edge до версии 84
const isEdgeOlderThan84 = /Edg\/([0-9]+)/.test(navigator.userAgent) && parseInt(RegExp.$1) < 84;

// Проверяем, является ли браузер Firefox до версии 63
const isFirefoxOlderThan63 = /Firefox\/([0-9]+)/.test(navigator.userAgent) && parseInt(RegExp.$1) < 63;

// Проверяем, является ли браузер Opera до версии 70
const isOperaOlderThan70 = /OPR\/([0-9]+)/.test(navigator.userAgent) && parseInt(RegExp.$1) < 70;

// Проверяем, является ли браузер Internet Explorer
const isIE = /MSIE|Trident/.test(navigator.userAgent);

// Проверяем, является ли браузер Safari на iOS до версии 14.5
const isSafariIOsOlderThan14_5 = /Version\/([0-9._]+).*Mobile.*Safari/.test(navigator.userAgent) && parseFloat(RegExp.$1) < 14.5;

// Проверяем, является ли браузер Samsung Internet до версии 14.0
const isSamsungInternetOlderThan14 = /SamsungBrowser\/([0-9.]+)/.test(navigator.userAgent) && parseFloat(RegExp.$1) < 14;

// Проверяем, является ли браузер Opera Mobile до версии 73
const isOperaMobileOlderThan73 = /Opera Mini|OPiOS\/([0-9.]+)/.test(navigator.userAgent) && parseFloat(RegExp.$1) < 73;

// Проверяем, является ли браузер Opera Mini
const isOperaMini = /Opera Mini/.test(navigator.userAgent);

// Получаем все элементы с классом "flex-container"
const flexContainers = document.querySelectorAll(".flex-container");

if (isSafariOlderThan14_1 || isChromeOlderThan84 || isEdgeOlderThan84 || isFirefoxOlderThan63 || isOperaOlderThan70 || isIE || isSafariIOsOlderThan14_5 || isSamsungInternetOlderThan14 || isOperaMobileOlderThan73 || isOperaMini) {
  // Для браузеров, которые не поддерживают свойство gap, добавляем значение margin
  flexContainers.forEach((container) => {
    const items = container.querySelectorAll(".flex-item");
    const gapValue = window.getComputedStyle(container).getPropertyValue("gap");
    let marginValue = parseInt(gapValue) + "px";
    if (/%|vw/.test(gapValue)) {
      marginValue = gapValue.replace(/(\d+)(%|vw)/g, (_, p1, p2) => {
        const containerSize = p2 === "vw" ? window.innerWidth : container.getBoundingClientRect().width;
        let gapSize = containerSize * p1 / 100;
        gapSize = `${gapSize}px`;
        return gapSize;
      });
    }
    const isColumn = window.getComputedStyle(container).getPropertyValue("flex-direction") === "column";
    items.forEach((item, index) => {
      if (item) {
        if (isColumn) {
          item.style.marginLeft = 0;
        }
      }
      if (index !== 0) {
        if (isColumn) {
          item.style.marginTop = marginValue;
        } else {
          item.style.marginLeft = marginValue;
        }
      }
    });
  });
}
