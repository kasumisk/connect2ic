import { useContext } from "react"
import { useSelector } from "@xstate/react"
import { useConnect } from "./useConnect"
import { Connect2ICContext } from "../context"

export const useCanister = (
  canisterName: string,
  options: { mode: string } = {
    mode: "auto", // "anonymous" | "connected"
  },
) => {
  const { mode } = options
  const { connectService, canisters } = useContext(Connect2ICContext)

  const anonymousActor = useSelector(connectService, (state) => state.context.anonymousActors[canisterName])
  const actor = useSelector(connectService, (state) => state.context.actors[canisterName])
  const { isConnected } = useConnect()

  const canister = (isConnected && actor && mode !== "anonymous") ? actor : anonymousActor

  // TODO:
  const loading = !canister
  const error = false

  return [canister, { error, loading }] as const
}