"use client";

import { useMemo, useState } from "react";
import { ArchitectureCanvas } from "@/components/studio/architecture-canvas";
import {
  getAvailablePlatforms,
  getSelectedPlatform,
  PlatformDetailPanel,
} from "@/components/studio/platform-detail-panel";
import { StudioHeader, TemplateBar } from "@/components/studio/studio-header";
import { StudioAtmosphere } from "@/components/ui/studio-atmosphere";
import { architectureTemplates, buildLinearArchitecture, createStateFromTemplate } from "@/lib/templates";

export function LifecycleStudio() {
  const [state, setState] = useState(() => createStateFromTemplate("enterprise-marketing"));
  const [panelOpen, setPanelOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState("enterprise-marketing");

  const selectedPlatform = getSelectedPlatform(state.selectedNodeId);
  const currentPlatformIds = state.nodes.map((node) => node.platformId);
  const availableToAdd = useMemo(
    () => getAvailablePlatforms(currentPlatformIds),
    [currentPlatformIds],
  );

  function selectTemplate(templateId: string) {
    setState(createStateFromTemplate(templateId));
    setAnimationKey(templateId);
    setPanelOpen(false);
  }

  function selectNode(nodeId: string) {
    setState((current) => ({ ...current, selectedNodeId: nodeId }));
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setState((current) => ({ ...current, selectedNodeId: null }));
  }

  function addPlatform(platformId: string) {
    const customerIndex = state.nodes.findIndex((node) => node.platformId === "customer");
    const insertIndex = customerIndex === -1 ? state.nodes.length : customerIndex;
    const nextIds = [...currentPlatformIds];
    nextIds.splice(insertIndex, 0, platformId);
    const { nodes, connections } = buildLinearArchitecture(nextIds);
    setAnimationKey(`custom-${Date.now()}`);
    setState((current) => ({
      ...current,
      templateId: "custom",
      nodes,
      connections,
      selectedNodeId: platformId,
    }));
    setPanelOpen(true);
  }

  function removePlatform() {
    if (!state.selectedNodeId || state.selectedNodeId === "customer") return;
    const nextIds = currentPlatformIds.filter((id) => id !== state.selectedNodeId);
    const { nodes, connections } = buildLinearArchitecture(nextIds);
    setAnimationKey(`custom-${Date.now()}`);
    setState((current) => ({
      ...current,
      templateId: "custom",
      nodes,
      connections,
      selectedNodeId: null,
    }));
    setPanelOpen(false);
  }

  return (
    <div className="studio-app studio-app--fit relative flex h-dvh flex-col overflow-hidden">
      <StudioAtmosphere />
      <StudioHeader />
      <TemplateBar
        templates={architectureTemplates}
        activeTemplateId={state.templateId === "custom" ? "" : state.templateId}
        onSelect={selectTemplate}
        onOpenLibrary={() => {
          setState((current) => ({ ...current, selectedNodeId: null }));
          setPanelOpen(true);
        }}
      />

      <main className="relative z-10 min-h-0 flex-1 px-3 py-2 md:px-6 md:py-3">
        <div className="mx-auto h-full w-full max-w-[1400px]">
          <ArchitectureCanvas
            nodes={state.nodes}
            connections={state.connections}
            selectedNodeId={state.selectedNodeId}
            animationKey={animationKey}
            onSelectNode={selectNode}
          />
        </div>
      </main>

      <PlatformDetailPanel
        platform={selectedPlatform}
        open={panelOpen}
        onClose={closePanel}
        onRemove={removePlatform}
        canRemove={Boolean(state.selectedNodeId && state.selectedNodeId !== "customer")}
        availableToAdd={availableToAdd}
        onAddPlatform={addPlatform}
      />
    </div>
  );
}
