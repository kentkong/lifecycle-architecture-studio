"use client";

import { X, Plus, Trash2 } from "lucide-react";
import { getPlatform, platformList } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/types";

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
        "fixed right-0 top-0 z-30 flex h-full w-[min(420px,100vw)] flex-col border-l border-white/8 bg-[#0b0d10]/92 backdrop-blur-xl transition-transform duration-500 ease-out",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Platform detail</p>
          <h2 className="mt-1 text-xl font-medium tracking-tight text-white">
            {platform?.name ?? "Explore the stack"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {platform ? (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Section title="Purpose">{platform.purpose}</Section>
          <Section title="Key capabilities">
            <ul className="space-y-2">
              {platform.capabilities.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-white/72">
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
                <span
                  key={item}
                  className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Best for">{platform.bestFor}</Section>
          <Section title="Who typically uses it">{platform.typicalUsers}</Section>

          {canRemove && onRemove ? (
            <button
              type="button"
              onClick={onRemove}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100 transition hover:bg-red-500/15"
            >
              <Trash2 className="h-4 w-4" />
              Remove from architecture
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-sm leading-relaxed text-white/60">
            Select a platform node to explore what it does, where it fits, and how it connects within
            a modern lifecycle architecture.
          </p>
          <Section title="Add platform to stack">
            <div className="space-y-2">
              {availableToAdd.length === 0 ? (
                <p className="text-sm text-white/45">All available platforms are already in this architecture.</p>
              ) : (
                availableToAdd.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onAddPlatform(item.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition hover:border-blue-400/25 hover:bg-blue-500/8"
                  >
                    <span>
                      <span className="block text-sm font-medium text-white">{item.name}</span>
                      <span className="mt-0.5 block text-xs text-white/45">{item.bestFor}</span>
                    </span>
                    <Plus className="h-4 w-4 text-blue-300" />
                  </button>
                ))
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
      <h3 className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/38">{title}</h3>
      <div className="text-sm leading-relaxed text-white/72">{children}</div>
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
      ? "border-emerald-400/15 bg-emerald-500/8 text-emerald-100"
      : tone === "muted"
        ? "border-white/10 bg-white/[0.03] text-white/55"
        : "border-white/10 bg-white/[0.04] text-white/70";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={cn("rounded-full border px-3 py-1 text-xs", toneClass)}>
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
