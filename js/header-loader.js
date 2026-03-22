// header-loader.js
// 全ページの <div id="site-header"></div> にヘッダーを自動挿入します

(function () {
  // 現在のページがルート直下か articles/ 以下かを判定してパスを解決
  const path = location.pathname;
  const isArticle = path.includes('/articles/');
  const headerPath = isArticle
    ? '../header.html'
    : 'header.html';

  fetch(headerPath)
    .then(function (res) {
      if (!res.ok) throw new Error('header.html の読み込みに失敗しました');
      return res.text();
    })
    .then(function (html) {
      const target = document.getElementById('site-header');
      if (target) {
        target.innerHTML = html;

        // 現在のページに対応するナビリンクに active クラスを付与
        const links = target.querySelectorAll('.header-nav a, .top-nav a');
        links.forEach(function (link) {
          if (link.href === location.href) {
            link.classList.add('active');
          }
        });
      }
    })
    .catch(function (err) {
      console.warn('[header-loader]', err);
    });
})();
