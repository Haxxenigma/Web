const article = document.querySelector('.article');

if (article) {
    const articleCnt = article.querySelector('.articleCnt');
    const articleHeaders = document.querySelector('.articleHeaders');
    const headers = article.querySelectorAll('h3');
    headers.forEach((header, index) => {
        const hr = document.createElement('hr');
        const title = header.innerHTML.toLowerCase().replace(/[^\w\d]/g, '');
        if (index !== 0) {
            articleCnt.insertBefore(hr, header.nextSibling);
        }
        header.setAttribute('id', title);
        header.addEventListener('click', () => {
            // window.open(`#${title}`, '_self');
            const targetElement = document.getElementById(title);
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth',
            });
        });
        const link = document.createElement('a');
        link.setAttribute('href', `#${title}`);
        link.classList.add('headerLinks');
        link.innerHTML = header.innerHTML;
        articleHeaders.appendChild(document.createElement('li')).appendChild(link);
    });

    const headerLinks = document.querySelectorAll('.headerLinks');

    function updateActiveLink() {
        headers.forEach((header, index) => {
            const rect = header.getBoundingClientRect();
            if (rect.top <= 80) {
                headerLinks.forEach(link => link.classList.remove('active'));
                headerLinks[index].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    const asideCntToggle = document.querySelector('.asideCntToggle');
    const asideCnt = document.querySelector('.asideCnt');
    asideCntToggle.addEventListener('click', () => {
        asideCnt.classList.toggle('active');
    });

    const asideCntClose = document.querySelector('.asideCntClose');
    asideCntClose.addEventListener('click', () => {
        asideCnt.classList.remove('active');
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchorLink => {
        anchorLink.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth',
                });
            }
        });
    });

    const preBlocks = articleCnt.querySelectorAll('pre');

    preBlocks.forEach(preBlock => {
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');
        const tooltip = document.createElement('div');

        img1.src = '/media/code2.svg';
        img2.src = '/media/copy.svg';
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = 'Copy'
        div1.appendChild(img1);
        div2.appendChild(img2);
        div2.appendChild(tooltip);
        div2.classList.add('preHeaderCopy');

        const newDiv = document.createElement('div');
        newDiv.appendChild(div1);
        newDiv.appendChild(div2);
        newDiv.classList.add('preHeader');

        preBlock.insertAdjacentElement('afterbegin', newDiv);
    });

    const preHeaderCopy = document.querySelectorAll('.preHeaderCopy');
    preHeaderCopy.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentElem = btn.parentElement.parentElement;
            const index = parentElem.innerText.indexOf('\n');
            const code = parentElem.innerText.substring(index + 1);
            navigator.clipboard.writeText(code);
            btn.querySelector('.tooltip').innerHTML = 'Copied';
        });
        btn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                btn.querySelector('.tooltip').innerHTML = 'Copy';
            }, 200);
        });
    });
}