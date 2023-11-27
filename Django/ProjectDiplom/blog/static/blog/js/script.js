const dropdown = document.querySelector('.profile_dropdown');
const profileHead = document.querySelector('.profile_head');
const profileHeadLink = document.querySelector('.profile_head_link');
const profileLink = document.querySelector('#profile_link');

const mediaQuery = window.matchMedia('(max-width: 750px)');

if (mediaQuery.matches) {
    if (profileLink) profileLink.classList.add('active');
    profileHead.classList.remove('profile_head_hoverable');
    profileHeadLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

const ArticleDetail = document.querySelector('.article_detail');

if (ArticleDetail) {
    const ArticleCntHeaders = document.querySelector('#article_cnt_headers_ol');
    const ArticleCnt = document.querySelector('.article_cnt');

    const ArticleHeaders = ArticleCnt.querySelectorAll('h1, h2, h3, h4, h5, h6');

    ArticleHeaders.forEach(ArticleHeader => {
        link = document.createElement('a');
        link.setAttribute('href', `#${ArticleHeader.innerHTML}`);
        link.innerHTML = ArticleHeader.innerHTML;
        ArticleHeader.setAttribute('id', ArticleHeader.innerHTML);
        ArticleCntHeaders.appendChild(document.createElement('li')).appendChild(link);
    });
}