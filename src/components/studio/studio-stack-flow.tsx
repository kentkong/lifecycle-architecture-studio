"use client";

import { PlatformLogo } from "@/components/studio/platform-logo";
import { formatCategoryLabel } from "@/lib/category-colors";
import { getPlatformColors } from "@/lib/platform-colors";
import { getPlatform } from "@/lib/platforms";
import { getCustomerNode, getStackLayerNodes } from "@/lib/stack-nodes";
import type { StudioConnection, StudioNode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type StudioStackFlowProps = {
  nodes: StudioNode[];
  connections: StudioConnection[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  label: string;
};

function StackFlowArrow() {
  return (
    <svg className="stack-flow__arrow" width="20" height="10" viewBox="0 0 20 10" aria-hidden>
      <line x1="0" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points="15,2 20,5 15,8" fill="currentColor" />
    </svg>
  );
}

export function StudioStackFlow({
  nodes,
  connections,
  selectedNodeId,
  onSelectNode,
  label,
}: StudioStackFlowProps) {
  const stackNodes = useMemo(() => getStackLayerNodes(nodes, connections), [nodes, connections]);
  const customerNode = useMemo(() => getCustomerNode(nodes), [nodes]);
  const flowNodes = useMemo(
    () => (customerNode ? [...stackNodes, customerNode] : stackNodes),
    [stackNodes, customerNode],
  );

  if (flowNodes.length === 0) return null;

  return (
    <div className="stack-flow relative z-10 pb-4" aria-label={label}>
      <p className="stack-flow__label">{label}</p>
      <div className="stack-flow__track">
        {flowNodes.map((node, index) => {
          const platform = getPlatform(node.platformId);
          if (!platform) return null;

          const palette = getPlatformColors(node.platformId, platform.category);
          const selected = selectedNodeId === node.id;

          return (
            <div key={node.id} className="stack-flow__segment">
              <button
                type="button"
                onClick={() => onSelectNode(node.id)}
                className={cn("stack-flow__node", selected && "stack-flow__node--selected")}
                style={{
                  color: palette.fill,
                  borderColor: palette.edge,
                  background: `linear-gradient(145deg, ${palette.fillSoft}, rgba(255, 255, 255, 0.01))`,
                }}
              >
                <PlatformLogo
                  platformId={node.platformId}
                  category={platform.category}
                  variant="brand"
                  size="sm"
                  className="stack-flow__logo"
                />
                <p className="stack-flow__name">{platform.name}</p>
                <p className="stack-flow__role">{formatCategoryLabel(platform.category)}</p>
              </button>
              {index < flowNodes.length - 1 ? <StackFlowArrow /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
