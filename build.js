const path = require('path')
const fs = require('fs')
const marked = require('marked')

function createFolder(to) {
  //文件写入
  var sep = path.sep
  var folders = path.dirname(to).split(sep)
  var p = ''
  while (folders.length) {
    p += folders.shift() + sep
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p)
    }
  }
}

// 读取源代码
const mdContent = fs.readFileSync(
  path.join(__dirname, 'src', 'basic.md'),
  'utf-8'
)

const cssContent = fs.readFileSync(
  path.join(__dirname, 'src', 'basic.css'),
  'utf-8'
)

// 转换为 html

const htmlContent = marked(mdContent)

const out = path.join(__dirname, 'dist', 'index.html')

if (!fs.existsSync(out)) {
  createFolder(out)
}

fs.writeFileSync(out, `<style>${cssContent}</style>` + htmlContent)

console.log('markdown build success!')
