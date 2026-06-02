"use client";

import { Fragment, useMemo, useRef } from "react";
import { BlueprintConnectors } from "@/components/studio/blueprint-connectors";
import { IsometricDiamond } from "@/components/studio/isometric-diamond";
import { PlatformLayerCard } from "@/components/studio/platform-layer-card";
import { getPlatform } from "@/lib/platforms";
import { stackLayers } from "@/lib/stack-layers";
import type { StudioNode } from "@/lib/types";

type StackBlueprintProps = {
  nodes: StudioNode[];
  selectedNodeId: string | null;
  animationKey: string;
  onSelectNode: (nodeId: string) => void;
};

export function StackBlueprint({
  nodes,
  selectedNodeId,
  animationKey,
  onSelectNode,
}: StackBlueprintProps) {
  const splitRef = useRef<HTMLDivElement>(null);

  const layerData = useMemo(() => {
    return stackLayers.map((layer) => {
      const layerNodes = nodes.filter((node) => {
        const platform = getPlatform(node.platformId);
        if (!platform) return false;
        return layer.categories.includes(platform.category);
      });

      const active = layerNodes.some((node) => node.id === selectedNodeId);
      const lit = active || layerNodes.length > 0;

      return { layer, nodes: layerNodes, active, lit };
    });
  }, [nodes, selectedNodeId]);

  const appConnectors = useMemo(() => {
    const items: { id: string; layerIndex: number; selected: boolean }[] = [];

    layerData.forEach(({ nodes: layerNodes }, layerIndex) => {
      layerNodes.forEach((node) => {
        items.push({
          id: node.id,
          layerIndex,
          selected: node.id === selectedNodeId,
        });
      });
    });

    return items;
  }, [layerData, selectedNodeId]);

  return (
    <div className="las-blueprint las-blueprint--fit" key={animationKey}>
      <div className="las-blueprint__split" ref={splitRef}>
        <BlueprintConnectors
          apps={appConnectors}
          containerRef={splitRef}
          animationKey={animationKey}
        />

        {layerData.map(({ layer, nodes: layerNodes, active, lit }, layerIndex) => (
          <Fragment key={layer.id}>
            <div
              className="las-blueprint__band"
              data-depth={layerIndex}
              data-active={active || undefined}
              data-lit={lit || undefined}
              style={{ gridRow: layerIndex + 1, animationDelay: `${layerIndex * 80 + 150}ms` }}
            >
              {layerNodes.length > 0 ? (
                <div className="las-blueprint__cards">
                  {layerNodes.map((node, index) => {
                    const platform = getPlatform(node.platformId);
                    if (!platform) return null;
                    return (
                      <PlatformLayerCard
                        key={node.id}
                        nodeId={node.id}
                        platformId={node.platformId}
                        name={platform.name}
                        layerLabel={layer.label}
                        selected={selectedNodeId === node.id}
                        onClick={() => onSelectNode(node.id)}
                        index={index}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="las-blueprint__empty">{layer.label} — No platforms</p>
              )}
            </div>

            <div
              className="las-blueprint__stack-tier"
              data-connect-diamond={layerIndex}
              style={{ gridRow: layerIndex + 1 }}
            >
              <IsometricDiamond
                label={layer.shortLabel}
                active={lit}
                index={layerIndex}
                total={layerData.length}
                animationKey={animationKey}
                stacked
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
