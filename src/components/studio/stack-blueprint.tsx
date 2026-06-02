"use client";

import { useMemo } from "react";
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
  const layerData = useMemo(() => {
    return stackLayers.map((layer) => {
      const layerNodes = nodes.filter((node) => {
        const platform = getPlatform(node.platformId);
        if (!platform) return false;
        return layer.categories.includes(platform.category);
      });

      const active = layerNodes.some((node) => node.id === selectedNodeId);

      return { layer, nodes: layerNodes, active };
    });
  }, [nodes, selectedNodeId]);

  return (
    <div className="las-blueprint" key={animationKey}>
      <div className="las-blueprint__ambient" aria-hidden="true">
        <div className="las-blueprint__ambient-orb las-blueprint__ambient-orb--1" />
        <div className="las-blueprint__ambient-orb las-blueprint__ambient-orb--2" />
        <div className="las-blueprint__ambient-orb las-blueprint__ambient-orb--3" />
        <div className="las-blueprint__rings las-blueprint__rings--top" />
        <div className="las-blueprint__rings las-blueprint__rings--bottom" />
      </div>

      <div className="las-blueprint__stage">
        {layerData.map(({ layer, nodes: layerNodes, active }, layerIndex) => (
          <div
            className="las-blueprint__row"
            key={layer.id}
            data-active={active || layerNodes.length > 0 ? true : undefined}
            style={{ ["--row-i" as string]: layerIndex }}
          >
            <div className="las-blueprint__row-diamond">
              <IsometricDiamond
                label={layer.shortLabel}
                active={active || layerNodes.length > 0}
                index={layerIndex}
                total={layerData.length}
                animationKey={animationKey}
              />
            </div>

            <div className="las-blueprint__row-track">
              <div
                className="las-blueprint__connector"
                style={{ animationDelay: `${layerIndex * 130 + 220}ms` }}
              />
              <div
                className="las-blueprint__group"
                style={{ animationDelay: `${layerIndex * 130 + 300}ms` }}
              >
                <h3 className="las-blueprint__layer-title">{layer.label}</h3>
                {layerNodes.length > 0 ? (
                  <div className="las-blueprint__cards">
                    {layerNodes.map((node, index) => {
                      const platform = getPlatform(node.platformId);
                      if (!platform) return null;
                      return (
                        <PlatformLayerCard
                          key={node.id}
                          platformId={node.platformId}
                          name={platform.name}
                          selected={selectedNodeId === node.id}
                          onClick={() => onSelectNode(node.id)}
                          index={index}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <p className="las-blueprint__empty">—</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
