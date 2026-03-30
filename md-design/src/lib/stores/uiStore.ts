"use client";

import { create } from "zustand";

type Lang = "vi" | "en";

type UiState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  lang: "vi",
  setLang: (lang) => set({ lang }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));

