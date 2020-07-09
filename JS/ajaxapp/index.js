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
          console.log(userInfo);
        })
      }
    }).catch(error => {
      // catch: Rejected: ネットワークエラー
      console.error(error)
    })
}
