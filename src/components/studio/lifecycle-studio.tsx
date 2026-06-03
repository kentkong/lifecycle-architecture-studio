"use client";

import { useMemo, useState } from "react";
import { ArchitectureCanvas } from "@/components/studio/architecture-canvas";
import {
  getAvailablePlatforms,
  getSelectedPlatform,
  PlatformDetailPanel,
} from "@/components/studio/platform-detail-panel";
import { StudioArchitecturePanel } from "@/components/studio/studio-architecture-panel";
import { StudioHeader, TemplateBar } from "@/components/studio/studio-header";
import { StudioHeroBanner } from "@/components/studio/studio-hero-banner";
import { StudioStackFlow } from "@/components/studio/studio-stack-flow";
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
  const flowLabel =
    activeTemplate?.description ??
    "Custom architecture — explore, add, or remove platforms to model your stack.";

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
      <StudioHeroBanner>
        <StudioHeader />
        <TemplateBar
          templates={architectureTemplates}
          activeTemplateId={state.templateId === "custom" ? "" : state.templateId}
          onSelect={selectTemplate}
        />
      </StudioHeroBanner>

      <main className="relative px-6 py-6 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <StudioArchitecturePanel>
            <StudioStackFlow
              nodes={state.nodes}
              connections={state.connections}
              selectedNodeId={state.selectedNodeId}
              onSelectNode={selectNode}
              label={flowLabel}
            />
            <ArchitectureCanvas
              nodes={state.nodes}
              connections={state.connections}
              selectedNodeId={state.selectedNodeId}
              onSelectNode={selectNode}
            />
          </StudioArchitecturePanel>
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
