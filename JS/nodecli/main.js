// commanderモジュールのインポート
const program = require("commander");
// fsモジュールをfsオブジェクトとしてインポート
const fs = require("fs");
// md2htmlモジュールをインポート
const md2html = require("./md2html");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数をパース
program.parse(process.argv);
// ファイルパスを配列から取り出す
const filePath = program.args[0];

// コマンドライン引数のオプションを取得し、デフォルトのオプションを上書きする
const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  // エラーハンドリング追加
  if (err) {
    console.error(err.message);
    // 終了ステータス 1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
    return;
  }
  const html = md2html(file, cliOptions);
  console.log(html);
}
);
