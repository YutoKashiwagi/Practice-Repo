function fetchUserInfo(userId) {
  // getリクエストを送る
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    // then: Fullfilled: ネットワークの送信に成功
    .then(response => {
      console.log(response.status)
      if (!response.ok) {
        // if 失敗時の処理: コンソールにログを出力
        // レスポンスの表示
        console.error('エラーレスポンス', response);
      } else {
        // else コンソールにユーザー情報を表示
        console.log('成功')
        return response.json().then(userInfo => {
          const view = escapeHTML`
          <h4>${userInfo.name} (@${userInfo.login})</h4>
          <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
          <dl>
              <dt>Location</dt>
              <dd>${userInfo.location}</dd>
              <dt>Repositories</dt>
              <dd>${userInfo.public_repos}</dd>
          </dl>
          `;
          const result = document.getElementById('result');
          result.innerHTML = view;
        })
      }
    }).catch(error => {
      // catch: Rejected: ネットワークエラー
      console.error(error)
    })
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
