// Read URL params and apply to preview. Generate shareable link with params.
function qs(key, defaultVal=''){
  const u = new URL(window.location.href);
  return u.searchParams.get(key) || defaultVal;
}

function applyToCardFromParams(){
  const name = decodeURIComponent(qs('name','Brother / Sister'));
  const followers = decodeURIComponent(qs('followers','0'));
  const msg = decodeURIComponent(qs('msg','Wishing you love, laughter and lots of sweets!'));
  const img = decodeURIComponent(qs('img',''));
  document.getElementById('card-name').textContent = name;
  document.getElementById('card-followers').textContent = followers;
  document.getElementById('card-msg').textContent = msg;
  if(img){
    document.getElementById('card-bg').style.backgroundImage = 'url(' + img + ')';
  } else {
    // fallback image
    document.getElementById('card-bg').style.backgroundImage = 'url(https://images.unsplash.com/photo-1542736667-069246bdbc75?w=1400&q=80&auto=format&fit=crop)';
  }
  // fill inputs
  document.getElementById('input-name').value = name;
  document.getElementById('input-followers').value = followers;
  document.getElementById('input-msg').value = msg;
  document.getElementById('input-img').value = img;
}

function genLink(){
  const name = encodeURIComponent(document.getElementById('input-name').value || '');
  const followers = encodeURIComponent(document.getElementById('input-followers').value || '0');
  const msg = encodeURIComponent(document.getElementById('input-msg').value || '');
  const img = encodeURIComponent(document.getElementById('input-img').value || '');
  const base = location.origin + location.pathname;
  const url = base + '?name=' + name + '&followers=' + followers + '&msg=' + msg + '&img=' + img;
  return url;
}

document.getElementById('btn-generate').addEventListener('click', ()=> {
  const url = genLink();
  // open in new tab for preview
  window.open(url, '_blank');
});

document.getElementById('btn-copy').addEventListener('click', ()=> {
  const url = genLink();
  navigator.clipboard && navigator.clipboard.writeText(url).then(()=> {
    alert('Link copied to clipboard! Share it with others.');
  }).catch(()=> {
    prompt('Copy this link:', url);
  });
});

// initialize
applyToCardFromParams();