/* Bishop's Companion — offline service worker */
const CACHE='bishops-companion-v1';
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html']).catch(()=>{})));
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  let url; try{url=new URL(req.url);}catch(_){return;}
  if(url.origin!==location.origin) return; /* external links (scriptures) go to network */
  const isDoc = req.mode==='navigate' || (req.headers.get('accept')||'').includes('text/html');
  if(isDoc){
    /* network-first: a re-deployed update is picked up online; cache serves offline */
    e.respondWith(
      fetch(req).then(res=>{
        const r1=res.clone(), r2=res.clone();
        caches.open(CACHE).then(c=>{c.put('./index.html',r1);c.put('./',r2);}).catch(()=>{});
        return res;
      }).catch(()=>caches.match(req).then(h=>h||caches.match('./index.html')))
    );
  } else {
    /* static assets — cache-first */
    e.respondWith(
      caches.match(req).then(h=>h||fetch(req).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
        return res;
      }).catch(()=>undefined))
    );
  }
});
