// commanderモジュールのインポート
const program = require("commander");
// fsモジュールをfsオブジェクトとしてインポート
const fs = require("fs");

// コマンドライン引数をパース
program.parse(process.argv);
// ファイルパスを配列から取り出す
const filepPath = program.args[0];

// ファイルを非同期で読み込む
fs.readFile(filepPath, { encoding: "utf8" }, (err, file) => {
  // エラーハンドリング追加
  if (err) {
    console.error(err.message);
    // 終了ステータス 1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
    return;
  }
  console.log(file);
}
);
