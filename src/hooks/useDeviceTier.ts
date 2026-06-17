import { useEffect, useState } from "react";

export interface DeviceTier {
  /** True for coarse pointers / small screens (phones, tablets). */
  isMobile: boolean;
  /** True when the device can comfortably run heavier 3D + postprocessing. */
  isHighEnd: boolean;
}

/**
 * Detects rough device capability so the 3D scene can scale particle counts,
 * DPR and postprocessing up or down. Kept intentionally simple and cheap.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>({
    isMobile: false,
    isHighEnd: true,
  });

  useEffect(() => {
    const evaluate = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.innerWidth < 768;
      const cores = navigator.hardwareConcurrency ?? 4;
      const isMobile = coarse || narrow;
      const isHighEnd = !isMobile && cores >= 4;
      setTier({ isMobile, isHighEnd });
    };

    evaluate();
    window.addEventListener("resize", evaluate, { passive: true });
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  return tier;
}
