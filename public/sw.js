if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>c(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ODDGN8-j1Dq7pL-RQAesL/_buildManifest.js",revision:"508e3341860b453b1bc1897cdbf698dd"},{url:"/_next/static/ODDGN8-j1Dq7pL-RQAesL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0a6e12db.d0957c59944d3552.js",revision:"d0957c59944d3552"},{url:"/_next/static/chunks/11e07bb4-de2e81bc22a17376.js",revision:"de2e81bc22a17376"},{url:"/_next/static/chunks/12-8b751bc755ba240e.js",revision:"8b751bc755ba240e"},{url:"/_next/static/chunks/13.89bc659de5f7e326.js",revision:"89bc659de5f7e326"},{url:"/_next/static/chunks/138.1e822df599435e25.js",revision:"1e822df599435e25"},{url:"/_next/static/chunks/160.b6ea3c8103ea0ce2.js",revision:"b6ea3c8103ea0ce2"},{url:"/_next/static/chunks/196.9b5ac21cb3ba7c57.js",revision:"9b5ac21cb3ba7c57"},{url:"/_next/static/chunks/205.770b557fb98e79bd.js",revision:"770b557fb98e79bd"},{url:"/_next/static/chunks/243-0150bf28ff264b56.js",revision:"0150bf28ff264b56"},{url:"/_next/static/chunks/255.2f5bc521b12547f9.js",revision:"2f5bc521b12547f9"},{url:"/_next/static/chunks/274.825a0b0bee5ef344.js",revision:"825a0b0bee5ef344"},{url:"/_next/static/chunks/306.d5d486859936f2ca.js",revision:"d5d486859936f2ca"},{url:"/_next/static/chunks/317.c5e959ded6e80944.js",revision:"c5e959ded6e80944"},{url:"/_next/static/chunks/333-664a136eb71f652b.js",revision:"664a136eb71f652b"},{url:"/_next/static/chunks/344-c977cce93c2e1387.js",revision:"c977cce93c2e1387"},{url:"/_next/static/chunks/363.0966713ac655817e.js",revision:"0966713ac655817e"},{url:"/_next/static/chunks/398-20c8fd2de365eefd.js",revision:"20c8fd2de365eefd"},{url:"/_next/static/chunks/432-68bc52641aaf033a.js",revision:"68bc52641aaf033a"},{url:"/_next/static/chunks/461-cddec2388425afb7.js",revision:"cddec2388425afb7"},{url:"/_next/static/chunks/49.12135b217a7eea16.js",revision:"12135b217a7eea16"},{url:"/_next/static/chunks/499-336c7e435fb60a9f.js",revision:"336c7e435fb60a9f"},{url:"/_next/static/chunks/545-b5b8352630dc1d94.js",revision:"b5b8352630dc1d94"},{url:"/_next/static/chunks/557.9daf002ea87f13ec.js",revision:"9daf002ea87f13ec"},{url:"/_next/static/chunks/590.a29cb001cadf9b0b.js",revision:"a29cb001cadf9b0b"},{url:"/_next/static/chunks/667.ef718808a24b4587.js",revision:"ef718808a24b4587"},{url:"/_next/static/chunks/675-7310a2e3678c0d85.js",revision:"7310a2e3678c0d85"},{url:"/_next/static/chunks/685-085c7e123274b9e4.js",revision:"085c7e123274b9e4"},{url:"/_next/static/chunks/716.8842254cd6ecb0b2.js",revision:"8842254cd6ecb0b2"},{url:"/_next/static/chunks/725-e3fac0e5fdc8fa9c.js",revision:"e3fac0e5fdc8fa9c"},{url:"/_next/static/chunks/761-beaa4611b5423f8f.js",revision:"beaa4611b5423f8f"},{url:"/_next/static/chunks/772-4f5a34f57bf60abd.js",revision:"4f5a34f57bf60abd"},{url:"/_next/static/chunks/902.94278ca282c002e4.js",revision:"94278ca282c002e4"},{url:"/_next/static/chunks/973.2a8c33611bee5804.js",revision:"2a8c33611bee5804"},{url:"/_next/static/chunks/982.c88c0420ca8d82f2.js",revision:"c88c0420ca8d82f2"},{url:"/_next/static/chunks/b8b506e4-bdb7dfcea9aca38b.js",revision:"bdb7dfcea9aca38b"},{url:"/_next/static/chunks/framework-73b8966a3c579ab0.js",revision:"73b8966a3c579ab0"},{url:"/_next/static/chunks/main-cc873818bafb81b4.js",revision:"cc873818bafb81b4"},{url:"/_next/static/chunks/pages/404-acb870001dd4b868.js",revision:"acb870001dd4b868"},{url:"/_next/static/chunks/pages/_app-beb052b3e25e9147.js",revision:"beb052b3e25e9147"},{url:"/_next/static/chunks/pages/_error-409f831d3504c8f5.js",revision:"409f831d3504c8f5"},{url:"/_next/static/chunks/pages/claim-payouts-63a1c6ce3c848d0e.js",revision:"63a1c6ce3c848d0e"},{url:"/_next/static/chunks/pages/claim-payouts/create-69b6a2c4457edb90.js",revision:"69b6a2c4457edb90"},{url:"/_next/static/chunks/pages/index-5461338b4acde312.js",revision:"5461338b4acde312"},{url:"/_next/static/chunks/pages/marketplace-bfbcaeb47fa6fd8f.js",revision:"bfbcaeb47fa6fd8f"},{url:"/_next/static/chunks/pages/open-pools-a88c75f761aeffce.js",revision:"a88c75f761aeffce"},{url:"/_next/static/chunks/pages/portfolio-72d1e64717911ff4.js",revision:"72d1e64717911ff4"},{url:"/_next/static/chunks/pages/reinsure-5f80be7d93b9a247.js",revision:"5f80be7d93b9a247"},{url:"/_next/static/chunks/pages/reinsure/web3protocol-3ad0092971ee2c71.js",revision:"3ad0092971ee2c71"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ad1008b6cc773224.js",revision:"ad1008b6cc773224"},{url:"/_next/static/css/a14b3c402f9224ce.css",revision:"a14b3c402f9224ce"},{url:"/_next/static/css/bfbc09307378af05.css",revision:"bfbc09307378af05"},{url:"/_next/static/media/404-dark.88f7f707.svg",revision:"9946c2eac18c520941269bc63fe32c8f"},{url:"/_next/static/media/anchor.89a312fc.svg",revision:"e232e503327eefcc293f739c3ee8b953"},{url:"/_next/static/media/author.67e99d23.jpg",revision:"3094dd694f05fb77263bbb29593cb119"},{url:"/_next/static/media/avalanche.a059c315.svg",revision:"cfc1de02bb200da9b21997489189f1ce"},{url:"/_next/static/media/bitcoin.478c0c84.svg",revision:"7621b5d99802f3db51b5a47b29b835b0"},{url:"/_next/static/media/bitcoin.81bd702b.svg",revision:"947cd95b0c1dd8d9d8b819166dd9cdbb"},{url:"/_next/static/media/cappasity.a2361a5b.svg",revision:"d33e226d7aef92d7a38cafde8d723deb"},{url:"/_next/static/media/claimable.58babc2f.svg",revision:"4dfea92ed4728771f17103933a609851"},{url:"/_next/static/media/collection-1.2655e340.jpg",revision:"fdb05a61a09c62a7f68b18c97566f6a2"},{url:"/_next/static/media/collection-2.89da124f.jpg",revision:"9de3f89c9d9830cbd76dc0c8b5bb21e8"},{url:"/_next/static/media/collection-3.4e0f5e37.jpg",revision:"34cfc9e1a7bbd81acedc92e2f2fa76f4"},{url:"/_next/static/media/collection-4.5ddfe301.jpg",revision:"5d999d5bd8bd89fb141ca5592a830790"},{url:"/_next/static/media/curve.846ed970.svg",revision:"3d487e6fa3bdbb81b23fed17fb2f67e7"},{url:"/_next/static/media/deposit.32fbbfad.svg",revision:"becd1c168d12fef51da297324270ee63"},{url:"/_next/static/media/ethereum.86228b51.svg",revision:"51171a5b732e737d80a6121fad3ef065"},{url:"/_next/static/media/logo_website_dark.94b3a581.png",revision:"8300d707372eb67ed43eaad98d806518"},{url:"/_next/static/media/nft-1.35139713.jpg",revision:"7c20fd9c46a7cdf82a5a89760b296c1e"},{url:"/_next/static/media/nft.d91683d5.svg",revision:"03fd8b644e3b914e415fedc2b328c64d"},{url:"/_next/static/media/pancake-bunny.2c04e85a.svg",revision:"dbb8526d54f27668cff04591bba4f7e7"},{url:"/_next/static/media/pancake.3978dfae.svg",revision:"33a17510e5cd4941467064c5ad798f4f"},{url:"/_next/static/media/poolto-gether.7f67a4c8.svg",revision:"d4280beb3891eaf46bea973eec6ad601"},{url:"/_next/static/media/undraw_contract_re_ves9.2dfc42fa.svg",revision:"2426419c3cb2d7faa20e6839199230ce"},{url:"/_next/static/media/undraw_programmer_re_owql.2608def0.svg",revision:"bfb3219d86cf9e48bb44d1a9521e2a1f"},{url:"/_next/static/media/undraw_security_re_a2rk.e998cb7b.svg",revision:"a3b25c8bc3ba356773092e1b6add8f2e"},{url:"/_next/static/media/uniswap.c61798be.svg",revision:"54492b4ffce3741c4a80451d3183ddbd"},{url:"/_next/static/media/user-1.d4b43d77.png",revision:"ddf3e4622304fda97b504081c06de271"},{url:"/_next/static/media/user-2.83edef50.png",revision:"d278930bbc7843dc9a7e389b1f3d26b1"},{url:"/_next/static/media/vote-pool.b7007dec.svg",revision:"9b9ccca42e873dff5b5fa0b5f9f766a8"},{url:"/_next/static/media/wallet.8a45e058.svg",revision:"c0de0d847ae00cb60c88bcefb58fde89"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
