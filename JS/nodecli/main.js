// commanderモジュールのインポート
const program = require("commander");
// fsモジュールをfsオブジェクトとしてインポート
const fs = require("fs");
// markedモジュールをインポート
const marked = require("marked");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数をパース
program.parse(process.argv);
// ファイルパスを配列から取り出す
const filepPath = program.args[0];

// コマンドライン引数のオプションを取得し、デフォルトのオプションを上書きする
const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// ファイルを非同期で読み込む
fs.readFile(filepPath, { encoding: "utf8" }, (err, file) => {
  // エラーハンドリング追加
  if (err) {
    console.error(err.message);
    // 終了ステータス 1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
    return;
  }
  const html = marked(file, {
    // オプションの値を使用する
    gfm: cliOptions.gfm,
  });
  console.log(html);
}
);
