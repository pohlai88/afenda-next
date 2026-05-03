"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject state
 * @afenda-artifact provider
 * @afenda-boundary client
 * @afenda-description Client state provider for home workspace note preferences and draft state
 */
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type HomeState = {
  composerDensity: "compact" | "comfortable";
  noteDraft: string;
  lastCreatedNoteName: string | null;
  showComposerStatus: boolean;
};

type HomeStateAction =
  | { type: "set-note-draft"; value: string }
  | { type: "note-created"; value: string }
  | { type: "clear-note-draft" }
  | { type: "set-show-composer-status"; value: boolean }
  | { type: "set-composer-density"; value: "compact" | "comfortable" };

type HomeStateContextValue = {
  state: HomeState;
  setNoteDraft: (value: string) => void;
  clearNoteDraft: () => void;
  markNoteCreated: (value: string) => void;
  setShowComposerStatus: (value: boolean) => void;
  setComposerDensity: (value: "compact" | "comfortable") => void;
};

const initialState: HomeState = {
  composerDensity: "comfortable",
  noteDraft: "",
  lastCreatedNoteName: null,
  showComposerStatus: true,
};

const HomeStateContext = createContext<HomeStateContextValue | null>(null);

function homeStateReducer(
  state: HomeState,
  action: HomeStateAction,
): HomeState {
  switch (action.type) {
    case "set-note-draft":
      return {
        ...state,
        noteDraft: action.value,
      };
    case "clear-note-draft":
      return {
        ...state,
        noteDraft: "",
      };
    case "note-created":
      return {
        ...state,
        lastCreatedNoteName: action.value,
        noteDraft: "",
      };
    case "set-show-composer-status":
      return {
        ...state,
        showComposerStatus: action.value,
      };
    case "set-composer-density":
      return {
        ...state,
        composerDensity: action.value,
      };
    default:
      return state;
  }
}

export function HomeStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(homeStateReducer, initialState);

  const value = useMemo<HomeStateContextValue>(
    () => ({
      state,
      setNoteDraft: (value) => {
        dispatch({ type: "set-note-draft", value });
      },
      clearNoteDraft: () => {
        dispatch({ type: "clear-note-draft" });
      },
      markNoteCreated: (value) => {
        dispatch({ type: "note-created", value });
      },
      setShowComposerStatus: (value) => {
        dispatch({ type: "set-show-composer-status", value });
      },
      setComposerDensity: (value) => {
        dispatch({ type: "set-composer-density", value });
      },
    }),
    [state],
  );

  return (
    <HomeStateContext.Provider value={value}>
      {children}
    </HomeStateContext.Provider>
  );
}

export function useHomeState() {
  const context = useContext(HomeStateContext);

  if (!context) {
    throw new Error("useHomeState must be used within HomeStateProvider");
  }

  return context;
}
