"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BrandInputs,
  GeneratedAssets,
  OnboardingStep,
} from "@/types/brand";

interface OnboardingStore {
  // Current step
  currentStep: OnboardingStep;
  setStep: (step: OnboardingStep) => void;

  // Brand inputs (collected via AI chat)
  brandInputs: Partial<BrandInputs>;
  updateBrandInputs: (inputs: Partial<BrandInputs>) => void;
  resetBrandInputs: () => void;

  // Generated assets
  generatedAssets: GeneratedAssets;
  setGeneratedAssets: (assets: GeneratedAssets) => void;
  updateGeneratedAsset: <K extends keyof GeneratedAssets>(
    key: K,
    value: GeneratedAssets[K]
  ) => void;

  // Generation state
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

  // Chat messages for context
  chatHistory: Array<{ role: "user" | "assistant"; content: string }>;
  addChatMessage: (message: {
    role: "user" | "assistant";
    content: string;
  }) => void;
  clearChatHistory: () => void;

  // Reset everything
  reset: () => void;
}

const initialState = {
  currentStep: "welcome" as OnboardingStep,
  brandInputs: {},
  generatedAssets: {},
  isGenerating: false,
  chatHistory: [],
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      updateBrandInputs: (inputs) =>
        set((state) => ({
          brandInputs: { ...state.brandInputs, ...inputs },
        })),

      resetBrandInputs: () => set({ brandInputs: {} }),

      setGeneratedAssets: (assets) => set({ generatedAssets: assets }),

      updateGeneratedAsset: (key, value) =>
        set((state) => ({
          generatedAssets: { ...state.generatedAssets, [key]: value },
        })),

      setIsGenerating: (value) => set({ isGenerating: value }),

      addChatMessage: (message) =>
        set((state) => ({
          chatHistory: [...state.chatHistory, message],
        })),

      clearChatHistory: () => set({ chatHistory: [] }),

      reset: () => set(initialState),
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        brandInputs: state.brandInputs,
        generatedAssets: state.generatedAssets,
        chatHistory: state.chatHistory,
      }),
    }
  )
);
