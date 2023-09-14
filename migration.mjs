import { readdirSync, statSync, renameSync } from 'fs'
import { join } from 'path'

// 시작 폴더 경로
const rootFolder = './' // 변경하고자 하는 폴더의 경로로 업데이트하세요.

// 모든 폴더와 파일을 재귀적으로 탐색하는 함수
function traverseDirectory(currentPath) {
  readdirSync(currentPath).forEach((item) => {
    const itemPath = join(currentPath, item)

    if (statSync(itemPath).isDirectory()) {
      // 디렉토리인 경우 재귀 호출
      traverseDirectory(itemPath)
    } else if (item.endsWith('.md')) {
      // .md 파일인 경우 확장자 변경
      const newPath = itemPath.replace('.md', '.mdx')
      renameSync(itemPath, newPath)
      console.log(`파일 이름 변경: ${itemPath} -> ${newPath}`)
    }
  })
}

// 시작 폴더부터 탐색 시작
traverseDirectory(rootFolder)
