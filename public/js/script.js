const showToast = (success = false) => {
    if (success) {
        $('.toast-success').toast('show')
        setTimeout(() => $('.toast-success').toast('hide'), 3000)
    } else {
        $('.toast-error').toast('show')
        setTimeout(() => $('.toast-error').toast('hide'), 3000)
    }
}

function submitForm() {
    const fullname = $('#fullname').val()
    const email = $('#email').val()
    const message = $('#message').val()

    if ($('.submit-btn').text() === 'Submitting...') return

    if (!fullname) {
        $('.error-msg').html('Fullname is required')
        showToast()
        return
    }

    if (!email) {
        $('.error-msg').html('Email is required')
        showToast()
        return
    }

    if (!message) {
        $('.error-msg').html('Message is required')
        showToast()
        return
    }

    $('.submit-btn').html('Submitting...')

    const postData = { fullname, email, message }

    axios
        .post('/contactMe', postData)
        .then(({ data }) => {
            $('.success-msg').html(data)
            showToast(true)
            $('#fullname').val('')
            $('#email').val('')
            $('#message').val('')
            $('.submit-btn').html('Submit')
        })
        .catch(error => {
            $('.error-msg').html(error.message)
            showToast()
            $('.submit-btn').html('Submit')
        })
}
