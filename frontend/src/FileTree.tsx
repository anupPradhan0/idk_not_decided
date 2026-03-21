interface TreeNode {
  path: string
  type: "blob" | "tree"
}

interface FileTreeProps {
  tree: TreeNode[]
  truncated: boolean
}

export default function FileTree({ tree, truncated }: FileTreeProps) {
  const getDepth = (path: string): number => {
    return path.split("/").length - 1
  }

  const getFileName = (path: string): string => {
    const segments = path.split("/")
    return segments[segments.length - 1]
  }

  const getIcon = (type: "blob" | "tree"): string => {
    return type === "tree" ? "📁" : "📄"
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur overflow-hidden">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">File Tree</h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        <ul className="py-2">
          {tree.map((node, index) => {
            const depth = getDepth(node.path)
            const fileName = getFileName(node.path)
            const icon = getIcon(node.type)
            const paddingLeft = depth * 16

            return (
              <li
                key={`${node.path}-${index}`}
                className="px-4 py-1 hover:bg-white/5 cursor-pointer transition-colors"
                style={{ paddingLeft: `${paddingLeft + 16}px` }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-base">{icon}</span>
                  <span className="text-white/70 font-mono">{fileName}</span>
                </div>
              </li>
            )
          })}
        </ul>

        {truncated && (
          <div className="px-4 py-3 bg-yellow-500/10 border-t border-yellow-500/20">
            <div className="flex items-center gap-2 text-sm text-yellow-200">
              <span>⚠️</span>
              <span>Tree is too large to show fully</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
