"use client";

import { useMemo, useState } from "react";
import { ArchitectureCanvas } from "@/components/studio/architecture-canvas";
import {
  getAvailablePlatforms,
  getSelectedPlatform,
  PlatformDetailPanel,
} from "@/components/studio/platform-detail-panel";
import { StudioHeader, TemplateBar } from "@/components/studio/studio-header";
import { DesignAtmosphere } from "@/components/ui/design-atmosphere";
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
    <div className="studio-app relative min-h-screen overflow-x-hidden">
      <DesignAtmosphere />
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

      <main className="relative z-10 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="studio-section-lead mb-8 max-w-3xl">
            {activeTemplate
              ? activeTemplate.description
              : "Custom architecture — explore, add, or remove platforms to model your stack."}
          </p>
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
