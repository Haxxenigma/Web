let profileStatus = 'user'

function redirect(btn, url) {
    document.getElementById(btn).addEventListener('click', function () {
        location.assign(url)
    })
}

function redirectWithCheck(btn, urlUser, urlGuest) {
    document.getElementById(btn).addEventListener('click', function () {
        if (profileStatus == 'user') {
            location.assign(urlUser)
        }
        else if (profileStatus == 'guest') {
            location.assign(urlGuest)
        }
    })
}

redirect('header-icon', '../html/index.html')

redirect('header-main', '../html/main.html')

redirect('header-gallery', '../html/gallery.html')

redirect('header-contact', '../html/contact.html')

redirect('sub-header-signin', '../html/signin.html')

redirect('sub-header-signup', '../html/signup.html')

redirectWithCheck('sub-header-profile', '../html/profile.html', '../html/signup.html')

redirect('sub-header-signout', '../html/index.html')

redirect('index-button', '../html/main.html')