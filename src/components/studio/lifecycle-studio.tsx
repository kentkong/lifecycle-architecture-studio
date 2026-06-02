"use client";

import { useMemo, useState } from "react";
import { ArchitectureCanvas } from "@/components/studio/architecture-canvas";
import {
  getAvailablePlatforms,
  getSelectedPlatform,
  PlatformDetailPanel,
} from "@/components/studio/platform-detail-panel";
import { StudioHeader, TemplateBar } from "@/components/studio/studio-header";
import { architectureTemplates, buildLinearArchitecture, createStateFromTemplate } from "@/lib/templates";

export function LifecycleStudio() {
  const [state, setState] = useState(() => createStateFromTemplate("enterprise-marketing"));
  const [panelOpen, setPanelOpen] = useState(false);

  const selectedPlatform = getSelectedPlatform(state.selectedNodeId);
  const currentPlatformIds = state.nodes.map((node) => node.platformId);
  const availableToAdd = useMemo(
    () => getAvailablePlatforms(currentPlatformIds),
    [currentPlatformIds],
  );

  const activeTemplate = architectureTemplates.find((template) => template.id === state.templateId);

  function selectTemplate(templateId: string) {
    setState(createStateFromTemplate(templateId));
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
    <div className="min-h-screen bg-[#080a0d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.03),transparent_24%)]" />
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

      <main className="relative px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {activeTemplate ? (
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/50">
              {activeTemplate.description}
            </p>
          ) : (
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/50">
              Custom architecture — explore, add, or remove platforms to model your stack.
            </p>
          )}
          <ArchitectureCanvas
            nodes={state.nodes}
            connections={state.connections}
            selectedNodeId={state.selectedNodeId}
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
