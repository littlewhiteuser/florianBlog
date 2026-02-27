/**
 * 部署脚本：将 .vitepress/dist 推送到 gh-pages 分支
 * 用法：npm run deploy
 */
import { execSync } from 'child_process'
import { resolve } from 'path'

const distDir = resolve(process.cwd(), '.vitepress/dist')

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

try {
  // 进入构建产物目录
  process.chdir(distDir)

  // 初始化 git 并提交
  run('git init')
  run('git add -A')
  run(`git commit -m "deploy: ${new Date().toISOString()}"`)

  // 强制推送到 gh-pages 分支
  run('git push -f https://github.com/littlewhiteuser/florianBlog.git HEAD:gh-pages')

  console.log('\n✅ 部署成功！')
  console.log('🔗 https://littlewhiteuser.github.io/florianBlog/')
} catch (e) {
  console.error('\n❌ 部署失败:', e.message)
  process.exit(1)
}
