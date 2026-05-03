"use client";

/**
 * @afenda-owner client-runtime
 * @afenda-subject app-state
 * @afenda-artifact state-provider
 * @afenda-boundary client
 * @afenda-description Client state provider for global browser preferences
 */
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type AppState = {
  composerDensity: "compact" | "comfortable";
  postDraft: string;
  lastCreatedPostName: string | null;
  showComposerStatus: boolean;
};

type AppStateAction =
  | { type: "set-post-draft"; value: string }
  | { type: "post-created"; value: string }
  | { type: "clear-post-draft" }
  | { type: "set-show-composer-status"; value: boolean }
  | { type: "set-composer-density"; value: "compact" | "comfortable" };

type AppStateContextValue = {
  state: AppState;
  setPostDraft: (value: string) => void;
  clearPostDraft: () => void;
  markPostCreated: (value: string) => void;
  setShowComposerStatus: (value: boolean) => void;
  setComposerDensity: (value: "compact" | "comfortable") => void;
};

const initialState: AppState = {
  composerDensity: "comfortable",
  postDraft: "",
  lastCreatedPostName: null,
  showComposerStatus: true,
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case "set-post-draft":
      return {
        ...state,
        postDraft: action.value,
      };
    case "clear-post-draft":
      return {
        ...state,
        postDraft: "",
      };
    case "post-created":
      return {
        ...state,
        lastCreatedPostName: action.value,
        postDraft: "",
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

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      setPostDraft: (value) => {
        dispatch({ type: "set-post-draft", value });
      },
      clearPostDraft: () => {
        dispatch({ type: "clear-post-draft" });
      },
      markPostCreated: (value) => {
        dispatch({ type: "post-created", value });
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
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
