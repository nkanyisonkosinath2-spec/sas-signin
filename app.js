// Send A Scooter: Google sign-in page. Opened by the app in Chrome with a one-time code (#s=...).
// Google's own button signs the person in; the one-time Google token goes back to the app through a link that
// only the Send A Scooter app (package za.co.sendascooter.app) can open. Nothing is stored or sent anywhere else.
(function () {
  var CLIENT_ID = '628683436078-gaq3dl4r01loga5qkgve4nbbpen8qkqd.apps.googleusercontent.com';
  var PKG = 'za.co.sendascooter.app';
  var m = /[#&]s=([A-Za-z0-9]{32})(?:&|$)/.exec(location.hash), state = m ? m[1] : '';
  var msg = document.getElementById('msg'), back = document.getElementById('back');
  try { if (state) sessionStorage.setItem('sas-s', state); else state = sessionStorage.getItem('sas-s') || ''; } catch (e) {}
  if (location.hash) { try { history.replaceState(null, '', location.pathname); } catch (e) {} }
  if (!/^[A-Za-z0-9]{32}$/.test(state)) {
    document.getElementById('title').textContent = 'Open this from the app';
    document.getElementById('sub').textContent = 'Tap "Continue with Google" in the Send A Scooter app to sign in.';
    return;
  }
  function done(token) {
    if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token || '')) { msg.textContent = 'Google sign-in didn\'t finish. Please try again.'; return; }
    var url = 'intent://google?s=' + state + '&t=' + token + '#Intent;scheme=sasauth;package=' + PKG + ';end';
    document.getElementById('title').textContent = 'You\'re signed in';
    document.getElementById('sub').textContent = 'Taking you back to Send A Scooter…';
    document.getElementById('gbtn').hidden = true;
    back.href = url; back.hidden = false;
    try { sessionStorage.removeItem('sas-s'); } catch (e) {}
    setTimeout(function () { location.href = url; }, 250);
  }
  function start() {
    if (!window.google || !google.accounts || !google.accounts.id) { setTimeout(start, 150); return; }
    google.accounts.id.initialize({ client_id: CLIENT_ID, callback: function (r) { done(r && r.credential); }, ux_mode: 'popup', auto_select: false, itp_support: true, use_fedcm_for_prompt: true });
    google.accounts.id.renderButton(document.getElementById('gbtn'), { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill', logo_alignment: 'left', width: 320 });
    google.accounts.id.prompt();
  }
  start();
  setTimeout(function () { if (!document.querySelector('#gbtn iframe, #gbtn div[role=button]')) msg.textContent = 'Google\'s sign-in is taking a while. Check your internet, then reload this page.'; }, 8000);
})();
