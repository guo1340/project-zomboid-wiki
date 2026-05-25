/* Lightweight route-aware data loader. */
(function(){
  const root=typeof window!=='undefined'?window:globalThis;
  const path=(location.pathname||'/').replace(/\/index\.html$/,'/').replace(/\/$/,'')||'/';
  const allChunks=["core","guides","traits","occupations","skills","weapons","maps","build42","vehicles","mods","multiplayer","search-index"];
  const chunks=['core','search-index'];
  if(path==='/traits') chunks.push('traits');
  if(path==='/weapons') chunks.push('weapons');
  const useRequire=typeof require==='function'&&typeof module!=='undefined'&&module.exports;
  if(useRequire) root.__GW_PRERENDER__=true;
  (useRequire?allChunks:chunks).forEach(function(name){ if(useRequire) require('./data/'+name+'.js'); else document.write('<script src="/js/data/'+name+'.js"><\/script>'); });
})();
