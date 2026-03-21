import FileTree from './FileTree'

interface TreeNode {
  path: string
  type: "blob" | "tree"
}

interface ExtensionsProps {
  tree: TreeNode[]
  truncated: boolean
}

export default function Extensions({ tree, truncated }: ExtensionsProps) {
  return (
    <div className="space-y-4">
      <FileTree tree={tree} truncated={truncated} />
    </div>
  )
}
