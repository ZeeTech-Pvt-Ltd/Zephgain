// SPA navigation to a clean path — same mechanism as clicking an internal link.
// pushState adds a history entry (so the back button works) and the popstate
// dispatch lets App.jsx pick up the route change and scroll to the top.
export function navigateTo(path) {
  if (path === location.pathname) return
  history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
