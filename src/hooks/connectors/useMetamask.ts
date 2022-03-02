import invariant from "tiny-invariant";
import { useConnect } from "../useConnect";

export function useMetamask() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Metamask connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find(
    (c) => c.id === "walletConnect",
  );
  invariant(
    connector,
    "Metamask connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}
