
export function get_cookie (cookie_name) {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
        cookie = cookie.trim()
        if (cookie.length > 0) {
            let name, value;
            [name, value] = cookie.split('=')
            if (name === cookie_name) return value
        }
    }
    return null
}
