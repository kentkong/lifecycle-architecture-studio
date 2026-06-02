"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { PlatformIconMarker, platformIconMap } from "@/components/studio/platform-icons";
import { getPlatform, platformList } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/types";
import { Cloud } from "lucide-react";

type PlatformDetailPanelProps = {
  platform: Platform | null;
  open: boolean;
  onClose: () => void;
  onRemove?: () => void;
  canRemove?: boolean;
  availableToAdd: Platform[];
  onAddPlatform: (platformId: string) => void;
};

export function PlatformDetailPanel({
  platform,
  open,
  onClose,
  onRemove,
  canRemove,
  availableToAdd,
  onAddPlatform,
}: PlatformDetailPanelProps) {
  return (
    <aside
      className={cn(
        "studio-detail-panel fixed right-0 top-0 z-30 flex h-full w-[min(420px,100vw)] flex-col transition-transform duration-500 ease-out",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-[rgba(45,212,191,0.12)] px-6 py-5">
        <div>
          <p className="studio-section-eyebrow">Platform detail</p>
          <h2 className="studio-section-heading mt-1 text-xl">{platform?.name ?? "Explore the stack"}</h2>
        </div>
        <button type="button" onClick={onClose} className="studio-icon-btn" aria-label="Close panel">
          <X className="h-4 w-4" />
        </button>
      </div>

      {platform ? (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6 flex justify-center">
            <PlatformIconMarker
              platformId={platform.id}
              category={platform.category}
              name={platform.name}
              selected
              inline
            />
          </div>
          <Section title="Purpose">{platform.purpose}</Section>
          <Section title="Key capabilities">
            <ul className="space-y-2">
              {platform.capabilities.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-[var(--foreground-muted)]">
                  • {item}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Strengths">
            <TagList items={platform.strengths} tone="positive" />
          </Section>
          <Section title="Limitations">
            <TagList items={platform.limitations} tone="muted" />
          </Section>
          <Section title="Typical use cases">
            <TagList items={platform.useCases} tone="neutral" />
          </Section>
          <Section title="Common integrations">
            <div className="flex flex-wrap gap-2">
              {platform.integrations.map((item) => (
                <span key={item} className="studio-integration-tag">
                  {item}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Best for">{platform.bestFor}</Section>
          <Section title="Who typically uses it">{platform.typicalUsers}</Section>

          {canRemove && onRemove ? (
            <button type="button" onClick={onRemove} className="studio-remove-btn">
              <Trash2 className="h-4 w-4" />
              Remove from architecture
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="studio-section-lead mb-6">
            Select a platform node to explore what it does, where it fits, and how it connects within
            a modern lifecycle architecture.
          </p>
          <Section title="Add platform to stack">
            <div className="space-y-2">
              {availableToAdd.length === 0 ? (
                <p className="text-sm text-[var(--foreground-muted)]">
                  All available platforms are already in this architecture.
                </p>
              ) : (
                availableToAdd.map((item) => {
                  const Icon = platformIconMap[item.id] ?? Cloud;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onAddPlatform(item.id)}
                      className="studio-add-platform-btn"
                    >
                      <span className="platform-icon-marker platform-icon-marker--compact">
                        <Icon className="h-4 w-4 text-[#67e8f9]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block text-sm font-medium text-white">{item.name}</span>
                        <span className="mt-0.5 block text-xs text-[var(--foreground-muted)]">
                          {item.bestFor}
                        </span>
                      </span>
                      <Plus className="h-4 w-4 text-[#5eead4]" />
                    </button>
                  );
                })
              )}
            </div>
          </Section>
        </div>
      )}
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h3 className="blueprint-section__title mb-2">{title}</h3>
      <div className="text-sm leading-relaxed text-[var(--foreground-muted)]">{children}</div>
    </section>
  );
}

function TagList({
  items,
  tone,
}: {
  items: string[];
  tone: "positive" | "muted" | "neutral";
}) {
  const toneClass =
    tone === "positive"
      ? "studio-tag studio-tag--positive"
      : tone === "muted"
        ? "studio-tag studio-tag--muted"
        : "studio-tag";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={toneClass}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function getAvailablePlatforms(currentIds: string[]) {
  return platformList.filter(
    (platform) => platform.id !== "customer" && !currentIds.includes(platform.id),
  );
}

export function getSelectedPlatform(selectedNodeId: string | null) {
  if (!selectedNodeId) return null;
  return getPlatform(selectedNodeId) ?? null;
}
