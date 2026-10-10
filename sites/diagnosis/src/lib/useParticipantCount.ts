import { useCallback, useSyncExternalStore } from "react";

// localStorage를 쓸 수 없는 환경(사파리 개인정보 보호 모드 등)에서도 이번 방문 동안은 숫자가 올라가게 한다.
const memory = new Map<string, number>();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

const readCount = (key: string, base: number) => {
  try {
    const stored = Number(window.localStorage.getItem(key));
    if (Number.isFinite(stored) && stored >= base) return stored;
  } catch {}
  return memory.get(key) ?? base;
};

/** 테스트 시작 화면의 "n명이 참여했습니다" 숫자. 시작 버튼을 누를 때마다 이 브라우저에서 1씩 늘어난다. */
export function useParticipantCount(key: string, base: number) {
  const count = useSyncExternalStore(
    subscribe,
    () => readCount(key, base),
    () => base,
  );

  const increment = useCallback(() => {
    const next = readCount(key, base) + 1;
    memory.set(key, next);
    try {
      window.localStorage.setItem(key, String(next));
    } catch {}
    listeners.forEach((listener) => listener());
  }, [key, base]);

  return [count, increment] as const;
}
