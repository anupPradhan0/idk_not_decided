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
      <div className="bg-white/5 px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-lg">🌳</span>
          Repository Structure
        </h3>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        <div className="py-3">
          {tree.map((node, index) => {
            const depth = getDepth(node.path)
            const fileName = getFileName(node.path)
            const icon = getIcon(node.type)
            const paddingLeft = depth * 24

            return (
              <div
                key={`${node.path}-${index}`}
                className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/5 transition-colors cursor-pointer group relative"
                style={{ paddingLeft: `${paddingLeft + 16}px` }}
              >
                {/* Vertical line for nested items */}
                {depth > 0 && (
                  <div 
                    className="absolute border-l border-white/10 h-full -ml-4"
                    style={{ left: `${paddingLeft}px` }}
                  />
                )}
                
                {/* Icon */}
                <span className={`text-base ${node.type === "tree" ? "text-blue-400" : "text-white/50"}`}>
                  {icon}
                </span>
                
                {/* File/Folder name */}
                <span className={`text-sm font-mono ${
                  node.type === "tree" ? "text-white font-medium" : "text-white/60"
                } group-hover:text-white transition-colors`}>
                  {fileName}
                </span>
                
                {/* Type indicator */}
                {node.type === "tree" && (
                  <span className="ml-auto text-xs text-white/30">
                    folder
                  </span>
                )}
              </div>
            )
          })}
        </div>

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
