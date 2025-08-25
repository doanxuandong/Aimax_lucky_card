const giftList = [
    {
        'name': '',
        'image': './assets/img/gift/voucher.png',
        'percent': 10,
    },
    {
        'name': '',
        'image': './assets/img/gift/voucher.png',
        'percent': 10,
    },
    {
        'name': '',
        'image': './assets/img/gift/voucher.png',
        'percent': 10,
    },
    {
        'name': '',
        'image': './assets/img/gift/voucher.png',
        'percent': 10,
    },
    {
        'name': '',
        'image': './assets/img/gift/next_lucky.jpg',
        'percent': 20,
    },
    {
        'name': '',
        'image': './assets/img/gift/next_lucky.jpg',
        'percent': 20,
    },
    {
        'name': '',
        'image': './assets/img/gift/next_lucky.jpg',
        'percent': 20,
    },
    {
        'name': '',
        'image': './assets/img/gift/next_lucky.jpg',
        'percent': 20,
    },
    {
        'name': '',
        'image': './assets/img/gift/next_lucky.jpg',
        'percent': 20,
    },
]
const groupBox = $('.group__box')[0];
const btnStart = $('#btn--start')[0];
var isPlay = false;
// Khởi tạo giá trị
giftList.forEach((e) => {
    var card = document.createElement('div');
    card.classList.add('card', 'card__visible');
    card.innerHTML = `<div class="card__front">
                        <h4 class="card__gift--name">${e.name}</h4>
                        <img class="card__gift--img" src="${e.image}" alt="">
                    </div>
                    <div class="card__back"></div>`;
    card.onclick = function () {
        if (isPlay) {
            const item = getGift(Math.random() * 100);
            this.querySelector('.card__gift--name').innerHTML = item.name;
            this.querySelector('.card__gift--img').src = item.image;
            Swal.fire({
                title: item.name,
                imageUrl: item.image,
                imageHeight: 200,
            });
            this.classList.add('card__visible');
            isPlay = false;
            btnStart.classList.toggle('btn__hide');
        }
    }
    groupBox.appendChild(card);
});
btnStart.onclick = function () {
    const cardList = $('.card');
    for (i = 0; i < cardList.length; i++) {
        cardList[i].classList.remove('card__visible');
    }
    isPlay = true;
    btnStart.classList.toggle('btn__hide');
}
// Lấy quà
const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];
    giftList.forEach((item, index) => {
        currentPercent += item.percent;
        randomNumber <= currentPercent && list.push({
            ...item, index
        });
    });
    return list[0];
}
function resize() {
    var width = $(window).width();
    var cardWidth;
    var cardColumn;
    
    if (width > 768) {
        // Desktop
        cardWidth = "720px";
        cardColumn = 4;
    } else if (width > 576) {
        // Tablet
        cardWidth = Math.min(width - 24, 720) + "px";
        cardColumn = 3;
    } else if (width > 375) {
        // Mobile
        cardWidth = Math.min(width - 20, 720) + "px";
        cardColumn = 3;
    } else {
        // Small Mobile
        cardWidth = Math.min(width - 16, 720) + "px";
        cardColumn = 3;
    }
    
    document.documentElement.style.setProperty('--card-width', cardWidth);
    document.documentElement.style.setProperty('--card-column', cardColumn);
    
    // Đảm bảo group box không bị overflow và các card nằm gọn
    $('.group__box').css({
        'max-width': '100%',
        'overflow': 'hidden',
        'width': cardWidth
    });
    
    // Đảm bảo mỗi card có kích thước phù hợp
    $('.card').css({
        'max-width': `calc(${cardWidth} / ${cardColumn})`,
        'box-sizing': 'border-box'
    });
}

// Debounce resize function để tránh gọi quá nhiều lần
let resizeTimeout;
function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100);
}

// Chỉ gọi resize khi cần thiết
$(document).ready(function() {
    resize(); // Chỉ gọi 1 lần khi load
});

// Thêm event listener với debounce
$(window).on('resize', debouncedResize);