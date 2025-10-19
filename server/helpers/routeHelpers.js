function isActiveroute(route, currentRoute) {
    return route === currentRoute ? 'active' : ""
}

module.exports = { isActiveroute }