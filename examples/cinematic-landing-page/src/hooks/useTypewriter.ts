import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Options {
  /** Time per character when typing (ms) */
  typeSpeed?: number;
  /** Time per character when deleting (ms) */
  deleteSpeed?: number;
  /** Pause after fully typing a phrase (ms) */
  holdDuration?: number;
  /** Pause between phrases after deleting (ms) */
  gapDuration?: number;
}

export function useTypewriter(
  phrases: ReadonlyArray<string>,
  opts: Options = {}
): { text: string; phraseIndex: number; isDeleting: boolean } {
  const {
    typeSpeed = 55,
    deleteSpeed = 30,
    holdDuration = 1700,
    gapDuration = 350,
  } = opts;
  const reduced = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const phrase = phrases[phraseIndex] ?? '';

    let timeout: number;
    if (!isDeleting && text === phrase) {
      timeout = window.setTimeout(() => setIsDeleting(true), holdDuration);
    } else if (isDeleting && text === '') {
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, gapDuration);
    } else {
      const delta = isDeleting ? -1 : 1;
      const next = phrase.slice(0, text.length + delta);
      timeout = window.setTimeout(
        () => setText(next),
        isDeleting ? deleteSpeed : typeSpeed
      );
    }

    return () => window.clearTimeout(timeout);
  }, [
    phrases,
    phraseIndex,
    text,
    isDeleting,
    reduced,
    typeSpeed,
    deleteSpeed,
    holdDuration,
    gapDuration,
  ]);

  return { text, phraseIndex, isDeleting };
}
