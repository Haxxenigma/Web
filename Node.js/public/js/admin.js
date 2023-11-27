const adminWrapper = document.querySelector('.adminWrapper');

if (adminWrapper) {
    const adminMenu = document.querySelector('.adminMenu');
    const adminMenuToggle = document.querySelector('.adminMenuToggle');
    const adminCnt = document.querySelector('.adminCnt');
    const tableRows = adminCnt.querySelectorAll('.tableRows');
    const createBtn = document.getElementById('adminCntCreateBtn');

    adminMenuToggle.addEventListener('click', () => {
        adminMenu.classList.toggle('hidden');
        adminMenuToggle.classList.toggle('hidden');
    });

    const adminMenuBtns = adminMenu.querySelectorAll('button');
    adminMenuBtns.forEach(bnt => {
        const table = bnt.dataset.table;
        bnt.addEventListener('click', () => {
            tableRows.forEach(tableRow => tableRow.classList.remove('show'));
            adminCnt.querySelector(`.${table}`).classList.add('show');
            adminMenuBtns.forEach(btn => btn.classList.remove('active'));
            bnt.classList.add('active');
            if (table === 'users') {
                createBtn.setAttribute('href', '/register');
            } else if (table === 'articles') {
                createBtn.setAttribute('href', '/article/create');
            }
        });
    });
}